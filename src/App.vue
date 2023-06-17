<template>
    <VApp>
      <Main></Main>
    </VApp>
</template>


<script setup>
import Main from './components/Main.vue';
import { VApp } from 'vuetify/lib/components/index.mjs';
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #000;
}

/* nav a.router-link-exact-active {
  color: #2c2846;
} */
</style>
