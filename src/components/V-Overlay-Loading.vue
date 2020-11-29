<template>
  <v-fade-transition mode="out-in">
    <v-overlay v-if="show">
      <v-progress-circular indeterminate :size="64"></v-progress-circular>
    </v-overlay>
  </v-fade-transition>
</template>

<script>
export default {
  name: 'Overlay-Loading',
  props: {
    show: {
      type: Boolean,
      requried: true,
      default: false,
    },
  },
};
</script>

<style></style>
