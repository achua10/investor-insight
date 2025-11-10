package com.investorinsight.backend.controller;

import com.investorinsight.backend.model.Holding;
import com.investorinsight.backend.repository.HoldingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ReportController {

    @Autowired
    private HoldingRepository holdingRepository;

    @GetMapping("/summary")
    public Map<String, Object> getInvestmentSummary() {
        List<Holding> holdings = holdingRepository.findAll();

        // Group by type
        Map<String, Double> investedByType = new LinkedHashMap<>();
        double totalInvested = 0;

        for (Holding h : holdings) {
            double invested = h.getQuantity() * h.getPurchasePrice();
            totalInvested += invested;
            investedByType.put(h.getType(),
                    investedByType.getOrDefault(h.getType(), 0.0) + invested);
        }

        // Calculate percentage share of each category
        Map<String, Object> typeBreakdown = new LinkedHashMap<>();
        for (Map.Entry<String, Double> entry : investedByType.entrySet()) {
            double percentage = (entry.getValue() / totalInvested) * 100;
            Map<String, Object> data = new LinkedHashMap<>();
            data.put("amount", entry.getValue());
            data.put("percentage", percentage);
            typeBreakdown.put(entry.getKey(), data);
        }

        Map<String, Object> report = new LinkedHashMap<>();
        report.put("totalInvested", totalInvested);
        report.put("categoryBreakdown", typeBreakdown);
        report.put("generatedAt", new Date());

        return report;
    }
}
