package dev.wafik.todo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
//import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "task")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Task {

   // @Id
   //private ObjectId id;

   @Id
    private String id;

    private String name;

    private String description;

    private boolean done;

    @Override
    public String toString() {
        return String.format("{id: %s, name: %s, description: %s, done: %b}", id.toString(), name, description, done);
    }
}
