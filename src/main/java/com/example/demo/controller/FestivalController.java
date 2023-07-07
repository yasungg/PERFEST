package com.example.demo.controller;

import com.example.demo.dto.FestivalDTO;
import com.example.demo.entity.Festival;
import com.example.demo.service.FestivalService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/auth/festival")
public class FestivalController {
    private final FestivalService festivalService;

    // POST 요청을 처리하는 메소드
    @PostMapping
    public ResponseEntity<Festival> createFestival(@RequestBody FestivalDTO festivalDTO) {
        Festival createFestival = festivalService.createFestival(festivalDTO);  // FestivalDTO 객체를 받아와서 FestivalService의 createFestival 메소드를 호출하여 새로운 Festival을 생성
        return new ResponseEntity<>(createFestival, HttpStatus.CREATED);    // 생성된 Festival을 ResponseEntity에 담아서 HTTP 상태 코드 201(Created)과 함께 반환
    }

    // GET 요청을 처리하는 메소드 (전부 가져옴)
    @GetMapping(value = "/getfestivals")
    public ResponseEntity<List<Festival>> getAllFestivals() {
        List<Festival> festivals = festivalService.getAllFestivals();   // FestivalService의 getAllFestivals 메소드를 호출하여 모든 Festival 목록을 가져옴
        return new ResponseEntity<>(festivals, HttpStatus.OK);  // 가져온 Festival 목록을 ResponseEntity에 담아서 HTTP 상태 코드 200(OK)과 함께 반환
    }

    // GET 요청을 처리하는 메소드 (id 값만 가져옴)
    @GetMapping("/{id}")    // {id} : 경로변수. 동적으로 값을 전달할 수 있음 (ex) /auth/festival/n -> id = n
    public ResponseEntity<Festival> getFestivalById(@PathVariable Long id) {
        Festival festival = festivalService.getFestivalById(id);
        return new ResponseEntity<>(festival, HttpStatus.OK);
    }

    @GetMapping("/LatLng")
    public ResponseEntity<Map<Long, String[]>> getAllFestivalsLatLng() {
        List<Festival> festivals = festivalService.getAllFestivals();

        Map<Long, String[]> LatLngMap = new HashMap<>();
        for(Festival festival : festivals) {
            Long festivalId = festival.getId();
            String wedo = festival.getWedo();
            String kyungdo = festival.getKyungdo();
            String festivalLocation = festival.getFestivalLocation();
            String festivalDoro = festival.getFestivalDoro();

            if(wedo == null && kyungdo == null) {
                festivalLocation = festival.getFestivalLocation();
            }
            if(festivalLocation == null) {
                festivalDoro = festival.getFestivalDoro();
            }
            LatLngMap.put(festivalId, new String[]{wedo, kyungdo, festivalLocation, festivalDoro});
        }
        return new ResponseEntity<>(LatLngMap, HttpStatus.OK);
    }


}
