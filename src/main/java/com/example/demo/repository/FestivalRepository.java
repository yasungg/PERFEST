package com.example.demo.repository;


import com.example.demo.entity.Festival;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FestivalRepository extends JpaRepository<Festival, Long> {

    Festival findByFestivalName(String name);
}
