<script setup lang="ts">
import Canvas from './components/Canvas.vue'
import ZoomBar from './components/ZoomBar.vue'
import { useCanvasStore } from './stores/canvas'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import RotateBar from './components/RotateBar.vue'
import Persons from './components/Persons.vue'
import Nodes from './components/Nodes.vue'
import ToolBar from './components/ToolBar.vue'

const canvas = useCanvasStore()

const viewPointWidth = ref(window.innerWidth)
const centerable = computed(() => {
  return canvas.width < viewPointWidth.value
})

const handleResize = () => {
  if (window.innerWidth != viewPointWidth.value) {
      viewPointWidth.value = window.innerWidth
    }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div :class="{ 'flex justify-center': centerable }">
    <Canvas />
  </div>
  <Suspense>
    <Persons />
  </Suspense>
  <Suspense>
    <Nodes />
  </Suspense>
  <ZoomBar />
  <RotateBar />
  <ToolBar />
</template>

<style scoped></style>
