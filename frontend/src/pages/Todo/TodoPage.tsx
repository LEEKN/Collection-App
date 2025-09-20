
// frontend/src/pages/Todo/TodoPage.tsx

import React, { useState, useEffect } from 'react';
import './TodoPage.css';

// 1. 從新的 API 檔案中引入所有需要的函式和型別
import {
  Todo,
  getTodos,
  addTodo as apiAddTodo,
  updateTodo as apiUpdateTodo,
  deleteTodo as apiDeleteTodo,
  clearCompletedTodos as apiClearCompleted,
} from '../../api/todoApi';

function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>('');

  // 2. useEffect 現在呼叫 getTodos 函式
  useEffect(() => {
    const fetchInitialTodos = async () => {
      try {
        const initialTodos = await getTodos();
        setTodos(initialTodos);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInitialTodos();
  }, []);

  // 3. 所有處理函式都變得更簡潔，只呼叫 API 函式並更新狀態
  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    try {
      const newTodo = await apiAddTodo(input);
      setTodos([...todos, newTodo]);
      setInput('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      const updatedTodo = await apiUpdateTodo(id, { completed: !completed });
      setTodos(todos.map(t => (t.id === id ? updatedTodo : t)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await apiDeleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const handleSubmitEdit = async (id: number) => {
    try {
      const updatedTodo = await apiUpdateTodo(id, { text: editingText });
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
      setEditingId(null);
      setEditingText('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearCompleted = async () => {
    try {
      await apiClearCompleted();
      setTodos(todos.filter((todo) => !todo.completed));
    } catch (error) {
      console.error(error);
    }
  };

  // (JSX 渲染部分保持不變)
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const itemsLeft = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="todo-app">
      <header>
        <h1>Todo List</h1>
        <form onSubmit={handleAddTodo}>
          <input
            type="text"
            className="todo-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="新增一個待辦事項..."
          />
        </form>
      </header>

      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            {editingId === todo.id ? (
              <input
                type="text"
                className="edit-input"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onBlur={() => handleSubmitEdit(todo.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSubmitEdit(todo.id);
                }}
                autoFocus
              />
            ) : (
              <>
                <div className="view" onDoubleClick={() => handleStartEditing(todo)}>
                  <input
                    type="checkbox"
                    className="toggle"
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo.id, todo.completed)}
                  />
                  <label>{todo.text}</label>
                </div>
                <button className="destroy" onClick={() => handleDeleteTodo(todo.id)}>
                  ×
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      
      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count">
            <strong>{itemsLeft}</strong> 個項目待辦
          </span>
          <ul className="filters">
            <li>
              <button onClick={() => setFilter('all')} className={filter === 'all' ? 'selected' : ''}>
                全部
              </button>
            </li>
            <li>
              <button onClick={() => setFilter('active')} className={filter === 'active' ? 'selected' : ''}>
                待辦中
              </button>
            </li>
            <li>
              <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'selected' : ''}>
                已完成
              </button>
            </li>
          </ul>
          {todos.some(todo => todo.completed) && (
             <button className="clear-completed" onClick={handleClearCompleted}>
                清除已完成
             </button>
          )}
        </footer>
      )}
    </div>
  );
}

export default TodoPage;
