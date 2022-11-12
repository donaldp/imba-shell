globalThis.IMBA_MANIFEST={}
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// src/Runners/index.imba
var Runners_exports = {};
__export(Runners_exports, {
  ImbaRunner: () => ImbaRunner,
  TypeScriptRunner: () => TypeScriptRunner
});
module.exports = __toCommonJS(Runners_exports);

// src/Runners/ImbaRunner.imba
var import_path = require("path"), import_child_process = require("child_process"), import_fs = __toESM(require("fs"));

// src/Errors/ImbaMissingException.imba
function defineName$__(cls, name) {
  Object.defineProperty(cls, "name", { value: name, configurable: !0 });
}
function inheritClass$__(cls) {
  var _a, _b;
  (_b = (_a = Object.getPrototypeOf(cls.prototype).constructor) == null ? void 0 : _a.inherited) == null || _b.call(_a, cls);
}
var _ImbaMissingException = class extends Error {
}, ImbaMissingException = _ImbaMissingException;
(() => {
  defineName$__(_ImbaMissingException, "ImbaMissingException"), inheritClass$__(_ImbaMissingException);
})();

// src/Runners/ImbaRunner.imba
var import_path2 = __toESM(require("path"));
function defineName$__2(cls, name) {
  Object.defineProperty(cls, "name", { value: name, configurable: !0 });
}
var _ImbaRunner = class {
  static get ext() {
    return process.platform === "win32" ? ".cmd" : "";
  }
  static get imba() {
    let local = import_path2.default.join(process.cwd(), "node_modules", ".bin", "imba"), onboard = import_path2.default.join((0, import_path.dirname)((0, import_path.resolve)("src/Runners/ImbaRunner.imba")), "..", "node_modules", ".bin", "imba");
    return import_fs.default.existsSync(local) ? local : onboard;
  }
  static instance(compiler = !1) {
    let file = this.imba + (compiler ? "c" : "") + this.ext;
    if (!import_fs.default.existsSync(file))
      throw new ImbaMissingException("Imba not found at $" + file);
    return file;
  }
  static get version() {
    return (0, import_child_process.execSync)("" + this.instance(!0) + " -v").toString().trim();
  }
}, ImbaRunner = _ImbaRunner;
(() => {
  defineName$__2(_ImbaRunner, "ImbaRunner");
})();

// src/Runners/TypeScriptRunner.imba
var import_path3 = require("path"), import_child_process2 = require("child_process"), import_fs2 = __toESM(require("fs"));

// src/Errors/TypeScriptMissingException.imba
function defineName$__3(cls, name) {
  Object.defineProperty(cls, "name", { value: name, configurable: !0 });
}
function inheritClass$__2(cls) {
  var _a, _b;
  (_b = (_a = Object.getPrototypeOf(cls.prototype).constructor) == null ? void 0 : _a.inherited) == null || _b.call(_a, cls);
}
var _TypeScriptMissingException = class extends Error {
}, TypeScriptMissingException = _TypeScriptMissingException;
(() => {
  defineName$__3(_TypeScriptMissingException, "TypeScriptMissingException"), inheritClass$__2(_TypeScriptMissingException);
})();

// src/Runners/TypeScriptRunner.imba
var import_path4 = __toESM(require("path"));
function defineName$__4(cls, name) {
  Object.defineProperty(cls, "name", { value: name, configurable: !0 });
}
var _TypeScriptRunner = class {
  static get tsc() {
    let local = import_path4.default.join(process.cwd(), "node_modules", ".bin", "tsc"), onboard = import_path4.default.join((0, import_path3.dirname)((0, import_path3.resolve)("src/Runners/TypeScriptRunner.imba")), "..", "node_modules", ".bin", "tsc");
    return import_fs2.default.existsSync(local) ? local : onboard;
  }
  static instance() {
    let file = this.tsc;
    if (!import_fs2.default.existsSync(file))
      throw new TypeScriptMissingException("tsc not found at $" + file);
    return file;
  }
  static get version() {
    return (0, import_child_process2.execSync)("" + this.instance() + " -v").toString().trim().split(" ")[1];
  }
}, TypeScriptRunner = _TypeScriptRunner;
(() => {
  defineName$__4(_TypeScriptRunner, "TypeScriptRunner");
})();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ImbaRunner,
  TypeScriptRunner
});
//__FOOT__
