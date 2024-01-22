import { transformSync } from '@babel/core'
import { normalizePath } from 'vite'

const defaultObts = {
    rootPrefix: '~',
    scopePrefix: '@',
    scopes: [],
    calleeNames: ['require', 'import']
}

export default (opts = {}) => {
    const getConfig = () => Object.assign(defaultObts, opts)

    return {
        name: 'vite:LocalScopeModules',

      

        resolveId(id, importer) {

               const config=getConfig()
            if (importer && importer.endsWith('.html')) {
             
                return getNormalizePath(id)
            }

             
            if (isValidResolveId(id, config)) {

                const temp_code = `require("${id}");`
                const { code } = transformSync(temp_code, {
                    filename: importer,
                    ast: false,
                    plugins: [
                        ['babel-plugin-local-scoped-modules',config]
                    ],
                    sourceMaps: false
                })
            
                let ret = code.replace(/[\s\S]*?require\(["'](.*)['"]\);/, '$1')
        
                return getNormalizePath(ret)
           
            }

            return null
        }

    }

}




const  getNormalizePath=(ret)=>{

     ret=normalizePath(ret)
     if (ret.startsWith('../')) {
        ret = ret.replace(/\.\.\//g, '');
        if (!ret.startsWith('./')) {
            ret = './' + ret
        }
    } else if (ret.startsWith('./')) {
        ret = ret.replace(/\.\.\//g, '');
    } else {
        return null
    }
  return  ret
}



const escapeStringRegexp = (() => {
    const matchOperatorsRegex = /[|\\{}()[\]^$+*?.-]/g;

    return string => {
        if (typeof string !== 'string') {
            throw new TypeError('Expected a string');
        }

        return string.replace(matchOperatorsRegex, '\\$&');
    }
})()

function isValidResolveId(id, { rootPrefix, scopePrefix, scopes }) {

    let regex = new RegExp(`^${escapeStringRegexp(scopePrefix)}[\-_0-9A-z/]+`)
    const check1 = id === rootPrefix ||
        (id.startsWith(`${rootPrefix}/`) && id.split(rootPrefix).length === 2) ||
        (regex.test(id) && id.split(scopePrefix).length === 2)

    if (!check1) {
        return false;
    }
    const scopeNames = scopes.map(e => e.name).concat(rootPrefix)

    return scopeNames.some(name => {

        if (id === name || (id.startsWith(`${name}/`) && id.split(name).length === 2)) {

            return true
        }
        return false;
    });

}