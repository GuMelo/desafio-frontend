<template>
  <div class="">
    <Menubar class="p-menubar">
      <template #start>
        <img
          src="@/assets/logo_yt.png"
          class="img__size"
        />
        <img
          src="@/assets/bycoders_.png"
          class="img__size--by"
        />
      </template>
      <template #end>
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText
            type="text"
            v-model="searchVideos"
            placeholder="Search"
            @click="toggle"
          />
          <OverlayPanel
            ref="op"
            appendTo="body"
            :showCloseIcon="true"
            id="overlay_panel"
            style="width: 450px"
            :breakpoints="{'960px': '75vw'}"
          >
            <h5>Seu Histórico de Pesquisa:</h5>
            <div
              class="input__history"
              v-for="(item, index) in history"
              :key="index"
            >
              <span>
                <i
                  class="pi pi-history"
                  style="padding-right: 8px;"
                ></i>
                {{ item }}
              </span>
              <Button
                icon="pi pi-times"
                class="p-button p-component p-button-icon-only p-button-rounded p-button-danger p-button-outlined"
                @click="deleteHistory(item, index)"
              />
            </div>
          </OverlayPanel>
        </span>
        <Button
          label="Pesquisar"
          class="btn--item"
          :loading="isLoading"
          @click="search(searchVideos)"
        />
      </template>
    </Menubar>
    <Toast position="bottom-right" />
  </div>
</template>

<style scoped>
.p-menubar {
  padding: 0.5rem 1.5rem;
}

.img__size {
  width: 150px;
}
.img__size--by {
  width: 80px;
  margin-left: 4px;
}
.input__history {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
  padding: 8px;
  border: 1px solid #dddddd;
  border-radius: 8px;
  cursor: pointer;
}
.input__history:hover {
  background-color: #f4f4f4;
}
</style>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useToast } from 'primevue/usetoast'

const store = useStore()
const toast = useToast()

const searchVideos = ref('')
const isLoading = ref(false)
const foundVideos = ref([])
const history = computed(() => store.getters.getHistory)
const op = ref();

const toggle = (event) => {
  op.value.toggle(event)
};

const search = (async (payload) => {
  foundVideos.value = ''
  isLoading.value = true
  const response = await store.dispatch("getSearch", payload)
  if (response.status !== 200) {
    toast.add({ severity: 'error', summary: 'Erro ao Pesquisar', detail: 'Tente novamente', life: 3000 })
  } else {
    toast.add({ severity: 'success', summary: 'Pesquisa realizada', detail: 'Vídeos listados abaixo', life: 3000 })
    isLoading.value = false
    foundVideos.value = await response.data.items
    store.commit("setFoundVideos", foundVideos.value)
  }
})

const deleteHistory = (index) => {
  store.commit("deleteHistory", index)
  toast.add({ severity: 'success', summary: 'Histórico', detail: 'Item do histórico deletado com sucesso!', life: 3000 })
}

</script>