<template>
  <div class="accordion" role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-2>Comentários</b-button>
      </b-card-header>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
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
              Listagem Comentários
            </p>
            <b-form-select
              v-model="perPage"
              :options="pageOptions"
              :clearable="false"
              @change="handlePageSizeChange($event)"
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
            :items="comments.results"
            :filter="search"
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
            <template #head(email)="data">
              <span class="d-flex justify-content-center">{{
                data.label.toUpperCase()
              }}</span>
            </template>
            <template #head(text)="data">
              <span class="d-flex justify-content-center">{{
                data.label.toUpperCase()
              }}</span>
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
      comments: [],
      perPage: 5,
      currentPage: 1,
      pageOptions: [3, 5, 10],
      count: 0,
      isBusy: false,
      filds: [
        {
          key: "name",
          label: "NOME",
          sortable: true,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "email",
          label: "EMAIL",
          sortable: true,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "text",
          label: "COMENTÁRIO",
          sortable: true,
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],
    };
  },
  computed: {
    totalrows() {
      return this.comments.count;
    },
  },
  created() {
    this.ListaSessions();
  },
  methods: {
    getRequestParams(currentPage, perPage) {
      let params = {};

      if (currentPage) {
        params["skip"] = currentPage - 1;
      }

      if (perPage) {
        params["limit"] = perPage;
      }

      return params;
    },
    async ListaSessions() {
      this.isBusy = true;
      try {
        const params = this.getRequestParams(this.currentPage, this.perPage);
        const response = await http
        .get("/comments/list",{params})
        .then((response) => (this.comments = response.data));
        this.isBusy = false;
        return response.data 
      } catch (error) {
        this.isBusy = false
        return []
      }
      },
      handlePageChange(value) {
      this.currentPage = value;
      this.ListaSessions();
    },

    handlePageSizeChange(event) {
      this.perPage = event;
      this.currentPage = 1;
      this.ListaSessions();
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
  margin-right: 55%;
}
</style>
