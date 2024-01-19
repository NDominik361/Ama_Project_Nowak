package com.example.demo.service;

import com.example.demo.model.Contact;
import com.example.demo.model.Event;
import com.example.demo.model.Organization;
import com.example.demo.repository.BaseRepo;
import com.example.demo.repository.ContactRepo;
import com.example.demo.repository.EventRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@ComponentScan
@Service
public class EventService {

    @Autowired
    private EventRepo eventRepo;

    @Autowired
    private ContactRepo contactRepo;

    @Autowired
    private BaseRepo baseRepo;

    @Autowired
    private EntityManager entityManager;

    public List<Event> findAll() {
        return eventRepo.findAll();
    }

    public Event findById(Long id) {
        Optional<Event> event = eventRepo.findById(id);
        return event.orElse(null);
    }

    @Transactional
    public Event createNewEvent(Event event) {
        return eventRepo.save(event);
    }

    @Transactional
    public void addContactToEvent(Long eventId, List<Long> contactIds) {
        Event eventOptional = eventRepo.findById(eventId).orElseThrow(() -> new EntityNotFoundException("Table not found"));
        for (Long contactId : contactIds){
            Contact contactOptional = contactRepo.findById(contactId).orElseThrow(() -> new EntityNotFoundException("Table not found"));

            eventOptional.getContacts().add(contactOptional);
            contactOptional.getEvents().add(eventOptional);

            eventRepo.save(eventOptional);
            contactRepo.save(contactOptional);
        }
    }
    @Transactional
    public Event updateEvent(Long id, Event eventDetails) {

        Event byId = eventRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Event with id " + id + " could not be found"));

        BeanUtils.copyProperties(eventDetails, byId, eventDetails.getIgnoredPropertiesForCopy());

        return eventRepo.save(byId);

    }

    public void deleteContactsByEvent(Long eventId, List<Long> contactIds) {
        Event eventOptional = eventRepo.findById(eventId).orElseThrow(() -> new EntityNotFoundException("Table not found"));
        for (Long contactId : contactIds) {
            Contact contactOptional = contactRepo.findById(contactId).orElseThrow(() -> new EntityNotFoundException("Contact not found"));

            eventOptional.getContacts().remove(contactOptional);
            contactOptional.getEvents().remove(eventOptional);
            contactRepo.save(contactOptional);
        }
        eventRepo.save(eventOptional);

    }

    public void deleteEvent(Long id) {
        baseRepo.setDeletedFlag(id, Event.class);
    }

    public List<Contact> findContactsByEvent(Long eventId) {
        return eventRepo.findAllByEventId(eventId);
    }

}
