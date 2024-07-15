<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { usePersonStore } from '../api/store/person'

const person = usePersonStore()
const keysPressed = ref({ ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false })

const moveCharacter = () => {
    if (keysPressed.value.ArrowUp) person.moveUp()
    if (keysPressed.value.ArrowDown) person.moveDown()
    if (keysPressed.value.ArrowLeft) person.moveLeft()
    if (keysPressed.value.ArrowRight) person.moveRight()
    requestAnimationFrame(moveCharacter)
}

const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key in keysPressed.value) {
        keysPressed.value[event.key as keyof typeof keysPressed.value] = true
    }
}

const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key in keysPressed.value) {
        keysPressed.value[event.key as keyof typeof keysPressed.value] = false
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    requestAnimationFrame(moveCharacter)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('keyup', handleKeyUp)
})
</script>

<template>
    <font-awesome-icon :icon="['fas', 'person']" class="absolute top-1/2 left-1/2 z-50 h-6"
        :style="{ 'top': person.personY + 'px', 'left': person.personX + 'px' }" />
</template>