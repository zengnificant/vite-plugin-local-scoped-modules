//styled
import { defineConfig } from 'vite'
import { resolve } from 'path'
import vitePluginRequire from 'vite-plugin-require'
const packageJSON =require('./package.json');
const external =Object.keys(packageJSON['devDependencies'])


export default defineConfig({
    

    build: {
        assetsInlineLimit: 12 * 1024,


        minify: false,

        lib: {
            entry: 'index.es.js',
            name: 'localScopedModules',
            outDir:'/sjgh',
           
            fileName: (format) =>{

                if(format==='es'){
                    return 'index.mjs'
                }
           
            return `index.cjs`
          }
        },
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
           external:external.concat('os'),

        }
 
    },
    plugins: [
        vitePluginRequire()
        ]
    })
   
