import {computed, ref} from "vue";
import {defineStore} from 'pinia';
import {useRouter} from 'vue-router'

import {api} from "@/api";
import {getLocalToken, removeLocalToken, saveLocalToken} from '@/localStorage';

export const useAuthStore = defineStore('auth', () => {
    // properties
    const loginError = ref(false)
    const userProfile = ref(null)
    const token = ref('')
    const isLoggedIn = ref(false)
    const router = ref(useRouter());

    // getters
    const hasAdminAccess = computed(() =>
        isLoggedIn.value && userProfile.value && userProfile.value.is_superuser
    )

    // actions
    async function login(username, password) {
        try {
            const response = await api.logInGetToken(username, password);
            const access_token = response.data.access_token;
            if (access_token) {
                saveLocalToken(access_token);
                token.value = access_token;
                isLoggedIn.value = true;
                loginError.value = false;
                await fetchUserProfile();
                await actionRouteLoggedIn();
            } else {
                await logout();
            }
        } catch (err) {
            loginError.value = true;
            await logout();
        }
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

    async function updateUserProfile(payload) {
        try {
            const response = (await Promise.all([
                api.updateMe(token.value, payload),
                await new Promise((resolve) => setTimeout(() => resolve(), 500)),
            ]))[0];
            userProfile.value = response.data;
            console.log('Profile successfully updated (success)');
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
                    // todo status code checkなくても良いか？
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

    async function removeLogin() {
        removeLocalToken();
        token.value = '';
        isLoggedIn.value = false;
    }

    async function logout() {
        await removeLogin();
        await router.value.push({name: 'login'});
    }

    async function userLogout() {
        await logout();
        console.log('logged out (success)');
    }

    async function checkApiError(payload) {
        if (payload.response.status === 401) {
            await logout();
        }
    }

    function actionRouteLoggedIn() {
        if (router.value.currentRoute.name === 'login' || router.value.currentRoute.name === 'home') {
            router.value.push({name: 'private'});
        }
    }

    async function resetPassword(username) {
        try {
            const response = (await Promise.all([
                api.resetPassword(username),
                await new Promise((resolve) => setTimeout(() => resolve(), 500)),
            ]))[0];
            console.log('Password recovery email sent (success)');
            await logout();
        } catch (error) {
            console.log('Incorrect (error)');
        }
    }

    async function updatePassword(payload) {
        try {
            await Promise.all([
                api.updatePassword(payload.password, payload.token),
                await new Promise((resolve) => setTimeout(() => resolve(), 500)),
            ]);
            console.log('Password successfully reset (success)');
            await logout();
        } catch (error) {
            console.log('Error resetting password (error)');
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
        updatePassword
    }
})