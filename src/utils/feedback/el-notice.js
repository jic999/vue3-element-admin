import { ElNotification } from 'element-plus'
import 'element-plus/es/components/notification/style/css'

const types = ['success', 'warning', 'info', 'error']
const $notice = {}
types.forEach((key, index) => {
  $notice[key] = (title, content, options = {}) => {
    ElNotification({
      title,
      message: content,
      type: key,
      ...options,
    })
  }
})
export default $notice
