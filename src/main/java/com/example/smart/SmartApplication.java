package com.example.smart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication(scanBasePackages = "com.example.smart") // ✅ smart 이하 전부 스캔
@EnableJpaRepositories(basePackages = "com.example.smart.repository") // ✅ repository 인식
@EntityScan(basePackages = "com.example.smart.entity") // ✅ entity 인식
public class SmartApplication {
    public static void main(String[] args) {
        SpringApplication.run(SmartApplication.class, args);
    }
}
