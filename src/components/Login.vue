<template>
  <v-app id="login">
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
                <v-form ref="formLogin" v-model="valid" lazy-validation>
                  <v-text-field
                    id="email"
                    label="E-mail"
                    v-model="user.email"
                    :rules="emailValidation"
                    prepend-icon="mdi-mail"
                    type="text"
                    required
                  />
                  <v-text-field
                    id="password"
                    label="Senha"
                    v-model="user.password"
                    :rules="passwordValidation"
                    prepend-icon="mdi-lock"
                    type="password"
                    required
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
  created() {},
  data: () => ({
    dialog: false,
    valid: true,
    emailValidation: [
      v => !!v || "Obrigatório informar o e-mail!",
      v => /.+@.+\..+/.test(v) || "E-mail inválido"
    ],
    passwordValidation: [
      v => (v && v.length > 4) || "Senha deve conter mais de 4 caracteres"
    ],
    user: {
      email: "",
      password: ""
    }
  }),
  props: {
    source: String
  },
  methods: {
    logar(e) {
      e.preventDefault();
      this.$http
        .post("login", this.user)
        .then(res => {
          const access = res.data.user.access;
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("token", res.data.data.token);
          // this.$http.defaults.headers.common[
          //   "Authorization"
          // ] = `Bearer ${token}`;
          if (localStorage.getItem("token") != null) {
            this.$emit("loggedIn");
            // this.$http.defaults.headers.common[
            //   "Authorization"
            // ] = `Bearer ${localStorage.getItem("token")}`;
            if (this.$route.params.nextUrl != null) {
              this.$router.push(this.$route.params.nextUrl);
            } else {
              if (access === "manager") {
                this.$router.push("dashmanager");
              } else if (access === "seller") {
                this.$router.push("dashseller");
              }
            }
          }
        })
        .catch(function(error) {
          if (error.res) {
            alert(`Não autorizado: Email e/ou senha incorretos`);
          }
          alert(`Não autorizado: Email e/ou senha incorretos`);
        });
    }
  }
};
</script>

<style>
</style>