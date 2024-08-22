//全局注册组件
import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'

//全局组件
const globalComponents = {
  SvgIcon,
  Pagination
}

//对外暴露插件对象
export default {
  //install 注册组件
  install(app: any) {
    Object.keys(globalComponents).forEach((key) => {
      app.component(key, globalComponents[key])
    })
  }
}
