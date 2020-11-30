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
          @show-modal="showModal($event, idx)"
          @toggle-completed="toggleCompleted(idx)"
          @delete-todo="removeTodo(todo._id)"
        ></VTodo>
      </v-fade-transition>
      <!-- TODO: Just rethink this filter⚒  -->
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
          @show-modal="showModal($event, idx)"
          @toggle-completed="toggleCompleted(idx, true)"
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
        <v-btn disabled fab outlined :dark="rawDark" @click="filterTodos">
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
    <VMenu
      :show="isOpenMenu"
      :x="menuX"
      :y="menuY"
      @show-info="showInfo = !showInfo"
      @show-edit="showEdit = !showEdit"
      @close="isOpenMenu = !isOpenMenu"
    ></VMenu>
    <VModalInfo :show="showInfo" :item="opendMenuOn" @close="showInfo = !showInfo"></VModalInfo>
    <VModalEdit
      :show="showEdit"
      :item="opendMenuOn"
      @close="showEdit = !showEdit"
      @save="updateExistingTodo"
    ></VModalEdit>
  </div>
</template>

<script>
import { useState, useRouter, useActions } from '@u3u/vue-hooks';
import { computed, ref, watch } from '@vue/composition-api';

import VNavbar from '../components/V-Navbar.vue';
import VOverlayLoading from '../components/V-Overlay-Loading.vue';
import VTodo from '../components/V-Todo.vue';
import VTodoCreateOverlay from '../components/V-Todo-Create-Overlay.vue';
import VMenu from '../components/V-Menu.vue';
import VModalInfo from '../components/V-Modal-Info.vue';
import VModalEdit from '../components/V-Modal-Edit.vue';

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
    const isOpenMenu = ref(false);
    const showInfo = ref(false);
    const showEdit = ref(false);
    const menuX = ref(0);
    const menuY = ref(0);
    const opendMenuOn = ref({});

    // This gets all todos and starts listening for changes
    listen();

    function saveTodo(todo) {
      creatingTodo.value = !creatingTodo.value;
      createTodo(todo);
    }

    function toggleCompleted(idx, fromFiltered = false) {
      if (fromFiltered) {
        updateTodo({ ...filteredTodos.value[idx], completed: !filteredTodos.value[idx].completed });
      } else {
        updateTodo({ ...todos.value[idx], completed: !todos.value[idx].completed });
      }
    }

    function updateExistingTodo(item) {
      updateTodo({ ...opendMenuOn.value, ...item });
      showEdit.value = !showEdit.value;
    }

    function filterTodos() {
      if (!filteredTodos.value) {
        filteredTodos.value = todos.value.filter((item) => !item.completed);
      } else {
        filteredTodos.value = null;
      }
    }

    function showModal(ev, idx) {
      menuX.value = ev.clientX;
      menuY.value = ev.clientY;
      opendMenuOn.value = todos.value[idx];
      isOpenMenu.value = true;
    }

    return {
      todos,
      rawDark,
      loading,
      isOpenFab,
      isOpenMenu,
      menuX,
      menuY,
      opendMenuOn,
      showInfo,
      showEdit,
      filteredTodos,
      filterTodos,
      saveTodo,
      showModal,
      toggleCompleted,
      creatingTodo,
      updateExistingTodo,
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
    VMenu,
    VModalInfo,
    VModalEdit,
  },
};
</script>
