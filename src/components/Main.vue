<template>
<!-- Меню на маленьких устройствах -->
<div class="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
    <div class="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        <router-link to="/" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <button type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                <svg class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"     fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Главная</span>
            </button>
        </router-link>
        
        <router-link to="/catalog" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <button type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <svg class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
                <path clip-rule="evenodd" fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"></path>
            </svg>
            <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Каталог</span>
        </button>
        </router-link>

        <router-link to="/account" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <button type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <svg class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"></path>
            </svg>  
            
            <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Аккаунт</span>
            </button>
        </router-link>
        
        <router-link to="/cart" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <button type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                <svg class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
            </svg>
            <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Корзина</span>
            </button>
        </router-link>
        
    </div>
</div>

<!-- Меню на больших устройствах -->
    <nav class="header bg-slate-300 flex flex-row xs:gap-2 md:gap-4 items-center justify-center p-2">
        <router-link to="/">
            <a href="#"><img class="xs:w-24 md:w-52" src="../assets/SHOP.png" alt="Logo"></a>
        </router-link>
        <router-link class="xs:hidden md:block border p-3 rounded-xl border-sky-900 hover:bg-gray-100 
            ease-in duration-300" to="/catalog">Каталог
        </router-link>
        <input
            @keyup.enter="search"
            v-model="searchQuery"
            class="xs:basis-3/5 md:basis-2/5 border xs:p-2.5 md:p-3.5 text-sm rounded-xl focus:ring-sky-400 focus:border-sky-500 border-sky-900" 
            type="search"
            placeholder="Введите название книги">
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
            ease-in duration-300" to="/cart">Корзина 
            <span v-if="booksStore.cart.length" 
                class="bg-orange-500 absolute top-9 pl-2 pr-2 
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


