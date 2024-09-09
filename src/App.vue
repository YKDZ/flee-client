<script setup lang="ts">
import Canvas from './components/Canvas.vue'
import RotateBar from './components/RotateBar.vue'
import ToolBar from './components/ToolBar.vue'
import ZoomBar from './components/ZoomBar.vue'
import { defineAsyncComponent } from 'vue'

const Persons = defineAsyncComponent(() => import('./components/Persons.vue'))
const Nodes = defineAsyncComponent(() => import('./components/Nodes.vue'))
</script>

<template>
  <Canvas />
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

<style scoped>
</style>
