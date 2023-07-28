package com.example.demo.repository;


import com.example.demo.dto.FestivalTmpDTO;
import com.example.demo.entity.Festival;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface FestivalRepository extends JpaRepository<Festival, Long> {
    //Festival 이름 검색
    Festival findByFestivalName(String name);

    // 축제 상세 정보 가져오기(GET)
    Optional<Festival> findById(Long festivalId);

    //Festival 제목 검색 결과 페이지네이션
    @Query("SELECT f FROM Festival f WHERE f.festivalName LIKE %:keyword%")
    Page<Festival> findbySearchKeyword(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT new com.example.demo.dto.FestivalTmpDTO (f.festivalName, f.festivalDesc) from Festival f WHERE f.id = :festivalId")
    FestivalTmpDTO findFestivalNameAndFestivalDescById(@Param("festivalId") Long festivalId);
    //Festival 지역 검색 결과 페이지네이션
//    @Query("SELECT f FROM Festival f WHERE f.festivalLocation LIKE %:keyword% OR ")

//    List<Festival> findByFestivalNameAndStartDateBetweenEndDateAndSeasonIn(Optional<List<String>> locations, Optional<Map<String, String>> selectedPeriod, Optional<List<String>> seasons);

}
