<template  >
  <div class="pa-2">
    <v-btn fab small dark color="error" @click="logout">
      <v-icon dark rigth>mdi-power-standby</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      this.$router.push("login");
    }
  }
};
</script>

<style>
</style>