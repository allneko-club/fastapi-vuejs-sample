<template>
  <Header/>
  <h2>private page</h2>
  <router-link :to="{ name: 'private-profile'}">account</router-link>
  <router-view></router-view>
</template>

<script>
import {useAuthStore} from "@/stores/useAuthStore";
import Header from "@/components/Header.vue";

export default {
  name: "Main",
  components: {Header},
  beforeRouteEnter(to, from, next) {
    const authStore = useAuthStore();
    authStore.actionCheckLoggedIn();
    if (authStore.isLoggedIn) {
      next();
    } else {
      next({name: 'login'});
    }
  },
}
</script>

<style scoped>
</style>

