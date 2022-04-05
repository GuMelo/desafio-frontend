<template>
  <div class="container-page">
    <h1>Mais Vídeos...</h1>
    <div class="content">
      <div
        v-for="(video, index) in videos"
        :key="video.id.videoId"
      >
        <Card
          class="card__container"
          @click="showVideo(video, index)"
          :key="index"
        >
          <template #header>
            <img
              :src=video.snippet.thumbnails.medium.url
              alt="Thumbnail Vid"
            />
          </template>
          <template
            #title
            class="p-card-title"
          >
            <p :title="video.snippet.title">{{ video.snippet.title }}</p>
          </template>
          <template #content>
            <div class="img__description">
              <img
                class="img__description--item"
                :src="video.snippet.thumbnails.default.url"
              />
              <span><b>{{ video.snippet.channelTitle }}</b></span>
            </div>
            <span>{{ video.snippet.description }}</span>
          </template>
        </Card>
      </div>
      <Dialog
        :header=checkVideo.title
        :style="{width: '65vw'}"
        :modal="true"
        v-model:visible="display"
      >
        <div class="">
          <embed
            id="ytplayer"
            type="text/html"
            width="100%"
            height="405"
            :src="'https://www.youtube.com/embed/' + checkVideo.id"
            frameborder="0"
            allowfullscreen
          />
          <div class="img_modal__description">
            <img
              class="img_modal__description--item"
              :src="checkVideo.thumbnails"
            />
            <span><b>{{ checkVideo.channelTitle }}</b></span>
          </div>
          <span class="description__modal">{{ checkVideo.description }}</span>
        </div>
        <template #footer>
          <Button
            label="Fechar"
            icon="pi pi-check"
            @click="closeModal"
            autofocus
          />
        </template>
      </Dialog>
    </div>
  </div>
</template>

<style scoped>
.container-page {
  display: flex;
  flex-direction: column;
  margin: 20px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 12px;
  background: #ffff;
}

.content {
  display: flex;
  justify-content: space-around;
  align-items: start;
  flex-flow: row wrap;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

.card__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border: 0;
  width: 300px;
  margin: 12px 4px;
  -webkit-box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
.card__container:hover {
  transform: scale(1.02);
  transition: 0.2s;
  -webkit-box-shadow: 0px 0px 17px -4px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.5);
}
.img__description {
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 4px 0 12px 0;
}
.img_modal__description {
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 12px 0 12px 0;
}

.img__description--item {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 4px;
  object-fit: cover;
}
.img_modal__description--item {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 8px;
  object-fit: cover;
}
::v-deep(.p-card .p-card-title) {
  display: -webkit-box;
  max-width: 250px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

::v-deep(.p-card-content) {
  display: flex;
  flex-direction: column;
  padding: 0 !important;
}
::v-deep(.p-card-content) span {
  display: -webkit-box;
  font-size: 14px;
  max-width: 250px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
::v-deep(.p-dialog-content) {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { useToast } from 'primevue/usetoast'

const store = useStore()
const toast = useToast()
const display = ref(false)

let checkVideo = reactive({
  id: '',
  title: '',
  channelTitle: '',
  thumbnails: '',
  description: '',
})

const videos = computed(() => store.getters.getFoundVideos)

const showVideo = (video) => {
  checkVideo.id = video.id.videoId
  checkVideo.title = video.snippet.title
  checkVideo.channelTitle = video.snippet.channelTitle
  checkVideo.thumbnails = video.snippet.thumbnails.default.url
  checkVideo.description = video.snippet.description

  display.value = true
};

const closeModal = () => {
  display.value = false;
};

onMounted(async () => {
  const response = await store.dispatch("getHomeVideos")
  totalRecords.value = await response.data.pageInfo.totalResults
  if (response.status === 403) {
    toast.add({ severity: 'error', summary: 'Erro ao Carregar', detail: 'Quota da API Youtube Data v3 diária excedida. Tenta novamente mais tarde.', life: 5000 })
  }
})

</script>
