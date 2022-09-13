<script setup>
import { RouterLink } from "vue-router";

import {userAuthStore} from "@/stores/userState";

const authStore = userAuthStore();
</script>

<template>
  <header>
    <nav>
      <router-link :to="{ name: 'home'}">Home</router-link>
      <router-link :to="{ name: 'recover-password'}">recover-password</router-link>
      <router-link v-if="!authStore.isLoggedIn" :to="{ name: 'login'}">Log in</router-link>
    </nav>
    <template v-if="authStore.isLoggedIn">
      <nav>
        <button @click="authStore.actionUserLogOut()">Logout</button>
        <router-link :to="{ name: 'main-dashboard'}">dashboard</router-link>
        <router-link :to="{ name: 'main-profile'}">profile</router-link>
<!--        idは仮-->
        <router-link :to="{ name: 'main-profile-edit'}">edit</router-link>
        <router-link :to="{ name: 'main-profile-password'}">password</router-link>
        <router-link :to="{ name: 'main-reset-password'}">reset-password</router-link>
      </nav>
      <nav>
        <router-link :to="{ name: 'main-admin'}">Main</router-link>
        <router-link :to="{ name: 'main-admin-users'}">users</router-link>
        <router-link :to="{ name: 'main-admin-users-edit', params: { id: 1 }}">edit</router-link>
        <router-link :to="{ name: 'main-admin-users-create'}">create</router-link>
      </nav>
    </template>
  </header>
</template>

<script>
import {userAuthStore} from "@/stores/userState";

export default {
  setup() {
    // todo <script setup>ではなくこのクラス内で定義したい
    // const authStore = userAuthStore();
    // return {
    //   authStore
    // }
  }
}

</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>