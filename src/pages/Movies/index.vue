<template>
  <div>
    <div class="divTable">
      <div
        class="
          d-flex
          align-items-center
          justify-content-start
          mb-1 mb-md-0
          infoTable
        "
      >
        <p class="listagem">
          <b-icon icon="person-bounding-box" />
          Lista de Filmes
        </p>
        <b-form-select
          v-model="perPage"
          :options="pageOptions"
          :clearable="false"
          class="per-page-selector d-inline-block mx-50 input inputselect"
        />
        <b-button @click.prevent="ModalCreate()" class="butao"
          >Adicionar</b-button
        >
        <b-form-input
          debounce="600"
          v-model="search"
          class="pesquisa h-75 input shadow-none"
          placeholder="Pesquisar"
        />
      </div>
      <b-table
        :fields="filds"
        :items="sessions"
        :per-page="perPage"
        :current-page="currentPage"
        :filter="search"
        empty-text="Nenhum dado encontrado."
        empty-filtered-text="Nenhum dado encontrado."
        show-empty
        class="tabela"
        outlined
        striped
        borderless
        bordered
        hover
        responsive
      >
        <template #head(name)="data">
          <span class="d-flex justify-content-center">{{
            data.label.toUpperCase()
          }}</span>
        </template>
        <template #head(title)="data">
          <span class="d-flex justify-content-center">{{
            data.label.toUpperCase()
          }}</span>
        </template>
        <template #head(year)="data">
          <span class="d-flex justify-content-center">{{
            data.label.toUpperCase()
          }}</span>
        </template>
        <template #head(plot)="data">
          <span class="d-flex justify-content-center">{{
            data.label.toUpperCase()
          }}</span>
        </template>
        <template #head(actions)="data">
          <span class="d-flex justify-content-center">{{
            data.label.toUpperCase()
          }}</span>
        </template>
        <template #cell(plot)="data">
        <b-card-text class="styleInfo">
          {{data.item.plot}}
        </b-card-text>
      </template>

        <template v-slot:cell(actions)="data">
          <b-dropdown variant="link" no-caret class="iconp">
            <template #button-content>
              <b-icon icon="three-dots-vertical" />
            </template>
            <b-dropdown-item @click.prevent="ModalEdit(data.item)">
              <b-icon icon="pencil-square" />
              <span class="align-middle ml-50">Editar</span>
            </b-dropdown-item>

            <b-dropdown-item @click.prevent="ModalConfirm(data.item)">
              <b-icon icon="trash" />
              <span class="align-middle ml-50">Deletar</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>
        <template v-slot:cell(detalhes)="data">
          <b-button
            variant="link"
            no-caret
            class="iconp"
            @click.prevent="ModalVisu(data.item)"
          >
            <b-icon icon="eye-fill" />
          </b-button>
        </template>
      </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="totalrows"
        :per-page="perPage"
        pills
        hide-goto-end-buttons
        first-number
        last-number
        class="mb-0 mt-1 mt-sm-0 infoTable"
        prev-class="prev-item"
        next-class="next-item"
      >
        <template #prev-text>
          <b-icon icon="arrow-left" />
        </template>
        <template #next-text>
          <b-icon icon="arrow-right" />
        </template>
      </b-pagination>
      <b-modal
        id="modal-login"
        hide-footer
        hide-header-close
        header-text-variant="light"
        header-bg-variant="dark"
        title="Editar Filme"
      >
        <b-form>
          <b-form-group class="pb-3 InputPosition">
            <p class="sub">Titulo</p>
            <b-input
              type="text"
              class="inputEdit shadow-none"
              v-model="conteudotable.title"
            />
          </b-form-group>
          <b-form-group class="pb-3 InputPosition">
            <p class="sub">Descrição</p>
            <b-input
              type="email"
              id="email"
              class="inputEdit shadow-none"
              v-model="conteudotable.plot"
            />
          </b-form-group>
          <b-form-group class="pb-3 InputPosition">
            <p class="sub">Senha</p>
            <b-input
              type="password"
              class="inputEdit shadow-none"
              v-model="conteudotable.year"
            />
          </b-form-group>
          <div class="d-flex justify-content-between btn-size">
            <b-button @click.prevent="Editar()" variant="outline-success">
              Atualizar
            </b-button>
            <b-button @click.prevent="hideModal()" variant="outline-danger">
              Cancelar
            </b-button>
          </div>
        </b-form>
      </b-modal>
      <b-modal
        id="modal-danger"
        hide-footer
        hide-header-close
        header-bg-variant="dark"
        header-text-variant="light"
        title="Deletar Funcionário"
        ref="modal-fechar"
      >
        <b-card-text> Deseja excluir este usuário? </b-card-text>
        <div class="d-flex justify-content-between btn-size">
          <b-button @click.prevent="Deletar()" variant="outline-danger">
            Excluir
          </b-button>
          <b-button @click.prevent="hideModal()" variant="outline-dark">
            Cancelar
          </b-button>
        </div>
      </b-modal>
      <b-modal
        id="modal-create"
        hide-footer
        hide-header-close
        header-text-variant="light"
        header-bg-variant="dark"
        title="Criar Funcionário"
      >
        <b-form>
          <b-form-group class="InputPosition">
            <p class="sub">Nome</p>
            <b-input
              type="text"
              class="inputEdit shadow-none"
              v-model="usuario.name"
            />
          </b-form-group>
          <b-form-group class="InputPosition">
            <p class="sub">Email</p>
            <b-input
              type="email"
              id="email"
              class="inputEdit shadow-none"
              v-model="usuario.email"
            />
          </b-form-group>
          <b-form-group class="InputPosition">
            <p class="sub">Senha</p>
            <b-input
              type="password"
              class="inputEdit shadow-none"
              v-model="usuario.password"
            />
          </b-form-group>
          <div class="d-flex justify-content-between btn-size">
            <b-button @click.prevent="Cadastro()" variant="outline-success">
              Criar
            </b-button>
            <b-button @click.prevent="hideModal()" variant="outline-danger">
              Cancelar
            </b-button>
          </div>
        </b-form>
      </b-modal>
      <b-modal
        id="modal-visualizar"
        hide-footer
        hide-header-close
        header-text-variant="light"
        header-bg-variant="dark"
        title="Visualizar Filme"
        size="lg"
      >
        <b-card no-body class="overflow-hidden teste">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img
                :src="conteudotable.poster"
                alt="Image"
                class="rounded-0"
              ></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body>
                <b-card-title>{{ conteudotable.title }}</b-card-title>
                <b-card-sub-title>{{ conteudotable.year }}</b-card-sub-title>
                <b-card-text>
                  {{ conteudotable.plot }}
                </b-card-text>
                Genêros:
                <b-card-text class="d-flex genres">
                  <b-card-sub-title
                    v-for="(item, index) of conteudotable.genres"
                    :key="index"
                  >
                    {{ item }}
                  </b-card-sub-title>
                </b-card-text>
                Elenco:
                <b-card-text class="d-flex genres">
                  <b-card-sub-title
                    v-for="(item, index) of conteudotable.cast"
                    :key="index"
                  >
                    {{ item }}
                  </b-card-sub-title>
                </b-card-text>
                Rating:
                <b-card-text class="d-flex genres">    
                  <b-card-sub-title>
                     {{ conteudotable.imdb ? conteudotable.imdb.rating : 'Sem Avaliação' }} <b-icon icon="star" />
                  </b-card-sub-title>
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-modal>
    </div>
  </div>
</template>
<style scoped>
.divTable {
  width: 90%;
  height: 100%;
  margin-left: 4%;
  margin-top: 1%;
  border-radius: 10px;
}
.pesquisa {
  width: 40%;
  margin-left: 1%;
}
.inputselect {
  width: 8%;
  margin-left: -80%;
}
.listagem {
  width: 100%;
  margin-top: 10px;
  color: #110729;
}
.inputselect {
  margin-right: 28%;
}
.butao {
  height: 40px;
  font-size: 15px;
  left: 10px;
  border: 2px solid #8888;
}
.infoTable {
  padding-bottom: 15px;
}
.genres {
  margin-top: -5px;
  gap: 10px;
}
.teste {
  height: 100%;
  width: 100%;
}
.styleInfo {
  max-width: 50ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
<script>
import { http } from "../../services/api.js";
import { ArrowRightIcon, ArrowLeftIcon } from "vue-feather-icons";
import { BTable } from "bootstrap-vue";
export default {
  data() {
    return {
      sessions: [],
      usuario: {},
      conteudotable: {},
      perPage: 5,
      currentPage: 1,
      pageOptions: [3, 5, 10],
      search: null,
      filds: [
        {
          key: "title",
          label: "Titulo",
          sortable: true,
          thClass: "text-center",
          tdClass: "text-center w-25",
        },
        {
          key: "plot",
          label: "Descrição",
          sortable: true,
          thClass: "text-center",
          tdClass: "text-center w-25",
        },
        {
          key: "year",
          label: "Data de Lançamento",
          sortable: true,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "actions",
          label: "AÇÕES",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "detalhes",
          label: "Detalhes",
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],
    };
  },
  computed: {
    totalrows() {
      return this.sessions.length;
    },
  },
  created() {
    this.Lista();
  },
  methods: {
    async Lista() {
      await http
        .get("/movies/list")
        .then((response) => (this.sessions = response.data));
    },
    Editar() {
      this.$http
        .patch(`/users/update/${this.conteudotable._id}`, this.conteudotable)
        .then((response) => {
          this.$bvModal.hide("modal-login");
          this.usuarios = [];
          this.Lista();
        })
        .catch((erro) => { });
    },
    Deletar() {
      this.$http
        .delete(`/movies/delete/${this.conteudotable._id}`)
        .then((response) => {
          this.$bvModal.hide("modal-danger");
          this.sessions = [];
          this.Lista();
        })
        .catch((erro) => console.log(erro));
    },
    async Cadastro() {
      this.$http
        .post("/users/create", this.usuario)
        .then((response) => {
          this.$bvModal.hide("modal-create");
          this.sessions = [];
          this.Lista();
          this.sessions.name = null;
          this.sessions.email = null;
          this.sessions.password = null;
        })
        .catch((erro) => console.log(erro));
    },
    hideModal() {
      this.$bvModal.hide("modal-login");
      this.$bvModal.hide("modal-danger");
      this.$bvModal.hide("modal-create");
      this.$bvModal.hide("modal-visualizar");
    },
    ModalEdit(sessions) {
      this.conteudotable = {
        ...sessions,
      };
      this.$bvModal.show("modal-login");
    },
    ModalVisu(sessions) {
      this.conteudotable = {
        ...sessions,
      };
      this.$bvModal.show("modal-visualizar");
    },
    ModalCreate(usuarios) {
      this.$bvModal.show("modal-create");
    },
    ModalConfirm(sessions) {
      this.conteudotable = {
        ...sessions,
      };
      this.$bvModal.show("modal-danger");
    },
  },
  component: {
    BTable,
    ArrowRightIcon,
    ArrowLeftIcon,
  },
};
</script>