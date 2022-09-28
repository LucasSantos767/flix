<template>
  <div class="accordion" role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-1>Sessões</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
        <b-card-body>
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
              Listagem Sessões
            </p>
            <b-form-select
              v-model="perPage"
              :options="pageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50 input inputselect"
            />
            <b-form-input
              debounce="300"
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
          >
            <template #head(user_id)="data">
              <span class="d-flex justify-content-center">{{
                data.label.toUpperCase()
              }}</span>
            </template>
          </b-table>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import { http } from "../../services/api.js";
export default {
  data() {
    return {
      search: null,
      sessions: [],
       perPage: 5,
      currentPage: 1,
      pageOptions: [3, 5, 10],
      filds: [
        {
          key: "user_id",
          label: "NOME",
          sortable: true,
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],
    };
  },
  created() {
    this.ListaSessions();
  },
  methods: {
    async ListaSessions() {
      await http
        .get("/sessions/list")
        .then((response) => (this.sessions = response.data));
    },
  },
};
</script>
<style scoped>
.infoTable {
  padding-bottom: 10px;
}
.listagem {
  width: 100%;
  margin-top: 10px;
  color: #110729;
}
.inputselect {
  width: 20%;
  margin-right: 60%;
}
</style>
