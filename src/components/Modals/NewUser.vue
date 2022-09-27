<template>
  <div>
    <b-modal
      id="modal-login"
      :visible="isAddNewUserSidebarActive"
     
      hide-footer
      hide-header-close
      header-text-variant="light"
      header-bg-variant="dark"
      title="Editar Funcionário"
    >
      <b-form>
        <b-form-group class="pb-3 InputPosition">
          <p class="sub">Nome</p>
          <b-input
            type="text"
            class="inputEdit shadow-none"
            v-model="conteudotable.name"
          />
        </b-form-group>
        <b-form-group class="pb-3 InputPosition">
          <p class="sub">Email</p>
          <b-input
            type="email"
            id="email"
            class="inputEdit shadow-none"
            v-model="conteudotable.email"
          />
        </b-form-group>
        <b-form-group class="pb-3 InputPosition">
          <p class="sub">Senha</p>
          <b-input
            type="password"
            class="inputEdit shadow-none"
            v-model="conteudotable.password"
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
  </div>
</template>
<script>
import { VBModal } from 'bootstrap-vue';
export default {

};
</script>