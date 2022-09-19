import { ref, computed} from "vue";
import { defineStore } from 'pinia';

import { api } from "@/api";
import {userAuthStore} from "@/stores/userState";
import router from "@/router";

export const adminStore = defineStore('admin', () => {
    // properties
    const users = ref([])
    const authStore = userAuthStore();

    // getters
    const getUserById = computed(() => (userId) => {
        const filteredUsers = users.value.filter((user) => user.id === Number(userId));
        if (filteredUsers.length > 0) {
            return { ...filteredUsers[0] };
        }
    })

    // actions
    function setUser(payload) {
        const new_users = users.value.filter((user) => user.id !== payload.id);
        new_users.push(payload);
        users.value.users = new_users;
    }

    function deleteUser(userId) {
        users.value.users = users.value.filter((user) => user.id !== userId);
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
            const loadingNotification = { content: 'saving', showProgress: true };
            authStore.addNotification({ content: loadingNotification});
            const response = (await Promise.all([
                api.updateUser(authStore.token, userId, payload),
                await new Promise((resolve) => setTimeout(() => resolve(), 500)),
            ]))[0];
            setUser(response.data);
            authStore.removeNotification(loadingNotification);
            authStore.addNotification({ content: 'User successfully updated', color: 'success' });
            router.push({name: 'admin-users-update'});
        } catch (error) {
            await authStore.actionCheckApiError(error);
        }
    }

    async function actionCreateUser(payload) {
        try {
            const loadingNotification = { content: 'saving', showProgress: true };
            authStore.addNotification({ content: loadingNotification});
            const response = (await Promise.all([
                api.createUser(authStore.token, payload),
                await new Promise((resolve) => setTimeout(() => resolve(), 500)),
            ]))[0];
            setUser(response.data);
            authStore.removeNotification(loadingNotification);
            authStore.addNotification({ content: 'User successfully created', color: 'success' });
            router.push({name: 'admin-users'});
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
            authStore.addNotification({ content: 'User successfully deleted', color: 'success' });
        } catch (error) {
            await authStore.actionCheckApiError(error);
        }
    }

    return {
        users, getUserById, setUser, actionGetUsers, actionUpdateUser, actionCreateUser, actionDeleteUser
    }
})
