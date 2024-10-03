package com.example.tasktracker;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Refill;
import org.owasp.html.PolicyFactory;
import org.owasp.html.Sanitizers;

import java.time.Duration;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "https://localhost:4200")  // Allow requests from Angular app
public class TaskController {

    private final TaskService taskService;
    private final Bucket bucket;
    private final PolicyFactory policy;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;

        // Set up rate limiting: 100 requests per minute
        Bandwidth limit = Bandwidth.classic(100, Refill.greedy(100, Duration.ofMinutes(1)));
        this.bucket = Bucket.builder().addLimit(limit).build();

        // Set up sanitization policy
        this.policy = Sanitizers.FORMATTING.and(Sanitizers.LINKS);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody Task updatedTask, @RequestParam String username) {
        try {
            // Call TaskService with the correct argument order
            Task task = taskService.updateTask(username, id, updatedTask); // Pass username first, then taskId, then updatedTask
            if (task == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found or does not belong to user.");
            }
            return ResponseEntity.ok(task);  // Return the updated task
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update task.");
        }
    }

    

    // Create a new task for a user
    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody Task task, @RequestParam String username) {
        // Rate limiting: Reject if too many requests
        if (!bucket.tryConsume(1)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Rate limit exceeded.");
        }

        // Sanitize task inputs before passing to service
        task.setTaskName(policy.sanitize(task.getTaskName()));
        task.setDescription(policy.sanitize(task.getDescription()));

        // Call the service and pass the policy factory
        try {
            Task savedTask = taskService.createTaskForUser(task, username, policy);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedTask);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create task.");
        }
    }


    // Get all tasks for a specific user
    @GetMapping
    public ResponseEntity<?> getTasks(@RequestParam String username) {
        // Rate limiting: Reject if too many requests
        if (!bucket.tryConsume(1)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Rate limit exceeded.");
        }

        // Fetch tasks from the service
        try {
            List<Task> tasks = taskService.getTasksForUser(username);
            if (tasks == null || tasks.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No tasks found for user.");
            }
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching tasks: " + e.getMessage());
        }
    }

    // Get a specific task by ID
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTask(@PathVariable Long id, @RequestParam String username) {
        try {
            Task task = taskService.getTaskById(username, id);
            if (task == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  // Task not found
            }
            return ResponseEntity.ok(task);  // Return the task
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Delete a task by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id, @RequestParam String username) {
        // Rate limiting: Reject if too many requests
        if (!bucket.tryConsume(1)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).build();
        }

        // Attempt to delete the task
        try {
            boolean deleted = taskService.deleteTask(username, id);
            if (!deleted) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found or could not be deleted.");
            }
            return ResponseEntity.noContent().build();  // Success: No Content
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting task: " + e.getMessage());
        }
    }
}
