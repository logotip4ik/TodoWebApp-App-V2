<template>
  <v-toolbar dark>
    <v-toolbar-items>
      <v-btn depressed @click="$emit('toggle-creating-todo')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-title>
      <h1 class="headline">Create TODO</h1>
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items>
      <v-btn depressed>
        <v-icon @click="$emit('save-todo')">
          mdi-content-save
        </v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Todo-Create-Overlay-Navbar',
};
</script>
