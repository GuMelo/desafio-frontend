<template>
  <div class="container-page">
    <div class="featured">
      <h1>Destaques de Hoje</h1>
      <div class="featured__top">
        <div class="featured__main">
          <div class="featured__main--embed">
            <embed
              id="ytplayer"
              type="text/html"
              width="720"
              height="405"
              frameborder="0"
              allowfullscreen
              :src="'https://www.youtube.com/embed/' + main"
            />
          </div>
          <div class="featured__more">
            <div
              class="featured__more--item"
              v-for="(video, index) in videos"
              :key="index"
            >
              <Card
                class="card__container"
                @click="mainVideo(video)"
                :key="index"
              >
                <template #header>
                  <img
                    class="p-card-img"
                    :src=video.snippet.thumbnails.default.url
                    alt="Thumbnail Vid"
                  />
                </template>
                <template
                  #title
                  class="p-card-title"
                >
                  <p :title="video.snippet.title">{{ video.snippet.title }}</p>
                </template>
                <template
                  #content
                  class="p-card-description"
                >
                  <span>Canal: {{ video.snippet.channelTitle }}</span>
                  <span>{{ video.snippet.description }}</span>
                </template>
              </Card>
            </div>
          </div>
        </div>
        <div class="">
          <h2>#Publicidade</h2>
          <div>
            <img
              class="img__publi"
              src="@/assets/teste/01.jpg"
              alt="Imagem Propaganda"
              width="405"
            />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.container-page {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 12px;
  background: #ffff;
}
.featured {
  width: 100%;
}

.featured__top {
  display: flex;
  margin-top: 8px;
  justify-content: space-between;
  align-items: start;
  flex-flow: row wrap;
}
.featured__more {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 12px;
}
.featured__more--item {
  display: flex;
}
.featured__main {
  display: flex;
  flex-wrap: wrap;
}
.img__thumb {
  cursor: pointer;
}
.img__thumb--item {
  display: flex;
  flex-direction: column;
  padding: 4px;
  width: 400px;
  height: 90px;
}
.img__thumb--item span {
  display: -webkit-box;
  max-width: 250px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card__container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  -webkit-box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
.card__container:hover {
  -webkit-box-shadow: 0px 0px 17px -4px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
}

.img__publi {
  border-radius: 12px;
  width: 250px;
  height: 380px;
  object-fit: cover;
}

::v-deep(.p-card .p-card-title) {
  display: -webkit-box;
  max-width: 250px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 14px;
}

::v-deep(.p-card-content) {
  display: flex;
  flex-direction: column;
  padding: 4px 0 !important;
}
::v-deep(.p-card-content) span {
  display: -webkit-box;
  max-width: 250px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 12px;
}
::v-deep(.p-card-header) {
  padding: 8px;
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const main = ref()
let videos = ref()

onMounted(async () => {
  const response = await store.dispatch("getFeatured")
  videos.value = await response.data.items
  main.value = await response.data.items[0].id.videoId
})

const mainVideo = (video) => {
  main.value = video.id.videoId;
}

</script>
