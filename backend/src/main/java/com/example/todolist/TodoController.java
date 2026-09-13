package com.example.todolist;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "*")
public class TodoController {

    private final TodoRepository repository;

    public TodoController(TodoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Todo> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Todo create(@RequestBody Map<String, String> body) {
        Todo todo = new Todo(body.get("text"));
        return repository.save(todo);
    }

    @PutMapping("/{id}")
    public Todo update(@PathVariable Long id, @RequestBody Map<String, Boolean> body) {
        Todo todo = repository.findById(id).orElseThrow();
        todo.setDone(body.get("done"));
        return repository.save(todo);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
