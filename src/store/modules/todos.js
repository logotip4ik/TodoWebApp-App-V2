import feathers from '../../feathers';

export default {
  namespaced: true,
  state: {
    todos: [],
    loading: false,
  },
  actions: {
    async createTodo({ state }, todo) {
      /* Just creates new TODO */
      state.loading = true;
      try {
        const res = await feathers.service('todo').create(todo);
        console.info('TODO was created: ', { res });
      } catch (error) {
        console.warn({ error });
      }
      state.loading = false;
    },
    async updateTodo(_, todo) {
      /* This takes given todo and updates it to new version */
      try {
        const res = await feathers.service('todo').patch(todo._id, todo);
        console.info('TODO was updated: ', { res });
      } catch (error) {
        console.warn({ error });
      }
    },
    async removeTodo({ state }, id) {
      /* Remove TODO by it's id */
      state.loading = true;
      try {
        const res = await feathers.service('todo').remove(id);
        console.info('Item was removed: ', { res });
      } catch (error) {
        console.error('Error ocurred: ', { error });
      }
      state.loading = false;
    },
    async listen({ state }) {
      /* This gets all todos and starts listening for changes */
      state.loading = true;
      state.todos = await feathers.service('todo').find({
        query: {
          $sort: { createdAt: -1 },
        },
      });
      state.loading = false;
      // When TODO was created on another device just push it to stack
      feathers.service('todo').on('created', (todo) => {
        state.todos.unshift(todo);
      });
      // When TODO was updated on another device we replace
      // our version with version that come from server
      feathers.service('todo').on('patched', (updatedTodo) => {
        state.todos.forEach((todo, index) => {
          if (todo._id === updatedTodo._id) {
            // state.todos[index] = updatedTodo !DOES NOT work
            // it doesn't updates the current view in browser
            state.todos[index].title = updatedTodo.title;
            state.todos[index].badge = updatedTodo.badge;
            state.todos[index].badgeText = updatedTodo.badgeText;
            state.todos[index].completed = updatedTodo.completed;
            state.todos[index].pushDate = updatedTodo.pushDate;
          }
        });
      });
      // Just removing TODO
      feathers.service('todo').on('removed', (removedTodo) => {
        state.todos = state.todos.filter((item) => removedTodo._id !== item._id);
      });
    },
  },
};
