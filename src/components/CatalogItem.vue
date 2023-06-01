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
          <div v-if="books.sale > 0">
            <div class="flex  gap-3">
              <p class="text-xl text-red-500">{{ books.price - (books.price * books.sale / 100).toFixed(1) }} руб.</p>
              <p class="text-lg line-through text-slate-600"><b>{{ books.price }} руб.</b></p>
              <p class="text-lg text-white bg-red-400 text-center rounded-lg w-16" >-{{ books.sale }}%</p>
            </div>
          </div>
          <div v-else>
            <p class="text-lg"><b>{{ books.price }} руб.</b></p>
          </div>
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
            <div v-if="books.sale > 0">
              <div class="flex justify-center gap-3">
                <p class="text-xl text-red-500">{{ books.price - (books.price * books.sale / 100).toFixed(1) }} руб.</p>
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

            <div v-if="isAdminEntered" class="p-2 text-center">
              <button @click="showWindowDeleteConfirm" class="mr-3 border-b border-gray-700">Удалить</button>
              <button @click="showBookChangeOptions" class="border-b border-gray-700">Изменить</button>
              <item-window-small
                v-if="confirmWindow"
                @closeModal="closeWindowDeleteConfirm">
                <h1>Вы действительно хотите удалить книгу <b>{{ books.title }}</b>?</h1>
                <div class="mt-3">
                  <button @click="removeBook" class="p-2 mr-3 border rounded-md hover:bg-slate-100">Да</button>
                  <button @click="closeWindowDeleteConfirm" class="p-2 border bg-red-500 hover:bg-red-400 rounded-md">Отмена</button>
                </div>
              </item-window-small>
              <item-window 
                @close-modal="closeBookFormUpdate"
                v-if="showBookDataForUpdate">
                <h1 class=" text-2xl">Редактирование книги</h1>
                <form class="p-10" @submit.prevent="upDateBook(booksStore)">
                  <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 w-full group">
                      <input type="text" name="title" id="title" v-model="books.title" class="block py-2.5 px-0 w-full text-sm text-gray-900  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                      <label class="text-xs text-gray-500" for="title">Название книги</label>
                    </div>
                    <div class="relative z-0 w-full mb-2 group">
                      <input type="text" name="author" id="author" v-model="books.author" class="block py-2.5 px-0 w-full text-sm text-gray-900   bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                      <label class="text-xs text-gray-500" for="author">Автор</label>
                    </div>
                    <div class="relative z-0 w-full mb-2 group">
                      <input type="text" name="year" id="year" v-model="books.year" class="block py-2.5 px-0 w-full text-sm text-gray-900   bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                      <label class="text-xs text-gray-500" for="year">Год издания</label>
                    </div>
                    <div class="relative z-0 w-full mb-2 group">
                      <input type="text" name="price" id="price" v-model="books.price" class="block py-2.5 px-0 w-full text-sm text-gray-900  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                      <label for="price" class="text-xs text-gray-500">Цена</label>
                    </div>
                    <div class="relative z-0 w-full mb-2 group">
                      <input type="text" name="quantity" id="quantity" v-model="books.quantity" class="block py-2.5 px-0 w-full text-sm   text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                      <label for="quantity" class="text-xs text-gray-500">Количество</label>
                    </div>
                    <div class="relative z-0 w-full mb-2 group">
                      <select name="category" id="category" v-model="books.category" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" >
                        <option value="" disabled selected hidden>Выберите категорию</option>
                        <option value="Художественная">Художественная</option>
                        <option value="Детская">Детская</option>
                        <option value="Бизнес-литература">Бизнес-литература</option>
                        <option value="Компьютеры и Интернет">Компьютеры и Интернет</option>
                        <option value="Кулинария и напитки">Кулинария и напитки</option>
                      </select>
                      <label for="category" class="text-xs text-gray-500">Категория</label>
                    </div>
                    <div class="relative z-0 w-full mb-2 group">
                      <input type="text" name="sale" id="sale" v-model="books.sale" class="block py-2.5 px-0 w-full text-sm text-gray-900  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                      <label for="sale" class="text-xs text-gray-500">Скидка</label>
                    </div>
                    <div class="relative z-0 w-full mb-2 group">
                      <input type="text" name="alt" id="alt" v-model="books.alt" class="block py-2.5 px-0 w-full text-sm text-gray-900  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                      <label for="alt" class="text-xs text-gray-500">Текст изображения</label>
                    </div>
                    <div class="relative z-0 w-full mb-2 group">
                      <input type="file" name="file" id="file" @change="onFileChange" class="block py-2.5 px-0 w-full text-sm text-gray-900   bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                      <label for="file" class="text-xs text-gray-500">Изображение</label>
                    </div>
                  </div>
                  <div>
                    <textarea name="description" id="description" rows="3" v-model="books.description" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" "></textarea>
                    <label class="text-xs text-gray-500" for="description">Описание</label>
                  </div>
                  <button class=" mt-3 text-white bg-orange-500 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">Сохранить</button>
                </form> 
              </item-window>
            </div>
          </div>
        </li>
      </ul>
  </div>
</template>

<script setup>
import { ref as storageRef, deleteObject, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '@/firebase'
import { db } from '@/firebase'
import { auth } from '@/firebase'
import { doc, getDoc, deleteDoc, collection, updateDoc } from "firebase/firestore"
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
const showBookDataForUpdate = ref(false)
const showToggle = ref(false)

const isAdminEntered = ref(false)
const confirmWindow = ref(false)

const onFileChange = (event) => {
  booksStore.file = event.target.files[0]
}

const upDateBook = async (booksStore) => {
  const bookId = props.books.id
  const bookDocRef = doc(db, 'books', bookId)

  // Проверяем, есть ли в объекте booksStore свойство file
  if(booksStore && booksStore.file) {
    // Загружаем новую картинку в Firebase Storage
    const fileRef = storageRef(storage, `images/${booksStore.file.name}`)
    await uploadBytes(fileRef, booksStore.file)
    const downloadUrl = await getDownloadURL(fileRef)

    // Обновляем документ книги в Firestore с новыми данными, включая новую картинку
    await updateDoc(bookDocRef, {
      title: props.books.title,
      author: props.books.author,
      year: props.books.year,
      price: props.books.price,
      quantity: props.books.quantity,
      category: props.books.category,
      sale: props.books.sale,
      description: props.books.description,
      image: downloadUrl,
      alt: props.books.alt
    })
  } else {
    // Если свойства file нет, обновляем документ без картинки
    await updateDoc(bookDocRef, {
      title: props.books.title,
      author: props.books.author,
      year: props.books.year,
      price: props.books.price,
      quantity: props.books.quantity,
      category: props.books.category,
      sale: props.books.sale,
      description: props.books.description,
      alt: props.books.alt
    })
  }
  closeBookFormUpdate()
}

const removeBook = async () => {
  try {
    const bookId = props.books.id
    // Получаем документ книги из Firestore
    const bookDocRef = doc(collection(db, 'books'), bookId)
    const bookDocSnapshot = await getDoc(bookDocRef)
    const bookData = bookDocSnapshot.data()

    // Получаем ссылку на объект в Firebase Storage из поля image в документе Firestore
    const imageRef = storageRef(storage, bookData.image)
    await deleteObject(imageRef);
    // Удаляем документ книги из Firestore
    await deleteDoc(bookDocRef)
    console.log(`Книга ${bookId} успешно удалена.`)
  } catch (error) {
    console.error(`Ошибка при удалении книги ${bookId}:`, error)
  }
  closeWindowDeleteConfirm()
};

const adminEntered = async () => {
  const docRef = doc(db, 'users', 'sqeYjwyjJXPJytdlgmRf')
  const docSnap = await getDoc(docRef)
  if(auth.currentUser) {
    if(docSnap.data().uid === auth.currentUser.uid) {
      isAdminEntered.value = true
    }
  }
}

const showBookChangeOptions = () => {
  showBookDataForUpdate.value = true
  document.body.classList.add('modal-open')
}

const closeBookFormUpdate = () => {
  showBookDataForUpdate.value = false
  document.body.classList.remove('modal-open')
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
