package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class FestivalDTO {
    private String festivalName;
    private String festivalLocation;
    private String festivalDoro;
    private Date startDate;
    private Date endDate;
    private String festivalDesc;
    private String mainOrg;
    private String wedo;
    private String kyungdo;
    private String festivalTel;
    private String festivalImgLink;
}
