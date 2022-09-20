import {computed, ref} from "vue";
import {defineStore} from 'pinia';


export const useNotificationStore = defineStore('notification', () => {
    // properties
    const notifications = ref([])

    // getters
    const hasNotification = computed(() => notifications.value.length > 0)

    // actions
    function add(payload) {
        notifications.value.push(payload);
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

    return {hasNotification, add, remove, removeNotification}
})