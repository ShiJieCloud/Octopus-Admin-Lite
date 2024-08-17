// src/directives/index.ts
import { App, Directive } from 'vue'

const directives: { [key: string]: Directive } = {

}

export default {
  install(app: App) {
    Object.keys(directives).forEach(key => {
      app.directive(key, directives[key])
    })
  }
}
