import { ElLoading } from 'element-plus'
import 'element-plus/es/components/loading/style/css'

const $loading = {
  /**
   * 加载动画
   * @param target 选择器 不传默认全屏
   * @param options 配置项 同ElLoading配置项
   */
  service(target, options = {}) {
    const loadingInstance = ElLoading.service({
      target,
      ...options,
    })
    this.close = () => loadingInstance.close()
  },
  /**
   * 关闭加载
   */
  close() {},
}

export default $loading
