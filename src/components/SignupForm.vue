<template>
    <div class="account">
      <h2 class="xs:text-xl xs:text-center md:text-2xl p-2 bg-sky-800 text-white">Личный кабинет</h2>
      <p class="text-2xl text-center p-4">Регистрация</p>
      <div vi class="flex flex-col items-center justify-center">
        <form 
          @submit.prevent="signUpStore.signUp"
          class="bg-white shadow-md rounded-xl px-3 w-80 pt-6 pb-8 mb-4">
          <div class="mb-9">
            <label class="block text-gray-700 text-xs font-bold mb-2" for="email">
              Email
            </label>
            <input
              v-model="signUpStore.email"
              class="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-gray-400 focus:shadow-outline"
              type="email"
              name="email"
              id="email"
              @blur="validationEmail()"
            />
            <div v-if="signUpStore.emailError" class="text-red-500 text-xs p-1 absolute">{{ signUpStore.emailError }}</div>
            <div v-else-if="signUpStore.errorMessage" class="text-red-500 text-xs p-1 absolute">{{ signUpStore.errorMessage }}</div>
          </div>
          <div class="mb-9">
            <label class="block text-gray-700 text-xs font-bold mb-2" for="password">
              Пароль
            </label>
            <input
              v-model="signUpStore.password"
              @keydown.space.prevent="signUpStore.passwordInputHandler"
              class="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-gray-400 focus:shadow-outline"
              type="password"
              name="password"
              id="password"
              @blur="validationPassword()"
            />
            <div v-if="signUpStore.passwordError" class="text-red-500 text-xs p-1 absolute">{{ signUpStore.passwordError }}</div>
          </div>
          <div class="mb-9">
            <label class="block text-gray-700 text-xs font-bold mb-2" for="confirmPassword">
              Повторите пароль
            </label>
            <input
              v-model="signUpStore.confirmPassword"
              @keydown.space.prevent="signUpStore.passwordInputHandler"
              class="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-gray-400 focus:shadow-outline"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              @blur="validationPassword()"
            />
            <div v-if="signUpStore.passwordConfirmationError && signUpStore.confirmPassword !== ''" class="text-red-500 text-xs p-1 absolute">{{ signUpStore.passwordConfirmationError }}</div>
          </div>
          <div class="flex items-center justify-between">
            <button
              class="block mx-auto px-8 py-3 text-white bg-orange-500 hover:bg-orange-400 rounded-xl text-base"
              type="submit"
              :class="{ 'opacity-50': disBtn || formEmpty }"
              :disabled="disBtn || formEmpty">Создать 
            </button>
          </div>
        </form>
      </div>
    </div>
</template>

<script setup>

import { ref, computed, watch } from 'vue'
import { useSignUpStore } from '@/stores/signUp'
import { validateEmail, validatePassword } from '@/utils'
const signUpStore = useSignUpStore()

const disBtn = ref(false)

const validationEmail = () => {
  signUpStore.emailError = validateEmail(signUpStore.email);
}

const validationPassword = () => {
  signUpStore.passwordError = validatePassword(signUpStore.password, signUpStore.confirmPassword);
  signUpStore.passwordConfirmationError = signUpStore.passwordError;
}

const formEmpty = computed(() => {
  return !signUpStore.email || !signUpStore.password || !signUpStore.confirmPassword;
});

const formInvalid = computed(() => {
  return !!signUpStore.emailError || !!signUpStore.passwordError || formEmpty.value;
});

watch(formInvalid, (newValue) => {
  disBtn.value = newValue;
});

</script>

<style>
.opacity-50 {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>