<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Person, usePersonStore } from '../stores/person'
import { useProfileStore } from '../stores/profile'
import CanvasEntity from './entity/CanvasEntity.vue'
import { useCanvasStore } from '../stores/canvas'

const personStore = usePersonStore()
const profile = useProfileStore()
const canvas = useCanvasStore()

const persons = ref<Person[]>([])

const updatePersons = async () => {
    let fetchedPersons = await personStore.fetchPersons()
    if (!profile.showPersonSelf) {
        fetchedPersons = fetchedPersons.filter(person => person.id != personStore.selfId)
    }
    if (!profile.showPersonOthers) {
        fetchedPersons = fetchedPersons.filter(person => person.id == personStore.selfId)
    }
    persons.value = fetchedPersons
}

onMounted(updatePersons)
watch(() => profile.showPersonSelf, updatePersons)
watch(() => profile.showPersonOthers, updatePersons)
watch(() => canvas.isWellDrawn, updatePersons)
</script>

<template>
    <CanvasEntity v-for="person in persons" :key="person.id" :x="person.x" :y="person.y">
        <VTooltip>
            <font-awesome-icon :icon="['fas', 'user']" :style="{ 'font-size': 1.5 * canvas.scale + 'rem' }"
                :class="person.id == personStore.selfId ? 'text-red-500' : 'text-yellow-500'" class="select-none" />
            <template #popper>
                <i v-if="person.id == personStore.selfId">我</i>
                <i v-else>他人</i>
            </template>
        </VTooltip>
    </CanvasEntity>
</template>