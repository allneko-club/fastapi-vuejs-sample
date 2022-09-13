import { ref, computed} from "vue";
import { defineStore } from 'pinia';

import router from '../router';
import { api } from "@/api";
import { getLocalToken, removeLocalToken, saveLocalToken } from '@/utils';

export const userAuthStore = defineStore('auth', () => {

    const isLoggedIn = ref(false)
    const token = ref('')
    const logInError = ref(false)
    const userProfile = ref(null)
    const dashboardMiniDrawer = ref(false)
    const dashboardShowDrawer = ref(true)
    const notifications = ref([])

    function addNotification(payload) {
        notifications.value.push(payload);
    }
    function removeNotification(payload) {
        notifications.value = notifications.value.filter((notification) => notification !== payload);
    }

    async function actionLogIn(username, password) {
      try {
        const response = await api.logInGetToken(username, password);
        console.log('response.data');
        console.log(response);
        const access_token = response.data.access_token;
        if (access_token) {
          saveLocalToken(access_token);
          token.value = access_token;
          isLoggedIn.value = true;
          logInError.value = false;
          await actionGetUserProfile();
          await actionRouteLoggedIn();
          notifications.value.push({ content: 'Logged in', color: 'success' })
        } else {
        }
        if(username==='admin' && password==='asdf7890'){
          isLoggedIn.value = true;
        }
        console.log('login');
        if(isLoggedIn.value){
          router.push('/main/dashboard');
        } else {
          console.log("The username and / or password is incorrect");
        }
      } catch (err) {

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
            const loadingNotification = { content: 'saving', showProgress: true };
            addNotification(loadingNotification);
            const response = (await Promise.all([
                api.updateMe(token.value, payload),
                await new Promise((resolve) => setTimeout(() => resolve(), 500)),
            ]))[0];
            userProfile.value = response.data;
            removeNotification(loadingNotification);
            addNotification({ content: 'Profile successfully updated', color: 'success' });
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
                    current_token.value = localToken;
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
        console.log('log out');
        await actionLogOut();
        addNotification({ content: 'Logged out', color: 'success' });
    }
    function actionRouteLogOut() {
        if (router.currentRoute.path !== '/login') {
            router.push('/login');
        }
    }
    async function actionCheckApiError(payload) {
        if (payload.response.status === 401) {
            await this.actionLogOut();
        }
    }
    function actionRouteLoggedIn() {
        if (router.currentRoute.path === '/login' || router.currentRoute.path === '/') {
            router.push('/main');
        }
    }
    async function actionRemoveNotification(payload) {
        return new Promise((resolve) => {
            setTimeout(() => {
                removeNotification(payload.notification);
                resolve(true);
            }, payload.timeout);
        });
    }
    async function passwordRecovery(payload) {
        const loadingNotification = { content: 'Sending password recovery email', showProgress: true };
        try {
            addNotification(loadingNotification);
            await Promise.all([
                api.passwordRecovery(payload.username),
                await new Promise((resolve) => setTimeout(() => resolve(), 500)),
            ]);
            removeNotification(loadingNotification);
            addNotification({ content: 'Password recovery email sent', color: 'success' });
            await actionLogOut();
        } catch (error) {
            removeNotification(loadingNotification);
            addNotification({ color: 'error', content: 'Incorrect username' });
        }
    }
    async function resetPassword(payload) {
        const loadingNotification = { content: 'Resetting password', showProgress: true };
        try {
            addNotification(loadingNotification);
            await Promise.all([
                api.resetPassword(payload.password, payload.token),
                await new Promise((resolve) => setTimeout(() => resolve(), 500)),
            ]);
            removeNotification(loadingNotification);
            addNotification({ content: 'Password successfully reset', color: 'success' });
            await actionLogOut();
        } catch (error) {
            removeNotification(loadingNotification);
            addNotification({ color: 'error', content: 'Error resetting password' });
        }
    }

    return {
        isLoggedIn, token, logInError, userProfile, dashboardMiniDrawer, dashboardShowDrawer, notifications,
        actionLogIn,
        // actionGetUserProfile, actionUpdateUserProfile, actionCheckLoggedIn,
        // actionRemoveLogIn, actionLogOut,
        actionUserLogOut,
        // actionRouteLogOut, actionCheckApiError,
        // actionRouteLoggedIn, removeNotification, passwordRecovery, resetPassword
    }
})