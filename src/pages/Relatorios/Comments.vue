<template>
    <div class="divTable">
        <h5>Relatórios de Comentários e Sessões  <b-icon icon="card-checklist" /></h5>
        <sessions/>
        <comentarios/>
    </div>
</template>
<script>
import Sessions from '../../components/TableLogs/Sessions.vue'
import Comentarios from '../../components/TableLogs/Comentarios.vue'

export default {
  data(){
    return{
      search: null,
    }
  },
  components: { Sessions, Comentarios },
   
}
</script>
<style scoped>
.divTable {
  width: 90%;
  height: 100%;
  margin-left: 4%;
  margin-top: 1%;
  border-radius: 10px;
}
</style>