<template>
  <h5>admin page</h5>
  <router-link :to="{ name: 'admin-users'}">users</router-link><br>
  <router-view />
</template>

<script>
import { useRouter } from 'vue-router'
import { userAuthStore } from "@/stores/userState";

export default {
  setup() {
    const router = useRouter();
    const authStore = userAuthStore();
    if (!authStore.hasAdminAccess) {
      router.push({name: 'home'});
    }
  }
}
</script>

<style>

</style>
