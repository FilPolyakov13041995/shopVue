<template>
  <div class="catalog">
    <h2 class="text-2xl p-2 bg-sky-800 text-white">Каталог товаров</h2>
    <div v-if="!searchQuery.length" class="filter flex">
      <div class="select p-2 relative">
        <p @click="isCategoriesVisible = !isCategoriesVisible"
          class="text-base text-center cursor-pointer bg-slate-200 
          font-medium w-60 rounded-md hover:bg-slate-300">{{ currentCategory }}
        </p>
      <div 
        class="options p-2 w-60 bg-gray-50 rounded-md  absolute left-2" 
        v-if="isCategoriesVisible">
          <button
            class="block"
            v-for="category in categories" :key="category.value"
            @click="filterByCategory(category.value)">
            {{ category.name }}
          </button>
      </div>
    </div>
    <div class="sortingControls p-2 relative">
        <p @click="isSortVisible = !isSortVisible"
          class="text-base text-center cursor-pointer bg-slate-200
          font-medium w-60 rounded-md hover:bg-slate-300">{{ currentSort }}
        </p>
        <div 
        class="options p-2 w-60 bg-gray-50 rounded-md absolute left-2"
        v-if="isSortVisible">
          <button class="block" @click="sortAscendingPrice">По возрастанию цены</button>
          <button @click="sortDescendingPrice">По убыванию цены</button>
          <button @click="sortNewBooks">По году <b>(сначала новые)</b></button>
          <button @click="sortOldBooks">По году <b>(сначала старые)</b></button>
        </div>
    </div>
    <div class="p-2 relative">
      <form-adding-books></form-adding-books>
    </div>
  </div>
    <div class="catalog__item pt-4 flex flex-wrap gap-4">
      <CatalogItem class="flex-auto w-60 h-2/4"
        v-for="book in booksStore.filterBooks"
        :key="book.id"
        :books="book"
        @addToCart="booksStore.addToCart">
      </CatalogItem>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useBooksStore } from '@/stores/books';
import CatalogItem from './CatalogItem.vue'
import FormAddingBooks from './FormAddingBooks.vue';

const booksStore = useBooksStore()
const currentCategory = ref('Выбрать категорию')
const currentSort = ref('Сортировать')
const isCategoriesVisible = ref(false)
const isSortVisible = ref(false)
const searchQuery = computed(() => booksStore.getSearchQuery)


const hideSelect = () => {
    isCategoriesVisible.value = false
    isSortVisible.value = false
}

onUnmounted(() => {
    document.removeEventListener('click', hideSelect)
})

onMounted(() => {
  booksStore.getBooks()
  filterByCategory('Все категории')
  document.addEventListener('click', hideSelect.bind(isCategoriesVisible, isSortVisible), true)
})

const categories = ref([
  { name: 'Все категории', value: 'Все категории' },
  { name: 'Художественная', value: 'Художественная' },
  { name: 'Детская', value: 'Детская' },
  { name: 'Бизнес-литература', value: 'Бизнес-литература' },
  { name: 'Компьютеры и Интернет', value: 'Компьютеры и Интернет' },
  { name: 'Кулинария и напитки', value: 'Кулинария и напитки' },
])

const filterByCategory = (category) => {
  if(category === 'Все категории') {
    booksStore.filteredBooks = booksStore.books
  } else {
    booksStore.filteredBooks = booksStore.books.filter((book) => book.category === category)
  }
  currentCategory.value = category
}

const sortAscendingPrice = () => {
  if(booksStore.filteredBooks.length) {
    booksStore.filteredBooks.sort((a, b) => a.price - b.price)
  } else {
    booksStore.books.sort((a, b) => a.price - b.price)
  }
  currentSort.value = 'По возрастанию цены'
}

const sortDescendingPrice = () => {
  if(booksStore.filteredBooks.length) {
    booksStore.filteredBooks.sort((a, b) => b.price - a.price)
  } else {
    booksStore.books.sort((a, b) => b.price - a.price)
  }
  currentSort.value = 'По убыванию цены'
}

const sortNewBooks = () => {
  if(booksStore.filteredBooks.length) {
    booksStore.filteredBooks.sort((a, b) => b.year - a.year)
  } else {
    booksStore.books.sort((a, b) => b.year - a.year)
  }
  currentSort.value = 'Самые новые'
}

const sortOldBooks = () => {
  if(booksStore.filteredBooks.length) {
    booksStore.filteredBooks.sort((a, b) => a.year - b.year)
  } else {
    booksStore.books.sort((a, b) => a.year - b.year)
  }
  currentSort.value = 'Самые старые'
}

</script>

