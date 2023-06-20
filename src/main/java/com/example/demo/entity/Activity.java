package com.example.demo.entity;

import com.example.demo.constant.Authority;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity(name = "t_activity")
@Getter @Setter @ToString
@Table(name = "t_activity")
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "activity_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "festival_id")
    private Festival festival;

    @Column(name = "activity_name", unique = true)
    private String activityName;

    @Column(name = "activity_desc", unique = true)
    private String activityDesc;

    @Column(name = "activity_price")
    @ColumnDefault("0")
    private BigDecimal activityPrice;

    @Column(name = "activity_start_date")
    private Date activityStartDate;

    @Column(name = "activity_end_date")
    private Date activityEndDate;

    @Column(name = "activity_quantity")
    @ColumnDefault("0")
    private int activityQuantity;
}
