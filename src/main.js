import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import createStore from './store'

Vue.config.productionTip = false

// 一个全局混入，处理客户端asyncData的调用
Vue.mixin({
  beforeMount(){
    const {asyncData} = this.$options
    if(asyncData){
      asyncData({
        store:this.$store,
        route:this.$route,
      })
    }
  }
})

// 会被服务端入口（entry-server.js）使用
// 服务端使用，不需要mount 挂载
// 返回router实例、store实例、app实例
export default function createApp(context){
  // 处理首屏， 处理路由跳转
  const router = createRouter()
  const store = createStore()
  const app= new Vue({
    router,
    store,
    context,
    render: h => h(App)
  })
  return {app, router, store}
}

