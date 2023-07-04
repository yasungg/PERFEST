package com.example.demo.service;


import com.example.demo.dto.FestivalDTO;
import com.example.demo.entity.Festival;
import com.example.demo.repository.FestivalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FestivalService {
    private final FestivalRepository festivalRepository;

    public Festival createFestival(FestivalDTO festivalDTO) {
        Festival festival = Festival.builder()  // FestivalDTO 객체를 이용하여 Festival 엔티티를 생성
                .festivalName(festivalDTO.getFestivalName())
                .festivalLocation(festivalDTO.getFestivalLocation())
                .festivalDoro(festivalDTO.getFestivalDoro())
                .startDate(festivalDTO.getStartDate())
                .endDate(festivalDTO.getEndDate())
                .festivalDesc(festivalDTO.getFestivalDesc())
                .mainOrg(festivalDTO.getMainOrg())
                .wedo(festivalDTO.getWedo())
                .kyungdo(festivalDTO.getKyungdo())
                .festivalTel(festivalDTO.getFestivalTel())
                .festivalImgLink(festivalDTO.getFestivalImgLink())
                .build();

        return festivalRepository.save(festival);   // Festival 엔티티를 저장하고 반환
    }

    public List<Festival> getAllFestivals() {
        return festivalRepository.findAll();        // 모든 Festival 엔티티를 조회하여 반환
    }

    public Festival getFestivalById(Long id) {      // 주어진 ID로 Festival 엔티티를 조회합니다.
        return festivalRepository.findById(id)      // 만약 ID에 해당하는 엔티티가 없을 경우 IllegalArgumentException을 던짐
                .orElseThrow(() -> new IllegalArgumentException(id + "에 해당되는 축제를 찾을 수 없습니다."));
    }

//    private static final String ENDPOINT = "http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api";
//    private static final String ServiceKey = "/XYuwTLe9VasAXKNRHVLE4M/p1irVQjOYUyOu2TWynXen7QM6i5ppj4oJGYyvQLe4Qf0mXtUtMz7onXSkBT+8A==";
//
//    public void fetchDataFromAPI() throws IOException {
//        // API 요청을 보낼 URL 생성하기
//        String requestURL = ENDPOINT + "?serviceKey=" + ServiceKey;
//
//        // API 요청 보내기
//        URL url = new URL(requestURL);
//        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//        conn.setRequestMethod("GET");
//
//        // API 응답 받기
//        int responseCode = conn.getResponseCode();  // API 요청에 대한 응답 코드 받기 / getResponseCode() 응답코드 가져오기
//        if(responseCode == HttpURLConnection.HTTP_OK) { // HTTP_OK -> 요청이 성공적으로 완료되었음을 나타내는 상수
//            BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));   // BufferedReader : API 응답 내용을 읽어들임
//            StringBuilder response = new StringBuilder();   // getInputStream() : 호출하여 읽을 수 있는 InputStream 가져오기 / StringBuilder 객체에 응답 데이터 저장하기
//            String line;
//            while((line = reader.readLine()) != null) { // 응답 데이터를 한 줄씩 읽어들이고 StringBuilder 에 추가, 읽을 데이터가 없을 때까지 반복
//                response.append(line);
//            }
//            reader.close();
//
//            // 응답 데이터 처리?
//            String responseData = response.toString();
//
//            // TODO: 데이터 처리 로직 추가
//        } else {
//            System.out.println("API 요청 실패 : " + responseCode);
//        }
//        conn.disconnect();
//    }
}