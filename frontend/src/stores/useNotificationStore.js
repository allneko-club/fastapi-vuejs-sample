import {ref} from "vue";
import {defineStore} from 'pinia';


export const useNotificationStore = defineStore('notification', () => {
  // properties
  // notification = {content: '', color: ''}
  const notifications = ref([])

  // actions
  function add(notification) {
    notifications.value.push(notification);
  }

  function remove(notification) {
    notifications.value = notifications.value.filter(item => item.content !== notification.content);
  }

  async function removeNotification(notification, timeout) {
    return new Promise((resolve) => {
      setTimeout(() => {
        remove(notification);
        resolve(true);
      }, timeout);
    });
  }

  return {notifications, add, remove, removeNotification}
})