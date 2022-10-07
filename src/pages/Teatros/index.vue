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
          <b-icon icon="map-fill" />
          Lista de Teatros
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
          debounce="300"
          v-model="search"
          class="pesquisa h-75 input shadow-none"
          placeholder="Pesquisar"
        />
      </div>
      <b-table
        :fields="filds"
        :items="teatros.results"
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
        id="modal-login"
        hide-footer
        hide-header-close
        header-text-variant="light"
        header-bg-variant="dark"
        title="Editar Teatro"
      >
        <b-form>
          <b-form-group class="InputPosition">
            <p class="sub">Número do Teatro</p>
            <b-input
              type="number"
              class="inputEdit shadow-none"
              v-model="conteudotable.theaterId"
            />
          </b-form-group>
          <b-form-group class="InputPosition">
            <p class="sub">Endereço</p>
            <b-input
              type="text"
              class="inputEdit shadow-none"
              v-model="conteudotable.location.address.street1"
            />
          </b-form-group>
          <b-form-group class="InputPosition">
            <p class="sub">Cidade</p>
            <b-input
              type="text"
              class="inputEdit shadow-none"
              v-model="conteudotable.location.address.city"
            />
          </b-form-group>
          <b-form-group class="InputPosition">
            <p class="sub">Estado</p>
            <b-input
              type="text"
              class="inputEdit shadow-none"
              v-model="conteudotable.location.address.state"
            />
          </b-form-group>
          <b-form-group class="InputPosition">
            <p class="sub">Código Postal</p>
            <b-input
              type="number"
              class="inputEdit shadow-none"
              v-model="conteudotable.location.address.zipcode"
            />
          </b-form-group>
          <b-form-group class="InputPosition">
            <p class="sub">Coordenadas:</p>
            Latitude
            <b-input
              type="text"
              class="inputEdit shadow-none"
              v-model="conteudotable.location.geo.coordinates[0]"
            />
            Longitude
            <b-input
              type="text"
              class="inputEdit shadow-none"
              v-model="conteudotable.location.geo.coordinates[1]"
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
        @show="resetModal"
        id="modal-create"
        hide-footer
        hide-header-close
        header-text-variant="light"
        header-bg-variant="dark"
        title="Adicionar Teatro"
      >
        <b-form>
          <b-form-group class="InputPosition">
            <p class="sub">Número do Teatro</p>
            <b-input
              type="number"
              placeholder="Exemplo: 13"
              class="inputEdit shadow-none"
              v-model="theaters.theaterId"
            />
          </b-form-group>
          <b-form-group class="InputPosition">
            <p class="sub">Endereço</p>
            <b-input
              type="text"
              placeholder="Exemplo: Rua São Bernado"
              class="inputEdit shadow-none"
              v-model="theaters.location.address.street1"
            />
          </b-form-group>
          <b-form-group class="InputPosition">
            <p class="sub">Cidade</p>
            <b-input
              type="text"
              placeholder="Exemplo: Fortaleza"
              class="inputEdit shadow-none"
              v-model="theaters.location.address.city"
            />
          </b-form-group>
          <b-form-group class="InputPosition">
            <p class="sub">Estado</p>
            <b-input
              type="text"
              placeholder="Exemplo: CE"
              class="inputEdit shadow-none"
              v-model="theaters.location.address.state"
            />
          </b-form-group>
          <b-form-group class="InputPosition">
            <p class="sub">Código Postal</p>
            <b-input
              type="number"
              placeholder="Exemplo: 66444889"
              class="inputEdit shadow-none"
              v-model="theaters.location.address.zipcode"
            />
          </b-form-group>
          <b-form-group class="InputPosition">
            <p class="sub">Coordenadas:</p>
            Latitude
            <b-input
              type="text"
              placeholder="Exemplo: -91.602524 "
              class="inputEdit shadow-none"
              v-model="theaters.location.geo.coordinates[0]"
            />
            Longitude
            <b-input
              type="text"
              placeholder="Exemplo: 41.692726"
              class="inputEdit shadow-none"
              v-model="theaters.location.geo.coordinates[1]"
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
  margin-left: -70%;
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
}
.infoTable {
  padding-bottom: 15px;
}
.butao {
  height: 40px;
  font-size: 15px;
  left: 10px;
  border: 2px solid #8888;
}
</style>
<script>
import { http } from "../../services/api.js";
import { ArrowRightIcon, ArrowLeftIcon } from "vue-feather-icons";
import { BTable } from "bootstrap-vue";
export default {
  data() {
    return {
      teatros: [],
      theaters: {
        theaterId: "",
        location: {
          address: {
            street1: "",
            city: "",
            state: "",
            zipcode: "",
          },
          geo: {
            type: "Point",
            coordinates: [],
          },
        },
      },
      conteudotable: {
        theaterId: "",
        location: {
          address: {
            street1: "",
            city: "",
            state: "",
            zipcode: "",
          },
          geo: {
            type: "Point",
            coordinates: [],
          },
        },
      },
      perPage: 5,
      currentPage: 1,
      pageOptions: [3, 5, 10],
      count: 0,
      isBusy: false,
      search: null,
      filds: [
        {
          key: "_id",
          label: "ID",
          sortable: true,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "theaterId",
          label: "Número",
          sortable: true,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "location.address.street1",
          label: "Endereço",
          sortable: true,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "location.address.city",
          label: "Cidade",
          sortable: true,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "location.address.state",
          label: "Estado",
          sortable: true,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "location.address.zipcode",
          label: "Código postal",
          sortable: true,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "location.geo.coordinates",
          label: "Coordenadas",
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
      ],
    };
  },
  computed: {
    totalrows() {
      return this.teatros.count;
    },
  },
  created() {
    this.Lista();
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
    async Lista() {
       this.isBusy = true;
       try{
        const params = this.getRequestParams(this.currentPage, this.perPage);
        const response = await http
        .get("/theaters/list",{params})
        .then((response) => (this.teatros = response.data));
        this.isBusy = false;
        return response.data;
       }catch(error){
        this.isBusy = false
        return [];
       }
    },
     handlePageChange(value) {
      this.currentPage = value;
      this.Lista();
    },

    handlePageSizeChange(event) {
      this.perPage = event;
      this.currentPage = 1;
      this.Lista();
    },
    Editar() {
      this.$http
        .patch(`/theaters/update/${this.conteudotable._id}`, this.conteudotable)
        .then((response) => {
          this.$bvModal.hide("modal-login");
          this.teatros = [];
          this.Lista();
        })
        .catch((erro) => {});
    },
    Deletar() {
      this.$http
        .delete(`/theaters/delete/${this.conteudotable._id}`)
        .then((response) => {
          this.$bvModal.hide("modal-danger");
          this.teatros = [];
          this.Lista();
        })
        .catch((erro) => console.log(erro));
    },
    async Cadastro() {
      this.theaters.location.geo.coordinates[0] = parseFloat(
        this.theaters.location.geo.coordinates[0]
      );
      this.theaters.location.geo.coordinates[1] = parseFloat(
        this.theaters.location.geo.coordinates[1]
      );

      this.$http
        .post("/theaters/create", this.theaters)
        .then((response) => {
          this.$bvModal.hide("modal-create");
          this.teatros = [];
          this.Lista();
          this.resetModal();
        })
        .catch((erro) => console.log(erro));
    },
    hideModal() {
      this.$bvModal.hide("modal-login");
      this.$bvModal.hide("modal-danger");
      this.$bvModal.hide("modal-create");
    },
    ModalEdit(teatros) {
      this.conteudotable = {
        ...teatros,
      };
      this.$bvModal.show("modal-login");
    },
    ModalCreate(teatros) {
      this.$bvModal.show("modal-create");
    },
    ModalConfirm(teatros) {
      this.conteudotable = {
        ...teatros,
      };
      this.$bvModal.show("modal-danger");
    },
    resetModal() {
      this.theaters = {
        theaterId: "",
        location: {
          address: {
            street1: "",
            city: "",
            state: "",
            zipcode: "",
          },
          geo: {
            type: "Point",
            coordinates: [],
          },
        },
      };
    },
  },
  component: {
    BTable,
    ArrowRightIcon,
    ArrowLeftIcon,
  },
};
</script>