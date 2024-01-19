package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.util.List;

@Entity
@Table(name = "crm_organization")
public class Organization extends Base {

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "region")
    private String region;

    @Column(name = "country")
    private String country;

    @Column(name = "uid")
    private String uid; // tax id

    @Column(name = "foto")
    private String foto;

    @Column(name = "url")
    private String url;


    // Constructors, getters, and setters


    public Organization() {
        this.name = null;
        this.address = null;
        this.region = null;
        this.country = null;
        this.uid = null;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }


    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }
}
