<script>
export default {
  name: 'TheIcon',
}
</script>

<script setup>
import { h } from 'vue'
import { Icon } from '@iconify/vue'
import { ElIcon } from 'element-plus'

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: null,
  },
  color: {
    type: String,
    default: undefined,
  },
})

function renderIcon(icon, props) {
  return h(ElIcon, props, () => h(Icon, { icon }))
}

const icon = computed(() => {
  return renderIcon(props.icon, { size: props.size, color: props.color })
})
</script>

<template>
  <component :is="icon" />
</template>
