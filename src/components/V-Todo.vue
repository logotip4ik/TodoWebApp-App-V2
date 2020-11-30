<template>
  <v-card :dark="dark" @click.right.prevent="$emit('show-modal', $event)">
    <v-container>
      <v-checkbox class="left" v-model="rawCompleted"></v-checkbox>
      <v-btn @click="$emit('delete-todo')" class="right" text rounded color="red">
        <v-icon>mdi-delete-outline</v-icon>
      </v-btn>
      <v-card-title
        :class="{ 'ml-2': true, 'word-wrap': true, 'text-decoration-line-through': completed }"
        >{{ title }}</v-card-title
      >
      <div class="text-align-right">
        <v-badge
          class="d-block ml-auto"
          inline
          :color="color"
          :content="rawBadgeText"
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
      if (props.badge === 3) return 'error';
      return 'transperant';
    });

    const rawCompleted = computed({
      get: () => props.completed,
      set: () => emit('toggle-completed'),
    });

    const rawBadgeText = computed(() => {
      if (props.badgeText) return props.badgeText;
      if (!props.badgeText && props.badge === 1) return 'Normal';
      if (!props.badgeText && props.badge === 2) return 'Primary';
      if (!props.badgeText && props.badge === 3) return 'Critical';
      return '';
    });

    return {
      color,
      rawCompleted,
      rawBadgeText,
    };
  },
  props: {
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
    dark: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.left {
  position: absolute;
  left: 5px;
  top: 35%;
  transform: translateY(-50%);
}
.right {
  position: absolute;
  right: 5px;
  top: 40%;
  transform: translateY(-50%);
}
.word-wrap {
  word-break: keep-all;
}
.text-align-right {
  text-align: right;
}
</style>
