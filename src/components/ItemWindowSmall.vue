<template>
    <div class="modal__wrapper bg-gray-700 bg-opacity-70 flex 
        content-center align-middle fixed right-0 left-0 top-0 bottom-0">
        <div class="modal relative w-2/6 h-auto mx-auto my-auto  z-10 bg-white rounded-lg">
            <div class="modal__header relative">
                <span
                    class="cursor-pointer absolute right-0 top-0"
                    @click.stop="$emit('closeModal')">
                    <p class="text-right text-5xl mr-2">&#215;</p>
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
