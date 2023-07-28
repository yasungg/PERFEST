package com.example.demo.repository;

import com.example.demo.entity.Calender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CalenderRepository extends JpaRepository<Calender, Long> {
    List<Calender> findByMemberId(Long memberId);
    Optional<Calender> findById(Long id);

    long countByFestivalId(Long id);
}
