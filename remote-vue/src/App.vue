<script setup lang="ts">
import './style.css'
import HelloWorld from './components/HelloWorld.vue'
import viteLogo from './assets/vite.svg'
import vueLogo from './assets/vue.svg'

</script>

<template>
  <div class="container mx-auto justify-center flex gap-2">
    <img :src="viteLogo" class="logo" alt="Vite logo" />
    <a href="/" target="_blank">
      <img :src="vueLogo" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
