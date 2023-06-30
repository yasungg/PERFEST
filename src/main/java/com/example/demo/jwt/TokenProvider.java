package com.example.demo.jwt;

import com.example.demo.dto.memberDTOs.TokenDTO;
import com.example.demo.entity.Member;
import com.example.demo.repository.MemberRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import javax.servlet.http.HttpSession;
import java.security.Key;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Component
public class TokenProvider {
    private static final String AUTHORITIES_KEY = "auth";
    private static final String BEARER_TYPE = "bearer";
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private HttpSession httpSession;
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 7L * 24 * 60 * 60 * 1000;
    private final Key key;

    // 주의점: 여기서 @Value는 `springframework.beans.factory.annotation.Value`소속이다! lombok의 @Value와 착각하지 말것!
    public TokenProvider(@Value("${springboot.jwt.secret}") String secretKey) {
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    // 첫 로그인 또는 refresh token이 만료되었을 경우 -> access token 및 refresh token 생성
    public TokenDTO generateTokenDTO(Authentication authentication) {
        log.info("generateTokenDTO method가 시작됩니다!!");
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        log.info("권한 정보 location: TokenProvider.generateTokenDTO = {}", authorities);
        long now = (new Date()).getTime();

        Date tokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
        log.info("access token 만료 시간 = {}", tokenExpiresIn);
        Date refreshTokenExpiresIn = new Date(now + REFRESH_TOKEN_EXPIRE_TIME);
        log.info("refresh token 만료 시간 = {}", refreshTokenExpiresIn);

        String accessToken = Jwts.builder()
                .setSubject(authentication.getName())
                .claim(AUTHORITIES_KEY, authorities)
                .setExpiration(tokenExpiresIn)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

        String refreshToken = Jwts.builder()
                .setSubject(authentication.getName())
                .claim(AUTHORITIES_KEY, authorities)
                .setExpiration(refreshTokenExpiresIn)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

        log.info(refreshToken);

        saveRefreshToken(refreshToken);

        return TokenDTO.builder()
                .grantType(BEARER_TYPE)
                .accessToken(accessToken)
                .tokenExpiresIn(tokenExpiresIn.getTime())
                .build();
    }


    //refresh token이 존재하고 유효성 검사도 통과되었을 경우 --> access token만 생성
    public TokenDTO generateAccessToken(Authentication authentication) {
        log.info("generateTokenDTO method가 시작됩니다!!");
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        log.info("권한 정보 location: TokenProvider.generateTokenDTO = {}", authorities);
        long now = (new Date()).getTime();

        Date tokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
        log.info("access token 만료 시간 = {}", tokenExpiresIn);
        Date refreshTokenExpiresIn = new Date(now + REFRESH_TOKEN_EXPIRE_TIME);
        log.info("refresh token 만료 시간 = {}", refreshTokenExpiresIn);

        String accessToken = Jwts.builder()
                .setSubject(authentication.getName())
                .claim(AUTHORITIES_KEY, authorities)
                .setExpiration(tokenExpiresIn)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

        return TokenDTO.builder()
                .grantType(BEARER_TYPE)
                .accessToken(accessToken)
                .tokenExpiresIn(tokenExpiresIn.getTime())
                .build();
    }

    public Authentication getAuthentication(String accessToken) {
        Claims claims = parseClaims(accessToken);

        if (claims.get(AUTHORITIES_KEY) == null) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        UserDetails principal = new User(claims.getSubject(), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            Date expiredTime = parseClaims(token).getExpiration();
            log.info("access token expires in = {}", expiredTime);

            if(checkIsAlmostExpired(expiredTime)) { // 토큰 만료 기간이 5분 미만 남았을 경우 예외 처리
                log.info("남은 토큰 유효시간이 5분 미만입니다!");
                throw new JwtException("401-1");
            }

            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다.");
            e.printStackTrace();
            throw new JwtException("401-2");
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다.");
            SecurityContextHolder.clearContext(); // 만료된 토큰 인증 컨텍스트 제거
            throw new JwtException("401-3");
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 토큰입니다.");
            throw new JwtException("401-4");
        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰이 잘못되었습니다.");
            throw new JwtException("401-5");
        }
    }

    //jwt의 바디에서 claims 정보를 불러옴.
    private Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    //토큰의 만료 기간이 5분 미만일 경우 true를 반환
    private boolean checkIsAlmostExpired(Date expiresIn) {
        Date expiredTime = expiresIn;
        Date now = new Date(System.currentTimeMillis());
        long lastTime = expiredTime.getTime() - now.getTime();
        boolean isAlmostExpired = lastTime <= 300000 && lastTime > 0;

        log.info("location: checkIsExpired method / isExpired? = {}", isAlmostExpired);
        return isAlmostExpired;
    }

    //refresh token을 DB에 저장
    private void saveRefreshToken(String refreshToken) {
        String email = (String) httpSession.getAttribute("email");
        Optional<Member> member = memberRepository.findByUsername(email);
        if(member.isPresent()) {
            Long memberId = member.get().getId();

        }

    }
}
