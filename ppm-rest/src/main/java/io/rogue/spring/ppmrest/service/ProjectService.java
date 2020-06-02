package io.rogue.spring.ppmrest.service;

import io.rogue.spring.ppmrest.domain.Backlog;
import io.rogue.spring.ppmrest.domain.Project;
import io.rogue.spring.ppmrest.exception.ProjectIdException;
import io.rogue.spring.ppmrest.repository.BacklogRepository;
import io.rogue.spring.ppmrest.repository.ProjectRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    public static final Logger LOG = LoggerFactory.getLogger(ProjectService.class);

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BacklogRepository backlogRepository;

    public Project saveOrUpdateProject(Project project) {
        LOG.info(project.toString());
        try {
            String projectIdentifier = project.getProjectIdentifier().toUpperCase();
            project.setProjectIdentifier(projectIdentifier);
            if (project.getId() == null) {
                LOG.info("Creating backlog for project - " + projectIdentifier);
                Backlog backlog = new Backlog();
                backlog.setProjectIdentifier(projectIdentifier);
                backlog.setProject(project);
                project.setBacklog(backlog);
            } else {
                LOG.info("Project update request for project Id - " + project.getId());
                project.setBacklog(backlogRepository.findBacklogByProjectIdentifier(projectIdentifier));
            }
            return projectRepository.save(project);
        } catch (Exception ex) {
            throw new ProjectIdException("Project ID '" + project.getProjectIdentifier() + "' already exists");
        }
    }

    public Project getByProjectIdentifier(String projectId) {

        Project project = projectRepository.findProjectByProjectIdentifier(projectId.toUpperCase());
        if (project == null) {
            throw new ProjectIdException("Project ID '" + projectId + "'does not exist.");
        }
        return project;
    }

    public Iterable<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public void deleteByProjectIdentifier(String projectId) {
        Project project = projectRepository.findProjectByProjectIdentifier(projectId.toUpperCase());
        if (project == null) {
            throw new ProjectIdException("Can not delete project '" + projectId + "'. Project does not exist.");
        }
        LOG.info(project.toString());
        projectRepository.delete(project);
    }
}
