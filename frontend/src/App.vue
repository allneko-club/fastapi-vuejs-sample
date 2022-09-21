<template>
  <router-view></router-view>
  <NotificationsManager />
</template>

<script>
import NotificationsManager from "@/components/NotificationsManager.vue";
export default {
  name: "App",
  components: {NotificationsManager},
}
</script>

<style scoped>
</style>
