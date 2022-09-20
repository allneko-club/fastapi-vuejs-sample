<template>
  <NotificationsManager />
  <Header />
  <router-view></router-view>
</template>

<script>
import { useRouter } from 'vue-router'
import { useAuthStore } from "@/stores/useAuthStore";
import NotificationsManager from "@/components/NotificationsManager.vue";
import Header from "@/components/Header.vue";

export default {
  components: {NotificationsManager, Header},
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    authStore.actionCheckLoggedIn();
    if (!authStore.isLoggedIn) {
      router.push({name: 'login'});
    }
  }
}
</script>

<style scoped>
</style>

