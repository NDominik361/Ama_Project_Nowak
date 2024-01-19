package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Null;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Builder
@AllArgsConstructor
@Entity
@Table(name = "crm_contact")
public class Contact extends Base {

    @Column(name = "vorname")
    private String vorname;

    @Column(name = "nachname")
    private String nachname;

    @Column(name = "vip")
    private boolean vip;

    @Column(name = "anrede")
    private String anrede;

    @Column(name = "akad_titel")
    private String akadTitel;

    @Column(name = "organization")
    private Long organization;

    @Column(name = "telefon_nr")
    private String telefonNr;

    @Column(name = "adresse")
    private String adresse;

    @Column(name = "foto")
    private String foto;

    @ManyToMany(mappedBy = "contacts")
    private Set<Event> events = new HashSet<>();

    // Getters and setters for all fields

    // Default constructor for JPA
    public Contact() {
    }


    public String getVorname() {
        return vorname;
    }

    public void setVorname(String vorname) {
        this.vorname = vorname;
    }

    public Set<Event> getEvents() {
        return events;
    }

    public void setEvents(Set<Event> events) {
        this.events = events;
    }

    public String getNachname() {
        return nachname;
    }

    public void setNachname(String nachname) {
        this.nachname = nachname;
    }

    public boolean isVip() {
        return vip;
    }

    public void setVip(boolean vip) {
        this.vip = vip;
    }

    public String getAnrede() {
        return anrede;
    }

    public void setAnrede(String anrede) {
        this.anrede = anrede;
    }

    public String getAkadTitel() {
        return akadTitel;
    }

    public void setAkadTitel(String akadTitel) {
        this.akadTitel = akadTitel;
    }

    public Long getOrganization() {
        return organization;
    }

    public void setOrganization(Long organization) {
        this.organization = organization;
    }


    public String getTelefonNr() {
        return telefonNr;
    }

    public void setTelefonNr(String telefonNr) {
        this.telefonNr = telefonNr;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }


    // Additional constructors, business logic, and other methods as needed
}
