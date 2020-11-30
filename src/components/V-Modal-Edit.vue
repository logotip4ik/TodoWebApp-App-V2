<template>
  <v-dialog v-model="rawShow" :dark="dark" max-width="700">
    <v-card :dark="dark">
      <v-card-title>Editing: {{ newItem.title }}</v-card-title>
      <v-form @submit.prevent="save">
        <v-list dense>
          <v-list-item>
            <v-text-field
              required
              clearable
              autofocus
              maxlength="100"
              counter="100"
              v-model="newItem.title"
              label="TODO title"
              placeholder="Buy milk..."
            />
          </v-list-item>
          <v-list-item>
            <v-radio-group dense v-model="badgeInt" row>
              <v-radio label="No Badge"></v-radio>
              <v-radio label="Normal priority" color="primary"></v-radio>
              <v-radio label="High priority" color="warning"></v-radio>
              <v-radio label="Critical priority" color="error"></v-radio>
            </v-radio-group>
          </v-list-item>
          <v-fade-transition mode="out-in">
            <v-list-item v-if="badgeInt !== 0">
              <v-text-field
                required
                clearable
                maxlength="50"
                counter="50"
                v-model="newItem.badgeText"
                label="TODO Badge Text"
                placeholder="Veryyy urgently..."
              />
            </v-list-item>
          </v-fade-transition>
        </v-list>
      </v-form>
      <v-card-actions class="d-flex justify-end">
        <v-btn @click="save" :dark="dark">Save</v-btn>
        <v-btn @click="cancel" outlined :dark="dark">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { computed, ref, watch } from '@vue/composition-api';
import { useState } from '@u3u/vue-hooks';

export default {
  name: 'Modal-Edit',
  setup(props, { emit }) {
    const { dark } = useState(['dark']);
    const newItem = ref({});

    const badgeInt = computed({
      get: () => parseInt(newItem.value.badge, 10),
      set: (val) => {
        newItem.value.badge = val;
      },
    });

    watch(
      props,
      ({ item }) => {
        if (!item.title) return;
        newItem.value = { ...item };
      },
      { deep: true },
    );

    function resetForm() {
      newItem.value.title = '';
      newItem.value.badge = 0;
      newItem.value.badgeText = '';
    }

    function save() {
      const item = {
        title: newItem.value.title,
        badge: badgeInt.value,
        badgeText: badgeInt.value !== 0 ? newItem.value.badgeText : '',
      };
      resetForm();
      emit('save', item);
    }

    function cancel() {
      resetForm();
      emit('close');
    }

    const rawShow = computed({
      get: () => props.show,
      set: () => cancel(),
    });

    return {
      dark,
      rawShow,
      newItem,
      badgeInt,
      save,
      cancel,
    };
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false,
    },
    item: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
};
</script>
