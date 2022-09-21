import {ref} from "vue";
import {defineStore} from 'pinia';


export const useNotificationStore = defineStore('notification', () => {
  // properties
  const notifications = ref([])

  // actions
  function add(payload) {
    const notification = {
      content: payload.content,
      color: payload.color || 'info',
    }
    notifications.value.push(notification);
  }

  function remove(payload) {
    notifications.value = notifications.value.filter(notification => notification !== payload);
  }

  async function removeNotification(payload) {
    return new Promise((resolve) => {
      setTimeout(() => {
        remove(payload.notification);
        resolve(true);
      }, payload.timeout);
    });
  }

  return {notifications, add, remove, removeNotification}
})