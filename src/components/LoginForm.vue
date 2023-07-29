<template>
    <div class="account">
      <h2 class="xs:text-xl xs:text-center md:text-2xl p-2 bg-sky-800 text-white">Личный кабинет</h2>
      <p class="text-2xl text-center p-4">Вход</p>
      <div vi class="flex flex-col items-center justify-center">
        <form 
            @submit.prevent="loginStore.login"
            class="bg-white shadow-md rounded-xl px-3 w-80 pt-6 pb-8 mb-4">
            <div class="mb-9">
              <label class="block text-gray-700 text-xs font-bold mb-2" for="email">
                Email
              </label>
              <input
                v-model="loginStore.email"
                class="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-gray-400 focus:shadow-outline"
                type="email"
                name="email"
                id="email"
                @blur="valEmail()"
              />
              <div v-if="loginStore.emailError" class="text-red-500 text-xs p-1 absolute">{{ loginStore.emailError }}</div>
              <div v-else-if="loginStore.notRegistered" class="text-red-500 text-xs p-1 absolute">{{ loginStore.notRegistered }}</div>
            </div>
            <div class="mb-9">
              <label class="block text-gray-700 text-xs font-bold mb-2" for="password">
                Пароль
              </label>
              <input
                v-model="loginStore.password"
                @keydown.space.prevent="loginStore.passwordInputHandler"
                class="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-gray-400 focus:shadow-outline"
                type="password"
                name="password"
                id="password"
                @blur="valPassword()"
              />
              <div v-if="loginStore.passwordError" class="text-red-500 text-xs p-1 absolute">{{ loginStore.passwordError }}</div>
              <div v-else-if="loginStore.incorrectPassword" class="text-red-500 text-xs p-1 absolute">{{ loginStore.incorrectPassword }}</div>
            </div>
            <div class="flex flex-wrap items-center justify-between">
              <button
                class="block mx-auto px-8 py-3 text-white bg-orange-500 hover:bg-orange-400 rounded-xl text-base"
                type="submit"
                :class="{ 'opacity-50': disBtn || formEmpty }"
                :disabled="disBtn || formEmpty">Войти 
              </button>
            </div>
          </form>
      </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useLoginStore } from '@/stores/login'
import { validateEmail, validatePasswordLength } from '@/utils'
const loginStore = useLoginStore()

const disBtn = ref(false)

const valEmail = () => {
  loginStore.emailError = validateEmail(loginStore.email);
}

const valPassword = () => {
  loginStore.passwordError = validatePasswordLength(loginStore.password);
}

const formEmpty = computed(() => {
  return !loginStore.email || !loginStore.password;
});

const formInvalid = computed(() => {
  return !!loginStore.emailError || !!loginStore.passwordError || formEmpty.value;
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