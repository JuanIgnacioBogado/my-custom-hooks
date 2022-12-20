export const todoReducer = (state, { type, ...props }) => {
  switch (type) {
    case '[TODO] add todo':
      return [...state, props.todo];

    case '[TODO] toggle done':
      return state.map(todo =>
        todo.id === props.id ? { ...todo, done: !todo.done } : todo
      );

    case '[TODO] delete todo':
      return state.filter(({ id }) => id !== props.id);

    default:
      return state;
  }
};
