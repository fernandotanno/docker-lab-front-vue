<template>
  <v-app>
    <v-navigation-drawer
      app
      v-model="drawer"
      :mini-variant.sync="miniVariant"
      :src="bg"
      :color="color"
      :dark="dark"
      :expand-on-hover="expandOnHover"
    >
      <v-list dense nav class="py-0">
        <v-list-item two-line :class="miniVariant && 'px-0'">
          <v-list-item-avatar>
            <v-img src="https://demos.creative-tim.com/vuetify-material-dashboard/favicon.ico" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="title">DashBoard</v-list-item-title>
            <v-list-item-subtitle>Modelo</v-list-item-subtitle>
          </v-list-item-content>
          <v-btn icon @click.stop="miniVariant = !miniVariant">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item two-line :class="miniVariant && 'px-0'">
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ user.username }}</v-list-item-title>
            <v-list-item-subtitle>{{user.access}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <!-- <v-list-item @click="users" link> -->
        <v-list-item @click="users">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Usuários</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <template>
        <Logout v-slot:append></Logout>
      </template>
    </v-navigation-drawer>
    <!-- <v-app-bar app color="blue-grey lighten-5" shrink-on-scroll prominent>
        <v-spacer></v-spacer>
        <v-toolbar-title>DashBoard - Manager</v-toolbar-title>
        <v-spacer></v-spacer>
    </v-app-bar>-->

    <!-- <v-card class="overflow-hidden"> -->
    <v-app-bar app absolute color="blue-grey lighten-5" dense shrink-on-scroll>
      <v-spacer></v-spacer>
      <v-toolbar-title>DashBoard - Manager</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <!-- </v-card> -->

    <!-- <v-container id="containerDashManager" app fill-height fluid grid-list-xl>
      <v-layout wrap>
        <v-flex md12 sm12 lg4>
        <router-view class="user" name="users"></router-view>
        </v-flex>
      </v-layout>
    </v-container>-->

    <v-content app>
      <v-container class="fill-height fluid">
        <!-- <User /> -->

        <router-view name="users"></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// import User from "@/components/users/Users";

import Logout from "@/components/Logout";

export default {
  components: {
    Logout
    // User,
  },
  data() {
    return {
      drawer: true,
      miniVariant: false,
      color: "blue",
      dark: true,
      background: true,
      expandOnHover: false,
      user: JSON.parse(localStorage.getItem("user"))
    };
  },
  computed: {
    bg() {
      return this.background
        ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        : undefined;
    }
  },
  methods: {
    users() {
      this.$router.push({ path: "/users" });
    }
  }
};
</script>

<style>
</style>