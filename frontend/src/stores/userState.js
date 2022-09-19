import {computed, ref} from "vue";
import {defineStore} from 'pinia';

import router from '@/router';
import {api} from "@/api";
import {getLocalToken, removeLocalToken, saveLocalToken} from '@/utils';
import {notificationStore} from "@/stores/notificationState";

export const userAuthStore = defineStore('auth', () => {
    // properties
    const logInError = ref(false)
    const userProfile = ref(null)
    const token = ref('')
    const isLoggedIn = ref(false)
    const notificationStore = notificationStore()

    // getters
    const hasAdminAccess = computed(() =>
        userProfile.value && userProfile.value.is_superuser && userProfile.value.is_active
    )

    // actions
    async function actionLogIn(username, password) {
        try {
            const response = await api.logInGetToken(username, password);
            const access_token = response.data.access_token;
            if (access_token) {
                saveLocalToken(access_token);
                token.value = access_token;
                isLoggedIn.value = true;
                logInError.value = false;
                await actionGetUserProfile();
                await actionRouteLoggedIn();
                await router.push({name: 'private-dashboard'});
            } else {
                await this.actionLogOut();
            }
        } catch (err) {
            logInError.value = true;
            await this.actionLogOut();
        }
    }

    async function actionGetUserProfile() {
        try {
            const response = await api.getMe(token.value);
            if (response.data) {
                userProfile.value = response.data;
            }
        } catch (error) {
            await this.actionCheckApiError(error);
        }
    }

    async function actionUpdateUserProfile(payload) {
        try {
            const loadingNotification = {content: 'saving', showProgress: true};
            notificationStore.add(loadingNotification);
            const response = (await Promise.all([
                api.updateMe(token.value, payload),
                await new Promise((resolve) => setTimeout(() => resolve(), 500)),
            ]))[0];
            userProfile.value = response.data;
            notificationStore.remove(loadingNotification);
            notificationStore.add({content: 'Profile successfully updated', color: 'success'});
            await router.push({name: 'private-account'});
        } catch (error) {
            await actionCheckApiError(error);
        }
    }

    async function actionCheckLoggedIn() {
        if (isLoggedIn.value) {
            let current_token = token.value;
            if (!current_token) {
                const localToken = getLocalToken();
                if (localToken) {
                    current_token = localToken;
                }
            }
            if (current_token) {
                try {
                    const response = await api.getMe(current_token);
                    isLoggedIn.value = true;
                    userProfile.value = response.data;
                } catch (error) {
                    await actionRemoveLogIn();
                }
            } else {
                await actionRemoveLogIn();
            }
        }
    }

    async function actionRemoveLogIn() {
        removeLocalToken();
        token.value = '';
        isLoggedIn.value = false;
    }

    async function actionLogOut() {
        await actionRemoveLogIn();
        await actionRouteLogOut();
    }

    async function actionUserLogOut() {
        await actionLogOut();
        notificationStore.add({content: 'Logged out', color: 'success'});
    }

    function actionRouteLogOut() {
        if (router.currentRoute.path !== '/login') {
            router.push({name: 'login'});
        }
    }

    async function actionCheckApiError(payload) {
        if (payload.response.status === 401) {
            await this.actionLogOut();
        }
    }

    function actionRouteLoggedIn() {
        if (router.currentRoute.path === '/login' || router.currentRoute.path === '/') {
            router.push({name: 'private-dashboard'});
        }
    }

    async function passwordRecovery(username) {
        try {
            const response = (await Promise.all([
                api.passwordRecovery(username),
                await new Promise((resolve) => setTimeout(() => resolve(), 500)),
            ]))[0];
            notificationStore.add({content: 'Password recovery email sent', color: 'success'});
            await actionLogOut();
        } catch (error) {
            notificationStore.add({color: 'error', content: 'Incorrect username'});
        }
    }

    async function updatePassword(payload) {
        try {
            await Promise.all([
                api.updatePassword(payload.password, payload.token),
                await new Promise((resolve) => setTimeout(() => resolve(), 500)),
            ]);
            notificationStore.add({content: 'Password successfully reset', color: 'success'});
            await actionLogOut();
        } catch (error) {
            notificationStore.add({color: 'error', content: 'Error resetting password'});
        }
    }

    return {
        isLoggedIn, token, logInError, userProfile,
        hasAdminAccess,
        actionLogIn, actionGetUserProfile, actionUpdateUserProfile,
        // actionCheckLoggedIn,
        // actionRemoveLogIn,
        actionLogOut, actionUserLogOut,
        // actionRouteLogOut,
        actionCheckApiError,
        // actionRouteLoggedIn,
        passwordRecovery,
        //updatePassword
    }
})