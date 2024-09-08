<script setup lang="ts">
import { useCanvasStore } from '../stores/canvas'
import ExecutionButton from './misc/ExecutionButton.vue';

const canvas = useCanvasStore()

const zommIn = () => {
    canvas.changeScale(0.25)
}

const zommOut = () => {
    canvas.changeScale(-0.25)
}
</script>

<template>
    <div class="fixed bottom-10 right-5 flex flex-col gap-3 z-40">
        <ExecutionButton @exeute="zommIn">
            <font-awesome-icon :icon="['fas', 'plus']" />
        </ExecutionButton>
        <ExecutionButton @exeute="zommOut">
            <font-awesome-icon :icon="['fas', 'minus']" />
        </ExecutionButton>
    </div>
</template>