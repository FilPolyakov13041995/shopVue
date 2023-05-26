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
                    <div class="relative z-0 w-full mb-6 group">
                      <input type="text" name="title" id="title" v-model="books.title" class="block py-2.5 px-0 w-full text-sm text-gray-900  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                      <label for="title" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300   transform-translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Название книги</label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                      <input type="text" name="author" id="author" v-model="books.author" class="block py-2.5 px-0 w-full text-sm text-gray-900   bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                      <label for="author" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300  transform-translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600   peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Автор</label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                      <input type="text" name="year" id="year" v-model="books.year" class="block py-2.5 px-0 w-full text-sm text-gray-900   bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                      <label for="year" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300  transform-translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600   peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Год издания</label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                      <input type="text" name="price" id="price" v-model="books.price" class="block py-2.5 px-0 w-full text-sm text-gray-900  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                      <label for="price" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300   transform-translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Цена</label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                      <input type="text" name="quantity" id="quantity" v-model="books.quantity" class="block py-2.5 px-0 w-full text-sm   text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                      <label for="quantity" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300  transform-translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600   peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Количество</label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                      <select v-model="books.category" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required>
                        <option value="" disabled selected hidden>Выберите категорию</option>
                        <option value="Художественная">Художественная</option>
                        <option value="Детская">Детская</option>
                        <option value="Бизнес-литература">Бизнес-литература</option>
                        <option value="Компьютеры и Интернет">Компьютеры и Интернет</option>
                        <option value="Кулинария и напитки">Кулинария и напитки</option>
                      </select>
                      <label for="category" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Категория</label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                      <input type="text" name="alt" id="alt" v-model="books.alt" class="block py-2.5 px-0 w-full text-sm text-gray-900  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                      <label for="alt" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300   transform-translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Текст изображения</label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                      <input type="file" name="file" id="file" @change="onFileChange" class="block py-2.5 px-0 w-full text-sm text-gray-900   bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                      <label for="file" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300  transform-translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600   peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Изображение</label>
                    </div>
                  </div>
                  <div>
                    <label class="text-sm" for="description">Описание</label>
                    <textarea id="description" rows="3" v-model="books.description" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" "></textarea>
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
