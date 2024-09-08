<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import paper from 'paper'
import { useCanvasStore } from '../stores/canvas'
import { useMapStore } from '../stores/map';
import { useProfileStore } from '../stores/profile';

const canvas = useCanvasStore()
const profile = useProfileStore()
const map = useMapStore()
const canvasEl = ref<HTMLCanvasElement | null>(null)
const raster = ref<paper.Raster>()
const backgroundLayer = ref<paper.Layer>()
const arrowLayer = ref<paper.Layer>()

// 更新画布，创建背景图层和箭头图层
const updateCanvas = () => {
  paper.setup(canvasEl.value as HTMLCanvasElement)
  // 创建背景图层
  backgroundLayer.value = new paper.Layer()
  raster.value = new paper.Raster('src/assets/test-map.png')
  
  // 应用图片缩放
  raster.value?.scale(canvas.scale)
  raster.value.onLoad = () => {
    if (canvasEl.value && raster.value) {
      canvas.setup(canvasEl.value, raster.value as paper.Raster)
      canvasEl.value.width = canvas.scaledWidth
      canvasEl.value.height = canvas.scaledHeight
      canvasEl.value.style.width = canvas.scaledWidth + 'px'
      canvasEl.value.style.height = canvas.scaledHeight + 'px'
      paper.view.rotate(canvas.rotate * (180 / Math.PI)) // 弧度转角度
      paper.view.viewSize = new paper.Size(canvas.scaledWidth, canvas.scaledHeight)
      raster.value.position = paper.view.center
    }

    // 将背景层锁定，防止误操作
    backgroundLayer.value!.locked = true

    // 创建箭头图层
    arrowLayer.value = new paper.Layer()
    drawPath()
    canvas.isUpdate = true
  }
}

// 计算缩放后的 Point
const scalePoint = (point: paper.Point): paper.Point => {
  const newX: number = paper.view.center.x + (point.x - canvas.width / 2) * canvas.scale
  const newY: number = paper.view.center.y + (point.y - canvas.height / 2) * canvas.scale
  return new paper.Point(newX, newY)
}

// 绘制路径
const drawPath = async () => {
  if (!profile.showPath || !arrowLayer) return
  
  // 清除箭头图层的内容
  arrowLayer.value?.removeChildren()

  // 重新绘制路径
  const path = new paper.Path()
  const nodes = await map.fetchNodes()
  const pathNodeIds = await map.fetchPath()

  pathNodeIds.forEach(nodeId => {
    const node = nodes.find(node => nodeId == node.id)
    if (node == null) {
      console.log("请求的节点 ID " + nodeId + " 不存在。")
      return
    } else {
      const point = scalePoint(new paper.Point(node.x, node.y))
      path.add(point)
    }
  })

  drawArrowsOnPath(path)
}

// 绘制箭头链
const drawArrowsOnPath = (path: paper.Path) => {
  const interval = 30 * canvas.scale
  const arrowLength = 10 * canvas.scale
  const arrowWidth = 18 * canvas.scale
  const tailLength = 5 * canvas.scale
  const tailWidth = 5 * canvas.scale
  const color = "green"

  const pathLength = path.length

  for (let offset = 0; offset < pathLength; offset += interval) {
    const point = path.getPointAt(offset)
    const tangent = path.getTangentAt(offset)

    if (point && tangent) {
      drawArrow(point, tangent, arrowLength, arrowWidth, tailLength, tailWidth, color)
    }
  }
}

// 绘制单个箭头
const drawArrow = (
  point: paper.Point,
  direction: paper.Point,
  arrowLength: number,
  arrowWidth: number,
  tailLength: number,
  tailWidth: number,
  color: string
) => {
  const left = direction.rotate(90, new paper.Point(0, 0)).normalize(arrowWidth / 2)
  const right = direction.rotate(-90, new paper.Point(0, 0)).normalize(arrowWidth / 2)
  const tip = direction.normalize(arrowLength)

  new paper.Path({
    segments: [
      point.add(left),
      point.add(right),
      point.add(tip),
      point.add(left)
    ],
    fillColor: color,
    parent: arrowLayer.value
  })

  const tailStart = point.subtract(direction.normalize(tailLength))
  const tailLeft = tailStart.add(left.normalize(tailWidth / 2))
  const tailRight = tailStart.add(right.normalize(tailWidth / 2))

  new paper.Path({
    segments: [
      point.add(left.normalize(tailWidth / 2)),
      point.add(right.normalize(tailWidth / 2)),
      tailRight,
      tailLeft,
      point.add(left.normalize(tailWidth / 2))
    ],
    fillColor: color,
    parent: arrowLayer.value
  })
}

let updater = ref<number>()

onMounted(() => {
  updateCanvas()
  updater.value = setInterval(drawPath, 1000)
})

onUnmounted(() => {
  clearInterval(updater.value)
})

watch(() => canvas.isUpdate, updateCanvas)
watch(() => profile.showPath, () => {
  if (arrowLayer) arrowLayer.value?.removeChildren()
  drawPath()
})
</script>

<template>
  <canvas id="canvas" ref="canvasEl" class="max-w-none transition-transform -z-50"></canvas>
</template>
