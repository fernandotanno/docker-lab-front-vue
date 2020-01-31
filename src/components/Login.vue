<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>DockerLab - Acesso ao Sistema</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    id="email"
                    label="Email"
                    v-model="user.email"
                    prepend-icon="mdi-mail"
                    type="text"
                  />
                  <v-text-field
                    id="password"
                    label="Password"
                    v-model="user.password"
                    prepend-icon="mdi-lock"
                    type="password"
                  />
                  <v-text-field
                    id="access"
                    label="Nivel"
                    v-model="user.access"
                    prepend-icon="mdi-lock"
                    type="text"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-flex xs12 text-xs-rigth>
                  <v-btn class="ma-2" @click="logar" color="primary" dark>
                    <v-icon rigth dark>mdi-check</v-icon>Logar
                  </v-btn>
                </v-flex>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  created() {
    //console.log('exec!!!')
    // this.$http.post('users', {
    //   username:'Teste api vue',
    //   email: 'teste@apivue.com.br',
    //   password: '123456',
    //   access: 'manager'
    // }).then(res => console.log(res))
  },
  data() {
    return {
      token: [],
      user: {
        email: "",
        password: "",
        access: ""
      }
    };
  },
  props: {
    source: String
  },
  methods: {
    logar() {
      this.$http.post("login", this.user).then(res => {
        this.token = res.data.data.token;
        this.$http.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        // this.token = res.data
        alert(this.token);
      });
    }
  }
};
</script>

