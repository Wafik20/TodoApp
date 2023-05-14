package dev.wafik.todo.services;

import dev.wafik.todo.model.Task;
import dev.wafik.todo.repository.TaskRepository;
//import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepository tasks;

    public List<Task> getAllTasksService() {
        return tasks.findAll();
    }

    public Task createTaskService(Task newTask) {
        tasks.save(newTask);
        return newTask;
    }

    public Task getByIdService(String id) {
        try {
            Optional<Task> optionalTask = tasks.findById(id);
            return optionalTask.orElse(null);
        } catch (Exception e) {
            // Handle the exception here, such as logging the error
            System.out.println("Task not found!");
            return null;
        }
    }

    public Task editTaskService(String id, @RequestBody Task task){
        Task found = getByIdService(id);
        if(task.getName() != null){
            found.setName(task.getName());
        }
        if(task.getDescription() != null){
            found.setDescription(task.getDescription());
        }
        return tasks.save(found);
    }

    public Task markTaskAsDoneService(String id) {
        Task found = getByIdService(id);
        boolean isDone = found.isDone();
        found.setDone(!isDone);
        return tasks.save(found);
    }

    public void deleteTaskService(Task task) {
        tasks.delete(task);
    }
}