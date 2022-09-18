<template>
  <router-view></router-view>
</template>

<script>
import { useRouter } from 'vue-router'
import { userAuthStore } from "@/stores/userState";

export default {
  setup() {
    const router = useRouter();
    const authStore = userAuthStore();
    if (!authStore.isLoggedIn) {
      router.push({name: 'login'});
    }
  }
}
</script>

<style scoped>
</style>

