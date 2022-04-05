<template>
  <div class="container-page">
    <div
      class="categories"
      v-for="cat in category"
      :key="cat.label"
    >
      <Chip
        class="categories--item"
        @click="search(cat.value)"
      >
        {{ cat.label }}
      </Chip>
    </div>
  </div>
</template>

<style scoped>
.container-page {
  display: flex;
  align-items: center;
  margin: 20px;
  border-radius: 4px;
  flex-wrap: wrap;
}

.categories {
  display: flex;
  flex-wrap: wrap;
}

.categories--item {
  margin: 4px 12px;
  border: 1px solid #dddddd;
  background: #ffffff;
  cursor: pointer;
  padding: 2px 8px;
}
.categories--item:hover {
  background: #f3f3f3;
}
</style>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useToast } from 'primevue/usetoast'

const store = useStore()
const toast = useToast()

const searchVideos = ref(null)
const category = ref([
  { label: 'Smartphones', value: 'Smartphones' },
  { label: 'Unboxing', value: 'Unboxing' },
  { label: 'Carro Esportivo', value: 'Carro Esportivo' },
  { label: 'Restaurantes', value: 'Restaurantes' },
  { label: 'Viagem', value: 'Viagem' },
  { label: 'PodCast', value: 'PodCast' },
  { label: 'Jogos', value: 'Jogos' },
  { label: 'Música', value: 'Música' },
  { label: 'Ao Vivo', value: 'Ao Vivo' },
])

const search = (async (payload) => {
  const response = await store.dispatch("getSearch", payload)
  searchVideos.value = await response.data.items
  if (response.status !== 200) {
    toast.add({ severity: 'error', summary: 'Erro ao Pesquisar', detail: 'Tente novamente', life: 3000 })
  } else {
    toast.add({ severity: 'success', summary: 'Pesquisa realizada', detail: 'Vídeos listados abaixo', life: 3000 })
  }
})

</script>
