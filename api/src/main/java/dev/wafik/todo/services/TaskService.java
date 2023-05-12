package dev.wafik.todo.services;

import com.sun.tools.jconsole.JConsoleContext;
import dev.wafik.todo.model.Task;
import dev.wafik.todo.repository.TaskRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepository tasks;

    public List<Task> allTasks() {
        return tasks.findAll();
    }

    public Task createTask(Task newTask) {
        tasks.save(newTask);
        return newTask;
    }

    public Task getById(ObjectId id) {
        try {
            Optional<Task> optionalTask = tasks.findById(id);
            return optionalTask.orElse(null);
        } catch (Exception e) {
            // Handle the exception here, such as logging the error
            System.out.println("Task not found!");
            return null;
        }
    }

    public Task markTaskAsDone(ObjectId id) {
        Task found = getById(id);
        boolean isDone = found.isDone();
        found.setDone(!isDone);
        return tasks.save(found);
    }

    public void deleteTask(Task task) {
        tasks.delete(task);
    }
}