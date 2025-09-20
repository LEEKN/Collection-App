
// frontend/src/api/todoApi.ts

const API_BASE_URL = '/api/todos';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// 獲取所有 Todos
export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return response.json();
};

// 新增一個 Todo
export const addTodo = async (text: string): Promise<Todo> => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!response.ok) {
    throw new Error('Failed to add todo');
  }
  return response.json();
};

// 更新一個 Todo
export const updateTodo = async (id: number, payload: { text?: string; completed?: boolean }): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to update todo');
  }
  return response.json();
};

// 刪除一個 Todo
export const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
};

// 清除所有已完成的 Todos
export const clearCompletedTodos = async (): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/completed`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to clear completed todos');
    }
};
