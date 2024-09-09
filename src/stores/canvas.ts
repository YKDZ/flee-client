import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

let scaleLowerBound = 1
const scaleUpperBound = 3

export const useCanvasStore = defineStore('canvas', () => {
    const canvasEl = ref<HTMLCanvasElement>()
    const isSetup = ref(false)
    const width = ref(0)
    const height = ref(0)
    const scaledWidth = computed(() => width.value * scale.value)
    const scaledHeight = computed(() => height.value * scale.value)
    const scale = ref(1)
    const lastScale = ref(1)
    const rotate = ref(0)
    const lastRotate = ref(0)
    const isWellDrawn = ref(false)
    const isChanging = ref(false)

    const setup = (canvas: HTMLCanvasElement, raster: paper.Raster) => {
        if (raster.loaded) {
            width.value = raster.width
            height.value = raster.height
            canvasEl.value = canvas
            scale.value = Math.max(window.innerWidth / width.value, window.innerHeight / height.value)
            scaleLowerBound = scale.value
            isSetup.value = true
            isWellDrawn.value = false
        } else {
            console.log("尝试加载未初始化完成的 paper.Raster")
        }
    }

    const changeScale = (amount: number) => {
        if ((scale.value <= scaleLowerBound && amount < 0) || (scale.value >= scaleUpperBound && amount > 0)) {
            return
        }
        let changedValue = scale.value + amount
        if (changedValue > scaleUpperBound) changedValue = scaleUpperBound
        if (changedValue < scaleLowerBound) changedValue = scaleLowerBound
        lastScale.value = scale.value
        scale.value = changedValue
        isWellDrawn.value = false
    }

    const changeRotate = (amount: number) => {
        let changedValue = rotate.value + amount
        if (changedValue > 2 * Math.PI) changedValue = changedValue - 2 * Math.PI
        if (changedValue < 0) changedValue = 2 * Math.PI + changedValue
        lastRotate.value = rotate.value
        rotate.value = changedValue
        isWellDrawn.value = false
    }

    return {
        isSetup,
        canvasEl,
        width,
        height,
        scaledWidth,
        scaledHeight,
        scale,
        lastScale,
        rotate,
        lastRotate,
        isWellDrawn,
        changeScale,
        changeRotate,
        setup,
        isChanging
    }
})