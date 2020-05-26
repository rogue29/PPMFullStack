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

    @GetMapping("/{id}")
    public ResponseEntity<?> getByProjectIdentifier(@PathVariable String id) {

        Project project = projectService.getByProjectIdentifier(id);
        return new ResponseEntity<>(project, HttpStatus.OK);
    }
}
