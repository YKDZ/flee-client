<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useMapStore } from '../api/store/map';

const map = useMapStore()
const imgEl = ref<HTMLImageElement>()

onMounted(() => {
    if (imgEl.value) {
        imgEl.value.onload = () => {
            map.init(imgEl.value as HTMLImageElement)
        }
    }
})
</script>

<template>
    <img ref="imgEl" src="/map.png">
</template>