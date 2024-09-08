<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useCanvasStore } from '../../stores/canvas'
import { Node } from '../../stores/map'
import { storeToRefs } from 'pinia'
import paper from 'paper'

const props = defineProps<{
    node: Node
}>()

const node = props.node
const iconRef = ref<HTMLParagraphElement>()
const canvas = useCanvasStore()
const { scale } = storeToRefs(canvas)

// 位置是否已经更新完毕
const isPrepared = ref(false)

const updatePos = async () => {
    if (canvas.isUpdate != true) {
        return
    }
    isPrepared.value = false
    const rect = canvas.canvasEl?.getBoundingClientRect()
    if (rect && iconRef.value) {
        const offsetX = -5 * canvas.scale
        const offsetY = -20 * canvas.scale
        // 坐标零点在视口左上角
        // 旋转中心位置
        const rotateCenterScreenX = paper.view.center.x + rect.left + offsetX
        const rotateCenterScreenY = paper.view.center.y + rect.top + offsetY
        // 节点位置
        const nodeScreenX = node.x * canvas.scale + rect.left + offsetX
        const nodeScreenY = node.y * canvas.scale + rect.top + offsetY
        // 旋转后节点位置
        const rotatedNodeScreenX = (nodeScreenX - rotateCenterScreenX) * Math.cos(canvas.rotate) - (nodeScreenY - rotateCenterScreenY) * Math.sin(canvas.rotate) + rotateCenterScreenX
        const rotatedNodeScreenY = (nodeScreenX - rotateCenterScreenX) * Math.sin(canvas.rotate) + (nodeScreenY - rotateCenterScreenY) * Math.cos(canvas.rotate) + rotateCenterScreenY
        // 设置位置
        iconRef.value.style.left = rotatedNodeScreenX + 'px'
        iconRef.value.style.top = rotatedNodeScreenY + 'px'
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
    <p ref="iconRef" v-show="isPrepared" class="fixed z-20">
        <VTooltip>
            <font-awesome-icon :icon="['fas', 'location-dot']" :style="{ 'font-size': 1.2 * scale + 'rem' }"
                class="text-blue-500" />
            <template #popper>
                <p>节点: {{ node.id }}</p>
                <p>温度: xxx</p>
            </template>
        </VTooltip>
    </p>
</template>