<template>
  <v-dialog v-model="rawShow" :dark="dark" max-width="700">
    <v-card :dark="dark">
      <v-card-title>Title: {{ item.title }}</v-card-title>
      <v-card-subtitle>
        Created at: {{ new Date(item.createdAt).toLocaleDateString() }}
      </v-card-subtitle>
      <v-card-text>
        <v-list dense>
          <v-list-item>
            <h3>{{ item.completed ? 'Completed' : 'Not Completed' }}</h3>
          </v-list-item>
          <v-list-item>
            Badge:
            <h3
              :class="{
                border: item.badge !== 0,
                primary: item.badge == 1,
                warning: item.badge == 2,
                error: item.badge == 3,
              }"
            >
              {{ ' ' }}{{ badgeText }}
            </h3>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { computed } from '@vue/composition-api';
import { useState } from '@u3u/vue-hooks';

export default {
  name: 'Modal-Info',
  setup(props, { emit }) {
    const rawShow = computed({
      get: () => props.show,
      set: () => emit('close'),
    });
    const badgeText = computed(() => {
      if (props.item.badgeText) return props.item.badgeText;
      if (parseInt(props.item.badge, 10) === 0) return 'No priority';
      if (parseInt(props.item.badge, 10) === 1) return 'Normal priority';
      if (parseInt(props.item.badge, 10) === 2) return 'High priority';
      return 'Critical priority';
    });

    const { dark } = useState(['dark']);

    return {
      dark,
      rawShow,
      badgeText,
    };
  },
  props: {
    item: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    show: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
};
</script>

<style scoped>
.border {
  padding: 0.1rem 0.5rem;
  border-radius: 0.25rem;
  margin-left: 0.25rem;
}
.primary {
  background: #1976d2;
}
.warining {
  background: #fb8c00;
}
.error {
  background: #ff5252;
}
</style>
