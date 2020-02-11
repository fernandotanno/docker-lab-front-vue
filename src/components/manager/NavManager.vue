<template>
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
      <v-list-item v-for="item in itensMenu" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{item.title}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <template>
      <Logout v-slot:append></Logout>
    </template>
  </v-navigation-drawer>
</template>

<script>
import Logout from "@/components/Logout";

export default {
  components: { Logout },
  data() {
    return {
      itensMenu: [
        { title: "DashBoard", icon: "mdi-view-dashboard" },
        { title: "Usuários", icon: "mdi-account" }
      ],
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
  methods: {}
};
</script>

<style>
</style>