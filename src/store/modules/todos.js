import feathers from '../../feathers';

export default {
  namespaced: true,
  state: {
    todos: [],
    loading: false,
  },
  actions: {
    async listen({ state }) {
      /* This gets all todos and starts listening for changes */
      state.loading = true;
      state.todos = await feathers.service('todo').find({
        query: {
          $sort: { createdAt: 1 },
        },
      });
      state.loading = false;
      feathers.service('todo').on('created', (todo) => {
        state.todos.push(todo);
      });
      feathers.service('todo').on('patched', (updatedTodo) => {
        console.log('Updating The TODO: ', updatedTodo);
        state.todos.forEach((todo, index) => {
          // eslint-disable-next-line
          if (todo._id === updatedTodo._id) {
            state.todos[index].title = updatedTodo.title;
            state.todos[index].badge = updatedTodo.badge;
            state.todos[index].badgeText = updatedTodo.badgeText;
            state.todos[index].completed = updatedTodo.completed;
            state.todos[index].pushDate = updatedTodo.pushDate;
          }
        });
      });
      feathers.service('todo').on('removed', (removedTodo) => {
        // eslint-disable-next-line
        state.todos = state.todos.filter((item) => removedTodo._id !== item._id);
      });
    },
  },
};
