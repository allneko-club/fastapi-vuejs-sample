<template>
  <header>
    <nav>
      <router-link :to="{ name: 'home'}">{{appName}}</router-link>
      <template v-if="authStore.hasAdminAccess">
        <router-link :to="{ name: 'admin'}">Admin</router-link>
      </template>
      <template v-if="authStore.isLoggedIn">
        <router-link :to="{ name: 'private-dashboard'}">dashboard</router-link>
        <button @click="authStore.actionUserLogOut">Logout</button>
      </template>
      <template v-else>
        <router-link :to="{ name: 'login'}">Log in</router-link>
      </template>
    </nav>
  </header>
</template>

<script>
import {userAuthStore} from "@/stores/userState";

export default {
  setup() {
    const appName = import.meta.env.VITE_APP_NAME;
    const authStore = userAuthStore();
    return {
      appName,
      authStore,
    }
  }
}

</script>

<style scoped>
nav {
  width: 100%;
  margin-top: 2rem;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>