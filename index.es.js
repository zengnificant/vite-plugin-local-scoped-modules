
const defaultObts = {
    rootPrefix: '~',
    scopePrefix: '@',
    scopes: [],
    calleeNames: ['require', 'import']
}

export default (opts = {}) => {
    const getConfig = () => Object.assign(defaultObts, opts)
    let  config=null

    return {
        name: 'vite:LocalScopeModules',
        config(){
              return  getConfig()
        },
          configResolved(resolvedConfig) {
             config=resolvedConfig
          },
        resolveId(id, importer) {

               const _config=getConfig()

               if(config.command==='serve'){
                     console.warn("Don't use command==='serve' in  production.  Use other server  like  koa.js")
                
                  return `${config.root}${ret}`
               
            }
            let ret=getValidResolveId(id,_config)
              //surpport for Vue Component
              if(ret&&/\.vue$/.test(importer)){
                return ret.slice(1)
              }

            return ret
        }

    }

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

function getValidResolveId(id, { rootPrefix, scopePrefix, scopes }) {

    let regex = new RegExp(`^${escapeStringRegexp(scopePrefix)}[\-_0-9A-z/]+`)
    const check1 = id === rootPrefix ||
        (id.startsWith(`${rootPrefix}/`) && id.split(rootPrefix).length === 2) ||
        (regex.test(id) && id.split(scopePrefix).length === 2)

    if (!check1) {
        return null;
    }
 
    const scopes2 = scopes.concat({name:rootPrefix,dir:rootPrefix})
    let ret=null

    scopes2.some((scope,i) => {
        let name=scope.name,

            dir=scope.dir.replace(rootPrefix,'.')
        if (id === name || (id.startsWith(`${name}/`) && id.split(name).length === 2)) {
            ret=id.replace(name,dir)
            return true
        }
        return false;
    });
    return ret

}