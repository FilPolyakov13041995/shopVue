<template>
<!-- Меню на маленьких устройствах -->
<div class="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
    <div class="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        <router-link to="/" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <button type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                <img class="w-6 h-6" src="../assets/house-svgrepo-com.svg" alt="home">
                <span class="text-sm text-gray-800 dark:text-gray-400">Главная</span>
            </button>
        </router-link>
        
        <router-link to="/catalog" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <button type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                <img class="w-6 h-6" src="../assets/book-closed-svgrepo-com.svg" alt="catalog">
            <span class="text-sm text-gray-800 dark:text-gray-400">Каталог</span>
        </button>
        </router-link>

        <router-link to="/account" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <button type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <img class="w-6 h-6" src="../assets/man-svgrepo-com.svg" alt="account">
            <span class="text-sm text-gray-800 dark:text-gray-400">Аккаунт</span>
            </button>
        </router-link>
        
        <router-link to="/cart" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <button type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                <img class="w-6 h-6" src="../assets/trashcan-svgrepo-com.svg" alt="cart">
            <span class="text-sm text-gray-800 dark:text-gray-400">Корзина</span>
            </button>
        </router-link>
        
    </div>
</div>

<!-- Меню на больших устройствах -->
    <nav class="header bg-slate-300 flex flex-row xs:gap-2 md:gap-4 items-center justify-center px-4 py-2">
        <router-link to="/">
            <a href="#"><img class="xs:w-24 md:w-52" src="../assets/SHOP.png" alt="Logo"></a>
        </router-link>
        <router-link class="xs:hidden md:block border p-3 rounded-xl border-sky-900 hover:bg-gray-100 
            ease-in duration-300" to="/catalog">Каталог
        </router-link>
        <div class="relative flex items-center xs:basis-3/5 md:basis-2/5">
            <input
            @keyup.enter="search"
            v-model="searchQuery"
            class="w-full border-none xs:p-2.5 md:p-3.5 text-sm rounded-xl focus:outline-none" 
            placeholder="Введите название книги">
            <span
              v-if="searchQuery"
              @click="searchQuery = ''"
              class="absolute right-2 text-sm border-b text-gray-400 cursor-pointer">
              очистить
            </span>
        </div>
            <span>
                <button
                    @click="search"
                    class="xs:p-2.5 md:p-3.5 text-sm font-medium text-white bg-orange-500 rounded-xl hover:bg-orange-400">
                    <svg 
                        class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7   7 0 0114 0z"></path>
                    </svg>
                </button>
            </span>
        <router-link class="xs:hidden md:block border p-3 rounded-xl border-sky-900 hover:bg-gray-100 
            ease-in duration-300" to="/account">Аккаунт
        </router-link>
        <router-link class=" xs:hidden md:block border p-3 rounded-xl border-sky-900 hover:bg-gray-100 
            ease-in duration-300 relative" to="/cart">Корзина 
            <span v-if="booksStore.cart.length" 
                class="bg-orange-500 absolute bottom-9 pl-2 pr-2 
                rounded-xl text-white">{{ booksStore.cart.length }}
            </span>
        </router-link>
    </nav>
    <router-view/>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useBooksStore } from '@/stores/books';


const booksStore = useBooksStore()
const router = useRouter()

const searchQuery = computed({
  get: () => booksStore.getSearchQuery,
  set: (value) => booksStore.setSearchQuery(value)
})

const search = () => {
    if(booksStore.searchQuery !== '') {
        router.push('/catalog')
    } 
}

</script>
