package com.example.tasktracker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // Custom method to find tasks by the associated user
    List<Task> findByUser(User user);
}
