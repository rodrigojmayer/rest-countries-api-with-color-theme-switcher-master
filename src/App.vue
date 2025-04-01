<script setup lang="ts">
  import { ref, watch } from 'vue'
  // import HelloWorld from './components/HelloWorld.vue'
  import Layout from './components/Layout.vue'
  // import Home from './components/Home.vue';
  import { useTheme } from 'vuetify'

  const colorMode = ref('myCustomLightTheme')
  const searchText = ref('')
  const selectedRegion = ref('All')
const theme = useTheme()
// theme.global.name.value = 'colorMode'

  const emit = defineEmits<{
    (e: 'update:colorMode', value: string): void
  }>()

  watch(colorMode, (newColorMode) => {
    emit('update:colorMode', newColorMode)
    theme.global.name.value = newColorMode
  })
</script>


<template>
  <!-- <router-link to="/country/france">France</router-link> -->
  <!-- <div :class="[`app app-${colorMode}`]"> -->
  <div :class="[`app`]">
    <Layout
      v-model:colorMode="colorMode" 
    />
    <!-- <Home 
      v-model:colorMode="colorMode" 
      v-model="searchText" 
      v-model:selectedRegion="selectedRegion"
    /> -->
    <router-view
     v-slot="{ Component }"
     >
      <component
        :is="Component"
        v-model:colorMode="colorMode"
        v-model="searchText"
        v-model:selectedRegion="selectedRegion"
      />
    </router-view>
  </div>
</template>

<style scoped>

</style>
