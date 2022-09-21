<template>
  <div v-show="show" :class="currentNotificationColor">
    {{ currentNotificationContent }}
    <button @click="close">Close</button>
  </div>
</template>

<script>
import {useNotificationStore} from "@/stores/useNotificationStore";
import {computed, ref} from 'vue'

export default {
  setup() {
    const show = ref(false);
    const currentNotification = ref(false);
    const store = useNotificationStore();
    const firstNotification = computed(() => store.notifications.length > 0 && store.notifications[0])

    const hide = async () => {
      show.value = false;
      await new Promise((resolve, reject) => setTimeout(() => resolve(), 500));
    }

    const close = async () => {
      await hide();
      if (currentNotification.value) {
        store.remove(currentNotification.value);
      }
    }

    const setNotification = async (notification) => {
      if (show.value) {
        await hide();
      }

      currentNotification.value = notification;
      if (notification) {
        show.value = true;
      }
    }

    return {
      show, currentNotification, store, firstNotification, close, setNotification,
    }
  },

  computed: {
    currentNotificationContent() {
      return this.currentNotification && this.currentNotification.content;
    },
    currentNotificationColor() {
      return this.currentNotification && this.currentNotification.color;
    },
  },

  watch: {
    async firstNotification(newNotification, oldNotification) {
      await this.setNotification(newNotification);
      if (newNotification) {
        await this.store.removeNotification({notification: newNotification, timeout: 3000});
      }
    }
  }

}
</script>

<style scoped>
.info {
  color: blue;
}

.success {
  color: green;
}

.error {
  color: red;
}
</style>