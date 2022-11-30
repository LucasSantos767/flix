<template>
  <b-modal
        id="modal-visualizar"
        hide-footer
        header-text-variant="light"
        header-bg-variant="dark"
        title="Detalhes do Filme"
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
                  {{ conteudotable.fullplot }}
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
                Diretores:
                <b-card-text class="d-flex genres">
                  <b-card-sub-title
                    v-for="(item, index) of conteudotable.directors"
                    :key="index"
                  >
                    {{ item }}
                  </b-card-sub-title>
                </b-card-text>
                Avaliação:
                <b-card-text class="d-flex genres">
                  <b-card-sub-title>
                    {{
                      conteudotable.imdb
                        ? conteudotable.imdb.rating
                        : "Sem Avaliação"
                    }}/10
                    <b-icon icon="star-fill" />
                  </b-card-sub-title>
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-modal>
</template>
<script>
export default {
  props: {
    conteudotable:{
      type: Object,
    }
  }, 
 
};
</script>