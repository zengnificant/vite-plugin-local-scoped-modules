vite-plugin-local-scoped-modules
================
This is a [vite](https://github.com/vitejs/vite) plugin that intends to avoid  typing  relative paths.Use relative paths like local modules instead.

Install
---------------------------------

```shell
 yarn add  --dev  vite-plugin-local-scoped-modules 
```

Usage 
---------------------------------
Below is a  sample of config in `vite.config.js` on what it is going to be like:
```js
 import { defineConfig } from 'vite'
 import reactRefresh from '@vitejs/plugin-react-refresh'
 
 import localScopedModules from 'vite-plugin-local-scoped-modules'
 export default defineConfig({
  
    plugins: [
   
        localScopedModules({
            "scopes": [
                {
                    "name": "@components",
                    "dir": "~/src/components"
                }
            ]
        }),
        reactRefresh(),
    ]
})
 

```

Now is a sample in usage, anywhere under the project you can:
```js
import App from '@components/App.jsx'
```



Relatives:
---------------------------------
+ babel plugin:
     - [babel-plugin-local-scoped-modules](https://github.com/zengnificant/babel-plugin-local-scoped-modules#readme)
+ sublime plugin[auto-completion]:
     - [LocalScopedModules](https://github.com/zengnificant/LocalScopedModules)



 Lisense
---------------------------------
  MIT
 
  
