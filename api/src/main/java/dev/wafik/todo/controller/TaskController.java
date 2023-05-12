package dev.wafik.todo.controller;

import dev.wafik.todo.model.Task;
import dev.wafik.todo.services.TaskService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        return new ResponseEntity<List<Task>>(taskService.allTasks(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task newTask) {
        Task taskCreated = taskService.createTask(newTask);
        return new ResponseEntity<Task>(taskCreated, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTask(@PathVariable ObjectId id) {
        Task taskFound = taskService.getById(id);
        if (taskFound != null) {
            return new ResponseEntity<Task>(taskFound, HttpStatus.FOUND);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> tickTask(@PathVariable ObjectId id) {
        return new ResponseEntity<Task>(taskService.markTaskAsDone(id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Task> deleteTask(@PathVariable ObjectId id) {
        Task existingTask = taskService.getById(id);
        if (existingTask == null) {
            return ResponseEntity.notFound().build();
        } else {
            taskService.deleteTask(existingTask);
            return ResponseEntity.ok(existingTask);
        }
    }
}
