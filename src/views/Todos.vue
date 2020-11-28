<template>
  <div>
    <VNavbar></VNavbar>
    <v-container>
      <v-fade-transition group hide-on-leave mode="out-in">
        <VTodo
          class="mb-4"
          v-for="(todo, idx) in todos"
          :key="todo._id"
          :id="todo._id"
          :title="todo.title"
          :completed="todo.completed"
          :badge="todo.badge | badgeInt"
          :badgeText="todo.badgeText"
          @toggle-completed="toggleCompleted(idx)"
        ></VTodo>
      </v-fade-transition>
    </v-container>
    <VOverlay :show="loading"></VOverlay>
  </div>
</template>

<script>
import { useState, useRouter, useActions } from '@u3u/vue-hooks';
import { watch } from '@vue/composition-api';

import VNavbar from '../components/V-Navbar.vue';
import VOverlay from '../components/V-Overlay.vue';
import VTodo from '../components/V-Todo.vue';

export default {
  name: 'Todos',
  setup() {
    const { router } = useRouter();
    const { user } = useState('auth', ['user']);
    watch(user, () => (!user.value ? router.push('/') : null));

    const { listen } = useActions('todos', ['listen']);
    const { todos, loading } = useState('todos', ['todos', 'loading']);

    // This gets all todos and starts listening for changes
    listen();

    function toggleCompleted(idx) {
      console.log(todos.value[idx]);
      todos.value[idx].completed = !todos.value[idx].completed;
    }

    return {
      todos,
      loading,
      toggleCompleted,
    };
  },
  filters: {
    badgeInt: (val) => parseInt(val, 0),
  },
  components: {
    VNavbar,
    VOverlay,
    VTodo,
  },
};
</script>

<style lang="scss"></style>
