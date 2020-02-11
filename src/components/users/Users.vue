<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md12>
        <template>
          <v-data-table
            :headers="headers"
            :items="usuarios"
            :search="search"
            :items-per-page="10"
            sort-by="username"
            class="elevation-4"
          >
            <template v-slot:top>
              <v-toolbar flat color="grey lighten-4">
                <div class="my-2">
                  <v-btn color="blue-grey" dark large class="elevation-4">
                    <v-icon left dark>mdi-account</v-icon>
                    <h2>Usuários</h2>
                  </v-btn>
                </div>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-account-search-outline"
                  label="Buscar"
                  single-line
                  hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark class="ma-2" v-on="on">
                      <v-icon left>mdi-account-plus</v-icon>Novo Usuário
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{formTitle}}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" lg="12" sm="6" md="4">
                            <v-text-field
                              v-model="usuarioEditado.username"
                              :counter="60"
                              label="Nome"
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" lg="8" sm="6" md="4">
                            <v-text-field v-model="usuarioEditado.email" label="E-mail"></v-text-field>
                          </v-col>
                          <v-col cols="12" lg="4" sm="6" md="4">
                            <v-text-field
                              v-model="usuarioEditado.password"
                              label="Senha"
                              type="password"
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" lg="8" sm="6" md="4">
                            <v-select
                              v-model="usuarioEditado.access"
                              :items="nivelAcesso"
                              label="Nível"
                              required
                            ></v-select>
                          </v-col>
                          <v-col cols="12" lg="4" sm="6" md="4">
                            <v-checkbox v-model="usuarioEditado.status" label="Ativo?" required></v-checkbox>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="my-2" @click="fechar" color="warning" dark>
                        <v-icon left>mdi-close-circle-outline</v-icon>Cancelar
                      </v-btn>
                      <v-btn class="my-2" @click="salvarUsuario" color="primary" dark>
                        <v-icon left>mdi-account-check</v-icon>Salvar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
              <v-alert dense type="info" dismissible v-for="error in errors" :key="error">
                {{error}}
              </v-alert>
              <br />
              <h3 class="text-center">Lista de Usuários</h3>
            </template>
            <template v-slot:item.action="{ item }">
              <v-icon
                small
                color="primary"
                class="mr-2"
                @click="editarUsuario(item)"
              >mdi-account-edit</v-icon>
              <v-icon small color="red" @click="deletarUsuario(item)">mdi-delete</v-icon>
            </template>
            <template>
              <v-btn color="primary" @click="listarUsuarios">Reset</v-btn>
            </template>
          </v-data-table>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    users: [],
    id: null,
    user: {
      username: "",
      email: "",
      password: "",
      access: "",
      status: false
    },
    access: ["manager", "seller"],

    // dados datatable -----------
    errors: [],
    dialog: false,
    search: "",
    headers: [
      {
        text: "Id",
        align: "left",
        // sortable: false,
        value: "id"
      },
      { text: "Nome", value: "username" },
      { text: "E-mail", value: "email" },
      { text: "Nível Acesso", value: "access", sortable: false },
      { text: "Ativo?", value: "status", sortable: false },
      { text: "Ações", value: "action", sortable: false }
    ],
    usuarios: [],
    indexEditar: -1,
    usuarioEditado: {
      username: "",
      email: "",
      password: "",
      access: "",
      status: false
    },
    usuarioDefault: {
      username: "",
      email: "",
      password: "",
      access: "",
      status: false
    },
    nivelAcesso: ["manager", "seller"]
  }),
  computed: {
    formTitle() {
      return this.indexEditar === -1 ? "Novo Usuário" : "Editar Usuário";
    }
  },
  watch: {
    dialog(val) {
      val || this.fechar();
    }
  },
  created() {
    // datatable
    this.$http.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    this.listarUsuarios();
  },

  methods: {
    carregar(id) {
      this.id = id;
      this.user = { ...this.users[id] };
    },
    excluir(id) {
      this.$http
        .delete(`users/${id}`)
        .then(() => this.limpar())
        .then(() => this.listar());
    },
    salvar() {
      this.$http
        .post("users", this.user)
        .then(() => this.limpar())
        .then(() => this.listar());
    },
    listar() {
      this.$http.get("users").then(res => {
        this.users = res.data.data;
      });
    },
    limpar() {
      (this.user.username = ""),
        (this.user.email = ""),
        (this.user.password = ""),
        (this.user.access = ""),
        (this.user.status = false),
        (this.id = null),
        (this.errors = []);
    },

    // methodos datatable
    listarUsuarios() {
      this.$http.get("users").then(res => {
        this.usuarios = res.data.data;
      });
    },
    editarUsuario(item) {
      this.indexEditar = this.usuarios.indexOf(item);
      this.usuarioEditado = Object.assign({}, item);
      this.dialog = true;
    },
    deletarUsuario(item) {
      //const index = this.usuarios.indexOf(item);
      confirm("Confirma a exclusão do usuário?") &&
        //this.usuarios.splice(index, 1);
        this.$http
          .delete(`users/${item.id}`)
          .then(() => this.limpar())
          .then(() => this.listarUsuarios())
          // .catch(res => {
          //   this.mensagens.push(res.data.data);
          // });
    },
    fechar() {
      this.dialog = false;
      setTimeout(() => {
        this.usuarioEditado = Object.assign({}, this.usuarioDefault);
        this.indexEditar = -1;
      }, 300);
    },
    salvarUsuario() {
      if (this.indexEditar > -1) {
        //Object.assign(this.usuarios[this.indexEditar], this.usuarioEditado);
        this.$http
          .put(`users/${this.usuarioEditado.id}`, this.usuarioEditado)
          .then(() => this.limpar())
          .then(() => this.listarUsuarios());
      } else {
        //this.usuarios.push(this.usuarioEditado);
        this.$http
          .post("users", this.usuarioEditado)
          .then(() => this.limpar())
          .then(() => this.listarUsuarios());
      }
      this.fechar();
    }
  }
};
</script>

<style>
</style>