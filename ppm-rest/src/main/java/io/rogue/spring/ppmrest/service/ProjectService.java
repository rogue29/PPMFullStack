package io.rogue.spring.ppmrest.service;

import io.rogue.spring.ppmrest.domain.Project;
import io.rogue.spring.ppmrest.repository.ProjectRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    private static final Logger log = LoggerFactory.getLogger(ProjectService.class);

    @Autowired
    private ProjectRepository projectRepository;

    public Project saveOrUpdateProject(Project project) {
        log.info(project.toString());
        return projectRepository.save(project);
    }
}
