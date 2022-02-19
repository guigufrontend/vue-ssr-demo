<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div>点击增加1</div>
    <h2 @click="$store.commit('add')">{{$store.state.count}}</h2>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  asyncData({store, route}){
    console.log('route', route)
    console.log('asyncData')
    return store.dispatch('getCount')
  }
}
</script>
