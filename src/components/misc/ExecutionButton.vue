<script setup lang="ts">
</script>

<template>
    <button @click="$emit('exeute')" class="bg-white hover:bg-slate-400 text-xl rounded-md font-bold shadow-md px-2 py-1 select-none text-nowrap">
        <slot></slot>
    </button>
</template>