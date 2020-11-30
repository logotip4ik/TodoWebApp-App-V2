<template>
  <v-menu v-model="rawShow" content-class="menu" :dark="dark" :position-x="x" :position-y="y">
    <v-card :dark="dark">
      <v-list>
        <v-list-item link @click="$emit('show-info')">
          <v-list-item-title>Info</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="$emit('show-edit')">
          <v-list-item-title>Edit</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import { computed, ref } from '@vue/composition-api';
import { useState } from '@u3u/vue-hooks';

export default {
  name: 'Menu',
  setup(props, { emit }) {
    const menu = ref(null);
    const rawShow = computed({
      get: () => props.show,
      set: () => emit('close'),
    });
    const { dark } = useState(['dark']);

    return {
      menu,
      dark,
      rawShow,
    };
  },
  props: {
    x: {
      type: Number,
      required: true,
      default: 20,
    },
    y: {
      type: Number,
      required: true,
      default: 20,
    },
    show: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  width: 120px;
}
</style>
