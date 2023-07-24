package com.example.demo.service;

import com.example.demo.dto.FestivalDTO;
import com.example.demo.entity.Festival;
import com.example.demo.repository.FestivalRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class FestivalService {
    private final FestivalRepository festivalRepository;
    private final ObjectMapper mapper;

    public Boolean getFestivalInfo() throws IOException {
        StringBuilder urlBuilder = new StringBuilder("http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api"); /*URL*/
        urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=%2FXYuwTLe9VasAXKNRHVLE4M%2Fp1irVQjOYUyOu2TWynXen7QM6i5ppj4oJGYyvQLe4Qf0mXtUtMz7onXSkBT%2B8A%3D%3D"); /*Service Key*/
        urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지 번호*/
        urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode("1397", "UTF-8")); /*한 페이지 결과 수*/
        urlBuilder.append("&" + URLEncoder.encode("type", "UTF-8") + "=" + URLEncoder.encode("json", "UTF-8")); /*XML/JSON 여부*/
//        urlBuilder.append("&" + URLEncoder.encode("fstvlNm","UTF-8") + "=" + URLEncoder.encode("", "UTF-8")); /*축제명*/
//        urlBuilder.append("&" + URLEncoder.encode("opar","UTF-8") + "=" + URLEncoder.encode("", "UTF-8")); /*개최장소*/
//        urlBuilder.append("&" + URLEncoder.encode("fstvlStartDate","UTF-8") + "=" + URLEncoder.encode("", "UTF-8")); /*축제시작일자*/
//        urlBuilder.append("&" + URLEncoder.encode("fstvlEndDate","UTF-8") + "=" + URLEncoder.encode("", "UTF-8")); /*축제종료일자*/
//        urlBuilder.append("&" + URLEncoder.encode("fstvlCo","UTF-8") + "=" + URLEncoder.encode("", "UTF-8")); /*축제내용*/
//        urlBuilder.append("&" + URLEncoder.encode("mnnst","UTF-8") + "=" + URLEncoder.encode("", "UTF-8")); /*주관기관*/
//        urlBuilder.append("&" + URLEncoder.encode("auspcInstt","UTF-8") + "=" + URLEncoder.encode("", "UTF-8")); /*주최기관*/
//        urlBuilder.append("&" + URLEncoder.encode("suprtInstt","UTF-8") + "=" + URLEncoder.encode("", "UTF-8")); /*후원기관*/
//        urlBuilder.append("&" + URLEncoder.encode("phoneNumber","UTF-8") + "=" + URLEncoder.encode("", "UTF-8")); /*전화번호*/
//        urlBuilder.append("&" + URLEncoder.encode("homepageUrl","UTF-8") + "=" + URLEncoder.encode("", "UTF-8")); /*홈페이지주소*/
//        urlBuilder.append("&" + URLEncoder.encode("relateInfo","UTF-8") + "=" + URLEncoder.encode("", "UTF-8")); /*관련정보*/
//        urlBuilder.append("&" + URLEncoder.encode("rdnmadr","UTF-8") + "=" + URLEncoder.encode("", "UTF-8")); /*소재지도로명주소*/
//        urlBuilder.append("&" + URLEncoder.encode("lnmadr","UTF-8") + "=" + URLEncoder.encode("", "UTF-8")); /*소재지지번주소*/
//        urlBuilder.append("&" + URLEncoder.encode("latitude","UTF-8") + "=" + URLEncoder.encode("", "UTF-8")); /*위도*/
//        urlBuilder.append("&" + URLEncoder.encode("longitude","UTF-8") + "=" + URLEncoder.encode("", "UTF-8")); /*경도*/


        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());
        BufferedReader rd;
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }

        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }

        rd.close();
        conn.disconnect();


        saveData(sb.toString());

        return true;
    }

    private void saveData(String response) {
        try {
            JSONObject jsonObject = new JSONObject(response);
            JSONObject bodyObject = jsonObject.getJSONObject("response").getJSONObject("body");
            JSONArray itemArray = bodyObject.getJSONArray("items");
            JSONObject filteredData = new JSONObject();
            JSONArray filteredItems = new JSONArray();

            for (int i = 0; i < itemArray.length(); i++) {
                JSONObject itemObject = itemArray.getJSONObject(i);
                String fstvlStartDate = itemObject.getString("fstvlStartDate");
                String latitude = itemObject.getString("latitude");
                String longitude = itemObject.getString("longitude");
                String address = itemObject.getString("lnmadr");
                String roadAddress = itemObject.getString("rdnmadr");
                System.out.print(i);
                // "fstvlStartDate"에 "2023"이 포함된 데이터만 출력
                if (fstvlStartDate.contains("2023")) {
                    filteredItems.put(itemObject);
                    if (latitude.equals("") || longitude.equals("")) {
                        if (!address.equals("")) {
                            JSONObject geocodingData = getGeocodingData(address);
                            String geocodingLatitude = geocodingData.optString("latitude");
                            String geocodingLongitude = geocodingData.optString("longitude");

                            if (!geocodingLatitude.isEmpty() && !geocodingLongitude.isEmpty()) {
                                itemObject.put("latitude", geocodingLatitude);
                                itemObject.put("longitude", geocodingLongitude);
                            }
                            log.info("일반 주소 지오코딩 작업 완료");

                        }
                        if (!roadAddress.equals("")) {
                            JSONObject geocodingData = getGeocodingData(roadAddress);
                            String geocodingLatitude = geocodingData.optString("latitude");
                            String geocodingLongitude = geocodingData.optString("longitude");

                            if (!geocodingLatitude.isEmpty() && !geocodingLongitude.isEmpty()) {
                                itemObject.put("latitude", geocodingLatitude);
                                itemObject.put("longitude", geocodingLongitude);
                            }
                            log.info("도로명 주소 지오코딩 작업 완료");
                        }
                    }
                }
            }
            filteredData.put("items", filteredItems);
            log.info("filteredItems = {}", filteredItems);
            try {
                saveFestivalInfo(filteredItems);
            } catch (IOException | JSONException e) {
                e.printStackTrace();
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public JSONObject getGeocodingData(String address) {
        String clientId = "gyq6ws8dmz";
        String clientSecret = "Mp7V8le5cwOAdMtpC0o5YlYcFLMtpQXaZZvLM8tC";
        JSONObject geocodingData = new JSONObject();

        try {
            String encodedAddress = URLEncoder.encode(address, "UTF-8");
            String apiURL = "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=" + encodedAddress;
            URL url = new URL(apiURL);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("X-NCP-APIGW-API-KEY-ID", clientId);
            con.setRequestProperty("X-NCP-APIGW-API-KEY", clientSecret);

            int responseCode = con.getResponseCode();
            BufferedReader br;

            if (responseCode == 200) {
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else {
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }

            String inputLine;
            StringBuilder response = new StringBuilder();

            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();

            JSONObject jsonResponse = new JSONObject(response.toString());
            JSONArray addresses = jsonResponse.getJSONArray("addresses");

            if (addresses.length() > 0) {
                JSONObject addressObject = addresses.getJSONObject(0);
                String geocodingLatitude = addressObject.optString("y");
                String geocodingLongitude = addressObject.optString("x");

                if (!geocodingLatitude.isEmpty() && !geocodingLongitude.isEmpty()) {
                    geocodingData.put("latitude", geocodingLatitude);
                    geocodingData.put("longitude", geocodingLongitude);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return geocodingData;
    }

    private void saveFestivalInfo(JSONArray data) throws IOException {
        log.info("saveFestivalInfo 진입!!");
        List<Festival> list = mapper.readValue(data.toString(), new TypeReference<List<Festival>>() {
        });
        log.info("list = {}", list);
        festivalRepository.saveAll(list);
    }

    // 축제 상세 정보 가져오기(GET)
    public List<FestivalDTO> getFestivalDetail(Long festivalId) {
        Optional<Festival> optionalFestival = festivalRepository.findById(festivalId);
        List<FestivalDTO> festivalDTOS = new ArrayList<>();
        FestivalDTO festivalDTO = new FestivalDTO();
        if (optionalFestival.isPresent()) {
            Festival festival = optionalFestival.get();
            festivalDTO.setFestivalName(festival.getFestivalName());
            festivalDTO.setFestivalImg(festival.getFestivalImg());
            festivalDTO.setFestivalDoro(festival.getFestivalDoro());
            festivalDTO.setFestivalLocation(festival.getFestivalLocation());
            festivalDTO.setFestivalTel(festival.getFestivalTel());
            festivalDTO.setMainOrg(festival.getMainOrg());
            festivalDTO.setStartDate(festival.getStartDate());
            festivalDTO.setEndDate(festival.getEndDate());
            festivalDTOS.add(festivalDTO);
        }
        return festivalDTOS;
    }
}