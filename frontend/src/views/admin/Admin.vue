<template>
  <h5>admin page</h5>
  <router-link :to="{ name: 'admin-users'}">users</router-link><br>
  <router-view />
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
    const authStore = userAuthStore();
    if (!authStore.hasAdminAccess) {
      router.push({name: 'home'});
    }
  }
}
</script>

<style>

</style>
