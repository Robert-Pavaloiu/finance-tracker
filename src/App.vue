<template>
  <NavigationBar />
  <RouterView />
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useGlobalsStore } from '@/stores/globals-store'
import NavigationBar from './components/navigation-bar.vue'

const globalsStore = useGlobalsStore()

// apply on mount in case it was persisted
if (globalsStore.darkMode) {
  document.documentElement.classList.add('dark')
}

watch(() => globalsStore.darkMode, (isDark) => {
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
</script>