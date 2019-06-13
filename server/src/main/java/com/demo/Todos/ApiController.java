package com.demo.Todos;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ApiController {
    private static int nextId = 6;

    private ArrayList<Todo> todos = new ArrayList<Todo>() {
        private static final long serialVersionUID = 1L;

        {
            add(new Todo(1, "Call Mom", true));
            add(new Todo(2, "Finish project until Firday!", true));
            add(new Todo(3, "Send baby gifts to Sarah", false));
            add(new Todo(4, "Call to swimming pool and ask about the work hours", false));
            add(new Todo(5, "Find apartment for summer", false));
        }
    };

    @GetMapping("/api/todos/")
    public ArrayList<Todo> getTodos() {
        return todos;
    }

    @PostMapping("/api/todos/")
    public Todo postTodo(@RequestBody Todo todo) {
        todo.id = nextId;
        nextId++;
        this.todos.add(todo);
        return todo;
    }

    @GetMapping("/api/todos/{id}/")
    public ResponseEntity<Object> getTodo(@PathVariable("id") long id) {
        Optional<Todo> match = todos.stream().filter(x -> x.id == id).findFirst();
        if (match.isPresent()) {
            return ResponseEntity.ok(match.get());
        }
        return ResponseEntity.status(404).body(new HashMap<String, String>() {
            private static final long serialVersionUID = 1L;

            {
                put("detail", "not found");
            }
        });
    }

    @PutMapping("/api/todos/{id}/")
    public ResponseEntity<Object> updateTodo(@PathVariable("id") long id, @RequestBody Todo params) {
        Optional<Todo> match = todos.stream().filter(x -> x.id == id).findFirst();
        if (match.isPresent()) {
            Todo todo = match.get();

            todo.completed = params.completed;
            todo.content = params.content;

            return ResponseEntity.ok(todo);
        }
        return ResponseEntity.status(404).body(new HashMap<String, String>() {
            private static final long serialVersionUID = 1L;

            {
                put("detail", "not found");
            }
        });
    }

    @DeleteMapping("/api/todos/{id}/")
    public ArrayList<Todo> deleteTodo(@PathVariable("id") long id) {
        this.todos.removeIf((Todo todo) -> {
            return todo.id == id;
        });
        return this.todos;
    }
}