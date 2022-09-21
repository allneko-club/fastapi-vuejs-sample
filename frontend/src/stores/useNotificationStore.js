import {ref} from "vue";
import {defineStore} from 'pinia';


export const useNotificationStore = defineStore('notification', () => {
  // properties
  // notification = {content: '', color: ''}
  const notifications = ref([])

  // actions
  function add(payload) {
    notifications.value.push(payload);
  }

  function remove(payload) {
    notifications.value = notifications.value.filter(notification => notification.content !== payload.content);
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