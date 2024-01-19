package com.example.demo.service;

import com.example.demo.model.Contact;
import com.example.demo.model.Event;
import com.example.demo.model.Organization;
import com.example.demo.repository.BaseRepo;
import com.example.demo.repository.OrganizationRepo;
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
public class OrganizationService {

    @Autowired
    private OrganizationRepo organizationRepo;

    @Autowired
    private BaseRepo baseRepo;

    public List<Organization> findAll() {
        return organizationRepo.findAll();
    }

    public Organization findById(Long id) {
        Optional<Organization> organization = organizationRepo.findById(id);
        return organization.orElse(null);
    }

    @Transactional
    public Organization createNewOrganization(Organization organization) {
        return organizationRepo.save(organization);
    }

    public Organization updateOrganization(Long id, Organization organizationDetails) {
        Organization byId = organizationRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Organization with id " + id + " could not be found"));

        BeanUtils.copyProperties(organizationDetails, byId, organizationDetails.getIgnoredPropertiesForCopy());

        return organizationRepo.save(byId);
    }



    public void deleteOrganization(Long id) {
        baseRepo.setDeletedFlag(id, Organization.class);
    }
}
