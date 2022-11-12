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

// src/index.imba
var src_exports = {};
__export(src_exports, {
  Command: () => Command,
  Compilers: () => Compilers_exports,
  ContextHelpers: () => ContextHelpers_exports,
  Errors: () => Errors_exports,
  ImbaRepl: () => ImbaRepl,
  Runners: () => Runners_exports,
  UpdateNotifier: () => UpdateNotifier
});
module.exports = __toCommonJS(src_exports);

// src/Compilers/index.imba
var Compilers_exports = {};
__export(Compilers_exports, {
  Compiler: () => ImbaCompiler,
  ImbaCompiler: () => ImbaCompiler2,
  TypeScriptCompiler: () => TypeScriptCompiler
});

// package.json
var name = "imba-shell", version = "0.4.0";

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

// src/Runners/index.imba
var Runners_exports = {};
__export(Runners_exports, {
  ImbaRunner: () => ImbaRunner,
  TypeScriptRunner: () => TypeScriptRunner
});

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

// src/ContextHelpers.imba
var ContextHelpers_exports = {};
__export(ContextHelpers_exports, {
  clear: () => clear,
  exit: () => exit
});
function exit() {
  return console.log("Exit: Goodbye"), process.exit();
}
function clear() {
  process.stdout.write("\x1B[2J\x1B[0;0f");
}

// src/Errors/index.imba
var Errors_exports = {};
__export(Errors_exports, {
  ImbaMissingException: () => ImbaMissingException,
  InvalidLanguageException: () => InvalidLanguageException
});

// src/Errors/InvalidLanguageException.imba
function defineName$__8(cls, name2) {
  Object.defineProperty(cls, "name", { value: name2, configurable: !0 });
}
function inheritClass$__5(cls) {
  var _a, _b;
  (_b = (_a = Object.getPrototypeOf(cls.prototype).constructor) == null ? void 0 : _a.inherited) == null || _b.call(_a, cls);
}
var _InvalidLanguageException = class extends Error {
}, InvalidLanguageException = _InvalidLanguageException;
(() => {
  defineName$__8(_InvalidLanguageException, "InvalidLanguageException"), inheritClass$__5(_InvalidLanguageException);
})();

// src/Command.imba
var import_fs6 = require("fs");
var import_path8 = require("path"), import_child_process5 = require("child_process");
function defineName$__9(cls, name2) {
  Object.defineProperty(cls, "name", { value: name2, configurable: !0 });
}
var $__init__$2 = /* @__PURE__ */ Symbol.for("#__init__"), $__patch__$2 = /* @__PURE__ */ Symbol.for("#__patch__");
var _Command = class {
  [$__patch__$2]($$ = {}) {
    var $1;
    ($1 = $$.args) !== void 0 && (this.args = $1), ($1 = $$.watch) !== void 0 && (this.watch = $1);
  }
  [$__init__$2]($$ = null, deep = !0) {
    var $2;
    this.args = $$ && ($2 = $$.args) !== void 0 ? $2 : [], this.watch = $$ && ($2 = $$.watch) !== void 0 ? $2 : !1;
  }
  get isRuntime() {
    return !1;
  }
  constructor() {
    this[$__init__$2](), this.args = process.argv.slice(2);
  }
  enableWatcher() {
    return this.watch = !0, this.args = this.args.filter(function(arg) {
      return !["-w", "--watch"].includes(arg);
    });
  }
  printVersion() {
    return console.log("Imba Shell v" + version + " (imba " + ImbaRunner.version + ")");
  }
  displayHelp() {
    return this.isRuntime ? console.log(`\x1B[32mUsage:\x1B[0m
  [options] [\x1B[2m<script>\x1B[0m]
`) : console.log(`\x1B[32mUsage:\x1B[0m
  \x1B[2mimba-shell\x1B[0m [options]
`), console.log("\x1B[32mOptions:\x1B[0m"), console.log("  \x1B[32m-h, --help\x1B[0m            Display help"), console.log("  \x1B[32m-v, --version\x1B[0m         Display this application version"), this.isRuntime ? console.log("  \x1B[32m-w, --watch\x1B[0m           Continously build and watch project") : console.log("  \x1B[32m    --ts\x1B[0m              Run Repl in TypeScript mode");
  }
  invalidCommand() {
    return console.log('The "' + this.args[0] + '" option does not exist.'), process.exit(1);
  }
  run() {
    if (this.isRuntime) {
      if (this.args[0] && (this.args[0].trim() == "--watch" || this.args[0].trim() == "-w") && this.enableWatcher(), this.watch == !1 && !this.args[0])
        return this.displayHelp();
      (this.args[0] == null && this.watch || !(0, import_fs6.existsSync)((0, import_path8.join)(process.cwd(), this.args[0])) && !this.args[0].trim().startsWith("-")) && (console.log("Error: Script missing."), process.exit(1));
    }
    return !this.isRuntime && this.args.length == 1 && this.args[0] == "--ts" || !(this.args.length > 0) ? this.handle(this.args[0] ? "typescript" : "imba") : this.args.length > 0 ? this.args[0].trim() == "--version" || this.args[0].trim() == "-v" ? this.printVersion() : this.args[0].trim() == "--help" || this.args[0].trim() == "-h" ? this.displayHelp() : (0, import_fs6.existsSync)((0, import_path8.join)(process.cwd(), this.args[0])) ? this.exec() : this.invalidCommand() : this.handle();
  }
  exec() {
    let fallbackScript = this.createFallbackScript();
    process.platform === "win32" && (this.args[0] = fallbackScript || (0, import_path8.join)(process.cwd(), this.args[0])), this.args.splice(1, 0, "--");
    let watcher = [];
    this.watch && watcher.push("-w");
    let options = {
      stdio: "inherit",
      cwd: process.cwd()
    };
    if (process.platform === "win32") {
      let sh = process.env.comspec || "cmd", shFlag = "/d /s /c";
      options.windowsVerbatimArguments = !0, (0, import_child_process5.spawnSync)(sh, [shFlag, ImbaRunner.instance(), ...watcher, ...this.args], options);
    } else
      (0, import_child_process5.spawnSync)(ImbaRunner.instance(), [...watcher, ...this.args], options);
    if (fallbackScript !== null)
      return (0, import_fs6.unlinkSync)(fallbackScript);
  }
  createFallbackScript() {
    let sourceScript = null, fallbackScript = null;
    if (!(this.args[0].endsWith(".imba") || this.args[0].endsWith(".ts"))) {
      sourceScript = (0, import_path8.join)(process.cwd(), this.args[0]), fallbackScript = (0, import_path8.join)(process.cwd(), (0, import_path8.dirname)(this.args[0]), "." + (0, import_path8.basename)(this.args[0]) + ".imba");
      try {
        (0, import_fs6.copyFileSync)(sourceScript, fallbackScript), this.args[0] = (0, import_path8.join)((0, import_path8.dirname)(this.args[0]), "." + (0, import_path8.basename)(this.args[0]) + ".imba");
      } catch {
        fallbackScript = null;
      }
    }
    return fallbackScript;
  }
  handle() {
    return null;
  }
}, Command = _Command;
(() => {
  defineName$__9(_Command, "Command");
})();

// src/ImbaRepl.imba
var import_os5 = require("os"), import_path10 = require("path"), import_node_repl = __toESM(require("node:repl"));

// src/UpdateNotifier.imba
var import_fs7 = __toESM(require("fs")), import_https = __toESM(require("https")), import_os4 = __toESM(require("os")), import_path9 = __toESM(require("path"));
function defineName$__10(cls, name2) {
  Object.defineProperty(cls, "name", { value: name2, configurable: !0 });
}
var $__init__$3 = /* @__PURE__ */ Symbol.for("#__init__"), $__patch__$3 = /* @__PURE__ */ Symbol.for("#__patch__");
var _UpdateNotifier = class {
  [$__patch__$3]($$ = {}) {
    var $1;
    ($1 = $$.package) !== void 0 && (this.package = $1), ($1 = $$.directory) !== void 0 && (this.directory = $1);
  }
  [$__init__$3]($$ = null, deep = !0) {
    var $2;
    this.package = $$ && ($2 = $$.package) !== void 0 ? $2 : "https://registry.npmjs.org/-/package/" + name + "/dist-tags", this.directory = $$ && ($2 = $$.directory) !== void 0 ? $2 : import_path9.default.join(import_os4.default.homedir(), "." + name);
  }
  constructor() {
    this[$__init__$3](), import_fs7.default.existsSync(this.directory) || import_fs7.default.mkdirSync(this.directory), this.shouldFetchLatestVersion() && this.fetchLatestVersion();
  }
  shouldFetchLatestVersion() {
    let file = import_path9.default.join(this.directory, "latest.json");
    if (!import_fs7.default.existsSync(file))
      return !0;
    let fileDate = import_fs7.default.statSync(file).mtime, currentDate = new Date(), _FILE_DATE = Date.UTC(fileDate.getFullYear(), fileDate.getMonth(), fileDate.getDate()), _CURRENT_DATE = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()), _MS_PER_DAY = 1e3 * 60 * 60 * 24, shouldRefresh = Math.floor((_CURRENT_DATE - _FILE_DATE) / _MS_PER_DAY > 0);
    return shouldRefresh && import_fs7.default.unlinkSync(file), shouldRefresh;
  }
  compareVersion(latestVersion) {
    return version.trim() == latestVersion.trim() ? 0 : latestVersion.localeCompare(version) == 1;
  }
  fetchLatestVersion() {
    var self = this;
    let request = import_https.default.get(this.package);
    return request.on("response", function(response) {
      if (response.statusCode !== 200)
        return;
      let data = "";
      return response.on("data", function(chunk) {
        return data += chunk;
      }), response.on("end", function() {
        return self.storeVersion(data);
      });
    }), request.end(), request.on("error", function() {
    });
  }
  storeVersion(data) {
    let latestPath = import_path9.default.join(this.directory, "latest.json");
    return import_fs7.default.writeFileSync(latestPath, data);
  }
  check(callback = null) {
    if (!import_fs7.default.existsSync(import_path9.default.join(this.directory, "latest.json")))
      return;
    let response = JSON.parse(import_fs7.default.readFileSync(import_path9.default.join(this.directory, "latest.json")).toString());
    if (!this.compareVersion(response.latest))
      return;
    if (callback && typeof callback == "function")
      return response.current = version, callback(response);
    let repeat = function(char$) {
      return char$.repeat(name.length * 2);
    };
    return console.log("┌─────────────────────────────────────────────────────" + repeat("─") + "─┐"), console.log("│                                                      " + repeat(" ") + "│"), console.log("│  New version available: v" + response.latest + " (current: v" + version + ")     " + repeat(" ") + "│"), console.log("│  Run \x1B[32mnpm install -g " + name + "\x1B[0m or \x1B[32myarn global add " + name + "\x1B[0m to update!  │"), console.log("│                                                      " + repeat(" ") + "│"), console.log("└──────────────────────────────────────────────────────" + repeat("─") + "┘"), null;
  }
}, UpdateNotifier = _UpdateNotifier;
(() => {
  defineName$__10(_UpdateNotifier, "UpdateNotifier");
})();

// src/ImbaRepl.imba
function iter$__(a) {
  let v;
  return a && ((v = a.toIterable) ? v.call(a) : a);
}
function defineName$__11(cls, name2) {
  Object.defineProperty(cls, "name", { value: name2, configurable: !0 });
}
var $__init__$4 = /* @__PURE__ */ Symbol.for("#__init__"), $__patch__$4 = /* @__PURE__ */ Symbol.for("#__patch__");
var _ImbaRepl = class {
  [$__patch__$4]($$ = {}) {
    var $1;
    ($1 = $$.ctxCallbacks) !== void 0 && (this.ctxCallbacks = $1), ($1 = $$.cmdCallbacks) !== void 0 && (this.cmdCallbacks = $1), ($1 = $$.update) !== void 0 && (this.update = $1), ($1 = $$.language) !== void 0 && (this.language = $1), ($1 = $$.prompt) !== void 0 && (this.prompt = $1), ($1 = $$.historyPath) !== void 0 && (this.historyPath = $1);
  }
  [$__init__$4]($$ = null, deep = !0) {
    var $2;
    this.ctxCallbacks = $$ && ($2 = $$.ctxCallbacks) !== void 0 ? $2 : [], this.cmdCallbacks = $$ && ($2 = $$.cmdCallbacks) !== void 0 ? $2 : [], this.update = $$ && ($2 = $$.update) !== void 0 ? $2 : null, this.language = $$ && ($2 = $$.language) !== void 0 ? $2 : "imba", this.prompt = $$ && ($2 = $$.prompt) !== void 0 ? $2 : ">>> ", this.historyPath = $$ && ($2 = $$.historyPath) !== void 0 ? $2 : null;
  }
  constructor(language = "imba", prompt = ">>> ", historyPath = null) {
    if (this[$__init__$4](), typeof language != "string")
      throw new TypeError("Expected language to be a String.");
    if (!["imba", "typescript"].includes(language.toLowerCase()))
      throw new InvalidLanguageException('Expected language to be "imba" or "typescript".');
    if (typeof prompt != "string")
      throw new TypeError("Expected prompt to be a String.");
    if (historyPath && typeof historyPath != "string")
      throw new TypeError("Expected historyPath to be a String.");
    this.language = language.toLowerCase(), this.prompt = prompt, this.historyPath = historyPath;
  }
  registerCallback(callback) {
    if (typeof callback != "function")
      throw new TypeError("Expected callback to be a Function.");
    return this.ctxCallbacks.push(callback), this;
  }
  registerCommand(name2, callback) {
    if (typeof name2 != "string")
      throw new TypeError("Expected command name to be a String.");
    return this.cmdCallbacks.push({ name: name2, callback }), this;
  }
  shouldUpdate(callback = null) {
    if (callback && typeof callback != "function")
      throw new TypeError("Expected callback to be a Function.");
    return this.update = callback || !0, this;
  }
  async run(options = {}) {
    var self = this;
    if (options !== null && !(options !== null && typeof options == "object" && Array.isArray(options) === !1))
      throw new TypeError("Expected repl options to be an Object.");
    let compilerVersion = this.language == "imba" ? "imba " + ImbaRunner.version : "typescript " + TypeScriptRunner.version;
    console.log("Imba Shell v" + version + " (" + compilerVersion + ") by Donald Pakkies"), this.update && new UpdateNotifier().check(this.update);
    let server = await import_node_repl.default.start({ prompt: this.prompt, ...options });
    this.historyPath && server.setupHistory(this.historyPath, function(err, cb) {
      if (err)
        throw err;
    }), this.registerCommand("clear", function() {
      return clear(), process.stdout.write(self.prompt);
    }), this.registerCommand("exit", function() {
      return exit();
    });
    for (let $3 = 0, $4 = iter$__(this.ctxCallbacks), $5 = $4.length; $3 < $5; $3++) {
      let handler = $4[$3];
      handler(server.context);
    }
    for (let $6 = 0, $7 = iter$__(this.cmdCallbacks), $8 = $7.length; $6 < $8; $6++) {
      let handler = $7[$6];
      server.defineCommand(handler.name, handler.callback);
    }
    for (let $9 = 0, $10 = Object.keys(ContextHelpers_exports), $11 = $10.length, key, handler; $9 < $11; $9++)
      key = $10[$9], handler = ContextHelpers_exports[key], server.context[key] = handler;
    let cmdEval = server.eval, sessionId = String(new Date().valueOf());
    return server.eval = function(cmd, context, file, cb) {
      let compiledCode = self.language == "imba" ? ImbaCompiler2.code(cmd, sessionId).get() : TypeScriptCompiler.code(cmd, sessionId).get();
      return cmdEval(compiledCode || "", context, file, async function(error, results) {
        if (error)
          return cb(error);
        try {
          return cb(null, await Promise.resolve(results));
        } catch (err) {
          return cb(err);
        }
      });
    }, server.sessionId = sessionId, server.input.on("keypress", function(chunk, key) {
      if (key.name == "tab" && key.shift)
        return server.write("	");
    }), server;
  }
}, ImbaRepl = _ImbaRepl;
(() => {
  defineName$__11(_ImbaRepl, "ImbaRepl");
})();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Command,
  Compilers,
  ContextHelpers,
  Errors,
  ImbaRepl,
  Runners,
  UpdateNotifier
});
//__FOOT__
