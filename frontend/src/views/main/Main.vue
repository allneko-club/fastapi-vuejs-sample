<template>
  <h1>This is main page</h1>
  <router-view></router-view>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { userAuthStore } from "@/stores/userState";

// /main/は認証が必要なページ
// 未認証の場合はログインページへリダイレクト
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = userAuthStore();
    if (!store.authenticated && route.path.startsWith('/main')) {
      router.push('/login');
    }
  }
}
</script>

<style>
</style>
