<template>
  <h1>Todo Page</h1>
</template>

<script>
import { useState, useRouter } from '@u3u/vue-hooks';
import { watch } from '@vue/composition-api';

export default {
  name: 'Todos',
  setup() {
    const { router } = useRouter();
    const { user } = useState('auth', ['user']);

    watch(user, () => (!user.value ? router.push('/') : null), { immediate: true });

    return {};
  },
};
</script>

<style lang="scss"></style>
