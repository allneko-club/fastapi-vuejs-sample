<template>
  <h2>This is your account page</h2>
  <li v-for="(value, key) in authStore.userProfile">
    {{ key }}: {{ value }}
  </li>
  <p>
    <router-link :to="{ name: 'private-profile-update'}">Edit</router-link>
    <br>
    <router-link :to="{ name: 'private-profile-update-password'}">Change password</router-link>
  </p>
  <router-view/>
</template>

<script>
import {useAuthStore} from "@/stores/useAuthStore";

export default {
  setup() {
    const authStore = useAuthStore();
    return {authStore}
  }
}
</script>

<style scoped>
</style>