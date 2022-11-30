<template>
  <div>
    <div class="divTable">
      <div class="d-flex align-items-center justify-content-start mb-1 mb-md-0 infoTable">
        <p class="listagem">
          <b-icon icon="camera-reels-fill" />
          Lista de Filmes
        </p>
        <b-form-select
          v-model="perPage"
          :options="pageOptions"
          :clearable="false"
          @change="handlePageSizeChange($event)"
          class="per-page-selector d-inline-block mx-50 input inputselect"
        />
        <b-button @click.prevent="ModalCreate()" class="butao"
          >Adicionar</b-button
        >
        <b-form-input
          debounce="600"
          v-model="search"
          @change="searchBar()"
          class="pesquisa h-75 input shadow-none"
          placeholder="Pesquisar"
        />
      </div>
      <b-table
        :fields="filds"
        :items="movies.results"
        :busy.sync="isBusy"
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
            {{ data.item.plot }}
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
        @change="handlePageChange"
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
        id="modal-danger"
        hide-footer
        hide-header-close
        header-bg-variant="dark"
        header-text-variant="light"
        title="Excluir Filme"
        ref="modal-fechar"
      >
        <b-card-text> Deseja excluir este filme? </b-card-text>
        <div class="d-flex justify-content-between btn-size">
          <b-button @click.prevent="Deletar()" variant="outline-danger">
            Excluir
          </b-button>
          <b-button @click.prevent="hideModal()" variant="outline-dark">
            Cancelar
          </b-button>
        </div>
      </b-modal>
      <create-movies @recebendo="Cadastro"></create-movies>
      <update-movies
        @atualizando="Editar"
        :conteudotable="conteudotable"
        :fechar="hideModal"
      ></update-movies>
    </div>
    <view-movies :conteudotable="conteudotable"></view-movies>
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
import ViewMovies from "../../components/Modals/ViewMovies.vue";
import CreateMovies from "../../components/Modals/CreateMovies.vue";
import UpdateMovies from "../../components/Modals/UpdateMovies.vue";
export default {
  components: { ViewMovies, CreateMovies, UpdateMovies },
  data() {
    return {
      movies: [],
      conteudotable: {
        awards: {
          wins: "",
          nominations: "",
          text: "",
        },
        imdb: {
          rating: "",
          votes: "",
          id: "",
        },
        tomatoes: {
          viewer: {
            rating: "",
            numReviews: "",
            meter: "",
          },
          critic: {
            rating: "",
            numReviews: "",
            meter: "",
          },
          consensus: "",
          rotten: "",
          production: "",
          fresh: "",
        },
      },
      perPage: 5,
      currentPage: 1,
      pageOptions: [3, 5, 10],
      count: 0,
      isBusy: false,
      search: "",
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
          label: "Resumo",
          sortable: true,
          thClass: "text-center",
          tdClass: "text-center w-25",
        },
        {
          key: "year",
          label: "Ano de Lançamento",
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
      return this.movies.totalResponse;
    },
  },
  mounted() {
    this.Lista();
  },
  methods: {
    getRequestParams(currentPage, perPage) {
      let params = {};
      if (currentPage) {
        params["page"] = currentPage;
      }
      if (perPage) {
        params["limit"] = perPage;
      }
      return params;
    },
    async Lista() {
      this.isBusy = true;
      try {
        const params = this.getRequestParams(this.currentPage, this.perPage);
        const response = await http
          .get(`/movies/list`, { params })
          .then((response) => (this.movies = response.data));
        this.isBusy = false;
        return response.data;
      } catch (error) {
        this.isBusy = false;
        return [];
      }
    },
    async GetTitle() {
      this.isBusy = true;
      try {
        const params = this.getRequestParams(this.currentPage, this.perPage);
        const response = await http
          .get(`/movies/${this.search}`, { params })
          .then((response) => (this.movies = response.data));
        this.isBusy = false;
        return response.data;
      } catch (error) {
        this.isBusy = false;
        return [];
      }
    },
    async searchBar() {
      if (this.search === "") {
        this.Lista();
      } else {
        this.GetTitle();
      }
    },
    handlePageChange(value) {
      try {
        this.currentPage = value;
        if (this.search !== "") {
          this.GetTitle();
        } else {
          this.Lista();
        }
      } catch (error) { }
    },
    handlePageSizeChange(event) {
      this.perPage = event;
      try {
        if (this.search !== "") {
          this.GetTitle();
        } else {
          this.Lista();
        }
      } catch (error) { }
    },
    async Editar(conteudotable) {
      this.isBusy = true;
      try {
        const response = this.$http
          .patch(`/movies/update/${conteudotable._id}`, conteudotable)
          .then(() => {
            this.$bvModal.hide("modal-login");
            this.movies = [];
            this.Lista();
            this.$toast(`Filme editado com sucesso`, {
              type: "info",
            });
          });
        this.isBusy = false;
        return response.data;
      } catch (error) {
        this.isBusy = false;
        return [];
      }
    },
    async Deletar() {
      this.isBusy = true;
      try {
        const response = this.$http
          .delete(`/movies/delete/${this.conteudotable._id}`)
          .then(() => {
            this.$bvModal.hide("modal-danger");
            this.movies = [];
            this.Lista();
            this.$toast(`Filme deletado com sucesso`, {
              type: "info",
            });
          });
        this.isBusy = false;
        return response.data;
      } catch (error) {
        this.isBusy = false;
        return [];
      }
    },
    async Cadastro(filme) {
      this.$http
        .post("/movies/create", filme)
        .then((response) => {
          this.$bvModal.hide("modal-create");
          this.movies = [];
          this.Lista();
          this.resetModal();
          this.$toast(`Filme cadastrado com sucesso`, {
            type: "success",
          });
        })
        .catch((erro) => console.log(erro));
    },
    hideModal() {
      this.$bvModal.hide("modal-login");
      this.$bvModal.hide("modal-danger");
      this.$bvModal.hide("modal-create");
      this.$bvModal.hide("modal-visualizar");
    },
    ModalEdit(movies) {
      this.conteudotable = {
        ...movies,
      };
      this.$bvModal.show("modal-login");
    },
    ModalVisu(movies) {
      this.conteudotable = {
        ...movies,
      };
      this.$bvModal.show("modal-visualizar");
    },

    ModalCreate(usuarios) {
      this.$bvModal.show("modal-create");
    },
    ModalConfirm(movies) {
      this.conteudotable = {
        ...movies,
      };
      this.$bvModal.show("modal-danger");
    },
  },
};
</script>