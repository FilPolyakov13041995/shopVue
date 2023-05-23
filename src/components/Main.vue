<template>
    <nav class="header bg-slate-300 flex flex-row gap-4 items-center justify-center p-3">
        <router-link to="/">
            <a href="#"><img class="pl-4 w-52" src="../assets/SHOP.png" alt="Logo"></a>
        </router-link>
        <router-link class="border p-3 rounded-xl border-sky-900 hover:bg-gray-100 
            ease-in duration-300" to="/catalog">Каталог
        </router-link>
        <input
            @keyup.enter="search"
            v-model="searchQuery"
            class="basis-2/5 border p-3.5 text-sm rounded-xl focus:ring-sky-400 focus:border-sky-500 border-sky-900" 
            type="search"
            placeholder="Введите название книги">
            <span>
                <button
                    @click="search"
                    class="p-3.5 text-sm font-medium text-white bg-orange-500 rounded-xl    hover:bg-orange-400">
                    <svg 
                        class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"   xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round"   stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7   7 0 0114 0z"></path>
                    </svg>
                </button>
            </span>
        <router-link class="border p-3 rounded-xl border-sky-900 hover:bg-gray-100 
            ease-in duration-300" to="/account">Аккаунт
        </router-link>
        <router-link class="border p-3 rounded-xl border-sky-900 hover:bg-gray-100 
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


<style>


</style>