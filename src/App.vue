<script setup lang="ts">
import Canvas from './components/Canvas.vue'
import ZoomBar from './components/ZoomBar.vue'
import { useCanvasStore } from './stores/canvas'
import { computed, defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue'
import RotateBar from './components/RotateBar.vue'
import ToolBar from './components/ToolBar.vue'
import { isMobile } from './utils/mobile'

const canvas = useCanvasStore()

const viewPointWidth = ref(window.innerWidth)
const viewPointHeight = ref(window.innerHeight)
const xCenterable = computed(() => {
  return canvas.width < viewPointWidth.value
})
const yCenterable = computed(() => {
  return canvas.height < viewPointHeight.value
})

const handleResize = () => {
  if (window.innerWidth != viewPointWidth.value) {
    viewPointWidth.value = window.innerWidth
  }
  if (window.innerHeight != viewPointHeight.value) {
    viewPointHeight.value = window.innerHeight
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const Persons = defineAsyncComponent(() => import('./components/Persons.vue'))
const Nodes = defineAsyncComponent(() => import('./components/Nodes.vue'))
</script>

<template>
  <div class="w-screen h-screen bg-red flex"
    :class="{ 'justify-center': xCenterable, 'items-center': yCenterable, 'fixed': isMobile() }">
    <Canvas />
  </div>
  <Persons />
  <Nodes />
  <ZoomBar />
  <RotateBar />
  <ToolBar />
</template>

<style scoped></style>
