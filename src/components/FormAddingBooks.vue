<template>
    <div class="form__adding">
          <h1 class="text-2xl text-center p-2">Добавление книги</h1>
          <form
            @submit.prevent="addBook"
            class="p-6 xs:mb-16 md:mb-1">
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-2 group">
              <label for="title" class="text-xs text-gray-500">Название книги</label>
              <input type="text" name="title" id="title" v-model="booksStore.title" class="w-full border xs:p-1 md:p-2 text-xs rounded-md focus:outline-none" placeholder=" " required />
          </div>
          <div class="relative z-0 w-full mb-2 group">
            <label for="author" class="text-xs text-gray-500">Автор</label>
            <input type="text" name="author" id="author" v-model="booksStore.author" class="w-full border xs:p-1 md:p-2 text-xs rounded-md focus:outline-none" placeholder=" " required />
          </div>
            <div class="relative z-0 w-full mb-2 group">
              <label for="year" class="text-xs text-gray-500">Год издания</label>
              <input type="text" name="year" id="year" v-model="booksStore.year" class="w-full border xs:p-1 md:p-2 text-xs rounded-md focus:outline-none" placeholder=" " required />
            </div>
            <div class="relative z-0 w-full mb-2 group">
              <label for="price" class="text-xs text-gray-500">Цена</label>
              <input type="text" name="price" id="price" v-model="booksStore.price" class="w-full border xs:p-1 md:p-2 text-xs rounded-md focus:outline-none" placeholder=" " required />
            </div>
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-2 group">
              <label for="quantity" class="text-xs text-gray-500">Количество</label>
              <input type="text" name="quantity" id="quantity" v-model="booksStore.quantity" class="w-full border xs:p-1 md:p-2 text-xs rounded-md focus:outline-none" placeholder=" " required />
            </div>
            <div class="relative z-0 w-full mb-2 group">
              <label for="category" class="text-xs text-gray-500">Категория</label>
              <select name="category" id="category" v-model="booksStore.category" class="w-full border xs:p-1 md:p-2 text-xs rounded-md focus:outline-none" required>
                <option value="" disabled selected hidden>Выберите категорию</option>
                <option value="Художественная">Художественная</option>
                <option value="Детская">Детская</option>
                <option value="Бизнес-литература">Бизнес-литература</option>
                <option value="Компьютеры и Интернет">Компьютеры и Интернет</option>
                <option value="Кулинария и напитки">Кулинария и напитки</option>
              </select>
            </div>
            <div class="relative z-0 w-full mb-2 group">
              <label for="sale" class="text-xs text-gray-500">Скидка</label>
              <input type="text" name="sale" id="sale" v-model="booksStore.sale" class="w-full border xs:p-1 md:p-2 text-xs rounded-md focus:outline-none" placeholder=" " />
            </div>
            <div class="relative z-0 w-full mb-2 group">
              <label for="change" class="text-xs text-gray-500">Изображение</label>
              <input type="file" name="change" id="change" @change="onFileChange" class="w-full border xs:p-1 md:p-2 text-xs rounded-md focus:outline-none" placeholder="" required />
            </div>
            <div class="relative z-0 w-full mb-2 group">
              <label for="alt" class="text-xs text-gray-500">Альтернативный текст изображения</label>
              <input type="text" name="alt" id="alt" v-model="booksStore.alt" class="w-full border xs:p-1 md:p-2 text-xs rounded-lg focus:outline-none" placeholder=" " required />
            </div>
          </div>
          <div class="relative z-0 w-full mb-2 group">
              <label class="text-sm p-1" for="description">Описание</label>
              <textarea name="description" id="description" rows="2" v-model="booksStore.description" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" "></textarea>
          </div>
          <button :disabled="isLoading" type="submit" class="text-white bg-orange-500 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <span v-if="isLoading">Загрузка...</span>
              <span v-else>Добавить</span></button>
          </form>
    </div>
</template>

<script setup>
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '@/firebase'
import { db } from '@/firebase'
import { auth } from '@/firebase'
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useBooksStore } from '@/stores/books'

const router = useRouter()
const booksStore = useBooksStore()

const isLoading = ref(false)

const onFileChange = (event) => {
  booksStore.file = event.target.files[0];
};

const addBook = async () => {
  isLoading.value = true
  // Создаем ссылку на файл
  const fileRef = storageRef(storage, `images/${booksStore.file.name}`)

  // Загружаем файл в Firebase Storage
  await uploadBytes(fileRef, booksStore.file)

  // Получаем ссылку на загруженный файл
  const downloadUrl = await getDownloadURL(fileRef)

  try {
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
  
  router.push('/catalog')
  }
  catch(error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}

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

onMounted(() => {
    adminEntered()
})

</script>

