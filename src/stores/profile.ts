import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProfileStore = defineStore('profile', () => {
    const showPath = ref(true)
    const showNode = ref(true)
    const showPersonSelf = ref(true)
    const showPersonOthers = ref(false)

    return { showPath, showNode, showPersonSelf, showPersonOthers }
})