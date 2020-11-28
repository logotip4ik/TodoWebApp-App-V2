<template>
  <transition mode="out-in" name="fade">
    <div class="overlay" v-if="show" :style="{ background: dark ? '#18181e' : '#fff' }">
      <img :src="TailSpinSVG" />
    </div>
  </transition>
</template>

<script>
import TailSpinSVG from '@/assets/tail-spin.svg';

export default {
  name: 'Overlay',
  setup() {
    return { TailSpinSVG };
  },
  props: {
    show: {
      type: Boolean,
      requried: true,
      default: false,
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
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  img {
    color: black;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
