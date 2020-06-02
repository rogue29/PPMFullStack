package io.rogue.spring.ppmrest.web;

import io.rogue.spring.ppmrest.domain.ProjectTask;
import io.rogue.spring.ppmrest.service.MapValidationErrorsResultService;
import io.rogue.spring.ppmrest.service.ProjectTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Iterator;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/backlog")
public class BacklogController {
    @Autowired
    private ProjectTaskService projectTaskService;

    @Autowired
    private MapValidationErrorsResultService errorsResultService;

    @PostMapping("/{projectIdentifier}")
    public ResponseEntity<?> createProjectTask(@Valid @RequestBody ProjectTask projectTask, BindingResult result,
                                               @PathVariable String projectIdentifier) {

        if(result.hasErrors()) return errorsResultService.mapValidationResultService(result);

        ProjectTask createdTask = projectTaskService.addProjectTask(projectIdentifier.toUpperCase(), projectTask);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    @GetMapping("/{projectIdentifier}")
    public List<ProjectTask> getBacklog(@PathVariable String projectIdentifier) {
        return projectTaskService.getBacklogByProjectIdentifier(projectIdentifier.toUpperCase());
    }

    @GetMapping("/{projectIdentifier}/{projectSequence}")
    public ResponseEntity<?> getProjectTaskByProjectSequence(@PathVariable String projectIdentifier, @PathVariable String projectSequence) {
        ProjectTask projectTask = projectTaskService.findProjectTaskByProjectSequence(projectIdentifier.toUpperCase(), projectSequence.toUpperCase());
        return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
    }

    @PatchMapping("/{projectIdentifier}/{projectSequence}")
    public ResponseEntity<?> updateProjectTask(@Valid @RequestBody ProjectTask projectTask, BindingResult result,
                                               @PathVariable String projectIdentifier, @PathVariable String projectSequence) {
        if(result.hasErrors()) return errorsResultService.mapValidationResultService(result);
        ProjectTask updatedProjectTask = projectTaskService.updateProjectTaskByProjectSequence(projectTask, projectIdentifier.toUpperCase(), projectSequence.toUpperCase());
        return new ResponseEntity<ProjectTask>(updatedProjectTask, HttpStatus.OK);
    }

    @DeleteMapping("/{projectIdentifier}/{projectSequence}")
    public ResponseEntity<?> deleteProjectTask(@PathVariable String projectIdentifier, @PathVariable String projectSequence) {
        projectTaskService.deleteProjectTask(projectIdentifier.toUpperCase(), projectSequence.toUpperCase());
        return new ResponseEntity<String>("Project Task '" + projectSequence + "' deleted successfully", HttpStatus.OK);
    }
}
