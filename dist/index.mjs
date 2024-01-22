import { transformSync as p } from "@babel/core";
import { normalizePath as u } from "vite";
const i = {
  rootPrefix: "~",
  scopePrefix: "@",
  scopes: [],
  calleeNames: ["require", "import"]
}, $ = (e = {}) => {
  const t = () => Object.assign(i, e);
  return {
    name: "vite:LocalScopeModules",
    resolveId(n, r) {
      const l = t();
      if (r && r.endsWith(".html"))
        return o(n);
      if (g(n, l)) {
        const a = `require("${n}");`, { code: c } = p(a, {
          filename: r,
          ast: !1,
          plugins: [
            ["babel-plugin-local-scoped-modules", l]
          ],
          sourceMaps: !1
        });
        let s = c.replace(/[\s\S]*?require\(["'](.*)['"]\);/, "$1");
        return o(s);
      }
      return null;
    }
  };
}, o = (e) => {
  if (e = u(e), e.startsWith("../"))
    e = e.replace(/\.\.\//g, ""), e.startsWith("./") || (e = "./" + e);
  else if (e.startsWith("./"))
    e = e.replace(/\.\.\//g, "");
  else
    return null;
  return e;
}, f = /* @__PURE__ */ (() => {
  const e = /[|\\{}()[\]^$+*?.-]/g;
  return (t) => {
    if (typeof t != "string")
      throw new TypeError("Expected a string");
    return t.replace(e, "\\$&");
  };
})();
function g(e, { rootPrefix: t, scopePrefix: n, scopes: r }) {
  let l = new RegExp(`^${f(n)}[-_0-9A-z/]+`);
  return e === t || e.startsWith(`${t}/`) && e.split(t).length === 2 || l.test(e) && e.split(n).length === 2 ? r.map((s) => s.name).concat(t).some((s) => !!(e === s || e.startsWith(`${s}/`) && e.split(s).length === 2)) : !1;
}
export {
  $ as default
};
