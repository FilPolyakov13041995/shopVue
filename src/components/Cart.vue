<template>
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
      <div class="total__cart-item bg-orange-500 p-2 mt-4 mb-20" v-if="booksStore.cart.length">
        <p class="text-center md:text-3xl xs:text-xl">Итого:</p>
        <p class="text-center text-xl">{{ booksStore.cartTotal }} р.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBooksStore } from '@/stores/books';
import CartItem from './CartItem.vue';
const booksStore = useBooksStore()

</script>