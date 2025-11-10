package com.investorinsight.backend.controller;

import com.investorinsight.backend.model.Holding;
import com.investorinsight.backend.repository.HoldingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin(origins = "*")
public class PortfolioController {

    @Autowired
    private HoldingRepository holdingRepository;

    @GetMapping
    public Map<String, Object> getPortfolioSummary() {
        List<Holding> holdings = holdingRepository.findAll();

        double totalInvested = 0;
        double estimatedCurrentValue = 0;

        // Mock: assume every holding increased by 10% in value
        for (Holding h : holdings) {
            double invested = h.getQuantity() * h.getPurchasePrice();
            totalInvested += invested;
            estimatedCurrentValue += invested * 1.10; // +10% growth
        }

        double profitLoss = estimatedCurrentValue - totalInvested;
        double profitPercent = totalInvested > 0 ? (profitLoss / totalInvested) * 100 : 0;

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("totalInvested", totalInvested);
        response.put("currentValue", estimatedCurrentValue);
        response.put("profitLoss", profitLoss);
        response.put("profitPercent", profitPercent);

        return response;
    }
}
