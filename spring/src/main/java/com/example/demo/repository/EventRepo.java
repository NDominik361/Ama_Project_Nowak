package com.example.demo.repository;

import com.example.demo.model.Contact;
import com.example.demo.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Date;

@Repository
public interface EventRepo extends JpaRepository<Event, Long> {

    // Get all events
    @Query("SELECT e FROM Event e WHERE e.deleted = false order by e.title")
    List<Event> findAll();

    // Get event by id
    Optional<Event> findById(Long id);


    // Update event
    @Modifying
    @Transactional
    @Query("UPDATE Event e SET e.title = :title, e.start = :start, e.end = :end, e.location = :location, e.state = :state, e.type = :type, e.description = :description, e.changes = :changes WHERE e.id = :id")
    void updateEvent(Long id, String title, Date start, Date end, String location, String state, String type, String description, List<String> changes);
    // Additional methods can be added here

    @Query("SELECT c FROM Contact c JOIN c.events e WHERE e.id = :eventId ")
    List<Contact> findAllByEventId(Long eventId);

}
