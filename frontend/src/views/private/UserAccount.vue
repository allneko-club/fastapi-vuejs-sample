<template>
  <h2>This is your account page</h2>
  <li v-for="(value, key) in userProfile">
    {{ key }}: {{ value }}
  </li>
  <p>
    <router-link :to="{ name: 'private-account-update'}">Edit</router-link>
    <br>
    <router-link :to="{ name: 'private-account-update-password'}">Change password</router-link>
  </p>
  <router-view />
</template>

<script>
import { userAuthStore } from "@/stores/userState";
import {computed} from "vue";

export default {
  setup(){
    const authStore = userAuthStore();
    authStore.actionGetUserProfile();
    return {
      userProfile: computed(() => authStore.userProfile)
    }
  }
}
</script>
