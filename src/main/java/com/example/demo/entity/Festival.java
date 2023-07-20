package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter @Setter @ToString
@NoArgsConstructor(force = true)
@Table(name = "t_festival")
public class Festival {
    @Id
    @Column(name = "festival_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonProperty("fstvlNm")
    @Column(name = "festival_name")
    private String festivalName;

    @JsonProperty("lnmadr")
    @Column(name = "festival_location")
    private String festivalLocation;

    @JsonProperty("rdnmadr")
    @Column(name = "festival_doro")
    private String festivalDoro;

    @JsonProperty("fstvlStartDate")
    @Column(name = "start_date")
    private Date startDate;

    @JsonProperty("fstvlEndDate")
    @Column(name = "end_date")
    private Date endDate;

    @JsonProperty("fstvlCo")
    @Column(name = "description")
    private String festivalDesc;

    @JsonProperty("auspcInstt")
    @Column(name = "main_org")
    private String mainOrg;

    @JsonProperty("latitude")
    @Column(name = "wedo")
    private String wedo;

    @JsonProperty("longitude")
    @Column(name = "kyungdo")
    private String kyungdo;

    @JsonProperty("phoneNumber")
    @Column(name = "festival_tel")
    private String festivalTel;

    @Column(name = "festival_img")
    private String festivalImg;

    @Builder
    public Festival (String festivalName, String festivalLocation, String festivalDoro, Date startDate, Date endDate, String festivalDesc, String mainOrg, String wedo, String kyungdo, String festivalTel, String festivalImg) {
        this.festivalName = festivalName;
        this.festivalLocation = festivalLocation;
        this.festivalDoro = festivalDoro;
        this.startDate = startDate;
        this.endDate = endDate;
        this.festivalDesc = festivalDesc;
        this.mainOrg = mainOrg;
        this.wedo = wedo;
        this.kyungdo = kyungdo;
        this.festivalTel = festivalTel;
        this.festivalImg = festivalImg;
    }
}
