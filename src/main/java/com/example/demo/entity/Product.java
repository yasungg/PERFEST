package com.example.demo.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.jetbrains.annotations.NotNull;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Getter @Setter @ToString
@Table(name = "t_product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "festival_id")
    private Festival festival;

    @Column(name = "product_name",  unique = true)
    @NotNull
    private String productName;

    @Column(name = "product_desc")
    @NotNull
    private String productDesc;

    @Column(name = "product_price")
    @NotNull
    @ColumnDefault("0")
    private BigDecimal productPrice;

    @Column(name = "product_quantity")
    @NotNull
    @ColumnDefault("0")
    private String productQuantity;
}
