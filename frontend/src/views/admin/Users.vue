<template>
  <h1>users</h1>
  <router-link :to="{ name: 'admin-users-create'}">create</router-link>
  <li v-for="user in users">
    {{ user.id }}: {{ user }}
    <router-link :to="{ name: 'admin-users-update', params: { id: user.id }}">update</router-link>
    <button type="button" v-on:click="adminStore.deleteUser(user.id)">delete</button>
  </li>
</template>

<script>
import {computed} from "vue";
import {useAdminStore} from "@/stores/useAdminStore";

export default {
  setup() {
    const adminStore = useAdminStore();
    adminStore.fetchUsers();
    return {
      adminStore,
      users: computed(() => adminStore.users)
    }
  }
}
</script>

<style scoped>
</style>
