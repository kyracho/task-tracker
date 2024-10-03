package com.example.tasktracker;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class MyRestController {

    @GetMapping("/")
    public String home() {
        return "Welcome to the Task Tracker!";
    }

    @GetMapping("/tasks")
    public String getTasks() {
        return "Here is the list of tasks!";
    }

}
