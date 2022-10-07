import {computed, ref} from 'vue';
import {defineStore} from 'pinia';
import {useRouter} from 'vue-router'

import {api} from '@/api';
import {getLocalToken, removeLocalToken, saveLocalToken} from '@/localStorage';
import {useNotificationStore} from '@/stores/useNotificationStore';

export const useAuthStore = defineStore('auth', () => {
    // properties
    const loginError = ref(false);
    const userProfile = ref(null);
    const token = ref('');
    const isLoggedIn = ref(false);
    const notificationStore = useNotificationStore();
    const router = ref(useRouter());

    // getters
    const hasAdminAccess = computed(() =>
        isLoggedIn.value && userProfile.value && userProfile.value.is_superuser
    )

    // actions
    async function login(username, password) {
        try {
            const response = await api.loginGetToken(username, password);
            const access_token = response.data.access_token;
            if (access_token) {
                saveLocalToken(access_token);
                token.value = access_token;
                isLoggedIn.value = true;
                loginError.value = false;
                await fetchUserProfile();
            } else {
                loginError.value = true;
                await logout();
            }
        } catch (err) {
            loginError.value = true;
            await logout();
        }
    }

    async function userLogout() {
        await logout();
        notificationStore.add({content: 'Logged out', color: 'success'});
    }

    async function logout() {
        await removeLogin();
        await router.value.push({name: 'login'});
    }

    async function removeLogin() {
        removeLocalToken();
        token.value = '';
        isLoggedIn.value = false;
    }

    async function fetchUserProfile() {
        try {
            const response = await api.getMe(token.value);
            if (response.data) {
                userProfile.value = response.data;
            }
        } catch (error) {
            await this.checkApiError(error);
        }
    }

    async function updateUserProfile(data) {
        try {
            const loadingNotification = {content: 'saving'};
            notificationStore.add(loadingNotification);
            const response = (await Promise.all([
                api.updateMe(token.value, data),
                await new Promise((resolve) => setTimeout(() => resolve(), 500)),
            ]))[0];
            userProfile.value = response.data;
            notificationStore.remove(loadingNotification);
            notificationStore.add({content: 'Profile successfully updated', color: 'success'});
        } catch (error) {
            await checkApiError(error);
        }
    }

    async function checkLoggedIn() {
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
                    await removeLogin();
                }
            } else {
                await removeLogin();
            }
        }
    }

    async function checkApiError(error) {
        console.log(error);
        if ( 401 <= error.response.status) {
            await logout();
        }
    }

    async function resetPassword(email) {
        try {
            const response = (await Promise.all([
                api.resetPassword(email),
                await new Promise((resolve) => setTimeout(() => resolve(), 500)),
            ]))[0];
            notificationStore.add({content: 'Password reset email sent', color: 'success'});
            await logout();
        } catch (error) {
            notificationStore.add({color: 'error', content: 'Incorrect username'});
        }
    }

    async function resetPasswordConfirm(new_password, token) {
        try {
            await Promise.all([
                api.resetPasswordConfirm(new_password, token),
                await new Promise((resolve) => setTimeout(() => resolve(), 500)),
            ]);
            notificationStore.add({content: 'Password successfully reset', color: 'success'});
            await logout();
        } catch (error) {
            notificationStore.add({content: 'Error resetting password', color: 'error'});
        }
    }

    return {
        isLoggedIn,
        loginError,
        token,
        userProfile,
        hasAdminAccess,
        login,
        checkLoggedIn,
        userLogout,
        checkApiError,
        updateUserProfile,
        resetPassword,
        resetPasswordConfirm
    }
})