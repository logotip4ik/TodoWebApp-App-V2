<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { useActions } from '@u3u/vue-hooks';

export default {
  name: 'App',
  setup() {
    const { reAuth } = useActions('auth', ['reAuth']);
    reAuth();
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;

  .font-weight-200 {
    font-weight: 200;
  }
}
.container {
  max-width: 700px;
  margin: 1rem auto;
  padding: 1rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
