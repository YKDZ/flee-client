<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useCanvasStore } from '../../stores/canvas'
import { useMapStore } from '../../stores/map'
import { storeToRefs } from 'pinia'
import { Person, usePersonStore } from '../../stores/person'
import paper from 'paper'

const props = defineProps<{
    person: Person
}>()

const person = props.person
const iconRef = ref<HTMLParagraphElement>()
const canvas = useCanvasStore()
const map = useMapStore()
const personStore = usePersonStore()
const { scale } = storeToRefs(canvas)

// 位置是否已经更新完毕
const isPrepared = ref(false)

const updatePos = async () => {
    isPrepared.value = false
    const nodes = await map.fetchNodes()
    const originNode = nodes.find((node) => node.id == person.originNodeId)
    const rect = canvas.canvasEl?.getBoundingClientRect()
    if (rect && originNode && iconRef.value) {
        const offsetX = -5 * canvas.scale
        const offsetY = -8 * canvas.scale
        // 坐标零点在视口左上角
        // 旋转中心位置
        const rotateCenterScreenX = paper.view.center.x + rect.left + offsetX
        const rotateCenterScreenY = paper.view.center.y + rect.top + offsetY
        // 用户图标位置
        const personScreenX = originNode.x * canvas.scale + person.r * canvas.scale * Math.cos(person.theta) + rect.left + offsetX
        const personScreenY = originNode.y * canvas.scale + person.r * canvas.scale * Math.sin(person.theta) + rect.top + offsetY
        // 旋转后用户图标位置
        const rotatedPersonScreenX = (personScreenX - rotateCenterScreenX) * Math.cos(canvas.rotate) - (personScreenY - rotateCenterScreenY) * Math.sin(canvas.rotate) + rotateCenterScreenX
        const rotatedPersonScreenY = (personScreenX - rotateCenterScreenX) * Math.sin(canvas.rotate) + (personScreenY - rotateCenterScreenY) * Math.cos(canvas.rotate) + rotateCenterScreenY
        // 设置位置
        iconRef.value.style.left = rotatedPersonScreenX + 'px'
        iconRef.value.style.top = rotatedPersonScreenY + 'px'
        isPrepared.value = true
    } else {
        console.log("初始化错误或指定节点不存在")
    }
}

let updater = ref<number>()

onMounted(() => {
    updater.value = setInterval(updatePos, 10)
    window.addEventListener('scroll', updatePos)
    window.addEventListener('resize', updatePos)
})

onUnmounted(() => {
    clearInterval(updater.value)
    window.removeEventListener('scroll', updatePos)
    window.removeEventListener('resize', updatePos)
})
</script>

<template>
    <p ref="iconRef" v-show="isPrepared" class="fixed z-30">
        <VTooltip>
            <font-awesome-icon :icon="['fas', 'user']" :style="{ 'font-size': 1.5 * scale + 'rem' }"
                :class="person.id == personStore.selfId ? 'text-red-500' : 'text-yellow-500'" />
            <template #popper>
                <i v-if="person.id == personStore.selfId">我</i>
                <i v-else>他人</i>
            </template>
        </VTooltip>
    </p>
</template>