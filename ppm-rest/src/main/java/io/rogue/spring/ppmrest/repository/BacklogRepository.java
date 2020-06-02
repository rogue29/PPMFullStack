package io.rogue.spring.ppmrest.repository;

import io.rogue.spring.ppmrest.domain.Backlog;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BacklogRepository extends CrudRepository<Backlog, Long> {
    Backlog findBacklogByProjectIdentifier(String id);
}
