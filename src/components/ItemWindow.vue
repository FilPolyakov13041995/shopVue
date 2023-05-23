<template>
    <div class="modal__wrapper bg-gray-700 bg-opacity-70 flex 
        content-center align-middle fixed right-0 left-0 top-0 bottom-0">
        <div class="modal fixed top-0 bottom-0 left-0 right-0 z-10 bg-white">
            <div class="modal__header relative">
                <span
                    class="cursor-pointer absolute right-1 top-0"
                    @click.stop="$emit('closeModal')">
                    <p class="text-right text-6xl mr-2">&#215;</p>
                </span>
            </div>
            <div class="modal__content p-10">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
const emits = defineEmits(['closeModal'])
</script>   