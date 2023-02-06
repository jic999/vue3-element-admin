import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'

const types = ['success', 'warning', 'info', 'error']
const $message = {}
types.forEach((key) => {
  $message[key] = (message, options = {}) => {
    ElMessage({
      message,
      type: key,
      ...options,
    })
  }
})
export default $message
