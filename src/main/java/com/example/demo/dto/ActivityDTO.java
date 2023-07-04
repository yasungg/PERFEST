package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Getter @Setter
public class ActivityDTO {
    private String activityName;
    private String activityDesc;
    private Date startDate;
    private Date endDate;

}
