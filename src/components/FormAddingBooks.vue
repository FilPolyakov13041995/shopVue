<template>
    <div class="form__adding">
        <button
          v-if="isAdminEntered"
          @click="showFormForBooks"
          class="text-base text-center cursor-pointer bg-teal-400
          font-medium w-60 rounded-md hover:bg-teal-300">Добавить книгу в каталог
        </button>
        <item-window 
          v-if="formVisibility"
          @closeModal="closeFormModal">
          <h1 class="text-2xl text-center">Добавление книги</h1>
          <form 
          @submit.prevent="addBook"
          class="p-8">
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
              <input type="text" name="title" id="title" v-model="booksStore.title" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label for="title" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Название книги</label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
              <input type="text" name="author" id="author" v-model="booksStore.author" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label for="author" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Автор</label>
          </div>
            <div class="relative z-0 w-full mb-5 group">
                <input type="text" name="year" id="year" v-model="booksStore.year" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="year" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Год издания</label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <input type="text" name="price" id="price" v-model="booksStore.price" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="price" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Цена</label>
            </div>
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
                <input type="text" name="quantity" id="quantity" v-model="booksStore.quantity" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="quantity" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Количество</label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <select name="category" id="category" v-model="booksStore.category" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required>
                <option value="" disabled selected hidden>Выберите категорию</option>
                <option value="Художественная">Художественная</option>
                <option value="Детская">Детская</option>
                <option value="Бизнес-литература">Бизнес-литература</option>
                <option value="Компьютеры и Интернет">Компьютеры и Интернет</option>
                <option value="Кулинария и напитки">Кулинария и напитки</option>
              </select>
              <label for="category" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Категория</label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <input type="text" name="sale" id="sale" v-model="booksStore.sale" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label for="sale" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Скидка</label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <input type="file" name="change" id="change" @change="onFileChange" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required />
                <label for="change" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Изображение</label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <input type="text" name="alt" id="alt" v-model="booksStore.alt" class="block py-2.5 px-0 w-full mt-1.5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label for="alt" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Альтернативный текст изображения</label>
            </div>
          </div>
          <div class="relative z-0 w-full mb-5 group">
              <label class="text-sm p-1" for="description">Описание</label>
              <textarea name="description" id="description" rows="2" v-model="booksStore.description" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" "></textarea>
          </div>
          <button type="submit" class="text-white bg-orange-500 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Добавить</button>
          </form>
        </item-window>
    </div>
</template>

<script setup>
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '@/firebase'
import ItemWindow from './ItemWindow.vue'
import { db } from '@/firebase'
import { auth } from '@/firebase'
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { ref, onMounted } from 'vue'
import { useBooksStore } from '@/stores/books'


const booksStore = useBooksStore()

const onFileChange = (event) => {
  booksStore.file = event.target.files[0];
};

const addBook = async () => {
  // Создаем ссылку на файл
  const fileRef = storageRef(storage, `images/${booksStore.file.name}`)

  // Загружаем файл в Firebase Storage
  await uploadBytes(fileRef, booksStore.file)

  // Получаем ссылку на загруженный файл
  const downloadUrl = await getDownloadURL(fileRef)

  await addDoc(collection(db, 'books'), {
    title: booksStore.title,
    author: booksStore.author,
    year: booksStore.year,
    price: booksStore.price,
    quantity: booksStore.quantity,
    category: booksStore.category,
    sale: booksStore.sale,
    image: downloadUrl,
    description: booksStore.description,
    alt: booksStore.alt
  })
  booksStore.title = ''
  booksStore.author = ''
  booksStore.year = ''
  booksStore.price = ''
  booksStore.quantity = ''
  booksStore.category = ''
  booksStore.sale = ''
  booksStore.description = ''
  booksStore.alt = ''
  
  closeFormModal()
  
}

const formVisibility = ref(false)
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

const showFormForBooks = () => {
  formVisibility.value = true
  document.body.classList.add('modal-open')
}

const closeFormModal = () => {
  formVisibility.value = false
  document.body.classList.remove('modal-open')
}

onMounted(() => {
    adminEntered()
})

</script>


<style>

body.modal-open {
  overflow: hidden;
}
</style>
