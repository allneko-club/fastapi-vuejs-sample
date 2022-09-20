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

    async function actionGetUsers() {
        try {
            const response = await api.getUsers(authStore.token);
            if (response) {
                users.value = response.data
            }
        } catch (error) {
            await authStore.actionCheckApiError(error);
        }
    }

    async function actionUpdateUser(userId, payload) {
        try {
            const loadingNotification = {content: 'saving', showProgress: true};
            notificationStore.add({content: loadingNotification});
            const response = (await Promise.all([
                api.updateUser(authStore.token, userId, payload),
                await new Promise((resolve) => setTimeout(() => resolve(), 500)),
            ]))[0];
            setUser(response.data);
            notificationStore.remove(loadingNotification);
            notificationStore.add({content: 'User successfully updated', color: 'success'});
        } catch (error) {
            await authStore.actionCheckApiError(error);
        }
    }

    async function actionCreateUser(payload) {
        try {
            const loadingNotification = {content: 'saving', showProgress: true};
            notificationStore.add({content: loadingNotification});
            const response = (await Promise.all([
                api.createUser(authStore.token, payload),
                await new Promise((resolve) => setTimeout(() => resolve(), 500)),
            ]))[0];
            setUser(response.data);
            notificationStore.remove(loadingNotification);
            notificationStore.add({content: 'User successfully created', color: 'success'});
        } catch (error) {
            await authStore.actionCheckApiError(error);
        }
    }

    async function actionDeleteUser(userId) {
        console.log('delete user');
        console.log(userId);
        try {
            const response = (await Promise.all([
                api.deleteUser(authStore.token, userId),
                await new Promise((resolve) => setTimeout(() => resolve(), 500)),
            ]))[0];
            deleteUser(userId);
            notificationStore.add({content: 'User successfully deleted', color: 'success'});
        } catch (error) {
            await authStore.actionCheckApiError(error);
        }
    }

    return {
        users,
        getUserById,
        setUser,
        actionGetUsers,
        actionCreateUser,
        actionUpdateUser,
        actionDeleteUser,
    }
})
