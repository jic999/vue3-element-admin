<script>
export default {
  name: 'TheIcon',
}
</script>

<script setup>
import { renderIcon } from '@/utils/common/icon'

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: undefined,
  },
  color: {
    type: String,
    default: undefined,
  },
})

const icon = computed(() => {
  return renderIcon(props.icon, { size: props.size, color: props.color })
})
</script>

<template>
  <component :is="icon" />
</template>
