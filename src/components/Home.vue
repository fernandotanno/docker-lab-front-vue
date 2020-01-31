<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item @click="home">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="usuario">
          <v-list-item-action>
            <v-icon>mdi-account-box</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Usuário</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="blue"
      dark
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>DockerLabVue</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container>
         
        <router-view/>
      </v-container>
    </v-content>
    <v-footer
      color='blue'
      app
    >
      <span class="white--text">&copy; DockerLabVue - 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
      methods:{
          home(){
              this.$router.push('/')
          },
          usuario(){
              this.$router.push('/users')
          }
      },
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
  }
</script>