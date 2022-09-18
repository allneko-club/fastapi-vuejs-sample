<template>
    <div>
        <v-snackbar auto-height :color="currentNotificationColor" v-model="show">
            <v-progress-circular class="ma-2" indeterminate v-show="showProgress"></v-progress-circular>{{ currentNotificationContent }}
            <v-btn flat @click.native="close">Close</v-btn>
        </v-snackbar>
    </div>
</template>

<script>
import { userAuthStore } from "@/stores/userState";

export default {
  setup(){
    const authStore = userAuthStore();
    return {
      authStore,
    }
  },
  data() {
    return {
      show: false,
      text: '',
      showProgress: false,
      currentNotification: false,
    }
  },
  methods: {
    async hide() {
        this.show = false;
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 500));
    },

    async close() {
        await this.hide();
        await this.removeCurrentNotification();
    },

    async removeCurrentNotification() {
        if (this.currentNotification) {
            this.authStore.removeNotification(this.currentNotification);
        }
    },

    firstNotification() {
        return this.authStore.firstNotification;
    },

    async setNotification(notification) {
        if (this.show) {
            await this.hide();
        }
        if (notification) {
            this.currentNotification = notification;
            this.showProgress = notification.showProgress || false;
            this.show = true;
        } else {
            this.currentNotification = false;
        }
    },

    // @Watch('firstNotification')
    async onNotificationChange(newNotification, oldNotification) {
        if (newNotification !== this.currentNotification) {
            await this.setNotification(newNotification);
            if (newNotification) {
                this.authStore.removeNotification({ notification: newNotification, timeout: 6500 });
            }
        }
    },

    currentNotificationContent() {
        return this.currentNotification && this.currentNotification.content || '';
    },

    currentNotificationColor() {
        return this.currentNotification && this.currentNotification.color || 'info';
    }
  }
}
// import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
// import { commitRemoveNotification } from '@/store/main/mutations';
// import { readFirstNotification } from '@/store/main/getters';
// import { dispatchRemoveNotification } from '@/store/main/actions';

// export default {
//     public show = false;
//     public text = '';
//     public showProgress = false;
//     public currentNotification | false = false;
//
//     public async hide() {
//         this.show = false;
//         await new Promise((resolve, reject) => setTimeout(() => resolve(), 500));
//     }
//
//     public async close() {
//         await this.hide();
//         await this.removeCurrentNotification();
//     }
//
//     public async removeCurrentNotification() {
//         if (this.currentNotification) {
//             commitRemoveNotification(this.authStore, this.currentNotification);
//         }
//     }
//
//     public get firstNotification() {
//         return readFirstNotification(this.$store);
//     }
//
//     public async setNotification(notification | false) {
//         if (this.show) {
//             await this.hide();
//         }
//         if (notification) {
//             this.currentNotification = notification;
//             this.showProgress = notification.showProgress || false;
//             this.show = true;
//         } else {
//             this.currentNotification = false;
//         }
//     }
//
//     @Watch('firstNotification')
//     public async onNotificationChange(
//         newNotification | false,
//         oldNotification | false,
//     ) {
//         if (newNotification !== this.currentNotification) {
//             await this.setNotification(newNotification);
//             if (newNotification) {
//                 dispatchRemoveNotification(this.$store, { notification: newNotification, timeout: 6500 });
//             }
//         }
//     }
//
//     public get currentNotificationContent() {
//         return this.currentNotification && this.currentNotification.content || '';
//     }
//
//     public get currentNotificationColor() {
//         return this.currentNotification && this.currentNotification.color || 'info';
//     }
// }
</script>
