<template>
    <div class="account">
      <h2 class="xs:text-xl xs:text-center md:text-2xl p-2 bg-sky-800 text-white">Личный кабинет</h2>
      <p class="text-2xl text-center p-4">Вход</p>
      <div vi class="flex flex-col items-center justify-center">
        <form 
          @submit.prevent="loginStore.login"
          class="bg-white shadow-md rounded-xl px-10 pt-6 pb-8 mb-4">
          <div class="mb-6">
            <label class="block text-gray-700 text-xs font-bold mb-2" for="email">
              Email
            </label>
            <input
              v-model="loginStore.email"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              id="email"
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-xs font-bold mb-2" for="password">
              Пароль
            </label>
            <input
              v-model="loginStore.password"
              @keydown.space.prevent="loginStore.passwordInputHandler"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              id="password"
              autocomplete=""
            />
          </div>
          <div class="flex flex-wrap items-center justify-between">
            <button
              class="block mx-auto px-8 py-3 text-white bg-orange-500 hover:bg-orange-400 rounded-xl text-base"
              type="submit">Войти 
            </button>
          </div>
          <div
            class="text-center mx-auto pt-6 text-red-500 w-36" 
            v-if="loginStore.errorMessage">{{ loginStore.errorMessage }}
          </div>
        </form>
      </div>
    </div>
</template>

<script setup>

import { useLoginStore } from '@/stores/login'
const loginStore = useLoginStore()

</script>