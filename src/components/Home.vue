<script setup lang="ts">
    import { ref, watch } from 'vue'
    import Countries from './Countries.vue'

    // const selectedRegion = ref('All')
    
    const props = defineProps<{ 
        colorMode: string
        modelValue: string 
        selectedRegion: string 
    }>()
    const emit = defineEmits<{
        (e: 'update:modelValue', value: string): void
        (e: 'update:selectedRegion', value: string):void
    }>()

    const selectedRegionLocal = ref(props.selectedRegion)
    watch (selectedRegionLocal, (newRegion) => {
        // console.log('Selected region changed to: ', newRegion)
        emit('update:selectedRegion', newRegion)
    })

</script>

<template>
    
    <main class="main">
        <div class="d-flex justify-space-between align-center pa-4"
            style="width: 100%"
        
        >
        
            <v-text-field
                :model-value="props.modelValue"
                @update:modelValue="emit('update:modelValue', $event)"
                label="Search for a country..."
                variant="outlined"
                style="max-width:30rem"
            />
            <v-select
                v-model="selectedRegionLocal"
                :items="['All', 'Africa', 'Americas', 'Antarctic', 'Asia', 'Europe', 'Oceania']"    
                
                style="max-width:13rem"
                :menu-props="{
                    minHeight: '22rem',
                }"
                
            />
        </div>
        <Countries 
            :colorMode="props.colorMode" 
            :valueSearched="props.modelValue" 
            :selectedRegionLocal="props.selectedRegion"
        />
    </main>

</template>


<style scoped>

</style>