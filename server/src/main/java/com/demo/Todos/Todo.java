package com.demo.Todos;

public class Todo {

    public long id;

    public String content;

    public boolean completed;

    public Todo(long id, String content, boolean completed) {
        this.id = id;
        this.content = content;
        this.completed = completed;
    }

}