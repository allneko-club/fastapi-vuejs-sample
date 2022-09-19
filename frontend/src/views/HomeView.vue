<template>
  <NotificationsManager />
  <Header />
  <router-view></router-view>
</template>

<script>
import NotificationsManager from "@/components/NotificationsManager.vue";
import Header from "@/components/Header.vue";

export default {
  name: 'Home',
  components: {NotificationsManager, Header}
}

</script>

<style scoped>
</style>