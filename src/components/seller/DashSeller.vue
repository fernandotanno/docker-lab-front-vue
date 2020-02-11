<template>
  <v-app>
    <NavSeller />
    <AppBarSeller />
  </v-app>
</template>

<script>
import NavSeller from "@/components/seller/NavSeller";
import AppBarSeller from "@/components/seller/AppBarSeller";

export default {
  components: {
    AppBarSeller,
    NavSeller
  }
};
</script>

<style>
</style>