package io.rogue.spring.ppmrest.service;

import io.rogue.spring.ppmrest.domain.Project;
import io.rogue.spring.ppmrest.exception.ProjectIdException;
import io.rogue.spring.ppmrest.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public Project saveOrUpdateProject(Project project) {

        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            return projectRepository.save(project);
        } catch (Exception ex) {
            throw new ProjectIdException("Project ID '" + project.getProjectIdentifier() + "' already exists");
        }
    }
}
