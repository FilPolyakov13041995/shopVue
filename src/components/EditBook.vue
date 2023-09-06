<template>
    <div v-if="isAdminEntered" class="p-2 text-center">
        <button @click="showDeleteBlock" class="mr-3 border-b border-gray-700">Удалить</button>
        <button @click="showBookChangeOptions" class="border-b border-gray-700">Изменить</button>
        <div class="mt-3" v-if="confirmWindow">
          <h1>Вы действительно хотите удалить книгу <b>{{ books.title }}</b>?</h1>
          <div class="mt-3">
            <button @click="removeBook" class="p-2 mr-3 border rounded-md hover:bg-slate-100">Да</button>
            <button @click="closeDeleteBlock" class="p-2 border bg-red-500 text-white hover:bg-red-400 rounded-md">Отмена</button>
          </div>
        </div>
          <form v-if="showBookDataForUpdate" class="mt-5" @submit.prevent="upDateBook(booksStore)">
              <div class="relative z-0 w-full group">
                <label class="text-xs text-gray-500" for="title">Название книги</label>
                <input type="text" name="title" id="title" v-model="books.title" class="w-full border xs:p-1 md:p-1 text-xs rounded-lg focus:outline-none" placeholder=" " />
              </div>
              <div class="relative z-0 w-full mb-2 group">
                <label class="text-xs text-gray-500" for="author">Автор</label>
                <input type="text" name="author" id="author" v-model="books.author" class="w-full border xs:p-1 md:p-1 text-xs rounded-lg focus:outline-none" placeholder=" " />
              </div>
              <div class="relative z-0 w-full mb-2 group">
                <label class="text-xs text-gray-500" for="year">Год издания</label>
                <input type="text" name="year" id="year" v-model="books.year" class="w-full border xs:p-1 md:p-1 text-xs rounded-lg focus:outline-none" placeholder=" " />
              </div>
              <div class="relative z-0 w-full mb-2 group">
                <label for="price" class="text-xs text-gray-500">Цена</label>
                <input type="text" name="price" id="price" v-model="books.price" class="w-full border xs:p-1 md:p-1 text-xs rounded-lg focus:outline-none" placeholder=" " />
              </div>
              <div class="relative z-0 w-full mb-2 group">
                <label for="quantity" class="text-xs text-gray-500">Количество</label>
                <input type="text" name="quantity" id="quantity" v-model="books.quantity" class="w-full border xs:p-1 md:p-1 text-xs rounded-lg focus:outline-none" placeholder=" " />
              </div>
              <div class="relative z-0 w-full mb-2 group">
                <label for="category" class="text-xs text-gray-500">Категория</label>
                <select name="category" id="category" v-model="books.category" class="w-full border xs:p-1 md:p-1 text-xs rounded-lg focus:outline-none">
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
                <input type="text" name="sale" id="sale" v-model="books.sale" class="w-full border xs:p-1 md:p-1 text-xs rounded-lg focus:outline-none" placeholder=" " />
              </div>
              <div class="relative z-0 w-full mb-2 group">
                <label for="alt" class="text-xs text-gray-500">Текст изображения</label>
                <input type="text" name="alt" id="alt" v-model="books.alt" class="w-full border xs:p-1 md:p-1 text-xs rounded-lg focus:outline-none" placeholder=" " />
              </div>
              <div class="relative z-0 w-full mb-2 group">
                <label for="file" class="text-xs text-gray-500">Изображение</label>
                <input type="file" name="file" id="file" @change="onFileChange" class="w-full border xs:p-1 md:p-1 text-xs rounded-lg focus:outline-none" placeholder=" " />
              </div>
            <div>
              <label class="text-xs text-gray-500" for="description">Описание</label>
              <textarea name="description" id="description" rows="3" v-model="books.description" class="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" "></textarea>
            </div>
            <button :disabled="isLoading" class="mt-3 text-white bg-orange-500 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">
              <span v-if="isLoading">Загрузка...</span>
              <span v-else>Сохранить</span></button>
          </form> 
    </div>
</template>


<script setup>
import { ref as storageRef, deleteObject, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '@/firebase'
import { db } from '@/firebase'
import { auth } from '@/firebase'
import { doc, getDoc, deleteDoc, collection, updateDoc } from "firebase/firestore"
import { ref, onMounted } from 'vue'
import { useBooksStore } from '@/stores/books';

const booksStore = useBooksStore()
const isAdminEntered = ref(false)
const showBookDataForUpdate = ref(false)
const confirmWindow = ref(false)

const isLoading = ref(false)

const props = defineProps({
  books: {
    type: Object,
    required: true,
    default: () => {},
  },
})

const onFileChange = (event) => {
  booksStore.file = event.target.files[0]
}

const upDateBook = async (booksStore) => {
  isLoading.value = true
  const bookId = props.books.id
  const bookDocRef = doc(db, 'books', bookId)

  try {
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
  showBookDataForUpdate.value = false
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
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

    // Обновляем массив books, удаляя удаленную книгу
    const index = booksStore.books.findIndex(book => book.id === bookId)
    booksStore.books.splice(index, 1)

    // Обновляем массив filteredBooks, удаляя удаленную книгу
    const filteredIndex = booksStore.filteredBooks.findIndex(book => book.id === bookId)
    if (filteredIndex >= 0) {
      booksStore.filteredBooks.splice(filteredIndex, 1)
    }
  } catch (error) {
    console.error(`Ошибка при удалении книги ${bookId}:`, error)
  }
  closeDeleteBlock()
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

const showDeleteBlock = () => {
  confirmWindow.value = !confirmWindow.value
}

const showBookChangeOptions = () => {
  showBookDataForUpdate.value = !showBookDataForUpdate.value
}

const closeDeleteBlock = () => {
  confirmWindow.value = false
  document.body.classList.remove('modal-open')
}

onMounted(() => {
    adminEntered()
})

</script>
