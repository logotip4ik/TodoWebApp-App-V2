<template>
  <v-dialog
    fullscreen
    v-model="rawShow"
    hide-overlay
    transition="dialog-bottom-transition"
    :dark="dark"
  >
    <v-card :dark="dark">
      <VTodoCreateOverlayNavbar
        @toggle-creating-todo="cancel"
        @save-todo="saveTodo"
      ></VTodoCreateOverlayNavbar>
      <v-container>
        <v-form @submit.prevent="saveTodo">
          <v-list three-line subheader max-width="1200" class="mx-auto">
            <v-list-item>
              <v-text-field
                required
                clearable
                autofocus
                maxlength="100"
                counter="100"
                v-model="todoTitle"
                label="TODO title"
                placeholder="Buy milk..."
              />
            </v-list-item>
            <v-list-item>
              <v-radio-group dense v-model="todoBadge" row>
                <v-radio label="No Badge"></v-radio>
                <v-radio label="Normal priority" color="primary"></v-radio>
                <v-radio label="High priority" color="warning"></v-radio>
                <v-radio label="Critical priority" color="error"></v-radio>
              </v-radio-group>
            </v-list-item>
            <v-fade-transition mode="out-in">
              <v-list-item v-if="todoBadge !== 0">
                <v-text-field
                  required
                  clearable
                  autofocus
                  maxlength="50"
                  counter="50"
                  v-model="todoBadgeText"
                  label="TODO Badge Text"
                  placeholder="Veryyy urgently..."
                />
              </v-list-item>
            </v-fade-transition>
          </v-list>
          <div class="d-flex justify-end">
            <v-btn :dark="!dark" class="mr-2" @click="saveTodo">Save</v-btn>
            <v-btn outlined @click="cancel">Cancel</v-btn>
          </div>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { computed, ref } from '@vue/composition-api';

import VTodoCreateOverlayNavbar from './V-Todo-Create-Overlay-Navbar.vue';

export default {
  name: 'Todo-Create-Overlay',
  setup(props, { emit }) {
    const rawShow = computed({
      get: () => props.show,
      set: () => emit('toggle-creating-todo'),
    });

    const todoTitle = ref('');
    const todoBadge = ref(0);
    const todoBadgeText = ref('');

    function resetForm() {
      todoTitle.value = '';
      todoBadge.value = 0;
      todoBadgeText.value = '';
    }

    function saveTodo() {
      if (!todoTitle.value) return;
      const newTODO = {
        title: todoTitle.value.trim(),
        badge: todoBadge.value,
        badgeText: todoBadgeText.value.trim(),
      };
      emit('save-todo', newTODO);
      resetForm();
    }

    function cancel() {
      emit('toggle-creating-todo');
      resetForm();
    }

    return {
      todoTitle,
      todoBadge,
      todoBadgeText,
      rawShow,
      saveTodo,
      cancel,
    };
  },
  props: {
    show: {
      type: Boolean,
      requried: true,
      default: false,
    },
    dark: {
      type: Boolean,
      requried: false,
      default: false,
    },
  },
  components: {
    VTodoCreateOverlayNavbar,
  },
};
</script>
