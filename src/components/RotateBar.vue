<script setup lang="ts">
import { useCanvasStore } from '../stores/canvas'
import ExecutionButton from './misc/ExecutionButton.vue';

const canvas = useCanvasStore()

const rotateLeft = () => {
    canvas.changeRotate(-0.125 * Math.PI)
}

const rotateRight = () => {
    canvas.changeRotate(0.125 * Math.PI)
}
</script>

<template>
    <div class="fixed bottom-10 right-20 flex gap-3 z-50">
        <ExecutionButton @exeute="rotateLeft">
            <font-awesome-icon :icon="['fas', 'rotate-left']" />
        </ExecutionButton>
        <ExecutionButton @exeute="rotateRight">
            <font-awesome-icon :icon="['fas', 'rotate-right']" />
        </ExecutionButton>
    </div>
</template>