package com.example.demo.jwt;

import com.example.demo.constant.Authority;
import com.example.demo.dto.memberDTOs.MemberRequestDTO;
import com.example.demo.dto.memberDTOs.RefreshTokenDTO;
import com.example.demo.dto.memberDTOs.TokenDTO;
import com.example.demo.entity.Auth;
import com.example.demo.entity.Member;
import com.example.demo.repository.AuthRepository;
import com.example.demo.repository.MemberRepository;
import com.example.demo.user.PerfestKakaoAuthenticationProvider;
import com.example.demo.user.PerfestUserDetails;
import com.example.demo.user.PerfestUserDetailsService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.security.Key;
import java.util.*;
import java.util.stream.Collectors;

import static com.example.demo.constant.Authority.*;

@Slf4j
@Component
public class TokenProvider {
    private static final String AUTHORITIES_KEY = "auth";
    private static final String BEARER_TYPE = "bearer";
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 40;
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 7L * 24 * 60 * 60 * 1000;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private HttpSession httpSession;
    @Autowired
    private AuthRepository authRepository;
    @Autowired
    private PerfestKakaoAuthenticationProvider kakaoAuthProvider;
    @Autowired
    private PerfestUserDetailsService userDetailsService;

    private final Key key;

    // 주의점: 여기서 @Value는 `springframework.beans.factory.annotation.Value`소속이다! lombok의 @Value와 착각하지 말것!
    public TokenProvider(@Value("${springboot.jwt.secret}") String secretKey) {
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    // 첫 로그인  -> access token 및 refresh token 생성
    public TokenDTO generateTokenDTO(Authentication authentication) {
        log.info("access token, refresh token이 동시에 생성됩니다!");
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        long now = (new Date()).getTime();

        PerfestUserDetails member = userDetailsService.loadUserByUsername(authentication.getName());
        String id = member.getId().toString();
        String nickname = member.getNickname();

        Date tokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
        log.info("access token 만료 시간 = {}", tokenExpiresIn);
        Date refreshTokenExpiresIn = new Date(now + REFRESH_TOKEN_EXPIRE_TIME);
        log.info("refresh token 만료 시간 = {}", refreshTokenExpiresIn);

        String accessToken = Jwts.builder()
                .setSubject(authentication.getName())
                .claim(AUTHORITIES_KEY, authorities)
                .claim("Id", id)
                .claim("nickname", nickname)
                .setExpiration(tokenExpiresIn)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

        String refreshToken = Jwts.builder()
                .setSubject(authentication.getName())
                .claim(AUTHORITIES_KEY, authorities)
                .setExpiration(refreshTokenExpiresIn)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

        log.info("refresh token = {}", refreshToken);

        saveRefreshToken(refreshToken, refreshTokenExpiresIn);

        return TokenDTO.builder()
                .grantType(BEARER_TYPE)
                .accessToken(accessToken)
                .tokenExpiresIn(tokenExpiresIn.getTime())
                .build();
    }

    // refresh token이 만료되었을 경우 refresh token 생성
    public void generateRefreshToken(Authentication authentication) {
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        long now = (new Date()).getTime();

        Date refreshTokenExpiresIn = new Date(now + REFRESH_TOKEN_EXPIRE_TIME);
        log.info("refresh token 만료 시간 = {}", refreshTokenExpiresIn);

        String refreshToken = Jwts.builder()
                .setSubject(authentication.getName())
                .claim(AUTHORITIES_KEY, authorities)
                .setExpiration(refreshTokenExpiresIn)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

        log.info("refresh token = {}", refreshToken);

        saveRefreshToken(refreshToken, refreshTokenExpiresIn);
    }

    // refresh token이 존재하고 유효성 검사도 통과되었을 경우 --> access token만 생성
    public TokenDTO generateAccessToken(Authentication authentication) {
        log.info("access token만 생성됩니다!");
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        // access token의 claims에 담을 member_id와 nickname을 불러옵니다.
        PerfestUserDetails member = userDetailsService.loadUserByUsername(authentication.getName());
        String id = member.getId().toString();
        String nickname = member.getNickname();

        // 만료 시간을 설정합니다.
        long now = (new Date()).getTime();
        Date tokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
        log.info("access token 만료 시간 = {}", tokenExpiresIn);

        String accessToken = Jwts.builder()
                .setSubject(authentication.getName())
                .claim(AUTHORITIES_KEY, authorities)
                .claim("Id", id)
                .claim("nickname", nickname)
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

        String id = (String) claims.get("Id");
        Long userId = Long.parseLong(id);
        PerfestUserDetails principal = new PerfestUserDetails(new Member());

        if(claims.get(AUTHORITIES_KEY).equals(ROLE_USER.name())) {
            principal = new PerfestUserDetails(new Member(userId, claims.getSubject(), "", (String) claims.get("nickname"), ROLE_USER));
        }

        if(claims.get(AUTHORITIES_KEY).equals(ROLE_KAKAO.name())) {
            principal = new PerfestUserDetails(new Member(userId, claims.getSubject(), "", (String) claims.get("nickname"), ROLE_KAKAO));
        }

        if(claims.get(AUTHORITIES_KEY).equals(ROLE_ADMIN.name())) {
            principal = new PerfestUserDetails(new Member(userId, claims.getSubject(), "", (String) claims.get("nickname"), ROLE_ADMIN));
        }
        log.info("여기 도달했나?");
        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }
    //access token 유효성 검사
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다.");
            e.printStackTrace();
        } catch (ExpiredJwtException e) {
            log.info("만료된 access 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 access 토큰입니다.");
        } catch (IllegalArgumentException e) {
            log.info("access 토큰이 잘못되었습니다.");
            e.printStackTrace();
        }
        return false;
    }
    // refresh token 유효성 검사
    public boolean validateRefreshToken(String token) {
        try {
            Date expiredTime = parseClaims(token).getExpiration();
            log.info("access token expires in = {}", expiredTime);

            if(checkIsRefreshTokenAlmostExpired(expiredTime)) { // 토큰 만료 기간이 5분 미만 남았을 경우 예외 처리
                log.info("남은 refresh token 유효시간이 하루 미만입니다! refresh token 재발급 로직을 실행합니다.");
                reAuthenticateRefreshToken(token);
                return true;
            }

            if((expiredTime.getTime() - System.currentTimeMillis()) < 0) {
                log.error("refresh token이 만료되었습니다.");
                return false;
            }

            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다.");
            e.printStackTrace();
            return false;
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다.");
            return false;
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 토큰입니다.");
            return false;
        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰이 잘못되었습니다.");
            return false;
        }
    }

    //ACCESS TOKEN의 만료 기한이 하루 이내로 남았는지 여부를 계산 후 boolean 결과값을 리턴
    public boolean checkIsAlmostExpired(Date expiresIn) {
        Date expiredTime = expiresIn;
        Date now = new Date(System.currentTimeMillis());
        long lastTime = expiredTime.getTime() - now.getTime();
        boolean isAlmostExpired = lastTime <= 300000 && lastTime > 0;

        log.info("location: checkIsExpired method / isExpired? = {}", isAlmostExpired);
        return isAlmostExpired;
    }
    //REFRESH TOKEN의 만료 기한이 하루 이내로 남았는지 여부를 계산 후 boolean 결과값을 리턴
    public boolean checkIsRefreshTokenAlmostExpired(Date expiresIn) {
        Date expiredTime = expiresIn;
        Date now = new Date(System.currentTimeMillis());
        long lastTime = expiredTime.getTime() - now.getTime();
        boolean isAlmostExpired = lastTime <= 86400000L && lastTime > 0;

        log.info("location: checkIsExpired method / isExpired? = {}", isAlmostExpired);
        return isAlmostExpired;
    }

    //ACCESS TOKEN의 만료 기한과 REFRESH TOKEN의 유효성을 검사 후,
    //ACCESS TOKEN의 만료 기한이 5분 이내로 남았을 경우 재발급 로직 자동 실행.
    public void setNewAccessTokenToHeader(HttpServletResponse response) {
        String jwt = (String) httpSession.getAttribute("jwt");
        Date expiredTime = parseClaims(jwt).getExpiration();
        String refreshToken = readRefreshTokenFromDB(jwt);

        log.info("location: setNewAccessTokenToHeader: access token expires in = {}", expiredTime);
        log.info("location: setNewAccessTokenToHeader: refreshToken = {}", refreshToken);

        if(checkIsAlmostExpired(expiredTime) && validateRefreshToken(refreshToken)) { // 토큰 만료 기간이 5분 미만 남았을 경우 예외 처리
            log.info("남은 토큰 유효시간이 5분 미만입니다! 토큰 재발급 로직을 실행합니다.");
            String mail = parseClaims(jwt).getSubject();
            log.info("TokenProvider.setNewAccessTokenToHeader mail check = {}", mail);

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(mail, "");
            log.info("TokenProvider.setNewAccessTokenToHeader authentication token check = {}", authenticationToken);

            Authentication authentication = kakaoAuthProvider.authenticate(authenticationToken);
            log.info("authentication = {}", authentication);

            TokenDTO newAccessToken = generateAccessToken(authentication);

            response.addHeader("accessToken", newAccessToken.getAccessToken());
            response.addDateHeader("tokenExpiresIn", newAccessToken.getTokenExpiresIn());
        }
    }
    private void reAuthenticateRefreshToken(String token) {
        String mail = parseClaims(token).getSubject();
        log.info("TokenProvider.setNewAccessTokenToHeader mail check = {}", mail);

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(mail, "");
        log.info("TokenProvider.setNewAccessTokenToHeader authentication token check = {}", authenticationToken);

        Authentication authentication = kakaoAuthProvider.authenticate(authenticationToken);
        log.info("authentication = {}", authentication);
        generateRefreshToken(authentication);

        Optional<Member> member = memberRepository.findByUsername(mail);
        Long memberId = null;
        if(member.isPresent()) {
            memberId = member.get().getId();
        }

        Optional<Auth> newRefreshToken = authRepository.findByMemberId(memberId);
        if(newRefreshToken.isPresent()) {
            String newToken = newRefreshToken.get().getRefreshToken();
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(newToken);
        }
    }
    //jwt의 바디에서 claims 정보를 불러옴.
    private Claims parseClaims(String token) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    //refresh token을 DB에 저장
    private void saveRefreshToken(String refreshToken, Date refreshTokenExpiresIn) {
        String email = (String) httpSession.getAttribute("email");
        Optional<Member> member = memberRepository.findByUsername(email);

        if(member.isPresent()) {
            RefreshTokenDTO refreshTokenDTO = new RefreshTokenDTO();
            Member memberTMP = new Member();
            Long memberId = member.get().getId();
            memberTMP.setId(memberId);
            Auth auth = refreshTokenDTO.in(memberTMP, BEARER_TYPE, refreshToken, refreshTokenExpiresIn);
            authRepository.save(auth);
        }
    }
    //DB에서 refresh token을 불러오는 메소드
    private String readRefreshTokenFromDB(String jwt) {
        String username = parseClaims(jwt).getSubject();
        Long memberId = memberRepository.findByUsername(username).get().getId();
        Optional<Auth> auth = authRepository.findByMemberId(memberId);

        if(auth.isPresent()) {
            log.info("refresh token from DB = {}", authRepository.findByMemberId(memberId));
            return auth.get().getRefreshToken();
        }
        throw new RuntimeException("DB에서 refresh token을 읽어오는데 실패하였습니다!");
    }
}
