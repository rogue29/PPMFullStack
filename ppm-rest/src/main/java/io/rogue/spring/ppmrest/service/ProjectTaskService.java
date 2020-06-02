package io.rogue.spring.ppmrest.service;

import io.rogue.spring.ppmrest.domain.Backlog;
import io.rogue.spring.ppmrest.domain.Project;
import io.rogue.spring.ppmrest.domain.ProjectTask;
import io.rogue.spring.ppmrest.exception.ProjectIdException;
import io.rogue.spring.ppmrest.exception.ProjectNotFoundException;
import io.rogue.spring.ppmrest.repository.BacklogRepository;
import io.rogue.spring.ppmrest.repository.ProjectRepository;
import io.rogue.spring.ppmrest.repository.ProjectTaskRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.Iterator;
import java.util.List;

@Service
public class ProjectTaskService {

    public static final Logger LOG = LoggerFactory.getLogger(ProjectTaskService.class);

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
        Backlog backlog = backlogRepository.findBacklogByProjectIdentifier(projectIdentifier);
        if (backlog == null) {
            throw new ProjectNotFoundException("Project ID '" + projectIdentifier + "' not found.");
        }
        projectTask.setBacklog(backlog);
        projectTask.setProjectIdentifier(projectIdentifier);
        Integer ptSequence = backlog.getPTSequence();
        backlog.setPTSequence(++ptSequence);
        projectTask.setProjectSequence(projectIdentifier + "-" + ptSequence);
        if (projectTask.getPriority() == null || projectTask.getPriority()==0) {
            projectTask.setPriority(3);
        }
        if (projectTask.getStatus() == null || projectTask.getStatus() == "") {
            projectTask.setStatus("TODO");
        }
        return projectTaskRepository.save(projectTask);
    }

    public List<ProjectTask> getBacklogByProjectIdentifier(String projectIdentifier) {
        if (projectRepository.findProjectByProjectIdentifier(projectIdentifier) == null) {
            throw new ProjectNotFoundException("Project with ID '" + projectIdentifier + "' not found.");
        }
        LOG.info("Get backlog by identifier - " + projectIdentifier);
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(projectIdentifier);
    }

    public ProjectTask findProjectTaskByProjectSequence(String projectIdentifier, String projectSequence) {
        Project project = projectRepository.findProjectByProjectIdentifier(projectIdentifier);
        if (project == null) {
            throw new ProjectNotFoundException("Project with ID '" + projectIdentifier + "' not found.");
        }

        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(projectSequence);
        if (projectTask == null) {
            throw new ProjectNotFoundException("Project Task with ID '" + projectSequence + "' not found.");
        }

        if (!projectIdentifier.equals(projectTask.getProjectIdentifier())) {
            throw new ProjectNotFoundException("Project Task with ID '" + projectSequence + "' does not belong to Project '" + projectIdentifier + "'.");
        }

        return projectTask;
    }

    public ProjectTask updateProjectTaskByProjectSequence(ProjectTask projectTask, String projectIdentifier, String projectSequence) {
        ProjectTask oldProjectTask = findProjectTaskByProjectSequence(projectIdentifier, projectSequence);
        if (projectSequence.equals(oldProjectTask.getProjectSequence())) {
            oldProjectTask = projectTask;
        }

        return projectTaskRepository.save(oldProjectTask);
    }


    public void deleteProjectTask(String projectIdentifier, String projectSequence) {
        ProjectTask projectTask = findProjectTaskByProjectSequence(projectIdentifier, projectSequence);
        projectTaskRepository.delete(projectTask);
    }
}
