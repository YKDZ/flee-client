<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { useCanvasStore } from '../../stores/canvas'
import { storeToRefs } from 'pinia';

const props = defineProps<{
    x: number,
    y: number
}>()

const iconRef = ref<HTMLParagraphElement>()
const canvas = useCanvasStore()
const { isWellDrawn } = storeToRefs(canvas)

// 位置是否已经更新完毕
const isPrepared = ref(false)

const updatePos = () => {
    if (!canvas.isWellDrawn) return
    if (!canvas.isSetup || !canvas.canvasEl || !iconRef.value) {
        console.log("初始化错误或指定节点不存在")
        return
    }

    isPrepared.value = false

    const offsetX = -5 * canvas.scale + parseFloat(canvas.canvasEl.style.left.substring(0, canvas.canvasEl.style.left.length - 2))
    const offsetY = -20 * canvas.scale + parseFloat(canvas.canvasEl.style.top.substring(0, canvas.canvasEl.style.top.length - 2)) || 0
    // 坐标零点在视口左上角
    // 旋转中心位置
    const rotateCenterScreenX = canvas.scaledWidth / 2 + offsetX
    const rotateCenterScreenY = canvas.scaledHeight / 2 + offsetY
    // 实体位置
    const nodeScreenX = props.x * canvas.scale + offsetX
    const nodeScreenY = props.y * canvas.scale + offsetY
    // 旋转后实体位置
    const rotatedNodeScreenX = (nodeScreenX - rotateCenterScreenX) * Math.cos(canvas.rotate) - (nodeScreenY - rotateCenterScreenY) * Math.sin(canvas.rotate) + rotateCenterScreenX
    const rotatedNodeScreenY = (nodeScreenX - rotateCenterScreenX) * Math.sin(canvas.rotate) + (nodeScreenY - rotateCenterScreenY) * Math.cos(canvas.rotate) + rotateCenterScreenY
    // 设置实体位置
    iconRef.value.style.left = rotatedNodeScreenX + 'px'
    iconRef.value.style.top = rotatedNodeScreenY + 'px'

    isPrepared.value = true
}

onMounted(() => {
    watchEffect(() => {
        if (isWellDrawn.value) {
            updatePos()
        }
    })
})
// 跟随方案
setInterval(() => {
    if (canvas.isChanging) {
        updatePos()
    }
}, 10)
// 禁止更新方案
// watch(() => canvas.isChanging, () => {
//     if (canvas.isChanging) {
//         isPrepared.value = false
//     } else {
//         updatePos()
//         isPrepared.value = true
//     }
// })
</script>

<template>
    <p ref="iconRef" v-show="isPrepared" class="fixed select-none">
        <slot></slot>
    </p>
    <!-- <p ref="center" v-show="isPrepared" class="bg-red-500 w-5 h-5 fixed"></p> -->
</template>