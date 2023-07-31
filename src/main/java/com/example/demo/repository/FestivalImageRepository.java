package com.example.demo.repository;

import com.example.demo.entity.FestivalImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FestivalImageRepository extends JpaRepository<FestivalImage, Long> {
    List<FestivalImage> findByFestivalId(Long festivalId);
}
