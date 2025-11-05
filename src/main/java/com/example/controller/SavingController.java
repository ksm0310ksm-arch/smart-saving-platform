// SavingController.java
package com.example.controller;

import com.example.dto.SavingDTO;
import com.example.service.SavingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/savings")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // ✅ 프론트 허용
public class SavingController {

    private final SavingService savingService;

    // ✅ 필터 + 정렬 기능 지원
    @GetMapping
    public List<SavingDTO> getSavings(
            @RequestParam(required = false) String bankName,
            @RequestParam(required = false) Double minRate,
            @RequestParam(required = false) Integer maxPeriod,
            @RequestParam(required = false) String sortBy
    ) {
        return savingService.filterAndSort(bankName, minRate, maxPeriod, sortBy);
    }

    // ✅ 단일 상품 상세 조회
    @GetMapping("/{id}")
    public SavingDTO getSavingById(@PathVariable Long id) {
        return savingService.findById(id);
    }
}
