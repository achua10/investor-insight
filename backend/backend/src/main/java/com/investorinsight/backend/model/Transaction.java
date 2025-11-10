package com.investorinsight.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String assetName;
    private String type; // Buy or Sell
    private int quantity;
    private double price;
    private LocalDate date;

    public Transaction() {}

    public Transaction(String assetName, String type, int quantity, double price, LocalDate date) {
        this.assetName = assetName;
        this.type = type;
        this.quantity = quantity;
        this.price = price;
        this.date = date;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public String getAssetName() { return assetName; }
    public void setAssetName(String assetName) { this.assetName = assetName; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
}
