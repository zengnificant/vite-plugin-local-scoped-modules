(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require("@babel/core"), require("vite"), require("os")) : typeof define === "function" && define.amd ? define(["@babel/core", "vite", "os"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.localScopedModules = factory(global.core, global.vite, global.os));
})(this, function(core, vite, os) {
  "use strict";
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  function commonjsRequire(path) {
    throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
  }
  var index_min = { exports: {} };
  (function(module2, exports2) {
    !function(e) {
      module2.exports = e();
    }(function() {
      return function a(o, u, l) {
        function s(t, e2) {
          if (!u[t]) {
            if (!o[t]) {
              var r = "function" == typeof commonjsRequire && commonjsRequire;
              if (!e2 && r)
                return r(t, true);
              if (f)
                return f(t, true);
              var n = new Error("Cannot find module '" + t + "'");
              throw n.code = "MODULE_NOT_FOUND", n;
            }
            var i = u[t] = { exports: {} };
            o[t][0].call(i.exports, function(e3) {
              return s(o[t][1][e3] || e3);
            }, i, i.exports, a, o, u, l);
          }
          return u[t].exports;
        }
        for (var f = "function" == typeof commonjsRequire && commonjsRequire, e = 0; e < l.length; e++)
          s(l[e]);
        return s;
      }({ 1: [function(e, t, r) {
        t.exports = function(e2, t2) {
          if (!(e2 instanceof t2))
            throw new TypeError("Cannot call a class as a function");
        };
      }, {}], 2: [function(e, t, r) {
        function n(e2, t2) {
          for (var r2 = 0; r2 < t2.length; r2++) {
            var n2 = t2[r2];
            n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(e2, n2.key, n2);
          }
        }
        t.exports = function(e2, t2, r2) {
          return t2 && n(e2.prototype, t2), r2 && n(e2, r2), e2;
        };
      }, {}], 3: [function(e, t, r) {
        t.exports = function(e2, t2, r2) {
          return t2 in e2 ? Object.defineProperty(e2, t2, { value: r2, enumerable: true, configurable: true, writable: true }) : e2[t2] = r2, e2;
        };
      }, {}], 4: [function(e, t, r) {
        t.exports = function(e2) {
          return e2 && e2.__esModule ? e2 : { default: e2 };
        };
      }, {}], 5: [function(e, t, r) {
        var i = e("./defineProperty");
        t.exports = function(t2) {
          for (var e2 = 1; e2 < arguments.length; e2++) {
            var r2 = null != arguments[e2] ? arguments[e2] : {}, n = Object.keys(r2);
            "function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(r2).filter(function(e3) {
              return Object.getOwnPropertyDescriptor(r2, e3).enumerable;
            }))), n.forEach(function(e3) {
              i(t2, e3, r2[e3]);
            });
          }
          return t2;
        };
      }, { "./defineProperty": 3 }], 6: [function(e, t, r) {
        var n = e("@babel/runtime/helpers/interopRequireDefault");
        Object.defineProperty(r, "__esModule", { value: true }), r.default = void 0;
        var i = n(e("@babel/runtime/helpers/classCallCheck")), a = n(e("@babel/runtime/helpers/createClass")), o = function() {
          function e2() {
            (0, i.default)(this, e2), this.cachedMethodNames = [], this.visitor = {};
          }
          return (0, a.default)(e2, [{ key: "addMethod", value: function(e3, r2) {
            var n2 = e3;
            e3 in this.cachedMethodNames || (this.cachedMethodNames.push(e3), this.visitor[e3] = function(e4, t2) {
              return r2(e4, t2, n2);
            });
          } }, { key: "getVisitor", value: function() {
            return 0 === this.cachedMethodNames.length ? {} : this.visitor;
          } }]), e2;
        }();
        r.default = o;
      }, { "@babel/runtime/helpers/classCallCheck": 1, "@babel/runtime/helpers/createClass": 2, "@babel/runtime/helpers/interopRequireDefault": 4 }], 7: [function(e, t, r) {
        Object.defineProperty(r, "__esModule", { value: true }), r.default = void 0;
        r.default = { rootPrefix: "~", scopePrefix: "@", scopes: [], calleeNames: ["require"] };
      }, {}], 8: [function(e, t, r) {
        var n = e("@babel/runtime/helpers/interopRequireDefault");
        Object.defineProperty(r, "__esModule", { value: true }), r.default = void 0;
        var u = n(e("@babel/runtime/helpers/objectSpread")), l = n(e("./config")), s = n(e("./utils/getRelativePath.js")), i = ["CallExpression", "ImportDeclaration", "ExportNamedDeclaration", "ExportAllDeclaration"].map(function(e2) {
          return { name: e2, fn: a };
        });
        function a(e2, t2, r2) {
          var n2 = (0, u.default)({}, l.default, t2.opts);
          Array.isArray(n2.calleeNames) || (n2.calleeNames = []), n2.calleeNames.includes("require") || n2.calleeNames.push("require");
          var i2 = function(e3, t3, r3) {
            var n3;
            if ("CallExpression" === t3) {
              var i3 = e3.node.callee.name;
              if (!r3.calleeNames.includes(i3))
                return;
              if (!e3.node.arguments.length)
                return;
              n3 = e3.node.arguments[0];
            }
            e3.node.source && (n3 = e3.node.source);
            if (!n3)
              return;
            if ("StringLiteral" === n3.type)
              return n3;
            for (; "BinaryExpression" === n3.type; ) {
              var a3 = n3.left;
              if ("BinaryExpression" !== a3.type) {
                if ("StringLiteral" === a3.type && "+" === n3.operator && -1 < a3.value.indexOf("/"))
                  return a3;
                break;
              }
              n3 = n3.left;
            }
            return;
          }(e2, r2, n2);
          if (i2) {
            var a2 = i2.value, o = (0, s.default)(a2, t2, n2);
            o && (i2.value = o);
          }
        }
        r.default = i;
      }, { "./config": 7, "./utils/getRelativePath.js": 11, "@babel/runtime/helpers/interopRequireDefault": 4, "@babel/runtime/helpers/objectSpread": 5 }], 9: [function(e, t, r) {
        var n = /[|\\{}()[\]^$+*?.-]/g;
        t.exports = function(e2) {
          if ("string" != typeof e2)
            throw new TypeError("Expected a string");
          return e2.replace(n, "\\$&");
        };
      }, {}], 10: [function(e, t, r) {
        Object.defineProperty(r, "__esModule", { value: true }), r.default = function(e2) {
          var a = [];
          return e2.forEach(function(e3, t2) {
            var r2 = e3.name, n = e3.alias, i = e3.dir;
            a.push({ name: r2, dir: i }), n && (Array.isArray(n) ? n.forEach(function(e4) {
              return a.push({ name: e4, dir: i });
            }) : a.push({ name: n, dir: i }));
          }), a;
        };
      }, {}], 11: [function(e, t, r) {
        var n = e("@babel/runtime/helpers/interopRequireDefault");
        Object.defineProperty(r, "__esModule", { value: true }), r.default = function(e2, t2, r2) {
          var n2 = t2.cwd, i = t2.filename, a = r2.rootPrefix, o = r2.scopePrefix, u = e2;
          if (u in b.eject)
            return;
          var l = (0, y.default)(r2.scopes), s = { name: a, dir: n2 };
          l.unshift(s);
          var f = function(r3) {
            if (!function(e3) {
              var t3 = new RegExp("^".concat((0, m.default)(o), "[-_0-9A-z/]+"));
              return e3 = a || e3.startsWith("".concat(a, "/")) && 2 === e3.split(a).length || t3.test(e3) && 2 === e3.split(o).length;
            }(r3))
              return;
            var n3;
            return l.some(function(e3) {
              var t3 = e3.name;
              return !!(r3 === t3 || r3.startsWith("".concat(t3, "/")) && 2 === r3.split(t3).length) && (n3 = t3, true);
            }), n3;
          }(e2);
          if (!f)
            return void (0, b.ejectItem)(u);
          var c = (0, v.pathRelative)(i, n2), p = l.reduce(function(e3, t3) {
            return e3[t3.name] = t3.dir, e3;
          }, {}), d = f === a ? "" : p[f].slice(a.length), h = e2.slice(f.length);
          return (c + (0, g.normalize)(d + h)).replace(g.sep + g.sep, g.sep);
        };
        var v = e("./pathUtils.js"), m = n(e("./escape-string-regexp")), b = e("./pathStoreManager.js"), y = n(e("./flatScopes.js")), g = e("path");
      }, { "./escape-string-regexp": 9, "./flatScopes.js": 10, "./pathStoreManager.js": 12, "./pathUtils.js": 13, "@babel/runtime/helpers/interopRequireDefault": 4, path: "path" }], 12: [function(e, t, r) {
        Object.defineProperty(r, "__esModule", { value: true }), r.ejectItem = r.resolveItem = r.eject = r.resolve = void 0;
        var n = {}, i = {};
        r.eject = i, r.resolve = n;
        r.resolveItem = function(e2, t2) {
          e2 in n || (n[e2] = t2);
        };
        r.ejectItem = function(e2) {
          e2 in i || (i[e2] = "__THE_ITEM_WAS_EJECTED__");
        };
      }, {}], 13: [function(e, t, r) {
        Object.defineProperty(r, "__esModule", { value: true }), r.pathRelative = function(e2, t2) {
          var r2, n2, i, a, o = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
          e2 = (0, f.normalize)(e2), t2 = (0, f.normalize)(t2);
          var u = o.isDir, l = p(e2), s = 1 == u ? "dir" : p(t2);
          r2 = e2, "file" === l && (r2 = (0, f.dirname)(e2));
          n2 = t2, "file" === s && (n2 = (0, f.dirname)(t2), i = (0, f.basename)(t2));
          a = (0, f.relative)(r2, n2), n2.endsWith(f.sep) && (a += f.sep);
          i && (a = (0, f.join)(a, i));
          -1 < n2.indexOf(r2) && (a = c + a);
          a.endsWith("..") && (a += f.sep);
          return a;
        };
        var n = e("fs"), f = e("path"), c = "." + f.sep;
        function p(e2) {
          return e2 = (0, f.normalize)(e2), (0, n.existsSync)(e2 + ".js") || (0, n.existsSync)(e2 + ".json") ? "file" : -1 < (0, f.basename)(e2).indexOf(".") ? "file" : "dir";
        }
      }, { fs: "fs", path: "path" }], 14: [function(e, t, r) {
        var n = e("@babel/runtime/helpers/interopRequireDefault");
        Object.defineProperty(r, "__esModule", { value: true }), r.default = function(e2) {
          e2.types;
          var n2 = new i.default();
          return a.default.forEach(function(e3) {
            var t2 = e3.name, r2 = e3.fn;
            n2.addMethod(t2, r2);
          }), { visitor: n2.getVisitor() };
        };
        var i = n(e("./PluginClass.js")), a = n(e("./localScopedModules"));
      }, { "./PluginClass.js": 6, "./localScopedModules": 8, "@babel/runtime/helpers/interopRequireDefault": 4 }] }, {}, [14])(14);
    });
  })(index_min);
  var index_minExports = index_min.exports;
  const vitePluginRequire_1703649958747_47357539 = /* @__PURE__ */ getDefaultExportFromCjs(index_minExports);
  const plugin = vitePluginRequire_1703649958747_47357539;
  const defaultObts = {
    rootPrefix: "~",
    scopePrefix: "@",
    scopes: [],
    calleeNames: ["require", "import"]
  };
  const index_es = (opts = {}) => {
    const getConfig = () => Object.assign(defaultObts, opts);
    return {
      name: "vite:LocalScopeModules",
      configResolved(resolvedConfig) {
      },
      resolveId(id, importer) {
        var _a;
        if (importer && importer.endsWith(".html")) {
          id = vite.normalizePath(id);
          if (id.startsWith("../")) {
            id = id.replace(/\.\.\//g, "");
            if (!id.startsWith("./")) {
              id = "./" + id;
            }
          } else if (id.startsWith("./")) {
            id = id.replace(/\.\.\//g, "");
          } else {
            return null;
          }
          return id;
        }
        if (isValidResolveId(id, getConfig())) {
          const temp_code = `require("${id}");`;
          const {
            code
          } = core.transformSync(temp_code, {
            filename: importer,
            ast: false,
            plugins: [[plugin, getConfig()]],
            sourceMaps: false
          });
          let ret = code.replace(/[\s\S]+require\(["'](.*)['"]\);/, "$1").replace(/\\/g, "/");
          if ((_a = os == null ? void 0 : os.platform()) == null ? void 0 : _a.includes("linux")) {
            return ret;
          }
          if (ret.startsWith("../")) {
            ret = ret.replace(/\.\.\//g, "");
            if (!ret.startsWith("./")) {
              ret = "./" + ret;
            }
          } else if (ret.startsWith("./")) {
            ret = ret.replace(/\.\.\//g, "");
          } else {
            return null;
          }
          return ret;
        }
        return null;
      }
    };
  };
  const escapeStringRegexp = /* @__PURE__ */ (() => {
    const matchOperatorsRegex = /[|\\{}()[\]^$+*?.-]/g;
    return (string) => {
      if (typeof string !== "string") {
        throw new TypeError("Expected a string");
      }
      return string.replace(matchOperatorsRegex, "\\$&");
    };
  })();
  function isValidResolveId(id, {
    rootPrefix,
    scopePrefix,
    scopes
  }) {
    let regex = new RegExp(`^${escapeStringRegexp(scopePrefix)}[-_0-9A-z/]+`);
    const check1 = id === rootPrefix || id.startsWith(`${rootPrefix}/`) && id.split(rootPrefix).length === 2 || regex.test(id) && id.split(scopePrefix).length === 2;
    if (!check1) {
      return false;
    }
    const scopeNames = scopes.map((e) => e.name).concat(rootPrefix);
    return scopeNames.some((name) => {
      if (id === name || id.startsWith(`${name}/`) && id.split(name).length === 2) {
        return true;
      }
      return false;
    });
  }
  return index_es;
});
