<template>
  <v-app id="app">
    <router-view class="app"></router-view>
    <!-- <DashManager /> -->
  </v-app>
</template>

<script>
// import DashManager from "@/components/manager/DashManager";
export default {
  name: "App",

  components: {
    // DashManager
  },

  data: () => ({
    //
  })
};
</script>
