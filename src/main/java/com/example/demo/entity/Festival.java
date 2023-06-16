package com.example.demo.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter @Setter @ToString
@Table(name = "festival")
public class Festival {
    @Id
    @Column(name = "festival_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, name = "festival_name")
    private String festivalName;

    @Column(name = "festival_location", nullable = false)
    private String festivalLocation;

    @Column(name = "start_date", nullable = false)
    private Date startDate;

    @Column(name = "end_date", nullable = false)
    private Date endDate;

    @Column(name = "description", nullable = false)
    private String festivalDesc;

    @Column(name = "main_org", nullable = false)
    private String mainOrg;

    @Column(name = "festival_tel", nullable = false)
    private String festivalTel;

    @Column(name = "festival_img", nullable = false)
    private String festivalImgLink;


}
