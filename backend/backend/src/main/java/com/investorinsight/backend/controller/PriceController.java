package com.investorinsight.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping("/api/prices")
@CrossOrigin(origins = "*")
public class PriceController {

    private final RestTemplate restTemplate = new RestTemplate();
    private final Random random = new Random();

    @GetMapping("/{type}/{symbol}")
    public Map<String, Object> getPrice(@PathVariable String type, @PathVariable String symbol) {
        Map<String, Object> result = new HashMap<>();

        try {
            // 🪙 If crypto → fetch live price from CoinGecko
            if (type.equalsIgnoreCase("crypto")) {
                String url = "https://api.coingecko.com/api/v3/simple/price?ids=" + symbol.toLowerCase() + "&vs_currencies=inr";
                Map<String, Object> response = restTemplate.getForObject(url, Map.class);

                if (response != null && response.containsKey(symbol.toLowerCase())) {
                    Map<String, Object> priceData = (Map<String, Object>) response.get(symbol.toLowerCase());
                    double price = ((Number) priceData.get("inr")).doubleValue();
                    result.put("symbol", symbol);
                    result.put("type", "crypto");
                    result.put("price", price);
                    result.put("source", "CoinGecko Live");
                    return result;
                } else {
                    result.put("symbol", symbol);
                    result.put("type", "crypto");
                    result.put("price", 0);
                    result.put("source", "CoinGecko — Not Found");
                    return result;
                }
            }

            // 📈 If not crypto → simulate live price (random variation)
            else {
                // simulate ±(₹5–₹20) difference
                double randomVariation = 5 + (15 * random.nextDouble()); // 5 to 20
                boolean increase = random.nextBoolean();

                double basePrice = 100 + random.nextDouble() * 900; // fake base for realism
                double finalPrice = increase ? basePrice + randomVariation : basePrice - randomVariation;

                result.put("symbol", symbol);
                result.put("type", type);
                result.put("price", Math.round(finalPrice * 100.0) / 100.0);
                result.put("variation", (increase ? "+" : "-") + Math.round(randomVariation * 100.0) / 100.0);
                result.put("source", "Simulated Live Price");
                return result;
            }

        } catch (Exception e) {
            result.put("error", "Failed to fetch price for " + symbol + ": " + e.getMessage());
            return result;
        }
    }
}
