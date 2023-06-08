<template>
  <div v-if="!currentUser">
    <div v-if="showLogin">
      <login-form/>
      <p class="text-center">Еще нет аккаунта? 
        <span 
          class="text-sky-600 cursor-pointer"
          @click="showLogin=false">Создать
        </span> сейчас.
      </p>
    </div>
    <div v-else>
      <signup-form/>
      <p class="text-center">Уже есть аккаунт? 
        <span 
          class="text-sky-600 cursor-pointer" 
          @click="showLogin=true">Войти
        </span>
      </p>
    </div>
  </div>
  <div v-if="currentUser" class="text-center mb-16">
    <h2 class="xs:text-xl xs:text-center md:text-2xl p-2 bg-sky-800 text-white">Личный кабинет</h2>
      <h2 class="p-4 xs:text-2xl">Добро пожаловать!</h2>
      <div class="border rounded-xl xs:w-5/6 md:w-3/5 lg:w-2/5 mx-auto p-3">
        <p class="text-lg">Ваша почта: <b><span class="text-xl pl-1 pr-1 ml-2 rounded-lg">{{ email }}</span></b></p>
        <p class="text-lg">Имя пользователя: <b><span class="text-xl pl-1 pr-1 ml-2 rounded-sm">{{ username }}</span></b></p>
        <p class="text-lg">Статус пользователя: <b><span class="text-lg pl-1 pr-1 ml-2 rounded-sm">{{ userStatus }}</span></b></p>
        <img class="w-28 h-28 mt-4 mb-4 mx-auto" src="../assets/user.jpg" alt="user">
      </div>
    <button
    class="block mt-3 mx-auto px-8 py-3 text-white bg-orange-500 hover:bg-orange-400 rounded-xl text-base"
    @click="logOut">Выйти из аккаунта
    </button>
  </div>
</template>


<script setup>
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '@/firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { ref, onMounted, onBeforeUpdate } from 'vue'
import SignupForm from '@/components/SignupForm.vue'
import LoginForm from '@/components/LoginForm.vue'
import { auth } from '@/firebase'
import { useLoginStore } from '@/stores/login'
const loginStore = useLoginStore()

const isLoggedIn = ref(false)
const showLogin = ref(true)
const currentUser = ref(null)
const username = ref('')
const email = ref('')
const userStatus = ref('')

const docRef = doc(db, 'users', 'sqeYjwyjJXPJytdlgmRf')

async function getUserAdmin() {
  const docSnap = await getDoc(docRef)
  if(auth.currentUser) {
    if(docSnap.data().uid === auth.currentUser.uid) {
      await updateDoc(docRef, {
        isAdmin: true
    })
    userStatus.value = 'Admin'
  } else {
      await updateDoc(docRef, {
        isAdmin: false
      })
      userStatus.value = 'User'
    }
  }
}

function logOut() {
  signOut(auth)
    .then(() => {
      currentUser.value = null
      isLoggedIn.value = false
      updateDoc(docRef, {
        isAdmin: false
      })
    })
}

function setupAuthListener() {
  onAuthStateChanged(auth, (user) => {
    if(user) {
      currentUser.value = user
      isLoggedIn.value = true
    } else {
      currentUser.value = null
      isLoggedIn.value = false
    }
  })
}

onMounted(() => {
  setupAuthListener()
})

onBeforeUpdate(() => {
  const user = auth.currentUser
  if(user !== null) {
    username.value = user.email.split('@')[0]
    email.value = user.email
  }
  getUserAdmin()
})

</script>
