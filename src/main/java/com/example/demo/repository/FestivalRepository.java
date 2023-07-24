package com.example.demo.repository;


import com.example.demo.entity.Festival;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FestivalRepository extends JpaRepository<Festival, Long> {

    Festival findByFestivalName(String name);

    // 축제 상세 정보 가져오기(GET)
    Optional<Festival> findById(Long festivalId);
}
