package io.rogue.spring.ppmrest.repository;

import io.rogue.spring.ppmrest.domain.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {
    Project findProjectByProjectIdentifier(String id);
}
