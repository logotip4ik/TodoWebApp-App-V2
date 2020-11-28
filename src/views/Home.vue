<template>
  <v-container>
    <h1 class="mb-4">Home Page</h1>
    <transition mode="out-in" name="fade">
      <h2 class="font-weight-200" v-if="loading">Loging you in...</h2>
      <v-btn outlined color="#18181e" v-else @click="login">Login with Github</v-btn>
    </transition>
  </v-container>
</template>

<script>
import { useActions, useState, useRouter } from '@u3u/vue-hooks';
import { watch } from '@vue/composition-api';

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
};
</script>

<style lang="scss"></style>
