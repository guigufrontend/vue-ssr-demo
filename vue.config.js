// 用于打server包
const VueSSRServePlugin = require("vue-server-renderer/server-plugin")
// 用于打client包
const VueSSRCLientPlugin = require("vue-server-renderer/client-plugin")
const nodeExternals = require("webpack-node-externals")
const merge = require("lodash.merge")

// 根据环境变量决定入口文件和相应配置项
const TARGET_NODE = process.env.WEBPACK_TARGET === 'node'
const target = TARGET_NODE ? 'server' : "client"

module.exports={
    css:{
        extract:false
    },
    outputDir:'./dist/'+target,
    configureWebpack:()=>({
        entry:`./src/entry-${target}.js`,
        devtool:'source-map',
        target:TARGET_NODE?'node':'web',
        node:TARGET_NODE?undefined:false,
        output:{
            libraryTarget:TARGET_NODE?'commonjs2':undefined
        },
        externals:TARGET_NODE
        ?nodeExternals({
            allowlist:[/\.css$/]
        })
        :undefined,
        optimization:{
            splitChunks:undefined
        },
        plugins:[
            TARGET_NODE?new VueSSRServePlugin():new VueSSRCLientPlugin()
        ]
    }),
    chainWebpack:confing=>{
        if(TARGET_NODE){
            confing.optimization.delete('splitChunks')
        }
        confing.module
        .rule('vue')
        .use('vue-loader')
        .tap(options=>{
            merge(options,{
                optimizeSSR:false
            })
        })
    }
}