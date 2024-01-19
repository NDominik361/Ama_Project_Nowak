package com.example.demo.service;

import com.example.demo.model.Contact;
import com.example.demo.model.Event;
import com.example.demo.repository.BaseRepo;
import com.example.demo.repository.ContactRepo;
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
public class ContactService {

    @Autowired
    private ContactRepo contactRepo;

    @Autowired
    private BaseRepo baseRepo;

    public List<Contact> findAll() {
        return contactRepo.findAllWithOrganization();
    }

    public Contact findById(Long id) {
        Optional<Contact> contact = contactRepo.findById(id);
        return contact.orElse(null);
    }

    @Transactional
    public Contact createNewContact(Contact contact) {
        return contactRepo.save(contact);
    }


    @Transactional
    public Contact updateContact(Long id, Contact contactDetails) {

        Contact byId = contactRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Contact with id " + id + " could not be found"));

        BeanUtils.copyProperties(contactDetails, byId, contactDetails.getIgnoredPropertiesForCopy());

        return contactRepo.save(byId);

    }

    public void deleteContact(Long contactId) {
        baseRepo.setDeletedFlag(contactId, Contact.class);
    }
}
