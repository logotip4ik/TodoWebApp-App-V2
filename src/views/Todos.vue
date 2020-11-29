<template>
  <div :class="{ 'bg-dark': rawDark }">
    <VNavbar></VNavbar>
    <v-container>
      <v-fade-transition group hide-on-leave mode="out-in" v-if="!filteredTodos">
        <VTodo
          class="mb-4"
          v-for="(todo, idx) in todos"
          :dark="rawDark"
          :key="todo._id"
          :title="todo.title"
          :completed="todo.completed"
          :badge="todo.badge | badgeInt"
          :badgeText="todo.badgeText"
          @toggle-completed="toggleCompleted(idx)"
          @delete-todo="removeTodo(todo._id)"
        ></VTodo>
      </v-fade-transition>
      <v-fade-transition group hide-on-leave mode="out-in" v-else>
        <VTodo
          class="mb-4"
          v-for="(todo, idx) in filteredTodos"
          :dark="rawDark"
          :key="todo._id"
          :title="todo.title"
          :completed="todo.completed"
          :badge="todo.badge | badgeInt"
          :badgeText="todo.badgeText"
          @toggle-completed="toggleCompleted(idx)"
          @delete-todo="removeTodo(todo._id)"
        ></VTodo>
      </v-fade-transition>
      <v-btn fixed bottom right fab dark color="#18181e" @click="creatingTodo = !creatingTodo">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-speed-dial
        v-model="isOpenFab"
        direction="top"
        transition="slide-x-transition"
        fixed
        bottom
        left
        ><template v-slot:activator>
          <v-btn v-model="isOpenFab" color="#18181e" dark fab>
            <v-icon v-if="isOpenFab">
              mdi-close
            </v-icon>
            <v-icon v-else>
              mdi-dots-horizontal
            </v-icon>
          </v-btn>
        </template>
        <v-btn fab outlined :dark="rawDark" @click="rawDark = !rawDark">
          <v-icon v-if="rawDark">mdi-white-balance-sunny</v-icon>
          <v-icon v-else>mdi-weather-night</v-icon>
        </v-btn>
        <v-btn fab outlined :dark="rawDark" @click="filterTodos">
          <v-icon v-if="!filteredTodos">mdi-filter-variant</v-icon>
          <v-icon v-else>mdi-filter-variant-remove</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-container>
    <VOverlayLoading :show="loading"></VOverlayLoading>
    <VTodoCreateOverlay
      :dark="rawDark"
      :show="creatingTodo"
      @save-todo="saveTodo"
      @toggle-creating-todo="creatingTodo = !creatingTodo"
    ></VTodoCreateOverlay>
  </div>
</template>

<script>
import { useState, useRouter, useActions } from '@u3u/vue-hooks';
import { computed, ref, watch } from '@vue/composition-api';

import VNavbar from '../components/V-Navbar.vue';
import VOverlayLoading from '../components/V-Overlay-Loading.vue';
import VTodo from '../components/V-Todo.vue';
import VTodoCreateOverlay from '../components/V-Todo-Create-Overlay.vue';

export default {
  name: 'Todos',
  setup() {
    const { router } = useRouter();
    const { user } = useState('auth', ['user']);
    watch(user, () => (!user.value ? router.push('/') : null));

    // prettier-ignore
    const {
      listen,
      createTodo,
      updateTodo,
      removeTodo,
    } = useActions('todos', [
      'listen',
      'createTodo',
      'updateTodo',
      'removeTodo',
    ]);
    const { toggleDarkMode } = useActions(['toggleDarkMode']);

    const { todos, loading } = useState('todos', ['todos', 'loading']);
    const { dark } = useState(['dark']);

    const rawDark = computed({
      get: () => dark.value,
      set: () => toggleDarkMode(),
    });

    const filteredTodos = ref(null);
    const creatingTodo = ref(false);
    const isOpenFab = ref(false);

    // This gets all todos and starts listening for changes
    listen();

    function saveTodo(todo) {
      creatingTodo.value = !creatingTodo.value;
      createTodo(todo);
    }

    function toggleCompleted(idx) {
      updateTodo({ ...todos.value[idx], completed: !todos.value[idx].completed });
    }

    function filterTodos() {
      if (!filteredTodos.value) {
        filteredTodos.value = todos.value.filter((item) => !item.completed);
      } else {
        filteredTodos.value = null;
      }
    }

    return {
      todos,
      rawDark,
      loading,
      isOpenFab,
      filteredTodos,
      filterTodos,
      saveTodo,
      toggleCompleted,
      creatingTodo,
      removeTodo,
    };
  },
  filters: {
    badgeInt: (val) => parseInt(val, 10),
  },
  components: {
    VNavbar,
    VOverlayLoading,
    VTodo,
    VTodoCreateOverlay,
  },
};
</script>
