<template>
    <footer class="absolute bottom-0 w-full bg-slate-300 text-center text-white dark:bg-neutral-600 p-8">
      <div class="container flex justify-center gap-3 mx-auto">
        <div>
          <a href="https://github.com/FilPolyakov13041995" target="_blank"><img src="../assets/icons/github-142-svgrepo-com.svg" alt="github"></a>
        </div>
        <div>
          <a href="https://www.instagram.com/filipp_polyakov/?next=%2F" target="_blank"><img src="../assets/icons/instagram-svgrepo-com.svg" alt="instagram"></a>
        </div>
      </div>
      <div
        class="text-black">
          &copy; {{ year }} Copyright:
        <a
          href="https://github.com/FilPolyakov13041995" target="_blank"
          >Filipp Polyakov</a
        >
      </div>
    </footer>
</template>

<script setup>

import { ref } from 'vue';
const year = ref(new Date().getFullYear());

</script>
