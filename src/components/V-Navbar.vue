<template>
  <v-app-bar dark color="#18181e" app>
    <h1 class="headline">TodoApp</h1>
    <v-spacer />
    <v-btn @click="logout" outlined>Logout</v-btn>
  </v-app-bar>
</template>

<script>
import { useActions } from '@u3u/vue-hooks';

export default {
  name: 'Navbar',
  setup() {
    const { logout } = useActions('auth', ['logout']);

    return {
      logout,
    };
  },
};
</script>
