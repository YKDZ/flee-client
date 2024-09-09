<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Node, useMapStore } from '../stores/map'
import CanvasEntity from './entity/CanvasEntity.vue'
import { useProfileStore } from '../stores/profile'
import { useCanvasStore } from '../stores/canvas'

const map = useMapStore()
const profile = useProfileStore()
const canvas = useCanvasStore()

const nodes = ref<Node[]>([])

const updateNodes = async () => {
    let fetchedNodes = await map.fetchNodes()
    nodes.value = fetchedNodes
}

onMounted(updateNodes)
watch(() => canvas.isWellDrawn, updateNodes)
</script>

<template>
    <CanvasEntity v-if="profile.showNode" v-for="node in nodes" :key="node.id" :x="node.x" :y="node.y">
        <VTooltip>
            <font-awesome-icon :icon="['fas', 'location-dot']" :style="{ 'font-size': 1.2 * canvas.scale + 'rem' }"
                class="text-blue-500 select-none" />
            <template #popper>
                <p>节点: {{ node.id }}</p>
                <p>温度: xxx</p>
            </template>
        </VTooltip>
    </CanvasEntity>
</template>