package com.example.smart.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "PRODUCT")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    @Column(nullable=false)
    private String bankName;

    @Column(nullable=false)
    private String productName;

    @Column(nullable=false)
    private Double interestRate;

    @Column(nullable=false)
    private Integer period;

    @Lob
    private String description;

    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date createdAt = new java.util.Date();
}

