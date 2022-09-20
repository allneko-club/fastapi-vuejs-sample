<template>
  <h5>admin page <router-link :to="{ name: 'home'}">Back to Home</router-link></h5>
  <router-link :to="{ name: 'admin-users'}">users</router-link><br>
  <router-view />
</template>

<script>
import { useAuthStore } from "@/stores/useAuthStore";

export default {
  beforeRouteEnter(to, from, next){
    const authStore = useAuthStore();
    authStore.actionCheckLoggedIn();
    if (authStore.hasAdminAccess) {
      next();
    } else {
      next({name: 'home'});
    }
  },
}
</script>

<style scoped>
</style>
