<template>
  <div class="main">
    <div class="container">
      <h1>Home Page</h1>
      <transition mode="out-in" name="fade">
        <h2 class="font-weight-200" v-if="loading">Loging you in...</h2>
        <button v-else @click="login">Login with Github</button>
      </transition>
    </div>
    <!-- <VOverlay :show="loading"></VOverlay> -->
  </div>
</template>

<script>
import { useActions, useState, useRouter } from '@u3u/vue-hooks';
import { watch } from '@vue/composition-api';

// import VOverlay from '../components/V-Overlay.vue';

export default {
  name: 'Home',
  setup() {
    const { router } = useRouter();
    const { user, loading } = useState('auth', ['user', 'loading']);

    const { login } = useActions('auth', ['login']);

    watch(user, () => (user.value ? router.push({ name: 'Todos' }) : null));

    return {
      login,
      loading,
    };
  },
  // components: {
  //   VOverlay,
  // },
};
</script>

<style lang="scss">
.container {
  h1 {
    margin-bottom: 1rem;
  }
  button {
    background: transparent;
    border: none;
    appearance: none;
    font-size: 1rem;
    padding: 0.75rem 1rem;
    border: 1px solid #18181e;
    border-radius: 0.25rem;
  }
}
</style>
