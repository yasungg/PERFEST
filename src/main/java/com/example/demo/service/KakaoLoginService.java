package com.example.demo.service;

import com.example.demo.dto.kakaoDTOs.*;
import com.example.demo.dto.memberDTOs.TokenDTO;
import com.example.demo.entity.Member;
import com.example.demo.repository.MemberRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.*;

import javax.servlet.http.HttpSession;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class KakaoLoginService {
    private final HttpSession session;
    private final WebClient webClient;
    private final ObjectMapper objectMapper;
    private final MemberRepository memberRepository;

    @Value("${kakao.client-id}")
    private String kakaoId;

    @Value("${kakao.client-secret}")
    private String kakaoSecret;

    @Value("${kakao.grant-type}")
    private String kakaoAuthGrantType;

    @Value("${kakao.redirect-uri}")
    private String kakaoRedirectUri;

    //카카오 서버에 access token 요청
    public void requestKakaoAccessToken(String authCode) {
        MultiValueMap<String, String> parameter = makeAccessTokenParams(authCode);
        try {
            getTokens(parameter);
        } catch (WebClientException e) {
            e.printStackTrace();
        }
    }
    //카카오에게서 전달받은 이메일 정보로 가입정보 확인 후 boolean값을 반환
    public boolean kakaoCheckIsMember() {
        String headerForgetMemberInfo = "Bearer " + session.getAttribute("access_token");
        log.info("headerForgetMemberInfo = {}", headerForgetMemberInfo);

        KakaoAccount kakaoAccount = getMemberInfo(headerForgetMemberInfo);
        log.info("kakaoAccount = {}", kakaoAccount.toString());
        session.setAttribute("mail", kakaoAccount.getEmail());
        Optional<Member> memberEmail = memberRepository.findByUsername((String)session.getAttribute("mail"));
        log.info("email = {}", kakaoAccount.getEmail());
        log.info("이메일 존재 여부 = {}", memberEmail.isPresent());
        return memberEmail.isPresent();
    }
    //생성된 JWT를 DTO에 담은 뒤 JSON 객체화
    public String stringifyJWT(TokenDTO tokenDTO){
        try {
            return objectMapper.writeValueAsString(tokenDTO);
        } catch(JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

// ---------------------------------> KakaoLoginService에서만 사용할 메소드들
    //access token 요청 파라미터 생성
    private MultiValueMap<String, String> makeAccessTokenParams(String authCode) {
        MultiValueMap<String, String> accessTokenParams = new LinkedMultiValueMap<>();
        accessTokenParams.add("grant_type", kakaoAuthGrantType);
        accessTokenParams.add("client_id", kakaoId);
        accessTokenParams.add("redirect_uri", kakaoRedirectUri);
        accessTokenParams.add("code", authCode);
        accessTokenParams.add("client_secret", kakaoSecret);

        log.info("accessTokenParams = {}", accessTokenParams.toString());
        return accessTokenParams;
    }

    //카카오 서버에 token이 담긴 entity를 요청하고 받아와서 session에 저장하는 메소드.
    private void getTokens(MultiValueMap<String, String> parameter) {
        ResponseEntity<String> gotTokenEntity = webClient.post()
                .uri("https://kauth.kakao.com/oauth/token")
                .contentType(MediaType.valueOf("application/x-www-form-urlencoded;charset=utf-8"))
                .body(BodyInserters.fromFormData(parameter))
                .retrieve()
                .toEntity(String.class)
                .block();
        if (gotTokenEntity != null) {
            saveTokensToSession(gotTokenEntity);
        } else {
            log.error("location : KakaoLoginService.getTokens, token 받아오기 실패!!");
        }
    }

    // access token을 추출해서 리턴
    private String extractAccessToken(String kakaoResponseObject) {
        try {
            AccessTokenDTO accessTokenDTO = objectMapper.readValue(
                    kakaoResponseObject,
                    new TypeReference<AccessTokenDTO>() {
                    }
            );
            return accessTokenDTO.getAccess_token();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "액세스 토큰을 추출하는 메소드에서 오류가 발생하였습니다.";
    }

    //refresh token을 추출해서 리턴
    private String extractRefreshToken(String kakaoResponseObject) {
        try {
            AccessTokenDTO accessTokenDTO = objectMapper.readValue(
                    kakaoResponseObject,
                    new TypeReference<AccessTokenDTO>() {
                    }
            );
            return accessTokenDTO.getRefresh_token();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "액세스 토큰을 추출하는 메소드에서 오류가 발생하였습니다.";
    }

    //추출 성공한 access token과 refresh token을 session에 저장
    private void saveTokensToSession(ResponseEntity<String> tokenResponse) {
        String accessToken = extractAccessToken(tokenResponse.getBody());
        String refreshToken = extractRefreshToken(tokenResponse.getBody());

        session.setAttribute("access_token", accessToken);
        session.setAttribute("refresh_token", refreshToken);
        log.info("accessToken = {}", session.getAttribute("access_token"));
        log.info("refreshToken = {}", session.getAttribute("refresh_token"));
        log.info("세션 저장 성공");
    }

    //access token을 이용해 유저 정보를 받아옴.
    private KakaoAccount getMemberInfo(String header) {
        ResponseEntity<String> memberInfoResponse = webClient.get()
                .uri("https://kapi.kakao.com/v2/user/me")
                .headers(headers -> headers.add("Authorization", header))
                .retrieve()
                .toEntity(String.class)
                .block();

        log.info("memberInfoResponse = {}", memberInfoResponse.getBody());

        try {
            KakaoMemberInfoDTO profile = objectMapper.readValue(
                    memberInfoResponse.getBody(),
                    new TypeReference<KakaoMemberInfoDTO>() {
                    });
            log.info("profile = {}", profile.getKakaoAccount().getEmail());

            if(profile != null) {
                KakaoAccount kakaoAccount = profile.getKakaoAccount();
//                //후일 사용될 수 있기 때문에 일단 생성해 두었음.
//                KakaoLoginProperties properties = profile.getKakaoLoginProperties();
//                KakaoLoginProfile kakaoLoginProfile = kakaoAccount.getKakaoLoginProfile();
                return kakaoAccount;
            }
            log.error("location : KakaoLoginService.getMemberInfo.responseBody, profile = null");

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

}