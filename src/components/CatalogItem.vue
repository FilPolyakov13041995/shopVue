<template>
  <div
    class="catalog__item rounded-xl hover:shadow-2xl">
    <item-window 
      v-if="bookInfoVisibility"
      @closeModal="closeInfoModal">
      <div class="xs:text-center md:text-left w-5/6 mx-auto shadow-2xl rounded-lg mt-10 xs:flex xs:flex-col xs:items-center md:flex md:flex-row md:justify-center md:items-stretch gap-3 p-2 xs:mb-40">
        <div class="md:basis-1/5/">
          <img class="xs:w-64 md:w-80" :src="books.image" :alt="books.alt">
        </div>
        <div class="md:basis-2/5">
          <p class="text-3xl pt-3">{{ books.title }}</p>
          <p class="text-xl pt-2">{{ books.author }}, {{ books.year }}</p>
          <div v-if="books.sale > 0">
            <div class="flex items-center justify-center gap-3 pt-3">
              <p class="text-xl text-red-500">{{ books.discountPrice }} руб.</p>
              <p class="text-lg line-through text-slate-600"><b>{{ books.price }} руб.</b></p>
              <p class="text-lg text-white bg-red-400 rounded-lg w-16" >-{{ books.sale }}%</p>
            </div>
          </div>
          <div  v-else>
            <p class="text-lg pt-3"><b>{{ books.price }} руб.</b></p>
          </div>
          <div class="container__desc">
            <p class="books__descr text-justify text-base pt-3">{{ shortenedDescription() }} 
              <span> 
                <button v-if="showFullDescription" @click="toggleDescription"><b>Скрыть</b></button>
                <button v-else-if="showToggle" @click="toggleDescription"><b>Показать полностью</b></button>
              </span>
            </p>
          </div>
          <button 
            class="border block xs:mx-auto bg-orange-500 p-2 mt-2 
            rounded-md text-slate-50 hover:bg-orange-600 active:bg-orange-700"
            @click="$emit('addToCart', books)">В корзину
          </button>
          <router-view>
            <router-link
              @click="closeInfoModal"
              class="block xs:mx-auto rounded-md p-2 w-44 mt-3 text-center
             bg-slate-200 hover:bg-slate-300" to="/cart">Перейти в корзину
            </router-link>
          </router-view>
        </div>
      </div>
    </item-window>
      <ul>
        <li class="p-2 border rounded-xl">
          <div class="text-center">
            <p class="text-xl">{{ books.title }}</p>
            <p class="text-base">{{ books.author }}, {{ books.year }}</p>
            <div v-if="books.sale > 0">
              <div class="flex justify-center gap-3">
                <p class="text-xl text-red-500">{{ books.discountPrice }}</p>
                <p class="text-lg line-through text-slate-600"><b>{{ books.price }} руб.</b></p>
              </div>
              <p class="text-lg text-white bg-red-400 rounded-lg pl-1 pr-1 w-16 mx-auto" >-{{ books.sale }}%</p>
            </div>
            <div v-else>
              <p class="text-lg"><b>{{ books.price }} руб.</b></p>
            </div>
          </div>
          <img class="w-40 h-64 mx-auto" :src="books.image" :alt="books.alt">
          <div class="btn__control p-4 flex flex-col justify-center">
            <button 
              class="border p-1 bg-orange-500 mt-3 rounded-md 
              w-48 mx-auto text-slate-50 hover:bg-orange-600 active:bg-orange-700"
              @click="$emit('addToCart', books)">Добавить в корзину
            </button>
            <button class="border p-1 bg-blue-700 mt-3 rounded-md 
              w-48 mx-auto text-slate-50 hover:bg-blue-600 active:bg-blue-900" 
              @click="showInfoBook">Просмотр товара
            </button>

            <!-- DELETE / UPDATE -->
              <edit-book :books="books"></edit-book>
          </div>
        </li>
      </ul>
  </div>
</template>

<script setup>
import { db } from '@/firebase'
import { auth } from '@/firebase'
import { doc, getDoc } from "firebase/firestore"
import { ref, onMounted } from 'vue'
import ItemWindow from './ItemWindow.vue'
import EditBook from './EditBook.vue'

const props = defineProps({
    books: {
      type: Object,
      required: true,
      default: () => {},
    },
})

const emits = defineEmits(['addToCart'])
const bookInfoVisibility = ref(false)
const showFullDescription = ref(false)
const showToggle = ref(false)

const isAdminEntered = ref(false)

const adminEntered = async () => {
  const docRef = doc(db, 'users', 'sqeYjwyjJXPJytdlgmRf')
  const docSnap = await getDoc(docRef)
  if(auth.currentUser) {
    if(docSnap.data().uid === auth.currentUser.uid) {
      isAdminEntered.value = true
    }
  }
}

const showInfoBook = () => {
  bookInfoVisibility.value = true
}

const closeInfoModal = () => {
  bookInfoVisibility.value = false
}

const shortenedDescription = () => {
  const length = props.books.description.length
  const halfway = Math.ceil(length / 1.5);
  const shortened = props.books.description.substring(0, halfway);

  if(length >= 600) {
      showToggle.value = true;
      return showFullDescription.value ? props.books.description : shortened + '...'
  }
  return props.books.description
}

const toggleDescription = () => {
  showFullDescription.value = !showFullDescription.value
}

onMounted(() => {
  adminEntered()
})

</script>
