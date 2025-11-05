package com.example.smart.service;

import com.example.smart.dto.SavingDTO;
import com.example.smart.entity.Saving;
import com.example.smart.repository.SavingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SavingService {

    private final SavingRepository savingRepository; // ✅ 이것만 있으면 충분!

    // ✅ 전체 적금 목록 조회
    public List<SavingDTO> findAll() {
        return savingRepository.findAll()
                .stream()
                .map(SavingDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // ✅ 필터 + 정렬 기능
    public List<SavingDTO> filterAndSort(String bankName, Double minRate, Integer maxPeriod, String sortBy) {
        List<Saving> savings = savingRepository.findAll();

        // 필터링
        if (bankName != null && !bankName.isEmpty()) {
            savings = savings.stream()
                    .filter(s -> s.getBankName().contains(bankName))
                    .collect(Collectors.toList());
        }
        if (minRate != null) {
            savings = savings.stream()
                    .filter(s -> s.getInterestRate() >= minRate)
                    .collect(Collectors.toList());
        }
        if (maxPeriod != null) {
            savings = savings.stream()
                    .filter(s -> s.getPeriod() <= maxPeriod)
                    .collect(Collectors.toList());
        }

        // 정렬
        if (sortBy != null) {
            switch (sortBy) {
                case "rate":
                    savings.sort(Comparator.comparing(Saving::getInterestRate).reversed());
                    break;
                case "period":
                    savings.sort(Comparator.comparing(Saving::getPeriod));
                    break;
            }
        }

        return savings.stream().map(SavingDTO::fromEntity).collect(Collectors.toList());
    }

    // ✅ 개별 상품 조회
    public SavingDTO findById(Long id) {
        return savingRepository.findById(id)
                .map(SavingDTO::fromEntity)
                .orElseThrow(() -> new RuntimeException("해당 ID의 상품이 없습니다."));
    }
}
