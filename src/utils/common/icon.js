import { h } from 'vue'
import { ElIcon } from 'element-plus'
import { Icon } from '@iconify/vue'

export function renderIcon(icon, props = { size: 14 }) {
  return h(ElIcon, props, () => h(Icon, { icon }))
}
