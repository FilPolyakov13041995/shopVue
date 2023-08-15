<template>
  <div>
    <v-carousel v-if="booksStore.discountBooks.length">
        <v-carousel-item 
          v-for="(item, i) in booksStore.discountBooks"
          :key="i">
          <div class="relative mx-auto container__img">
            <img class="w-full h-full mt-6" :src="item.image"/>
          </div>
          <div class="absolute top-2 right-2">
              <img class="w-20" src="../assets/icons/sale-tag-for-online-shops-svgrepo-com.svg" alt="sale"/>
            </div>
        </v-carousel-item>
    </v-carousel>
  </div>
  <div class="flex flex-row justify-center xs:gap-2 md:gap-10 xs:p-3 md:p-5 bg-zinc-50 text-white xs:mb-20 md:mb-28">
    <div class="flex flex-col justify-center items-center xs:w-40 xs:h-40 md:w-48 md:h-48 rounded-xl bg-stone-500 hover:bg-stone-400 p-2">
      <p class="xs:text-1xl md:text-2xl text-center font-mono">Книг в каталоге</p>
      <p class="xs:text-5xl md:text-7xl font-mono">{{ booksStore.books.length }}</p>
    </div>
    <div class="flex flex-col justify-center items-center xs:w-40 xs:h-40 md:w-48 md:h-48 rounded-xl  bg-stone-500 hover:bg-stone-400 p-2">
      <p class="xs:text-1xl md:text-2xl text-center font-mono">Категорий книг</p>
      <p class="xs:text-5xl md:text-7xl font-mono">5</p>
    </div>
    <div class="flex flex-col justify-center items-center xs:w-40 xs:h-40 md:w-48 md:h-48 rounded-xl  bg-stone-500 hover:bg-stone-400 p-2">
      <p class="xs:text-lg md:text-xl text-center font-mono">Возможность <b>добавить</b>, <b>редактировать</b> или <b>удалить</b> книгу</p>
    </div>
  </div>
  <MyFooter class="xs:hidden md:block"></MyFooter>
</template>

<script setup>
import { onMounted } from 'vue'
import MyFooter from '@/components/Footer.vue'
import { VCarousel, VCarouselItem } from 'vuetify/components'
import { useBooksStore } from '@/stores/books'

const booksStore = useBooksStore()

onMounted(() => {
  booksStore.getBooks()
})

</script>

<style>
  .container__img {
    width: 240px;
    height: 390px;
  }
</style>