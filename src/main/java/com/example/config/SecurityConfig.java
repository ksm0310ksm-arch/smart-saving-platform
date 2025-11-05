package com.example.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // React 연동 시 CSRF 비활성화
                .cors(cors -> {}) // WebConfig의 CORS 설정 사용
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/**").permitAll() // ✅ API는 로그인 없이 접근 허용
                        .anyRequest().permitAll() // 다른 모든 요청도 허용
                )
                .formLogin(form -> form.disable()) // 기본 로그인 폼 비활성화
                .httpBasic(basic -> basic.disable()); // Basic Auth 비활성화

        return http.build();
    }
}

