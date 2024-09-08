<script setup lang="ts">
import { ref } from 'vue'
import { Node, useMapStore } from '../stores/map'
import NodeEntity from './entity/NodeEntity.vue'
import { useProfileStore } from '../stores/profile'

const map = useMapStore()
const profile = useProfileStore()

const nodes = ref<Node[]>(await map.fetchNodes())
</script>

<template>
    <NodeEntity v-if="profile.showNode" v-for="node in nodes" :key="node.id" :node />
</template>