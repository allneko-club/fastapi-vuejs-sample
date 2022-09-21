import {computed, ref} from "vue";
import {defineStore} from 'pinia';

import {api} from "@/api";
import {useAuthStore} from "@/stores/useAuthStore";
import {useNotificationStore} from "@/stores/useNotificationStore";

export const useAdminStore = defineStore('admin', () => {
  // properties
  const users = ref([])
  const authStore = useAuthStore();
  const notificationStore = useNotificationStore();
  // getters
  const getUserById = computed(() => (userId) => {
    return users.value.find(user => user.id === Number(userId));
  })

  // actions
  function setUser(payload) {
    const new_users = users.value.filter(user => user.id !== payload.id);
    new_users.push(payload);
    users.value = new_users;
  }

  function deleteUser(userId) {
    users.value = users.value.filter(user => user.id !== userId);
  }

  async function fetchUsers() {
    try {
      const response = await api.getUsers(authStore.token);
      if (response) {
        users.value = response.data
      }
    } catch (error) {
      await authStore.checkApiError(error);
    }
  }

  async function createUser(payload) {
    try {
      const loadingNotification = {content: 'saving'};
      notificationStore.add({content: loadingNotification});
      const response = (await Promise.all([
        api.createUser(authStore.token, payload),
        await new Promise((resolve) => setTimeout(() => resolve(), 500)),
      ]))[0];
      setUser(response.data);
      notificationStore.remove(loadingNotification);
      notificationStore.add({content: 'User successfully created', color: 'success'});
    } catch (error) {
      await authStore.checkApiError(error);
    }
  }

  async function updateUser(userId, payload) {
    try {
      const loadingNotification = {content: 'saving'};
      notificationStore.add({content: loadingNotification});
      const response = (await Promise.all([
        api.updateUser(authStore.token, userId, payload),
        await new Promise((resolve) => setTimeout(() => resolve(), 500)),
      ]))[0];
      setUser(response.data);
      notificationStore.remove(loadingNotification);
      notificationStore.add({content: 'User successfully updated', color: 'success'});
    } catch (error) {
      await authStore.checkApiError(error);
    }
  }

  async function deleteUser(userId) {
    try {
      const response = (await Promise.all([
        api.deleteUser(authStore.token, userId),
        await new Promise((resolve) => setTimeout(() => resolve(), 500)),
      ]))[0];
      deleteUser(userId);
      notificationStore.add({content: 'User successfully deleted', color: 'success'});
    } catch (error) {
      await authStore.checkApiError(error);
    }
  }

  return {
    users,
    getUserById,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  }
})
