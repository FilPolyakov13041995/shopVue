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
          <form 
          @submit.prevent="addBook"
          class="p-8">
          <div class="relative z-0 w-full mb-6 group">
              <input type="text" name="title" id="title" v-model="title" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label for="title" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
          </div>
          <div class="relative z-0 w-full mb-6 group">
              <input type="text" name="author" id="author" v-model="author" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label for="author" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Author</label>
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-6 group">
                <input type="text" name="year" id="year" v-model="year" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="year" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Year</label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
                <input type="text" name="price" id="price" v-model="price" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="price" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
            </div>
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-6 group">
                <input type="text" name="quantity" id="quantity" v-model="quantity" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="quantity" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Quantity</label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
                <input type="text" name="category" id="category" v-model="category" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="category" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Category</label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
                <input type="file" name="change" id="change" @change="onFileChange" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required />
                <label for="image" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Image</label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
              <input type="text" name="description" id="description" v-model="description" class="block py-2.5 px-0 w-full mt-1.5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label for="description" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
              <input type="text" name="alt" id="alt" v-model="alt" class="block py-2.5 px-0 w-full mt-1.5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label for="alt" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Alt</label>
            </div>
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
import { useBooksStore } from '@/stores/books';

const booksStore = useBooksStore()
const file = ref(null)

const onFileChange = (event) => {
  file.value = event.target.files[0];
};

const addBook = async () => {
  // Создаем ссылку на файл
  const fileRef = storageRef(storage, `images/${file.value.name}`)

  // Загружаем файл в Firebase Storage
  await uploadBytes(fileRef, file.value)

  // Получаем ссылку на загруженный файл
  const downloadUrl = await getDownloadURL(fileRef)
  // booksStore.setFileUrl(downloadUrl)
  console.log(downloadUrl)

  await addDoc(collection(db, 'books'), {
    title: title.value,
    author: author.value,
    year: year.value,
    price: price.value,
    quantity: quantity.value,
    category: category.value,
    image: downloadUrl,
    description: description.value,
    alt: alt.value
  })
  title.value = ''
  author.value = ''
  year.value = ''
  price.value = ''
  quantity.value = ''
  category.value = ''
  description.value = ''
  alt.value = ''
  
  closeFormModal()
}

const formVisibility = ref(false)
const isAdminEntered = ref(false)

const title = ref('')
const author = ref('')
const year = ref('')
const price = ref('')
const quantity = ref('')
const category = ref('')
const description = ref('')
const alt = ref('')

async function adminEntered() {
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