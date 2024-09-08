<script setup lang="ts">
const status = defineModel({ required: true, default: true })
</script>

<template>
    <button @click="status = !status" class="rounded-md font-bold shadow-md px-2 py-1 select-none"
        :class="{ 'bg-green-200 hover:bg-green-300': status, 'bg-red-200 hover:bg-red-300': !status }">
        <slot></slot>
    </button>
</template>