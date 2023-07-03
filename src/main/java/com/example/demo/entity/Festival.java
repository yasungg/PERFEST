package com.example.demo.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter @Setter @ToString
@Table(name = "t_festival")

public class Festival {
    @Id
    @Column(name = "festival_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, name = "festival_name")
    private String festivalName;

    @Column(name = "festival_location")
    private String festivalLocation;

    @Column(name = "festival_doro")
    private String festivalDoro;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "description")
    private String festivalDesc;

    @Column(name = "main_org")
    private String mainOrg;

    @Column(name = "wedo")
    private String wedo;

    @Column(name = "kyungdo")
    private String kyungdo;

    @Column(name = "festival_tel")
    private String festivalTel;

    @Column(name = "festival_img")
    private String festivalImgLink;

    @Builder
    public Festival (String festivalName, String festivalLocation, String festivalDoro, Date startDate, Date endDate, String festivalDesc, String mainOrg, String wedo, String kyungdo, String festivalTel, String festivalImgLink) {
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
        this.festivalImgLink = festivalImgLink;
    }
}
