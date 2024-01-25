const u = {
  rootPrefix: "~",
  scopePrefix: "@",
  scopes: [],
  calleeNames: ["require", "import"]
}, f = (e = {}) => {
  const t = () => Object.assign(u, e);
  return {
    name: "vite:LocalScopeModules",
    config() {
      return t();
    },
    resolveId(n, c) {
      const s = t();
      return i(n, s);
    }
  };
}, g = /* @__PURE__ */ (() => {
  const e = /[|\\{}()[\]^$+*?.-]/g;
  return (t) => {
    if (typeof t != "string")
      throw new TypeError("Expected a string");
    return t.replace(e, "\\$&");
  };
})();
function i(e, { rootPrefix: t, scopePrefix: n, scopes: c }) {
  let s = new RegExp(`^${g(n)}[-_0-9A-z/]+`);
  if (!(e === t || e.startsWith(`${t}/`) && e.split(t).length === 2 || s.test(e) && e.split(n).length === 2))
    return null;
  const o = c.concat({ name: t, dir: t });
  let l = null;
  return o.some((a, m) => {
    let r = a.name, p = a.dir.replace(t, ".");
    return e === r || e.startsWith(`${r}/`) && e.split(r).length === 2 ? (l = e.replace(r, p), !0) : !1;
  }), l;
}
export {
  f as default
};
