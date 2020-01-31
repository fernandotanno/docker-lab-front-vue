<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md12>
        <v-card>
          <v-card-title>Usuário</v-card-title>
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md12>
                  <v-text-field v-model="user.username" :counter="60" label="Nome" required></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="user.email" label="E-mail" required></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="user.password" label="Senha" type="password" required></v-text-field>
                </v-flex>
                <v-flex xs12 md4>
                  <v-select v-model="user.access" :items="access" label="Nível" required></v-select>
                </v-flex>
                <v-flex xs12 md4>
                  <v-checkbox v-model="user.status" label="Ativo?" required></v-checkbox>
                </v-flex>
                <v-flex xs12 text-xs-rigth>
                  <v-btn class="ma-2" @click="salvar" color="success" dark>
                    <v-icon left>mdi-check-circle-outline</v-icon>Salvar
                  </v-btn>
                  <v-btn class="ma-2" @click="listar" color="primary" dark>
                    <v-icon left>mdi-check-circle-outline</v-icon>Listar
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card>
        <br />
        <v-card>
          <v-card-title>Lista de Usuários</v-card-title>
          <v-simple-table id="listaUsers">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">ID</th>
                  <th class="text-left">Nome</th>
                  <th class="text-left">Email</th>
                  <th class="text-left">Nível</th>
                  <th class="text-left">Ativo ?</th>
                  <th class="text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td>{{user.id}}</td>
                  <td>{{user.username}}</td>
                  <td>{{user.email}}</td>
                  <td>{{user.access}}</td>
                  <td>{{user.status}}</td>
                  <td>
                    <v-btn text icon color="green" @click="carregar(user.id)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn text icon color="red" @click="excluir(user.id)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
        <br />
        <template>
          <v-data-table
            :headers="headers"
            :items="usuarios"
            :items-per-page="10"
            sort-by="username"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Cadastrar Usuários</v-toolbar-title>
                <v-divider class="mx-4" insert vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark class="ma-2" v-on="on">
                      <v-icon left>mdi-plus</v-icon>Novo Usuário
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
                      <v-space></v-space>
                      <v-btn class="my-2" flat @click="fechar" color="red" dark>
                        <v-icon left>mdi-close</v-icon>Cancelar
                      </v-btn>
                      <v-btn class="my-2" @click="salvarUsuario" color="primary" dark>
                        <v-icon left>mdi-checkbox-marked-circle</v-icon>Salvar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
              <v-icon small color="primary" class="mr-2" @click="editarUsuario(item)">mdi-pencil</v-icon>
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
    dialog: false,
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
        (this.id = null);
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
         .then(() => this.listarUsuarios());

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
        Object.assign(this.usuarios[this.indexEditar], this.usuarioEditado);
      } else {
        this.usuarios.push(this.usuarioEditado);
      }
      this.fechar();
    }
  }
};
</script>

<style>
</style>