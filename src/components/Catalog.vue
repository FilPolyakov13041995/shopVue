<template>
  <div class="catalog">
    <h2 class="xs:text-xl xs:text-center md:text-2xl p-2 bg-sky-800 text-white">Каталог товаров</h2>
    <div v-if="!searchQuery.length" class="filter flex p-2 justify-center xs:flex-col xs:items-center md:flex-row">
      <div class="p-2 relative">
        <router-view>
          <router-link to="/addingBook">
            <button 
              :disabled="!isAdminEntered"
              class="text-base text-center cursor-pointer bg-teal-400 font-medium w-60 rounded-md hover:bg-teal-300 mobile-tooltip"
              :class="{ 'bg-teal-800 hover:bg-teal-700 text-slate-200': !isAdminEntered }"
              :title="!isAdminEntered ? 'Вы должны войти как администратор, чтобы добавить книгу' : '' ">
              Добавить книгу в каталог
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
          <button class="block" @click="sortDiscount">По скидке <b></b></button>
          <button @click="sortNewBooks">По году <b>(сначала новые)</b></button>
          <button @click="sortOldBooks">По году <b>(сначала старые)</b></button>
        </div>
    </div>
  </div>
    <div class="catalog__item flex flex-wrap gap-4 pl-2 pr-2 mb-20">
      <CatalogItem class="flex-auto w-60 h-2/4 mb-5"
        v-for="book in booksStore.filterBooks"
        :key="book.id"
        :books="book"
        @addToCart="booksStore.addToCart">
      </CatalogItem>
    </div>
  </div>
  <MyFooter class="xs:hidden md:block"></MyFooter>
</template>

<script setup>
import { db } from '@/firebase'
import { auth } from '@/firebase'
import { doc, getDoc } from "firebase/firestore"
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useBooksStore } from '@/stores/books'
import CatalogItem from './CatalogItem.vue'
import MyFooter from  './Footer.vue'

const booksStore = useBooksStore()


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
  currentSort.value = 'Сортировать'
  if(category === 'Все категории') {
    booksStore.filteredBooks = booksStore.books
  } else {
    booksStore.filteredBooks = booksStore.books.filter((book) => book.category === category)
  }
  currentCategory.value = category
}


const sortAscendingPrice = () => {
  if(booksStore.filteredBooks.length) {
    booksStore.filteredBooks.sort((a, b) => a.discountPrice - b.discountPrice)
  } else {
    booksStore.books.sort((a, b) => a.discountPrice - b.discountPrice)
  }
  currentSort.value = 'По возрастанию цены'
}

const sortDescendingPrice = () => {
  if(booksStore.filteredBooks.length) {
    booksStore.filteredBooks.sort((a, b) => b.discountPrice - a.discountPrice)
  } else {
    booksStore.books.sort((a, b) => b.discountPrice - a.discountPrice)
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

const sortDiscount = () => {
  if(booksStore.filteredBooks.length) {
    booksStore.filteredBooks.sort((a, b) => b.sale - a.sale)
  } else {
    booksStore.books.sort((a, b) => b.sale - a.sale)
  }
  currentSort.value = 'По скидке'
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


<style>
  /* Стили для всплывающей подсказки на мобильных устройствах */
  @media only screen and (max-width: 767px) {
    .mobile-tooltip {
      position: relative;
    }
    .mobile-tooltip::after {
      content: attr(title);
      position: absolute;
      bottom: calc(100% + 0.5rem);
      left: 50%;
      transform: translateX(-50%);
      background-color: #b74848;
      color: #fff;
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      border-radius: 0.25rem;
      white-space: nowrap;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }
    .mobile-tooltip:hover::after {
      opacity: 1;
    }
  }
</style>