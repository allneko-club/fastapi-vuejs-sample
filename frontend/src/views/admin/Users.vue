<template>
  <h1>users</h1>
  <router-link :to="{ name: 'admin-users-create'}">create</router-link>
  <li v-for="user in users">
    {{ user.id }}: {{ user }}
    <router-link :to="{ name: 'admin-users-update', params: { id: user.id }}">update</router-link>
    <button type="button" v-on:click="store.actionDeleteUser(user.id)">delete</button>
  </li>
</template>

<script>
import {computed} from "vue";
import {useAdminStore} from "@/stores/useAdminStore";

export default {
  setup(){
    const store = useAdminStore();
    store.actionGetUsers();
    return {
      store,
      users: computed(() => store.users)
    }
  }
}
</script>

<style>
</style>
