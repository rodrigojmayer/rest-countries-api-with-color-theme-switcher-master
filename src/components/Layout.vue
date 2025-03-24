<script setup lang="ts">
// import { useTheme } from 'vuetify'


const props = defineProps<{
    colorMode: string
}>()
const emit = defineEmits<{
    (e: 'update:colorMode', value: string): void
}>()

</script>

<template>
    <!-- <div :class="['head', `head-${colorMode}`]"> -->
    <div :class="['head']">
        <h1>Where in the world?</h1>

        
        <button @click="emit('update:colorMode', props.colorMode === 'myCustomLightTheme' ? 'myCustomDarkTheme' : 'myCustomLightTheme')">
            <span v-if="props.colorMode === 'myCustomLightTheme'">🌙</span>
            <span v-else>☀️</span>
            {{ props.colorMode === 'myCustomLightTheme' ? 'Dark Mode' : 'Light Mode' }}
        </button>
    
    </div>
</template>

<style scoped>

</style>