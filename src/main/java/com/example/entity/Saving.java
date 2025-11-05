package com.example.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "SAVING")
@Getter
@Setter
public class Saving {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long savingId;

    @Column(name = "BANK_NAME")
    private String bankName;

    @Column(name = "PRODUCT_NAME")
    private String productName;

    @Column(name = "INTEREST_RATE")
    private Double interestRate;

    @Column(name = "MAX_INTEREST_RATE")
    private Double maxInterestRate;

    @Column(name = "PERIOD")
    private Integer period;

    @Column(name = "CONDITION")
    private String condition;

    @Column(name = "LINK_URL")
    private String linkUrl;

    @Column(name = "CREATED_AT")
    private java.sql.Date createdAt;

    @Column(name = "UPDATED_AT")
    private java.sql.Date updatedAt;
}
