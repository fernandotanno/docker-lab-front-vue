<template>
  <v-content>
    <v-container class="fill-height fluid">
      <UserManager />
      <router-view></router-view>
    </v-container>
  </v-content>
</template>

<script>
import UserManager from "@/components/users/Users";
export default {
  components: {
    UserManager
  }
};
</script>

<style>
</style>