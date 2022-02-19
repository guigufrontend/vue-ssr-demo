// 用于首屏渲染
// 由渲染器调用

import createApp from "./main"

export default  context=>{
    return new Promise((resolve, reject)=>{
        // 获取路由器和app实例
        const { app, router, store } = createApp(context)
        // 获取首屏地址
        router.push(context.url)
        router.onReady(()=>{
            // 获取当前匹配的所有组件

            const matched = router.getMatchedComponents()
            if(!matched.length){
                return reject({code:404})
            }
            // 遍历匹配的组件内部有没有asyncData函数
            // 有就执行，获取数据预取
            Promise.all(matched.map(Component=>{
                if(Component.asyncData){
                    return Component.asyncData({
                        store,
                        route:router.currentRoute
                    })
                }
            })
            ).then(()=>{
                // app 的数据状态放入context.state 约定
                // 渲染器奖state序列化成字符串
                // 在前端激活之前再恢复它
                console.log('store.state', JSON.stringify(store.state))
                context.state = store.state

                resolve(app)
            })
            .catch(reject)
            
            
        }, reject)
    })
}