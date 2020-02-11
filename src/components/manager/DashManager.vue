<template>
  <v-app>
    <NavManager />
    <AppBarManager />
    <ContentManager />
    <!-- <User/> -->
  </v-app>
</template>

<script>
import NavManager from "@/components/manager/NavManager";
import AppBarManager from "@/components/manager/AppBarManager";
import ContentManager from "@/components/manager/ContentManager";
// import User from "@/components/users/Users"

export default {
  components: {
    AppBarManager,
    NavManager,
    ContentManager
    // User,
  }
};
</script>

<style>
</style>