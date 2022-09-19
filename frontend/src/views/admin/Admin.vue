<template>
  <h5>admin page <router-link :to="{ name: 'home'}">Back to Home</router-link></h5>
  <router-link :to="{ name: 'admin-users'}">users</router-link><br>
  <router-view />
</template>

<script>
import { useRouter } from 'vue-router'
import { useAuthStore } from "@/stores/useAuthStore";
import NotificationsManager from "@/components/NotificationsManager.vue";

export default {
  components: {NotificationsManager},
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    if (!authStore.hasAdminAccess) {
      router.push({name: 'home'});
    }
  }
}
</script>

<style>

</style>
