package com.example.demo.repository;

import com.example.demo.dto.ActivityListDTO;
import com.example.demo.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {

    @Query(value = "SELECT new com.example.demo.dto.ActivityListDTO (a.activityName, a.activityDesc, a.activityPrice, a.activityQuantity) from Activity a WHERE festival.id = :festivalId")
    List<ActivityListDTO> findByFestivalId(@Param("festivalId") Long festivalId);
}
