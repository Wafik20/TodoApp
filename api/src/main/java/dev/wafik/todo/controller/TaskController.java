package dev.wafik.todo.controller;
import dev.wafik.todo.model.Task;
import dev.wafik.todo.services.TaskService;
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
        return new ResponseEntity<List<Task>>(taskService.getAllTasksService(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task newTask) {
        Task taskCreated = taskService.createTaskService(newTask);
        return new ResponseEntity<Task>(taskCreated, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTask(@PathVariable String id) {
        Task taskFound = taskService.getByIdService(id);
        if (taskFound != null) {
            return new ResponseEntity<Task>(taskFound, HttpStatus.FOUND);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/tick")
    public ResponseEntity<Task> tickTask(@PathVariable String id) {
        return new ResponseEntity<Task>(taskService.markTaskAsDoneService(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> editTask(@PathVariable String id, @RequestBody Task task) {
        return new ResponseEntity<Task>(taskService.editTaskService(id, task), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Task> deleteTask(@PathVariable String id) {
        Task existingTask = taskService.getByIdService(id);
        if (existingTask == null) {
            return ResponseEntity.notFound().build();
        } else {
            taskService.deleteTaskService(existingTask);
            return ResponseEntity.ok(existingTask);
        }
    }
}
