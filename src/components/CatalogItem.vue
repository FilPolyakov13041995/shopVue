<template>
  <div
    class="catalog__item">
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
            <div class="flex xs:items-center xs:justify-center md:justify-start md:items-center gap-3 pt-3">
              <p class="text-xl text-red-500">{{ books.discountPrice }} руб.</p>
              <p class="text-lg line-through text-slate-600"><b>{{ books.price }} руб.</b></p>
              <p class="text-lg text-white bg-red-400 rounded-lg w-16 text-center" >-{{ books.sale }}%</p>
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
          <div class="flex gap-2">
            <button
            class="block bg-orange-500 p-2 mt-2 
            rounded-md text-slate-50 hover:bg-orange-600 active:bg-orange-700"
            @click="$emit('addToCart', books)">В корзину
          </button>
          <button
              class="text-black block bg-slate-200 cursor-pointer p-2 mt-2 rounded-md hover:bg-slate-300 relative tooltip"
              :class="{ 'opacity-50': booksStore.cart.length === 0 }"
              :disabled="booksStore.cart.length === 0"
              @click="goToCart(closeInfoModal)"
              >
              <span class="tooltiptext" v-if="booksStore.cart.length === 0">Корзина пуста</span> 
              Перейти в корзину
              <span v-if="booksStore.cart.length" class="absolute top-0 right-0 bg-orange-500 text-white rounded-full px-2 py-1 transform translate-x-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-sm">{{ booksStore.cart.length }}</span>
          </button>
          </div>
        </div>
      </div>
    </item-window>
      <ul>
        <li class="p-1 border cartItem rounded-md hover:shadow-lg">
          <div class="text-center">
            <p class="text-lg">{{ books.title }}</p>
            <p class="text-base">{{ books.author }}, {{ books.year }}</p>
            <div class="relative" v-if="books.sale > 0">
              <div class="flex justify-center gap-3">
                <p class="text-xl text-red-500">{{ books.discountPrice }}</p>
                <p class="text-lg line-through text-slate-600"><b>{{ books.price }} руб.</b></p>
              </div>
              <p class="circle absolute bottom-0 right-1">&#8211;{{ books.sale }}%</p>
            </div>
            <div v-else>
              <p class="text-lg"><b>{{ books.price }} руб.</b></p>
            </div>
          </div>
          <img class="w-40 h-64 mx-auto" :src="books.image" :alt="books.alt">
          <div class="btn__control p-4 flex flex-col justify-center">
            <button 
              class="p-1 bg-orange-500 mt-3 rounded-md 
              w-48 mx-auto text-slate-50 hover:bg-orange-600 active:bg-orange-700"
              @click="$emit('addToCart', books)">Добавить в корзину
            </button>
            <button
              class="p-1 bg-blue-700 mt-3 rounded-md 
              w-48 mx-auto text-slate-50 hover:bg-blue-600 active:bg-blue-900" 
              @click="showInfoBook">Просмотр товара
            </button>
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
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import ItemWindow from './ItemWindow.vue'
import EditBook from './EditBook.vue'
import { useBooksStore } from '@/stores/books'
const booksStore = useBooksStore()
const router = useRouter()

const props = defineProps({
    books: {
      type: Object,
      required: true,
      default: () => {},
    },
})

const goToCart = (closeInfoModal) => {
  if(booksStore.cart.length > 0) {
    closeInfoModal()
    router.push('/cart')
  }
}

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


<style scoped>
  .cartItem {
    width: 350px;
    min-height: 500px;
  }
  .circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgb(243, 82, 82);
  color: white;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cart-button {
  animation: fade-in 0.5s ease-in-out;
}
.opacity-50 {
  opacity: 0.5;
  cursor: not-allowed;
}
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.tooltip {
  position: relative;
  display: inline-block;
}
.tooltip .tooltiptext {
  width: 150px;
  visibility: hidden;
  opacity: 0;
  position: absolute;
  z-index: 1;
  left: 50%;
  background-color: rgb(225, 29, 29);
  color: white;
  border-radius: 6px;
  transition: opacity 0.3s, visibility 0s linear 0.3s;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
  transition-delay: 0s;
}
</style>


