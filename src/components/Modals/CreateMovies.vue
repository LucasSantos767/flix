<template>
  <b-modal
    @show="resetModal"
    id="modal-create"
    hide-footer
    hide-header-close
    header-text-variant="light"
    header-bg-variant="dark"
    title="Adicionar Filme"
  >
    <b-form>
      <b-form-group class="InputPosition">
        <p class="sub">Titulo:</p>
        <b-input
          type="text"
          placeholder="Exemplo: Rio"
          class="inputEdit shadow-none"
          v-model="filme.title"
        />
      </b-form-group>
      <b-form-group class="InputPosition">
        <p class="sub">Resumo:</p>
        <b-input
          type="text"
          placeholder="Exemplo: Duas araras azuis perdias no Rio de Janeiro"
          class="inputEdit shadow-none"
          v-model="filme.plot"
        />
      </b-form-group>
      <b-form-group class="InputPosition">
        <p class="sub">Descrição Completa:</p>
        <b-input
          type="text"
          placeholder="Exemplo: Duas araras azuis perdias no Rio de Janeiro em uma aventura muito doida"
          class="inputEdit shadow-none"
          v-model="filme.fullplot"
        />
      </b-form-group>
      <b-form-group class="InputPosition">
        <p class="sub">Ano de Lançamento:</p>
        <b-input
          type="number"
          placeholder="Exemplo: 2011"
          class="inputEdit shadow-none"
          v-model="filme.year"
        />
      </b-form-group>
      <b-form-group class="InputPosition">
        <p class="sub">Poster:</p>
        <b-input
          type="text"
          placeholder="Url da imagem"
          class="inputEdit shadow-none"
          v-model="filme.poster"
        />
      </b-form-group>
      <b-form-group class="InputPosition">
        <p class="sub">Genêros:</p>
        <b-form-tags
          type="text"
          class="inputEdit shadow-none"
          v-model="filme.genres"
          placeholder="Exemplo: Aventura, Drama"
          remove-on-delete
        />
      </b-form-group>
      <b-form-group class="InputPosition">
        <p class="sub">Elenco:</p>
        <b-form-tags
          type="text"
          class="inputEdit shadow-none"
          placeholder="Exemplo: Jesse Eisenberg, Anne Hathaway"
          v-model="filme.cast"
          remove-on-delete
        />
      </b-form-group>
      <b-form-group class="InputPosition">
        <p class="sub">Avaliação:</p>
        <b-input
          type="text"
          class="inputEdit shadow-none"
          placeholder="Não Avalidado"
          v-model="filme.rated"
          remove-on-delete
        />
      </b-form-group>
      <b-form-group class="InputPosition">
        <p class="sub">Escritores:</p>
        <b-form-tags
          type="text"
          class="inputEdit shadow-none"
          placeholder="Exemplo: Carlos Saldanha"
          v-model="filme.writers"
          remove-on-delete
        />
      </b-form-group>
      <b-form-group class="InputPosition">
        <p class="sub">País:</p>
        <b-form-tags
          type="text"
          class="inputEdit shadow-none"
          placeholder="Exemplo: USA"
          v-model="filme.countries"
          remove-on-delete
        />
      </b-form-group>
      <b-form-group class="InputPosition">
        <p class="sub">Diretores:</p>
        <b-form-tags
          type="text"
          class="inputEdit shadow-none"
          placeholder="Exemplo: Carlos Saldanha"
          v-model="filme.directors"
          remove-on-delete
        />
      </b-form-group>
      <b-form-group class="InputPosition">
        <p class="sub">Prêmios:</p>
        <b-input
          type="number"
          class="inputEdit shadow-none mb-2"
          placeholder="vitórias"
          v-model="filme.awards.wins"
        />
        <b-input
          type="number"
          placeholder="nominations"
          class="inputEdit shadow-none mb-2"
          v-model="filme.awards.nominations"
        />
        <b-input
          type="text"
          placeholder="2 nominations"
          class="inputEdit shadow-none mb-2"
          v-model="filme.awards.text"
        />
      </b-form-group>
      <b-form-group class="InputPosition">
        <p class="sub">Imdb:</p>
        <b-input
          type="number"
          class="inputEdit shadow-none mb-2"
          placeholder="vitórias"
          v-model="filme.imdb.rating"
        />
        <b-input
          type="number"
          placeholder="votos"
          class="inputEdit shadow-none mb-2"
          v-model="filme.imdb.votes"
        />
        <b-input
          type="number"
          placeholder="id"
          class="inputEdit shadow-none mb-2"
          v-model="filme.imdb.id"
        />
      </b-form-group>
      <b-form-group class="InputPosition">
        <p class="sub">Tempo de Filme:</p>
        <b-input
          type="number"
          class="inputEdit shadow-none mb-2"
          placeholder="60"
          v-model="filme.runtime"
        />
      </b-form-group>
      <b-form-group class="InputPosition">
        <p class="sub">Tipo:</p>
        <b-input
          type="text"
          class="inputEdit shadow-none mb-2"
          placeholder="Filme"
          v-model="filme.type"
        />
      </b-form-group>
      <div class="d-flex justify-content-between btn-size">
        <b-button
          @click.prevent="$emit('recebendo',filme)"
          variant="outline-success"
          class="butao"
        >
          Criar
        </b-button>
        <b-button
          @click.prevent="hideModal()"
          variant="outline-danger"
          class="butao"
        >
          Cancelar
        </b-button>
      </div>
    </b-form>
  </b-modal>
</template>
<script>
export default {
  emits:['recebendo'],
  props: {
    teste:{
        type: Function
    }
  },
  data() {
    return {
      filme: {
        title:'',
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
    };
  },
  methods: {
    resetModal() {
      this.filme = {
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
      };
    },
  },
};
</script>