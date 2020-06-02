package io.rogue.spring.ppmrest.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.validation.annotation.Validated;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Validated
public class Backlog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private Integer PTSequence = 0;
    private String projectIdentifier;

    //oneToone with project
    @OneToOne()
    @JoinColumn(nullable = false)
    @JsonIgnore
    private Project project;

    //oneToMany with PTs
    @OneToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER, mappedBy = "backlog", orphanRemoval = true)
    private List<ProjectTask> projectTasks = new ArrayList<>();

    public Backlog() {
    }

    public Backlog(Integer PTSequence, String projectIdentifier) {
        this.PTSequence = PTSequence;
        this.projectIdentifier = projectIdentifier;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public Integer getPTSequence() {
        return PTSequence;
    }

    public void setPTSequence(Integer PTSequence) {
        this.PTSequence = PTSequence;
    }

    public String getProjectIdentifier() {
        return projectIdentifier;
    }

    public void setProjectIdentifier(String projectIdentifier) {
        this.projectIdentifier = projectIdentifier;
    }

    public List<ProjectTask> getProjectTasks() {
        return projectTasks;
    }

    public void setProjectTasks(List<ProjectTask> projectTasks) {
        this.projectTasks = projectTasks;
    }

    @Override
    public String toString() {
        return "Backlog{" +
                "Id=" + Id +
                ", PTSequence=" + PTSequence +
                ", projectIdentifier='" + projectIdentifier + '\'' +
                ", project=" + project +
                '}';
    }
}
