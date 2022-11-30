<template>
     <b-modal
        id="modal-login"
        hide-footer
        hide-header-close
        header-text-variant="light"
        header-bg-variant="dark"
        title="Atualizar Filme"
      >
        <b-form>
          <b-form-group class="InputPosition">
            <p class="sub">Titulo:</p>
            <b-input
              type="text"
              class="inputEdit shadow-none"
              v-model="conteudotable.title"
            />
          </b-form-group>
          <b-form-group class="InputPosition">
            <p class="sub">Resumo:</p>
            <b-input
              type="text"
              class="inputEdit shadow-none"
              v-model="conteudotable.plot"
            />
          </b-form-group>
          <b-form-group class="InputPosition">
            <p class="sub">Descrição Completa:</p>
            <b-input
              type="text"
              class="inputEdit shadow-none"
              v-model="conteudotable.fullplot"
            />
          </b-form-group>
          <b-form-group class="InputPosition">
            <p class="sub">Ano de Lançamento:</p>
            <b-input
              type="number"
              class="inputEdit shadow-none"
              v-model="conteudotable.year"
            />
          </b-form-group>
          <b-form-group class="InputPosition">
            <p class="sub">Poster:</p>
            <b-input
              type="text"
              class="inputEdit shadow-none"
              v-model="conteudotable.poster"
            />
          </b-form-group>
          <b-form-group class="InputPosition">
            <p class="sub">Genêros:</p>
            <b-form-tags
              type="text"
              class="inputEdit shadow-none"
              placeholder=" "
              v-model="conteudotable.genres"
              remove-on-delete
            />
          </b-form-group>
          <b-form-group class="InputPosition">
            <p class="sub">Elenco:</p>
            <b-form-tags
              type="text"
              class="inputEdit shadow-none"
              placeholder=" "
              v-model="conteudotable.cast"
              remove-on-delete
            />
          </b-form-group>
          <b-form-group class="InputPosition">
            <p class="sub">Avaliação:</p>
            <b-input
              type="text"
              class="inputEdit shadow-none"
              placeholder="Não Avalidado"
              v-model="conteudotable.rated"
              remove-on-delete
            />
          </b-form-group>
          <b-form-group class="InputPosition">
            <p class="sub">Escritores:</p>
            <b-form-tags
              type="text"
              class="inputEdit shadow-none"
              placeholder=" "
              v-model="conteudotable.writers"
              remove-on-delete
            />
          </b-form-group>
          <b-form-group class="InputPosition">
            <p class="sub">País:</p>
            <b-form-tags
              type="text"
              class="inputEdit shadow-none"
              placeholder=" "
              v-model="conteudotable.countries"
              remove-on-delete
            />
          </b-form-group>
          <b-form-group class="InputPosition">
            <p class="sub">Diretores:</p>
            <b-form-tags
              type="text"
              class="inputEdit shadow-none"
              placeholder=" "
              v-model="conteudotable.directors"
              remove-on-delete
            />
          </b-form-group>
          <b-form-group class="InputPosition">
            <p class="sub">Prêmios:</p>
            <b-input
              type="number"
              class="inputEdit shadow-none mb-2"
              placeholder="vitórias"
              v-model="conteudotable.awards.wins"
            />
            <b-input
              type="number"
              placeholder="nominations"
              class="inputEdit shadow-none mb-2"
              v-model="conteudotable.awards.nominations"
            />
            <b-input
              type="text"
              placeholder="2 nominations"
              class="inputEdit shadow-none mb-2"
              v-model="conteudotable.awards.text"
            />
          </b-form-group>
          <b-form-group class="InputPosition">
            <p class="sub">Imdb:</p>
            <b-input
              type="number"
              class="inputEdit shadow-none mb-2"
              placeholder="vitórias"
              v-model="conteudotable.imdb.rating"
            />
            <b-input
              type="number"
              placeholder="votos"
              class="inputEdit shadow-none mb-2"
              v-model="conteudotable.imdb.votes"
            />
            <b-input
              type="number"
              placeholder="id"
              class="inputEdit shadow-none mb-2"
              v-model="conteudotable.imdb.id"
            />
          </b-form-group>
          <b-form-group class="InputPosition">
            <p class="sub">Tempo de Filme:</p>
            <b-input
              type="number"
              class="inputEdit shadow-none mb-2"
              placeholder="60"
              v-model="conteudotable.runtime"
            />
          </b-form-group>
          <b-form-group class="InputPosition">
            <p class="sub">Tipo:</p>
            <b-input
              type="text"
              class="inputEdit shadow-none mb-2"
              placeholder="Filme"
              v-model="conteudotable.type"
            />
          </b-form-group>
          <div class="d-flex justify-content-between btn-size">
            <b-button
             @click.prevent="$emit('atualizando',conteudotable)"
              variant="outline-success"
              class="butao"
            >
              Atualizar
            </b-button>
            <b-button
              @click.prevent="fechar"
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
    emits:['atualizando'],
    props: {
    conteudotable:{
      type: Object,
    },
    fechar:{
        type: Function
    },
  }, 
}
</script>