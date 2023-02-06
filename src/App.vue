<script setup>
import { RouterView } from 'vue-router'
import ElProvider from '@/components/common/ElProvider.vue'
</script>

<template>
  <ElProvider>
    <RouterView />
  </ElProvider>
</template>
