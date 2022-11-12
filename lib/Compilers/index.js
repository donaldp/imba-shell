globalThis.IMBA_MANIFEST={}
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: !0 });
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

// src/Compilers/index.imba
var Compilers_exports = {};
__export(Compilers_exports, {
  Compiler: () => ImbaCompiler,
  ImbaCompiler: () => ImbaCompiler2,
  TypeScriptCompiler: () => TypeScriptCompiler
});
module.exports = __toCommonJS(Compilers_exports);

// package.json
var name = "imba-shell";

// src/Compilers/Compiler.imba
var import_fs = __toESM(require("fs")), import_os = __toESM(require("os")), import_path = __toESM(require("path"));
function defineName$__(cls, name2) {
  Object.defineProperty(cls, "name", { value: name2, configurable: !0 });
}
var $__init__$ = /* @__PURE__ */ Symbol.for("#__init__"), $__patch__$ = /* @__PURE__ */ Symbol.for("#__patch__");
var _ImbaCompiler = class {
  [$__patch__$]($$ = {}) {
    var $1;
    ($1 = $$.directory) !== void 0 && (this.directory = $1), ($1 = $$.code) !== void 0 && (this.code = $1), ($1 = $$.sessionId) !== void 0 && (this.sessionId = $1);
  }
  [$__init__$]($$ = null, deep = !0) {
    var $2;
    this.directory = $$ && ($2 = $$.directory) !== void 0 ? $2 : import_path.default.join(import_os.default.tmpdir(), "." + name), this.code = $$ ? $$.code : void 0, this.sessionId = $$ ? $$.sessionId : void 0;
  }
  constructor(code, sessionId) {
    if (this[$__init__$](), typeof code != "string")
      throw new TypeError("Expected code to be a String.");
    if (typeof sessionId != "string")
      throw new TypeError("Expected sessionId to be a String.");
    import_fs.default.existsSync(this.directory) || import_fs.default.mkdirSync(this.directory, { recursive: !0 }), this.code = code, this.sessionId = sessionId;
  }
  static code(code, sessionId) {
    return new this(code, sessionId);
  }
}, ImbaCompiler = _ImbaCompiler;
(() => {
  defineName$__(_ImbaCompiler, "ImbaCompiler");
})();

// src/Compilers/ImbaCompiler.imba
var import_child_process3 = require("child_process");

// src/Runners/ImbaRunner.imba
var import_path2 = require("path"), import_child_process = require("child_process"), import_fs2 = __toESM(require("fs"));

// src/Errors/ImbaMissingException.imba
function defineName$__2(cls, name2) {
  Object.defineProperty(cls, "name", { value: name2, configurable: !0 });
}
function inheritClass$__(cls) {
  var _a, _b;
  (_b = (_a = Object.getPrototypeOf(cls.prototype).constructor) == null ? void 0 : _a.inherited) == null || _b.call(_a, cls);
}
var _ImbaMissingException = class extends Error {
}, ImbaMissingException = _ImbaMissingException;
(() => {
  defineName$__2(_ImbaMissingException, "ImbaMissingException"), inheritClass$__(_ImbaMissingException);
})();

// src/Runners/ImbaRunner.imba
var import_path3 = __toESM(require("path"));
function defineName$__3(cls, name2) {
  Object.defineProperty(cls, "name", { value: name2, configurable: !0 });
}
var _ImbaRunner = class {
  static get ext() {
    return process.platform === "win32" ? ".cmd" : "";
  }
  static get imba() {
    let local = import_path3.default.join(process.cwd(), "node_modules", ".bin", "imba"), onboard = import_path3.default.join((0, import_path2.dirname)((0, import_path2.resolve)("src/Runners/ImbaRunner.imba")), "..", "node_modules", ".bin", "imba");
    return import_fs2.default.existsSync(local) ? local : onboard;
  }
  static instance(compiler = !1) {
    let file = this.imba + (compiler ? "c" : "") + this.ext;
    if (!import_fs2.default.existsSync(file))
      throw new ImbaMissingException("Imba not found at $" + file);
    return file;
  }
  static get version() {
    return (0, import_child_process.execSync)("" + this.instance(!0) + " -v").toString().trim();
  }
}, ImbaRunner = _ImbaRunner;
(() => {
  defineName$__3(_ImbaRunner, "ImbaRunner");
})();

// src/Runners/TypeScriptRunner.imba
var import_path4 = require("path"), import_child_process2 = require("child_process"), import_fs3 = __toESM(require("fs"));

// src/Errors/TypeScriptMissingException.imba
function defineName$__4(cls, name2) {
  Object.defineProperty(cls, "name", { value: name2, configurable: !0 });
}
function inheritClass$__2(cls) {
  var _a, _b;
  (_b = (_a = Object.getPrototypeOf(cls.prototype).constructor) == null ? void 0 : _a.inherited) == null || _b.call(_a, cls);
}
var _TypeScriptMissingException = class extends Error {
}, TypeScriptMissingException = _TypeScriptMissingException;
(() => {
  defineName$__4(_TypeScriptMissingException, "TypeScriptMissingException"), inheritClass$__2(_TypeScriptMissingException);
})();

// src/Runners/TypeScriptRunner.imba
var import_path5 = __toESM(require("path"));
function defineName$__5(cls, name2) {
  Object.defineProperty(cls, "name", { value: name2, configurable: !0 });
}
var _TypeScriptRunner = class {
  static get tsc() {
    let local = import_path5.default.join(process.cwd(), "node_modules", ".bin", "tsc"), onboard = import_path5.default.join((0, import_path4.dirname)((0, import_path4.resolve)("src/Runners/TypeScriptRunner.imba")), "..", "node_modules", ".bin", "tsc");
    return import_fs3.default.existsSync(local) ? local : onboard;
  }
  static instance() {
    let file = this.tsc;
    if (!import_fs3.default.existsSync(file))
      throw new TypeScriptMissingException("tsc not found at $" + file);
    return file;
  }
  static get version() {
    return (0, import_child_process2.execSync)("" + this.instance() + " -v").toString().trim().split(" ")[1];
  }
}, TypeScriptRunner = _TypeScriptRunner;
(() => {
  defineName$__5(_TypeScriptRunner, "TypeScriptRunner");
})();

// src/Compilers/ImbaCompiler.imba
var import_fs4 = __toESM(require("fs")), import_os2 = require("os"), import_path6 = __toESM(require("path"));
function defineName$__6(cls, name2) {
  Object.defineProperty(cls, "name", { value: name2, configurable: !0 });
}
function inheritClass$__3(cls) {
  var _a, _b;
  (_b = (_a = Object.getPrototypeOf(cls.prototype).constructor) == null ? void 0 : _a.inherited) == null || _b.call(_a, cls);
}
var _ImbaCompiler2 = class extends ImbaCompiler {
  get() {
    import_fs4.default.writeFileSync(import_path6.default.join(this.directory, this.sessionId), this.code.trim());
    let results = (0, import_child_process3.execSync)("" + ImbaRunner.instance(!0) + " " + import_path6.default.join(this.directory, this.sessionId) + " --platform=node --format=cjs --print");
    return import_fs4.default.rmSync(import_path6.default.join(this.directory, this.sessionId)), results.toString();
  }
}, ImbaCompiler2 = _ImbaCompiler2;
(() => {
  defineName$__6(_ImbaCompiler2, "ImbaCompiler"), inheritClass$__3(_ImbaCompiler2);
})();

// src/Compilers/TypeScriptCompiler.imba
var import_child_process4 = require("child_process");
var import_fs5 = __toESM(require("fs"));
var import_os3 = require("os"), import_path7 = __toESM(require("path"));
function defineName$__7(cls, name2) {
  Object.defineProperty(cls, "name", { value: name2, configurable: !0 });
}
function inheritClass$__4(cls) {
  var _a, _b;
  (_b = (_a = Object.getPrototypeOf(cls.prototype).constructor) == null ? void 0 : _a.inherited) == null || _b.call(_a, cls);
}
var _TypeScriptCompiler = class extends ImbaCompiler {
  get() {
    import_fs5.default.writeFileSync(import_path7.default.join(this.directory, "" + this.sessionId + ".ts"), "" + this.code.trim());
    let failed = !1;
    try {
      let line = (0, import_child_process4.spawnSync)(TypeScriptRunner.instance(), [import_path7.default.join(this.directory, "" + this.sessionId + ".ts"), "-t", "esnext", "--moduleResolution", "node", "--noResolve", "--module", "commonjs", "--skipLibCheck"], {
        stdio: "pipe"
      }).output.toString();
      line.includes("error TS2451: Cannot redeclare block-scoped variable") || (line.includes("): error TS") && (failed = !0, line = line.split("): error ")[1]), line.trim() !== ",," && process.stderr.write(line));
    } catch {
    }
    let results = import_fs5.default.readFileSync(import_path7.default.join(this.directory, this.sessionId + ".js"));
    if (import_fs5.default.rmSync(import_path7.default.join(this.directory, "" + this.sessionId + ".js")), import_fs5.default.rmSync(import_path7.default.join(this.directory, "" + this.sessionId + ".ts")), !failed)
      return results.toString();
  }
}, TypeScriptCompiler = _TypeScriptCompiler;
(() => {
  defineName$__7(_TypeScriptCompiler, "TypeScriptCompiler"), inheritClass$__4(_TypeScriptCompiler);
})();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Compiler,
  ImbaCompiler,
  TypeScriptCompiler
});
//__FOOT__
