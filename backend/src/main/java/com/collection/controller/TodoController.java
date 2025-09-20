// 建議路徑: src/main/java/com/collection/controller/TodoController.java

package com.collection.controller;

import com.collection.model.Todo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/todos") // 所有 API 都會以 /api/todos 開頭
public class TodoController {

    // 使用記憶體中的列表來模擬資料庫
    private final List<Todo> todos = new ArrayList<>();
    // 用於生成唯一的 ID
    private final AtomicLong counter = new AtomicLong();

    public TodoController() {
        // 新增一些初始資料
        todos.add(new Todo(counter.incrementAndGet(), "學習 Spring Boot", true));
        todos.add(new Todo(counter.incrementAndGet(), "建立一個 Todo List API", false));
        todos.add(new Todo(counter.incrementAndGet(), "將前端與後端整合", false));
    }

    // GET /api/todos - 獲取所有 todos
    @GetMapping
    public List<Todo> getAllTodos() {
        return todos;
    }

    // POST /api/todos - 新增一個 todo
    @PostMapping
    public ResponseEntity<Todo> createTodo(@RequestBody Map<String, String> payload) {
        String text = payload.get("text");
        if (text == null || text.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Todo newTodo = new Todo(counter.incrementAndGet(), text, false);
        todos.add(newTodo);
        return new ResponseEntity<>(newTodo, HttpStatus.CREATED);
    }

    // PUT /api/todos/{id} - 更新一個 todo
    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable long id, @RequestBody Map<String, Object> payload) {
        return todos.stream()
                .filter(todo -> todo.getId() == id)
                .findFirst()
                .map(todo -> {
                    if (payload.containsKey("text")) {
                        todo.setText((String) payload.get("text"));
                    }
                    if (payload.containsKey("completed")) {
                        todo.setCompleted((Boolean) payload.get("completed"));
                    }
                    return ResponseEntity.ok(todo);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /api/todos/{id} - 刪除一個 todo
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable long id) {
        boolean removed = todos.removeIf(todo -> todo.getId() == id);
        if (removed) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // DELETE /api/todos/completed - 清除所有已完成的 todos
    @DeleteMapping("/completed")
    public ResponseEntity<Void> clearCompletedTodos() {
        todos.removeIf(Todo::isCompleted);
        return ResponseEntity.noContent().build();
    }
}