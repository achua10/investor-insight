package com.investorinsight.backend.controller;

import com.investorinsight.backend.model.Holding;
import com.investorinsight.backend.repository.HoldingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/holdings")
@CrossOrigin(origins = "*")
public class HoldingController {

    @Autowired
    private HoldingRepository holdingRepository;

    // ✅ Get all holdings
    @GetMapping
    public List<Holding> getAllHoldings() {
        return holdingRepository.findAll();
    }

    // ✅ Add a new holding
    @PostMapping
    public Holding addHolding(@RequestBody Holding holding) {
        return holdingRepository.save(holding);
    }

    // ✅ Update an existing holding
    @PutMapping("/{id}")
    public Holding updateHolding(@PathVariable Long id, @RequestBody Holding updated) {
        return holdingRepository.findById(id).map(h -> {
            h.setAssetName(updated.getAssetName());
            h.setType(updated.getType());
            h.setQuantity(updated.getQuantity());
            h.setPurchasePrice(updated.getPurchasePrice());
            h.setPurchaseDate(updated.getPurchaseDate());
            return holdingRepository.save(h);
        }).orElseThrow(() -> new RuntimeException("Holding not found"));
    }

    // ✅ Delete a holding
    @DeleteMapping("/{id}")
    public void deleteHolding(@PathVariable Long id) {
        holdingRepository.deleteById(id);
    }
}
