// node 服务器
const express = require('express')
const app = express()

// 获取文件路径的帮助方法
const resolve = dir=>require('path').resolve(__dirname, dir)

// 中间件，静态文件目录， 开放给浏览器下载， 关闭index的下载
app.use(express.static(resolve('../dist/client'), {index:false}));

// 打包版本的渲染器工厂函数
const {  createBundleRenderer } = require('vue-server-renderer');

/// 获取服务端包
const bundle = resolve("../dist/server/vue-ssr-server-bundle.json")
// 获取渲染器
const renderer = createBundleRenderer(bundle, {
    runInNewContext: false, // 推荐
    template: require('fs').readFileSync(resolve("../public/index.html"), "utf-8"), // （可选）页面模板
    clientManifest:require(resolve("../dist/client/vue-ssr-client-manifest.json")) // （可选）客户端构建 manifest
})

// 路由
app.get('*', async(req, res)=>{
    // 传递给entry-server 的context
    const  context = {
        url:req.url
    }
    const html = await renderer.renderToString(context)
    res.send(html)
})

// 监听
app.listen(3000,()=>console.log('listen to 3000'))