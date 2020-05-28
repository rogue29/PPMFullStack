package io.rogue.spring.ppmrest.web;

import io.rogue.spring.ppmrest.domain.Project;
import io.rogue.spring.ppmrest.service.MapValidationErrorsResultService;
import io.rogue.spring.ppmrest.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/project")
@CrossOrigin
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @Autowired
    private MapValidationErrorsResultService mapValidationErrorsResultService;

    @PostMapping("")
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result) {

        if(result.hasErrors()) return mapValidationErrorsResultService.mapValidationResultService(result);

        Project createdProject = projectService.saveOrUpdateProject(project);
        return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<?> getByProjectIdentifier(@PathVariable String projectId) {

        Project project = projectService.getByProjectIdentifier(projectId);
        return new ResponseEntity<>(project, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> deleteByProjectIdentifier(@PathVariable String projectId) {
        projectService.deleteByProjectIdentifier(projectId);
        return new ResponseEntity<String>("Project deleted.", HttpStatus.ACCEPTED);
    }
}
