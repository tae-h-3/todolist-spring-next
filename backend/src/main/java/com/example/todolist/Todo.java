package com.example.todolist;

import jakarta.persistence.*;

@Entity
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;
    private boolean done;

    public Todo() {}

    public Todo(String text) {
        this.text = text;
        this.done = false;
    }

    public Long getId() { return id; }
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
    public boolean isDone() { return done; }
    public void setDone(boolean done) { this.done = done; }
}
