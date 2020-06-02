package io.rogue.spring.ppmrest.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.validation.annotation.Validated;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Validated
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Project name can not be blank")
    private String projectName;
    @NotBlank(message = "Project Identifier can not be blank")
    @Size(min = 4, max = 5)
    @Column(updatable = false, unique = true)
    private String projectIdentifier;
    @NotBlank
    private String description;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date start_date;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date end_date;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(updatable = false)
    private Date created_At;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date updated_at;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "project")
    @JsonIgnore
    private Backlog backlog;

    public Backlog getBacklog() {
        return backlog;
    }

    public void setBacklog(Backlog backlog) {
        this.backlog = backlog;
    }

    public Project() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getProjectIdentifier() {
        return projectIdentifier;
    }

    public void setProjectIdentifier(String projectIdentifier) {
        this.projectIdentifier = projectIdentifier;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getStart_date() {
        return start_date;
    }

    public void setStart_date(Date start_date) {
        this.start_date = start_date;
    }

    public Date getEnd_date() {
        return end_date;
    }

    public void setEnd_date(Date end_date) {
        this.end_date = end_date;
    }

    public Date getCreated_At() {
        return created_At;
    }

    public void setCreated_At(Date created_At) {
        this.created_At = created_At;
    }

    public Date getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(Date updated_at) {
        this.updated_at = updated_at;
    }

    @PrePersist
    protected void onCreate() {
        this.created_At = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updated_at = new Date();
    }

    @Override
    public String toString() {
        return "Project{" +
                "id=" + id +
                ", projectName='" + projectName + '\'' +
                ", projectIdentifier='" + projectIdentifier + '\'' +
                ", description='" + description + '\'' +
                ", start_date=" + start_date +
                ", end_date=" + end_date +
                ", created_At=" + created_At +
                ", updated_at=" + updated_at +
                '}';
    }
}
