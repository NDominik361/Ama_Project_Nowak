package com.example.demo.repository;

import com.example.demo.model.Base;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Repository
public class BaseRepo {
    @PersistenceContext
    private EntityManager em;

    @Transactional
    public <T extends Base> T setDeletedFlag(T entity){
        Objects.nonNull(entity);
        entity.setDeleted(true);
        T result = em.merge(entity);
        return result;
    }

    @Transactional
    public <T extends Base> List<T> setDeletedFlag(List<T> entityList){
        Objects.nonNull(entityList);
        return entityList.stream()
                .map(e -> setDeletedFlag(e))
                .toList();
    }

    @Transactional
    public <T extends  Base> Optional<T> setDeletedFlag(Long entityId, Class<T> entityClass){
        T entityToBeDeleted = em.find(entityClass, entityId);
        if (entityToBeDeleted!=null){
            return Optional.of(setDeletedFlag(entityToBeDeleted));
        } else {
            return Optional.empty();
        }
    }

}
