
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
        config(){
              return  getConfig()
        },
        resolveId(id, importer) {

               const config=getConfig()

            return getValidResolveId(id,config)
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