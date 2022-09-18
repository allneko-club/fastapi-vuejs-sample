<template>
  <router-view></router-view>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { userAuthStore } from "@/stores/userState";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const authStore = userAuthStore();
    // /main/は認証が必要なページ. 未認証の場合はログインページへリダイレクト
    if (!authStore.isLoggedIn) {
      router.push('/login');
    }
  }
}
</script>

<style scoped>
</style>

