<template>
  <h1>users</h1>
  <router-link :to="{ name: 'admin-create-user'}">create</router-link>
  <li v-for="user in users">
    {{ user.id }}: {{ user }}
    <router-link :to="{ name: 'admin-update-user', params: { id: user.id }}">update</router-link>
    <button type="button" v-on:click="deleteUser(user.id)">delete</button>
  </li>
</template>

<script>
import {onMounted} from "vue";
import {useAdminStore} from "@/stores/useAdminStore";
import {storeToRefs} from 'pinia'

export default {
  setup(props, context) {
    const adminStore = useAdminStore();
    const {users} = storeToRefs(adminStore);
    const {deleteUser, fetchUsers} = adminStore;
    onMounted(fetchUsers)
    return {users, deleteUser}
  }
}
</script>

<style scoped>
</style>
