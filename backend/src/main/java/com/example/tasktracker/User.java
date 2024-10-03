package com.example.tasktracker;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity  // Define as a JPA entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // Use Long for auto-generated IDs in MySQL

    private String username;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "user")
    private List<Task> tasks = new ArrayList<>();

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void addTask(Task task) {
        tasks.add(task);
        task.setUser(this);  // Associate task with this user
    }

    public void removeTask(Task task) {
        tasks.remove(task);
        task.setUser(null);  // Disassociate task from this user
    }
}
