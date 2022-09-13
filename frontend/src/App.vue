<script setup>
import { RouterLink, RouterView } from "vue-router";
import Header from "./components/Header.vue";
</script>

<template>

  <Header />
  <RouterView />

</template>

<script>

export default {
  name: 'App',
  data() {
  },
  methods: {
  }
}

</script>

<style scoped>
</style>
