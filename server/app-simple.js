// node 服务器
const express = require('express')
const app = express()

const { createRenderer } = require('vue-server-renderer')
// 获取渲染器
const renderer = createRenderer()
const Vue = require('vue')

// 路由
app.get('*', async(req, res)=>{
    // 创建vue应用
    const vm = new Vue({
        template:'<div>{{name}}</div>',
        data(){
            return{
                name:'px'
            }
        }
    })

    const html = await renderer.renderToString(vm)
    res.send(html)
})

// 监听
app.listen(3000,()=>console.log('listen to 3000'))