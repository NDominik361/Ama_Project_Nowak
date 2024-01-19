package com.example.demo.repository;

import com.example.demo.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.List;

@Repository
public interface ContactRepo extends JpaRepository<Contact, Long> {

    // Get all contacts
    @Query("SELECT c FROM Contact c where c.deleted = false order by c.nachname")
    List<Contact> findAll();

    @Query("SELECT c FROM Contact c left join Organization o on o.id = c.organization WHERE c.deleted = false ORDER BY c.nachname")
    List<Contact> findAllWithOrganization();

    // Get contact by id
    Optional<Contact> findById(Long id);

    // Get all contacts by event
    @Query("SELECT c FROM Contact c WHERE c.id = :eventId AND c.deleted = false")
    List<Contact> findAllByEventId(Long eventId);

    // Update contact
    @Modifying
    @Transactional
    @Query("UPDATE Contact c SET c.vorname = :vorname, c.nachname = :nachname, c.vip = :vip, c.anrede = :anrede, c.akadTitel = :akadTitel, c.organization = :organization, c.telefonNr = :telefonNr, c.adresse = :adresse WHERE c.id = :id")
    void updateContact(Long id, String vorname, String nachname, boolean vip, String anrede, String akadTitel, String organization, String telefonNr, String adresse);

    // Mark contact as deleted (soft delete)
}
