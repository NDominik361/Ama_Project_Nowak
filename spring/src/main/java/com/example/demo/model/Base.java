package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@MappedSuperclass
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Filter(name = Base.DELETED_FILTER, condition = "deleted = :deleted")
public class Base {
    public static final String DELETED_FILTER = "FILTER_DELETED";
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="deleted")
    private boolean deleted;

    @Version
    @Column(name="version")
    private Long version;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="created")
    @JsonIgnore
    private LocalDateTime created;

    @Column(name="created_by")
    @JsonIgnore
    private String createdBy;

    @Column(name="changed")
    @JsonIgnore
    private LocalDateTime changed;

    @Column(name="changed_by")
    @JsonIgnore
    private String changedBy;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getChanged() {
        return changed;
    }

    public void setChanged(LocalDateTime changed) {
        this.changed = changed;
    }

    public String getChangedBy() {
        return changedBy;
    }

    public void setChangedBy(String changedBy) {
        this.changedBy = changedBy;
    }

    @PrePersist
    public void prePersist(){
        deleted = false;
        created = LocalDateTime.now();
        changed = created;
        createdBy = "Test";
        changedBy = createdBy;
    }

    @PreUpdate
    public void preUpdate(){
        changed = LocalDateTime.now();
        changedBy = "Test";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Base that = (Base) o;

        if (getId() != null ? !getId().equals(that.getId()) : that.getId() != null) return false;
        return getVersion() != null ? getVersion().equals(that.getVersion()) : that.getVersion() == null;
    }

    @Override
    public int hashCode() {
        int result = getId() != null ? getId().hashCode() : 0;
        result = 31 * result + (getVersion() != null ? getVersion().hashCode() : 0);
        return result;
    }

    @JsonIgnore
    public String[] getIgnoredPropertiesForCopy() {
        return new String[]{"id", "changed", "changedBy", "created", "createdBy"};
    }
}
