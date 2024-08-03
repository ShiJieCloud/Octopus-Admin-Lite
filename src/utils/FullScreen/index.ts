import screenfull from 'screenfull'
import { ElMessage } from 'element-plus'

export const fullScreen = () => {
  //获取当前屏幕状态，如果不是全屏，则进入全屏，如果全屏，退出全屏
  if (!screenfull.isEnabled) {
    ElMessage('您的浏览器不能全屏')
    return false
  }
  screenfull.toggle()
}