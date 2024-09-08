import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const scaleLowerBound = 1
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
    const isUpdate = ref(true)

    const setup = (canvas: HTMLCanvasElement, raster: paper.Raster) => {
        if (raster.loaded) {
            canvasEl.value = canvas
            width.value = raster.width
            height.value = raster.height
            isSetup.value = true
            isUpdate.value = false
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
        isUpdate.value = false
    }

    const changeRotate = (amount: number) => {
        let changedValue = rotate.value + amount
        if (changedValue > 2 * Math.PI) changedValue = changedValue - 2 * Math.PI
        if (changedValue < 0) changedValue = 2 * Math.PI + changedValue
        lastRotate.value = rotate.value
        rotate.value = changedValue
        isUpdate.value = false
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
        isUpdate,
        changeScale,
        changeRotate,
        setup
    }
})