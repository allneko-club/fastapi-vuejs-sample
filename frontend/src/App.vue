<template>

  <Header />
  <router-view></router-view>
<!--  <NotificationsManager />-->

</template>

<script>
import Header from "@/components/Header.vue";
// import NotificationsManager from "@/components/NotificationsManager";

export default {
  name: 'App',
  components: {Header}
}
</script>

<style scoped>
</style>
