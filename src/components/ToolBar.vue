<script setup lang="ts">
import { useProfileStore } from '../stores/profile'
import CheckboxButton from './misc/CheckboxButton.vue';

const profile = useProfileStore()
</script>

<template>
    <div class="fixed bottom-10 left-10 flex gap-5">
        <CheckboxButton v-model="profile.showPath">路径</CheckboxButton>
        <CheckboxButton v-model="profile.showNode">节点</CheckboxButton>
        <CheckboxButton v-model="profile.showPersonSelf">自己</CheckboxButton>
        <CheckboxButton v-model="profile.showPersonOthers">他人</CheckboxButton>
    </div>
</template>