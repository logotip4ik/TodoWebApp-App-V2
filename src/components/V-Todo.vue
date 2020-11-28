<template>
  <v-card>
    <v-container>
      <v-checkbox class="left" v-model="rawCompleted"></v-checkbox>
      <v-card-title class="ml-2 word-wrap">{{ title }}</v-card-title>
      <div class="text-align-right">
        <v-badge
          class="d-block ml-auto"
          inline
          :color="color"
          :content="badgeText"
          :value="badge === 0 ? false : true"
        ></v-badge>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import { computed } from '@vue/composition-api';

export default {
  name: 'Todo',
  setup(props, { emit }) {
    const color = computed(() => {
      if (props.badge === 1) return 'primary';
      if (props.badge === 2) return 'warning';
      if (props.badge === 3) return 'danger';
      return 'transperant';
    });
    const rawCompleted = computed({
      get: () => props.completed,
      set: () => emit('toggle-completed'),
    });

    return {
      color,
      rawCompleted,
    };
  },
  props: {
    id: {
      type: String,
      required: true,
      default: '',
    },
    title: {
      type: String,
      required: true,
      default: '',
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    badge: {
      type: Number,
      required: true,
      default: null,
    },
    badgeText: {
      type: String,
      required: true,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.left {
  position: absolute;
  left: 5px;
  top: 41%;
  transform: translateY(-50%);
}
.word-wrap {
  word-break: keep-all;
}
.text-align-right {
  text-align: right;
}
</style>
