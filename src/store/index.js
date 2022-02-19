import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default function createStore(){
    return new Vuex.Store({
        state: {
            count:1
        },
        mutations:{
            add(state){
                state.count+=1
            },
            init(state, count){
                state.count = count;
            }
        },
        actions:{
            // 模拟异步请求
            getCount({commit}){
                console.log('getCount')
                return new Promise(resolve=>{
                    setTimeout(()=>{
                        commit('init', Math.random()*100);
                        resolve()
                    },1000)
                })
            }
        }
    })
}