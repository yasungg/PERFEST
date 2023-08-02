package com.example.demo.controller;

import com.example.demo.dto.FestivalNameBoxDTO;
import com.example.demo.entity.Festival;
import com.example.demo.dto.FestivalDTO;
import com.example.demo.jwt.TokenProvider;
import com.example.demo.service.FestivalService;
import com.example.demo.user.ContextGetter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/auth/festival")
public class FestivalController {
    private final FestivalService festivalService;
    private final ContextGetter info;
    private final TokenProvider tokenProvider;
    private final HttpServletResponse response;

    // 관리자 전용 : 축제 전체 공공 데이터 받아와서 파싱 후 DB에 저장
    @GetMapping("/get-festival-info")
    public Boolean getFestivalInfo() throws IOException {
        return festivalService.getFestivalInfo();
    }

    // 축제 상세 정보 가져오기(GET)
    @GetMapping(value = "/getfestivaldetail")
    public ResponseEntity<List<FestivalDTO>> festvialDetail(@RequestParam int festivalId) {
        List<FestivalDTO> list = festivalService.getFestivalDetail((long) festivalId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    //Festival Name box에 담을 정보 가져오기
    @GetMapping(value = "/get-festdetail-namebox")
    public ResponseEntity<FestivalNameBoxDTO> getNameBoxInfo(@RequestParam int festivalId) {
        return new ResponseEntity<>(festivalService.getNameBoxInfo((long) festivalId), HttpStatus.OK);
    }

    //축제 검색 결과 가져오기
    @GetMapping("/get-name-searchresult")
    public ResponseEntity<Page<Festival>> getFestivalSearchResultByName(@NotNull @RequestParam String keyword, @RequestParam int pageNum, @RequestParam int pageSize) {
        return new ResponseEntity<>(festivalService.searchFestivalByKeyword(keyword, pageNum, pageSize), HttpStatus.OK);
    }
    @GetMapping("/get-region-searchresult")
    public ResponseEntity<Page<Festival>> getFestivalSearchResultByRegion(@NotNull @RequestParam String keyword, @RequestParam int pageNum, @RequestParam int pageSize) {
        return null;
    }

    @PostMapping(value = "/getSearchFestivalInfo")
    public ResponseEntity<List<FestivalDTO>> getSearchFestivalInfo(@RequestBody Map<String, Object> info) {
        // 프론트엔드에서 받아온 2개의 카테고리의 값 중 하나라도 있는 경우에만 값을 받아오고
        // 받아오지 않을 경우, NullPointException 을 방지하기 위해 Optional 처리
        List<String> selectedLocations = (List<String>) info.get("location");

        // 날짜는 searchData 객체에서 period 안에 시작일, 종료일을 함께 받아오기 때문에 Map 으로 받아옴
        Map<String, String> selectedPeriod = (Map<String, String>) info.get("period");

        // Service를 호출하여 비즈니스 로직을 수행하고, Festival 리스트를 가져온다.
        List<FestivalDTO> festivals = festivalService.searchFestivalInfo(selectedLocations, selectedPeriod);

        // festivals를 ResponseEntity에 담아 반환.
        return new ResponseEntity<>(festivals, HttpStatus.OK);
    }
    @GetMapping("/get-image-links")
    public ResponseEntity<List<String>> getImageLinksForDetail(@RequestParam int festivalId) {
        return new ResponseEntity<>(festivalService.festivalImageLinks((long) festivalId), HttpStatus.OK);
    }

    // 해당 축제 내일정 추가
    @PostMapping("/addCal")
    public ResponseEntity<Boolean> addCalender(@RequestParam Long festivalId) {
        Long memberId = info.getId();
        boolean result = festivalService.addCalender(memberId, festivalId);
        tokenProvider.setNewAccessTokenToHeader(response);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}