package com.example.smart.service;

import com.example.smart.model.Product;
import com.example.smart.model.UserSurvey;
import com.example.smart.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendService {

    private final ProductRepository productRepository;

    public List<Product> getRecommendedProducts(UserSurvey survey) {

        List<Product> all = productRepository.findAll();

        return all.stream()
                .sorted((a, b) -> score(b, survey) - score(a, survey))
                .limit(3)
                .toList();
    }

    private int score(Product p, UserSurvey s) {
        int score = 0;

        // 기간이 survey와 가까울수록 높은 점수
        score -= Math.abs(p.getPeriod() - s.getSavingPeriod());

        // 금리는 높을수록 점수 +
        score += (int)(p.getInterestRate() * 10);

        return score;
    }
}
