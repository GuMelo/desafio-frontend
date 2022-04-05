<script setup>
import Categories from '@/components/Categories/Categories.vue'
import Featured from '@/components/Featured/Featured.vue'
import Header from '@/components/Header/Header.vue'
import MoreVideos from '@/components/MoreVideos/MoreVideos.vue'

</script>

<template>
  <Header />
  <div class="">
    <Categories />
    <Featured />
    <MoreVideos />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
