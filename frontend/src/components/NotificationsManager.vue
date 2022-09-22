<template>
  <div v-show="show" :class="currentNotificationColor">
    {{ currentNotificationContent }}
    <button @click="close">Close</button>
  </div>
</template>

<script>
import {useNotificationStore} from "@/stores/useNotificationStore";
import {computed, ref, watch} from 'vue'

export default {
  setup(props, context) {
    const show = ref(false);
    const currentNotification = ref(false);
    const store = useNotificationStore();
    const firstNotification = computed(() => store.notifications.length > 0 && store.notifications[0])

    const currentNotificationContent = computed(
        () => currentNotification.value && currentNotification.value.content
    )
    const currentNotificationColor = computed(
        () => currentNotification.value && currentNotification.value.color || 'info'
    )

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

    const updateNotification = async (newNotification, oldNotification) => {
      if (show.value) {
        await hide();
      }
      if (oldNotification) {
        store.remove(oldNotification)
      }
      currentNotification.value = newNotification;
      if (newNotification) {
        show.value = true;
        store.removeNotification(newNotification, 3000);
      }
    }
    watch(firstNotification, updateNotification)

    return {show, currentNotificationContent, currentNotificationColor, close}
  },
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