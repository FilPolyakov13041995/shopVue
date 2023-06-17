<template class="md:relative md:min-h-screen">
  <div class="cart bg-white"> 
    <h2 class="xs:text-xl xs:text-center md:text-2xl p-2 bg-sky-800 text-white">Корзина товаров</h2>
    <div class="cart__item">
      <div v-if="!booksStore.cart.length">
        <h3 class="text-center xs:text-xl md:text-2xl p-4">В корзине нет товаров</h3>
      </div>
      <cart-item
        v-for="(item, index) in booksStore.cart"
          :key="item.id"
          :cartItem="item"
          @removeCartItem="booksStore.removeCartItem(index)"
          @addCountQty="booksStore.addCountQty"
          @reduceCountQty="booksStore.reduceCountQty">
      </cart-item>
      <div class="total__cart-item bg-orange-500 w-2/6 rounded-xl text-white mx-auto p-2 mt-4 xs:mb-24 md:mb-32" v-if="booksStore.cart.length">
        <p class="text-center md:text-3xl xs:text-xl">Итого:</p>
        <p class="text-center text-xl">{{ booksStore.cartTotal }} р.</p>
      </div>
    </div>
  </div>

  <my-footer class="xs:hidden md:block md:absolute md:bottom-0 md:w-full"></my-footer>
</template>

<script setup>
import myFooter from './Footer.vue'
import { useBooksStore } from '@/stores/books';
import CartItem from './CartItem.vue';
const booksStore = useBooksStore()


</script>