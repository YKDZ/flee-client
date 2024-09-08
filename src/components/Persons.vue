<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Person, usePersonStore } from '../stores/person'
import PersonEntity from './entity/PersonEntity.vue'
import { useProfileStore } from '../stores/profile';

const personStore = usePersonStore()
const profile = useProfileStore()

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
</script>

<template>
    <PersonEntity v-for="person in persons" :key="person.id" :person />
</template>