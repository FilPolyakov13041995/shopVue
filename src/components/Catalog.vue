<template>
  <div class="catalog">
    <h2 class="text-2xl p-2 bg-sky-800 text-white">Каталог товаров</h2>
    <div v-if="!searchQuery.length" class="filter flex p-2 justify-center xs:flex-col xs:items-center md:flex-row">
      <div class="p-2 relative">
        <router-view>
          <router-link to="/addingBook">
            <button
              v-if="isAdminEntered"
              class="text-base text-center cursor-pointer bg-teal-400
              font-medium w-60 rounded-md hover:bg-teal-300">Добавить книгу в каталог
            </button>
          </router-link>
        </router-view>
    </div>
      <div class="select p-2 relative z-10">
        <p @click="isCategoriesVisible = !isCategoriesVisible"
          class="text-base text-center cursor-pointer bg-slate-200 
          font-medium w-60 rounded-md hover:bg-slate-300">{{ currentCategory }}
        </p>
      <div 
        class="options p-2 w-60 bg-gray-50 rounded-md absolute left-2" 
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
    
  </div>
    <div class="catalog__item flex flex-wrap gap-4 pl-2 pr-2 mb-20">
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
import { db } from '@/firebase'
import { auth } from '@/firebase'
import { doc, getDoc } from "firebase/firestore"
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useBooksStore } from '@/stores/books';
import { useRouter, useRoute } from 'vue-router'
import CatalogItem from './CatalogItem.vue'

const booksStore = useBooksStore()
const router = useRouter()

const currentCategory = ref('Выбрать категорию')
const currentSort = ref('Сортировать')
const isCategoriesVisible = ref(false)
const isSortVisible = ref(false)
const isAdminEntered = ref(false)
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
  adminEntered()
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

const adminEntered = async () => {
  const docRef = doc(db, 'users', 'sqeYjwyjJXPJytdlgmRf')
  const docSnap = await getDoc(docRef)
  if(auth.currentUser) {
    if(docSnap.data().uid === auth.currentUser.uid) {
      isAdminEntered.value = true
    }
  }
}

</script>