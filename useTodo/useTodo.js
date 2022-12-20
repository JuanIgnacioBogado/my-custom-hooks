import { useReducer, useEffect, useCallback } from 'react';
import { todoReducer } from './todoReducer';

const init = () => JSON.parse(localStorage.getItem('todos')) || [];

export const useTodo = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], init);

  const toggleTodoDone = useCallback(id => dispatch({ type: '[TODO] toggle done', id }), []);

  const deleteTodo = useCallback(id => dispatch({ type: '[TODO] delete todo', id }), []);

  const addTodo = useCallback(todo => dispatch({ type: '[TODO] add todo', todo }), []);

  const todosPending = todos.filter(({ done }) => !done).length;

  const todosTotal = todos.length;

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return {
    todos,
    todosTotal,
    todosPending,
    toggleTodoDone,
    deleteTodo,
    addTodo
  };
};
