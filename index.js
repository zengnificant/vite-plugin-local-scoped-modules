(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.$9831e7db_24b9_407b_921b_907561fd133e = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _core = require("@babel/core");

var _babelPluginLocalScopedModules = _interopRequireDefault(require("babel-plugin-local-scoped-modules"));

var _vite = require("vite");

var defaultObts = {
  rootPrefix: '~',
  scopePrefix: '@',
  scopes: [],
  calleeNames: ['require', 'import']
};

var _default = function _default() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var getConfig = function getConfig() {
    return Object.assign(defaultObts, opts);
  };

  var config;
  return {
    name: 'vite:LocalScopeModules',
    configResolved: function configResolved(resolvedConfig) {
      // 存储最终解析的配置
      config = resolvedConfig;
    },
    resolveId: function resolveId(id, importer) {
      if (importer && importer.endsWith('.html')) {
        id = (0, _vite.normalizePath)(id);

        if (id.startsWith('../')) {
          id = id.replace(/\.\.\//g, '');

          if (!id.startsWith('./')) {
            id = './' + id;
          }
        } else if (id.startsWith('./')) {
          id = id.replace(/\.\.\//g, '');
        } else {
          return null;
        }

        return id;
      }

      if (isValidResolveId(id, getConfig())) {
        var temp_code = "require(\"".concat(id, "\");");

        var _transformSync = (0, _core.transformSync)(temp_code, {
          filename: importer,
          ast: false,
          plugins: [[_babelPluginLocalScopedModules["default"], getConfig()]],
          sourceMaps: false
        }),
            code = _transformSync.code;

        var ret = code.replace(/[\s\S]+require\(["'](.*)['"]\);/, '$1').replace(/\\/g, '/');

        if (config.command === 'serve') {
          return ret;
        } //for client


        if (ret.startsWith('../')) {
          ret = ret.replace(/\.\.\//g, '');

          if (!ret.startsWith('./')) {
            ret = './' + ret;
          }
        } else if (ret.startsWith('./')) {
          ret = ret.replace(/\.\.\//g, '');
        } else {
          return null;
        }

        return ret;
      }

      return null;
    }
  };
};

exports["default"] = _default;

var escapeStringRegexp = function () {
  var matchOperatorsRegex = /[|\\{}()[\]^$+*?.-]/g;
  return function (string) {
    if (typeof string !== 'string') {
      throw new TypeError('Expected a string');
    }

    return string.replace(matchOperatorsRegex, '\\$&');
  };
}();

function isValidResolveId(id, _ref) {
  var rootPrefix = _ref.rootPrefix,
      scopePrefix = _ref.scopePrefix,
      scopes = _ref.scopes;
  var regex = new RegExp("^".concat(escapeStringRegexp(scopePrefix), "[-_0-9A-z/]+"));
  var check1 = id === rootPrefix || id.startsWith("".concat(rootPrefix, "/")) && id.split(rootPrefix).length === 2 || regex.test(id) && id.split(scopePrefix).length === 2;

  if (!check1) {
    return false;
  }

  var scopeNames = scopes.map(function (e) {
    return e.name;
  }).concat(rootPrefix);
  return scopeNames.some(function (name) {
    if (id === name || id.startsWith("".concat(name, "/")) && id.split(name).length === 2) {
      return true;
    }

    return false;
  });
}

},{"@babel/core":"@babel/core","@babel/runtime/helpers/interopRequireDefault":2,"babel-plugin-local-scoped-modules":"babel-plugin-local-scoped-modules","vite":"vite"}],2:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}]},{},[1])(1)
});
