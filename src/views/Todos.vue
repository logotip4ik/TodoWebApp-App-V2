<template>
  <div :class="{ 'bg-dark': rawDark }">
    <VNavbar></VNavbar>
    <v-container>
      <v-fade-transition group hide-on-leave mode="out-in">
        <VTodo
          class="mb-4"
          v-for="todo in rawTodos"
          :dark="rawDark"
          :key="todo._id"
          :title="todo.title"
          :completed="todo.completed"
          :badge="todo.badge | badgeInt"
          :badgeText="todo.badgeText"
          @show-modal="showModal($event, todo)"
          @toggle-completed="toggleCompleted(todo)"
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
          <v-icon v-if="visibility === 'all'">mdi-filter-variant</v-icon>
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

const filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.completed),
};

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

    const visibility = ref('all');
    const creatingTodo = ref(false);
    const isOpenFab = ref(false);
    const isOpenMenu = ref(false);
    const showInfo = ref(false);
    const showEdit = ref(false);
    const menuX = ref(0);
    const menuY = ref(0);
    const opendMenuOn = ref({});

    const rawTodos = computed(() => filters[visibility.value](todos.value));

    // This gets all todos and starts listening for changes
    listen();

    function saveTodo(todo) {
      creatingTodo.value = !creatingTodo.value;
      createTodo(todo);
    }

    function toggleCompleted(todo) {
      updateTodo({ ...todo, completed: !todo.completed });
    }

    function updateExistingTodo(item) {
      updateTodo({ ...opendMenuOn.value, ...item });
      showEdit.value = !showEdit.value;
    }

    function filterTodos() {
      if (visibility.value === 'all') {
        visibility.value = 'active';
      } else {
        visibility.value = 'all';
      }
    }

    function showModal(ev, todo) {
      menuX.value = ev.clientX;
      menuY.value = ev.clientY;
      opendMenuOn.value = todo;
      isOpenMenu.value = true;
    }

    return {
      rawTodos,
      rawDark,
      visibility,
      loading,
      isOpenFab,
      isOpenMenu,
      menuX,
      menuY,
      opendMenuOn,
      showInfo,
      showEdit,
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
