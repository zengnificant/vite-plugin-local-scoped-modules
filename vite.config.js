//styled
import { defineConfig } from 'vite'

const packageJSON =require('./package.json');
const external =Object.keys(packageJSON['devDependencies'])


export default defineConfig({
    

    build: {
       
        minify: true,

        lib: {
            entry: 'index.es.js',
            name: 'localScopedModules',
           
            fileName: (format) =>{

                if(format==='es'){
       
                    return 'index.mjs'
                }
           
            return `index.cjs`
          }
        },
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
           external,

        }
 
    }})
   
