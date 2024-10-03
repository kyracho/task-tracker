package com.example.tasktracker;

import org.owasp.html.PolicyFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class TaskService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    // Find or create user by username
    public User findOrCreateUser(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            user = new User();
            user.setUsername(username);
            userRepository.save(user);
        }
        return user;
    }

    // Get a task by ID for a specific user
    public Task getTaskById(String username, Long taskId) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            Optional<Task> task = taskRepository.findById(taskId);
            if (task.isPresent() && task.get().getUser().equals(user)) {
                return task.get();  // Return the task if found and belongs to the user
            }
        }
        return null;  // Return null if the task is not found or does not belong to the user
    }

    // Create a task for a specific user with a limit of 5 tasks
    public Task createTaskForUser(Task task, String username, PolicyFactory policy) {
        User user = findOrCreateUser(username);  // Reuse the method to find or create the user

        // Check if the user has reached the task limit (5 tasks)
        List<Task> userTasks = taskRepository.findByUser(user);
        if (userTasks.size() >= 5) {
            throw new IllegalStateException("Task limit of 5 exceeded for user: " + username);
        }

        // Sanitize task description and name
        task.setDescription(policy.sanitize(task.getDescription()));
        task.setTaskName(policy.sanitize(task.getTaskName()));

        // Associate the task with the user and save
        task.setUser(user);  // Set the user reference in the task
        return taskRepository.save(task);  // Save the task in the database
    }

    // Get all tasks for a specific user
    public List<Task> getTasksForUser(String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            return taskRepository.findByUser(user);  // Fetch tasks for the user
        }
        return null;
    }

    // Update a task for a specific user
    public Task updateTask(String username, Long taskId, Task updatedTask) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            Optional<Task> taskOptional = taskRepository.findById(taskId);
            if (taskOptional.isPresent() && taskOptional.get().getUser().equals(user)) {
                Task task = taskOptional.get();
                task.setTaskName(updatedTask.getTaskName());
                task.setDescription(updatedTask.getDescription());
                task.setStatus(updatedTask.getStatus());
                return taskRepository.save(task);  // Save updated task
            }
        }
        return null;
    }

    // Delete a task for a specific user
    public boolean deleteTask(String username, Long taskId) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            Optional<Task> taskOptional = taskRepository.findById(taskId);
            if (taskOptional.isPresent() && taskOptional.get().getUser().equals(user)) {
                taskRepository.delete(taskOptional.get());  // Delete the task from the database
                return true;
            }
        }
        return false;
    }
}
