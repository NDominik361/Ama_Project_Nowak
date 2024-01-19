package com.example.demo.repository;

import com.example.demo.model.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrganizationRepo extends JpaRepository<Organization, Long> {

    // Get all organizations
    @Query("SELECT o FROM Organization o WHERE o.deleted = false order by o.name")
    List<Organization> findAll();

    // Get organization by id
    Optional<Organization> findById(Long id);


    @Modifying
    @Transactional
    @Query("UPDATE Organization o SET o.name = :name, o.address = :address, o.region = :region, o.country = :country, o.uid = :uid WHERE o.id = :id")
    void updateOrganization(Long id, String name, String address, String region, String country, String uid);
    // Update organization

}
