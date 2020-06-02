package io.rogue.spring.ppmrest.exception;

public class ProjectNotFoundExceptionResponse {
    private String projectIdentifier;

    public ProjectNotFoundExceptionResponse(String projectIdentifier) {
        this.projectIdentifier = projectIdentifier;
    }

    public String getProjectIdentifier() {
        return projectIdentifier;
    }
}
