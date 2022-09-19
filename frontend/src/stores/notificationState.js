import {computed, ref} from "vue";
import {defineStore} from 'pinia';

export const notificationStore = defineStore('notification', () => {
    // properties
    const notifications = ref([])

    // getters
    const firstNotification = computed(() => notifications.value.length > 0 && notifications.value[0])

    // actions
    function add(payload) {
        console.log('addNotification: {}', payload);
        notifications.value.push(payload);
    }

    function remove(payload) {
        notifications.value = notifications.value.filter((notification) => notification !== payload);
    }

    async function actionRemoveNotification(payload) {
        return new Promise((resolve) => {
            setTimeout(() => {
                remove(payload.notification);
                resolve(true);
            }, payload.timeout);
        });
    }

    return {
        add,
        remove,
        actionRemoveNotification,
    }
})