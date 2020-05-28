package io.rogue.spring.ppmrest.service;

import io.rogue.spring.ppmrest.domain.Project;
import io.rogue.spring.ppmrest.exception.ProjectIdException;
import io.rogue.spring.ppmrest.repository.ProjectRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    public static final Logger log = LoggerFactory.getLogger(ProjectService.class);

    @Autowired
    private ProjectRepository projectRepository;

    public Project saveOrUpdateProject(Project project) {
        log.info(project.toString());
        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            return projectRepository.save(project);
        } catch (Exception ex) {
            throw new ProjectIdException("Project ID '" + project.getProjectIdentifier() + "' already exists");
        }
    }

    public Project getByProjectIdentifier(String projectId) {

        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if (project == null) {
            throw new ProjectIdException("Project ID '" + projectId + "'does not exist.");
        }
        return project;
    }

    public Iterable<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public void deleteByProjectIdentifier(String projectId) {
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if (project == null) {
            throw new ProjectIdException("Can not delete project '" + projectId + "'. Project does not exist.");
        }
        log.info(project.toString());
        projectRepository.delete(project);
    }
}
