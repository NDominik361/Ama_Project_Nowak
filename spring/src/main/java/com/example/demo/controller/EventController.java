package com.example.demo.controller;

import com.example.demo.model.Contact;
import com.example.demo.model.Event;
import com.example.demo.model.Organization;
import com.example.demo.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Optional;

@ComponentScan
@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventService.findAll();
        return ResponseEntity.ok(events);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        Event event = eventService.findById(id);
        return ResponseEntity.ok(event);
    }

    @PostMapping
    public Event createEvent(@Validated @RequestBody Event event) {
        System.out.println("createContact method called with input: " + event);
        return eventService.createNewEvent(event);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Event> editEvent(@PathVariable Long id, @RequestBody Event eventDetails) {
        Event updatedEvent = eventService.updateEvent(id, eventDetails);
        return ResponseEntity.ok(updatedEvent);
    }


    @GetMapping("/contacts/{eventId}")
    public ResponseEntity<List<Contact>> getContactsByEvent(@PathVariable Long eventId) {
        List<Contact> contacts = eventService.findContactsByEvent(eventId);
        return ResponseEntity.ok(contacts);
    }


    @PostMapping("/{eventId}/contacts")
    public ResponseEntity<Void> addContactToEvent(@PathVariable Long eventId, @RequestBody List<Long> contactIds) {
        eventService.addContactToEvent(eventId, contactIds);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{eventId}/contacts")
    public ResponseEntity<Void> deleteContactToEvent(@PathVariable Long eventId, @RequestBody List<Long> contactIds) {
        System.out.println(eventId +" "+ contactIds);
        eventService.deleteContactsByEvent(eventId, contactIds);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> markEventAsDeleted(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }

}
