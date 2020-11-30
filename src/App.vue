<template>
  <v-app id="app" :class="{ 'bg-dark': dark }" :dark="dark">
    <v-main :dark="dark">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { useActions, useState } from '@u3u/vue-hooks';

export default {
  name: 'App',
  setup() {
    const { reAuth } = useActions('auth', ['reAuth']);
    reAuth();

    const { dark } = useState(['dark']);
    const { toggleDarkMode } = useActions(['toggleDarkMode']);

    if (localStorage.dark) {
      toggleDarkMode(JSON.parse(localStorage.dark));
    }

    return { dark };
  },
};
</script>

<style lang="scss">
*,
::before,
::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  .font-weight-200 {
    font-weight: 200;
  }
  &.bg-dark {
    background-color: #121212 !important;
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
