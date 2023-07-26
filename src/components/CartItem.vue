<template>
    <div class="cart__item w-4/5 shadow-xl rounded-xl m-auto mt-4 p-4 flex xs:flex-col xs:items-center xs:gap-4
         md:flex-col md:justify-center md:items-center lg:flex-row lg:justify-center lg:items-start lg:gap-12">
            <img class="xs:w-40 md:w-48 lg:w-36 h-auto" :src="cartItem.image" :alt="cartItem.alt">
        <div class="">
            <p class="xs:text-2xl md:text-3xl lg:text-2xl xs:text-center md:text-center lg:text-left">{{ cartItem.title }}</p>
            <p class="text-xl xs:text-center md:text-center lg:text-left">{{ cartItem.author }}</p>
            <p class="xs:text-center md:text-center lg:text-left">{{ cartItem.year }}</p>
            <p v-if="cartItem.sale > 0" class="text-lg text-white bg-red-400 xs:mx-auto md:mx-auto lg:mx-0 text-center rounded-md w-12" >-{{ cartItem.sale }}%</p>
        </div>
        <div class="inline-flex p-1">
            <div 
                @click="$emit('reduceCountQty', cartItem)"
                class="border py-1.5 px-3.5 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-l">
                -
            </div>
            <p class="border py-2 px-3.5 text-center outline-none">{{ cartItem.quantity }}</p>
            <div
                @click="$emit('addCountQty', cartItem)"
                class="border py-2 px-3.5 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-r">
                +
            </div>
        </div>
        <div v-if="cartItem.sale > 0">
            <p class="text-lg text-red-500 mt-1">{{ cartItem.discountPrice * cartItem.quantity }}</p>
        </div>
        <div v-else>
            <p class="text-lg mt-1">{{ cartItem.price * cartItem.quantity }} р.</p>
        </div>
        <button 
          class="bg-red-600 rounded-md text-slate-50 mt-1 
          p-1 hover:bg-red-500 active:bg-red-600"
          @click="$emit('removeCartItem', index)">Удалить
        </button>
    </div>
</template>

<script setup>
import { useBooksStore } from '@/stores/books';
const booksStore = useBooksStore()
const props = defineProps({
    cartItem: Object,
    required: true,
    default: () => {},
})

const emits = defineEmits(['removeCartItem', 'addCountQty', 'reduceCountQty'])

</script>