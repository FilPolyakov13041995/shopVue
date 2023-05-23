<template>
  <div
    class="catalog__item rounded-xl hover:shadow-2xl">
    <item-window 
      v-if="bookInfoVisibility"
      @closeModal="closeInfoModal">
      <div class="flex justify-evenly items-start">
        <div>
          <img :src="books.image" :alt="books.alt">
        </div>
        <div>
          <p class="text-3xl text-left p-1 mt-4">{{ books.title }}</p>
          <p class="text-xl text-left p-1">{{ books.author }}, {{ books.year }}</p>
          <p class="text-3xl text-left p-1"><b>{{ books.price }} руб.</b></p>
          <div class="container__desc">
            <p class="books__descr text-justify p-1 text-base">{{ shortenedDescription() }} 
              <span> 
                <button v-if="showFullDescription" @click="toggleDescription"><b>Скрыть</b></button>
                <button v-else-if="showToggle" @click="toggleDescription"><b>Показать полностью</b></button>
              </span>
            </p>
          </div>
          <button 
            class="border block bg-orange-500 p-2 ml-1 mt-2 
            rounded-md text-slate-50 hover:bg-orange-600 active:bg-orange-700"
            @click="$emit('addToCart', books)">В корзину
          </button>
          <router-view>
            <router-link
              @click="closeInfoModal"
              class="block rounded-md p-2 ml-1 w-44 mt-3 text-center
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
            <p class="text-lg"><b>{{ books.price }} руб.</b></p>
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

            <div v-if="isAdminEntered" class="p-2 text-center">
              <button @click="showWindowDeleteConfirm" class="mr-3 border-b border-gray-700">Удалить</button>
              <button class="border-b border-gray-700">Изменить</button>
              <item-window-small
                v-if="confirmWindow"
                @closeModal="closeWindowDeleteConfirm">
                <h1>Вы действительно хотите удалить книгу <b>{{ books.title }}</b>?</h1>
                <div class="mt-3">
                  <button @click="removeBook" class="p-2 mr-3 border rounded-md hover:bg-slate-100">Да</button>
                  <button @click="closeWindowDeleteConfirm" class="p-2 border bg-red-500 hover:bg-red-400 rounded-md">Отмена</button>
                </div>
              </item-window-small>
            </div>
          </div>
        </li>
      </ul>
  </div>
</template>

<script setup>
import { ref as storageRef, deleteObject } from 'firebase/storage'
import { storage } from '@/firebase'
import { db } from '@/firebase'
import { auth } from '@/firebase'
import { doc, getDoc, deleteDoc, collection } from "firebase/firestore"
import { ref, onMounted } from 'vue'
import ItemWindow from './ItemWindow.vue'
import ItemWindowSmall from './ItemWindowSmall.vue'

import { useBooksStore } from '@/stores/books';
const booksStore = useBooksStore()
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
const confirmWindow = ref(false)


const removeBook = async () => {
  try {
    const bookId = props.books.id
    // Получаем документ книги из Firestore
    const bookDocRef = doc(collection(db, 'books'), bookId)
    const bookDocSnapshot = await getDoc(bookDocRef)
    const bookData = bookDocSnapshot.data()

    // Получаем ссылку на объект в Firebase Storage из поля image в документе Firestore
    const imageRef = storageRef(storage, bookData.image)
    console.log(imageRef)
    await deleteObject(imageRef);
    // Удаляем документ книги из Firestore
    await deleteDoc(bookDocRef)
    console.log(`Книга ${bookId} успешно удалена.`);
  } catch (error) {
    console.error(`Ошибка при удалении книги ${bookId}:`, error);
  }

  closeWindowDeleteConfirm()

};

async function adminEntered() {
  const docRef = doc(db, 'users', 'sqeYjwyjJXPJytdlgmRf')
  const docSnap = await getDoc(docRef)
  if(auth.currentUser) {
    if(docSnap.data().uid === auth.currentUser.uid) {
      isAdminEntered.value = true
    }
  }
}

const showWindowDeleteConfirm = () => {
  confirmWindow.value = true
  document.body.classList.add('modal-open')
}

const closeWindowDeleteConfirm = () => {
  confirmWindow.value = false
  document.body.classList.remove('modal-open')
}

const showInfoBook = () => {
  bookInfoVisibility.value = true
  document.body.classList.add('modal-open')
}

const closeInfoModal = () => {
  bookInfoVisibility.value = false
  document.body.classList.remove('modal-open')
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


<style>
.books__descr {
  width: 800px;
}
.imgModalBook {
  width: 300px;
}
body.modal-open {
  overflow: hidden;
}
</style>
