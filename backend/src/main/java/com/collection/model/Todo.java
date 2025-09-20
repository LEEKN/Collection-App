package com.collection.model;

// 您可以根據需要加入 Lombok 的 @Data 或 @Getter/@Setter
public class Todo {
    private long id;
    private String text;
    private boolean completed;

    // Constructors
    public Todo() {}

    public Todo(long id, String text, boolean completed) {
        this.id = id;
        this.text = text;
        this.completed = completed;
    }

    // Getters and Setters
    public long getId() { return id; }
    public void setId(long id) { this.id = id; }
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }
}