<template>
  <div>
    <div v-show="show">
      <div v-show="showProgress"></div>
      {{ currentNotificationContent }}
      <button @click="close">Close</button>
    </div>
  </div>
</template>

<script>
import {useNotificationStore} from "@/stores/useNotificationStore";

export default {
  emits: ['click'],
  setup() {
    let show = false;
    const text = '';
    let showProgress = false;
    let currentNotification = false;
    const store = useNotificationStore();

    const hide = async () => {
      show = false;
      await new Promise((resolve, reject) => setTimeout(() => resolve(), 500));
    }

    const close = async () => {
      await hide();
      await removeCurrentNotification();
    }

    const removeCurrentNotification = async () => {
      if (currentNotification) {
        store.removeNotification(currentNotification);
      }
    }

    const setNotification = async (notification) => {
      if (show) {
        await hide();
      }
      if (notification) {
        currentNotification = notification;
        showProgress = notification.showProgress || false;
        show = true;
      } else {
        currentNotification = false;
      }
    }

    // @Watch('store.hasNotification')
    const onNotificationChange = async (newNotification, oldNotification) => {
      if (newNotification !== currentNotification) {
        await setNotification(newNotification);
        if (newNotification) {
          store.removeNotification({notification: newNotification, timeout: 6500});
        }
      }
    }

    const currentNotificationContent = () => {
      return currentNotification && currentNotification.content || '';
    }

    return {
      show, showProgress, currentNotificationContent,
      store,
    }
  }
}
</script>
