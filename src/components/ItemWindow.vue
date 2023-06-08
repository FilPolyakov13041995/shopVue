<template>
    <div class="modal__wrapper bg-gray-700 bg-opacity-70 flex content-center align-middle fixed overflow-y-auto right-0 left-0 top-0 bottom-0 z-10">
        <div class="modal fixed top-0 bottom-0 left-0 right-0 z-10 bg-white">
            <div class="modal__header relative">
                <span class="close-btn" @click.stop="$emit('closeModal')">
                    <p class="w-8 h-auto text-center text-5xl">&times;</p>
                </span>
            </div>
            <div class="modal__content max-h-screen overflow-y-auto">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
const emits = defineEmits(['closeModal'])

let scrollPosition = null;

onMounted(() => {
    scrollPosition = window.pageYOffset;
  // запрещаем прокрутку body и html
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
})


onBeforeUnmount(() => {
  // восстанавливаем позицию прокрутки при удалении компонента
  window.scrollTo(0, scrollPosition);
  // разрешаем прокрутку body и html
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
});
</script>   


<style scoped>
.modal__header {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  padding: 1rem;
  position: relative;
}

.close-btn {
    background-color: #E5E7EB;
    border: 2px solid #D1D5DB;
    border-radius: 50%;
    color: #4B5563;
    cursor: pointer;
    font-size: 1.5rem;
    height: 2.5rem;
    position: absolute;
    right: 1rem;
    top: 1rem;
    width: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    left: calc(100% - 3.5rem);
}

.close-btn:hover {
  background-color: #D1D5DB;
  color: #1F2937;
}
</style>