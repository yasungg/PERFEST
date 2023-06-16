package com.example.demo.entity;

import com.example.demo.constant.Authority;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Getter @Setter @ToString
@Table(name = "activity")
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "activity_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "festival_id")
    private Festival festival;

    @Column(name = "activity_name", nullable = false, unique = true)
    private String activityName;

    @Column(name = "activity_desc", nullable = false, unique = true)
    private String activityDesc;

    @Column(name = "activity_price", nullable = false, columnDefinition = "0")
    private BigDecimal activityPrice;

    @Column(name = "a_start_date")
    private Date aStartDate;

    @Column(name = "a_end_date")
    private Date aEndDate;

    @Column(name = "activity_quantity", columnDefinition = "0")
    private int activityQuantity;
}
