package com.example.demo.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Getter @Setter @ToString
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "product_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "festival_id")
    private Festival festival;

    @Column(name = "product_name", nullable = false, unique = true)
    private String productName;

    @Column(name = "product_desc", nullable = false)
    private String productDesc;

    @Column(name = "product_price", nullable = false, columnDefinition = "0")
    private BigDecimal productPrice;

    @Column(name = "product_quantity", nullable = false, columnDefinition = "0")
    private String productQuantity;
}
