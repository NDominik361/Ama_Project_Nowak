package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import lombok.AllArgsConstructor;

import java.util.*;

@AllArgsConstructor
@Builder
@Entity
@Table(name = "crm_event")
public class Event extends Base {

    @Column(name = "title")
    private String title;

    @Column(name = "start")
    private Date start;

    @Column(name = "end")
    private Date end;

    @Column(name = "location")
    private String location;

    @Column(name = "address")
    private String address;

    @Column(name = "state")
    private String state;

    @Column(name = "type")
    private String type;

    @Column(name = "description")
    private String description;

    @Column(name = "foto")
    private String foto;

    @Column(name = "changes")
    private List<String> changes;

    @ManyToMany
    @JoinTable(
            name = "contact_event",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "contact_id"))
    @JsonBackReference
    private Set<Contact> contacts = new HashSet<>();


    // Getters and setters
    public Event() {
        this.title = null;
        this.start = null;
        this.end = null;
        this.location = null;
        this.state = null;
        this.type = null;
        this.description = null;
        this.changes = new ArrayList<>();
        this.foto = null;
        this.contacts = new HashSet<>();
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }



    public void setContacts(Set<Contact> contacts) {
        this.contacts = contacts;
    }

    public Set<Contact> getContacts() {
        return contacts;
    }

    public Date getEnd() {
        return end;
    }
    public void setEnd(Date end) {
        this.end = end;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getAddress() {
        return address;
    }

    public void setAdderss(String state) {
        this.address = address;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    public void setFoto(String foto) {
        this.foto = foto;
    }

    public String getFoto() {
        return foto;
    }
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getChanges() {
        return changes;
    }

    public void setChanges(List<String> changes) {
        this.changes = changes;
    }
}
