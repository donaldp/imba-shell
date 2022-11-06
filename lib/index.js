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
  ContextHelpers: () => ContextHelpers_exports,
  Errors: () => Errors_exports,
  ImbaCompiler: () => ImbaCompiler,
  ImbaRepl: () => ImbaRepl,
  ImbaRunner: () => ImbaRunner,
  UpdateNotifier: () => UpdateNotifier
});
module.exports = __toCommonJS(src_exports);

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
  ImbaMissingException: () => ImbaMissingException
});

// src/Errors/ImbaMissingException.imba
function defineName$__(cls, name2) {
  Object.defineProperty(cls, "name", { value: name2, configurable: !0 });
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

// src/Command.imba
var import_fs2 = require("fs"), import_fs3 = require("fs"), import_fs4 = require("fs"), import_path3 = require("path"), import_path4 = require("path"), import_path5 = require("path"), import_child_process2 = require("child_process");

// package.json
var name = "imba-shell", version = "0.4.0";

// src/ImbaRunner.imba
var import_path = require("path"), import_child_process = require("child_process"), import_fs = __toESM(require("fs"));
var import_path2 = __toESM(require("path"));
function defineName$__2(cls, name2) {
  Object.defineProperty(cls, "name", { value: name2, configurable: !0 });
}
var _ImbaRunner = class {
  static get ext() {
    return process.platform === "win32" ? ".cmd" : "";
  }
  static get imba() {
    let local = import_path2.default.join(process.cwd(), "node_modules", ".bin", "imba"), onboard = import_path2.default.join((0, import_path.dirname)((0, import_path.resolve)("src/ImbaRunner.imba")), "..", "node_modules", ".bin", "imba");
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

// src/Command.imba
function defineName$__3(cls, name2) {
  Object.defineProperty(cls, "name", { value: name2, configurable: !0 });
}
var $__init__$ = /* @__PURE__ */ Symbol.for("#__init__"), $__patch__$ = /* @__PURE__ */ Symbol.for("#__patch__");
var _Command = class {
  [$__patch__$]($$ = {}) {
    var $1;
    ($1 = $$.args) !== void 0 && (this.args = $1), ($1 = $$.watch) !== void 0 && (this.watch = $1);
  }
  [$__init__$]($$ = null, deep = !0) {
    var $2;
    this.args = $$ && ($2 = $$.args) !== void 0 ? $2 : [], this.watch = $$ && ($2 = $$.watch) !== void 0 ? $2 : !1;
  }
  get isRuntime() {
    return !1;
  }
  constructor() {
    this[$__init__$](), this.args = process.argv.slice(2);
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
    return console.log(`\x1B[32mUsage:\x1B[0m
  [\x1B[2m<script>\x1B[0m] [options]
`), console.log("\x1B[32mOptions:\x1B[0m"), console.log("  \x1B[32m-v, --version\x1B[0m         Display help"), console.log("  \x1B[32m-h, --help\x1B[0m            Display this application version"), console.log("  \x1B[32m-w, --watch\x1B[0m           Continously build and watch project");
  }
  invalidCommand() {
    return console.log('The "' + this.args[0] + '" option does not exist.'), process.exit(1);
  }
  run() {
    if (this.isRuntime) {
      if (this.args[0] && (this.args[0].trim() == "--watch" || this.args[0].trim() == "-w") && this.enableWatcher(), this.watch == !1 && !this.args[0])
        return this.displayHelp();
      (this.args[0] == null && this.watch || !(0, import_fs2.existsSync)((0, import_path3.join)(process.cwd(), this.args[0])) && !this.args[0].trim().startsWith("-")) && (console.log("Error: Script missing."), process.exit(1));
    }
    return this.args.length > 0 ? this.args[0].trim() == "--version" || this.args[0].trim() == "-v" ? this.printVersion() : this.args[0].trim() == "--help" || this.args[0].trim() == "-h" ? this.displayHelp() : (0, import_fs2.existsSync)((0, import_path3.join)(process.cwd(), this.args[0])) ? this.exec() : this.invalidCommand() : this.handle();
  }
  exec() {
    let fallbackScript = this.createFallbackScript();
    process.platform === "win32" && (this.args[0] = fallbackScript || (0, import_path3.join)(process.cwd(), this.args[0])), this.args.splice(1, 0, "--");
    let watcher = [];
    this.watch && watcher.push("-w");
    let options = {
      stdio: "inherit",
      cwd: process.cwd()
    };
    if (process.platform === "win32") {
      let sh = process.env.comspec || "cmd", shFlag = "/d /s /c";
      options.windowsVerbatimArguments = !0, (0, import_child_process2.spawnSync)(sh, [shFlag, ImbaRunner.instance(), [...watcher, ...this.args]], options);
    } else
      (0, import_child_process2.spawnSync)(ImbaRunner.instance(), [...watcher, ...this.args], options);
    if (fallbackScript !== null)
      return (0, import_fs4.unlinkSync)(fallbackScript);
  }
  createFallbackScript() {
    let sourceScript = null, fallbackScript = null;
    if (!(this.args[0].endsWith(".imba") || this.args[0].endsWith(".ts"))) {
      sourceScript = (0, import_path3.join)(process.cwd(), this.args[0]), fallbackScript = (0, import_path3.join)(process.cwd(), (0, import_path4.dirname)(this.args[0]), "." + (0, import_path5.basename)(this.args[0]) + ".imba");
      try {
        (0, import_fs3.copyFileSync)(sourceScript, fallbackScript), this.args[0] = (0, import_path3.join)((0, import_path4.dirname)(this.args[0]), "." + (0, import_path5.basename)(this.args[0]) + ".imba");
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
  defineName$__3(_Command, "Command");
})();

// src/ImbaCompiler.imba
var import_child_process3 = require("child_process");
var import_fs5 = __toESM(require("fs"));
var import_os = __toESM(require("os")), import_path6 = __toESM(require("path"));
function defineName$__4(cls, name2) {
  Object.defineProperty(cls, "name", { value: name2, configurable: !0 });
}
var $__init__$2 = /* @__PURE__ */ Symbol.for("#__init__"), $__patch__$2 = /* @__PURE__ */ Symbol.for("#__patch__");
var _ImbaCompiler = class {
  [$__patch__$2]($$ = {}) {
    var $1;
    ($1 = $$.code) !== void 0 && (this.code = $1), ($1 = $$.sessionId) !== void 0 && (this.sessionId = $1);
  }
  [$__init__$2]($$ = null, deep = !0) {
    this.code = $$ ? $$.code : void 0, this.sessionId = $$ ? $$.sessionId : void 0;
  }
  constructor(code, sessionId) {
    if (this[$__init__$2](), typeof code != "string")
      throw new TypeError("Expected code to be a String.");
    if (typeof sessionId != "string")
      throw new TypeError("Expected sessionId to be a String.");
    this.code = code, this.sessionId = sessionId;
  }
  static code(code, sessionId) {
    return new _ImbaCompiler(code, sessionId);
  }
  get() {
    let directory = import_path6.default.join(import_os.default.homedir(), "." + name);
    import_fs5.default.existsSync(directory) || import_fs5.default.mkdirSync(directory, { recursive: !0 }), import_fs5.default.writeFileSync(import_path6.default.join(directory, this.sessionId), this.code.trim());
    let results = (0, import_child_process3.execSync)("" + ImbaRunner.instance(!0) + " " + import_path6.default.join(directory, this.sessionId) + " --platform=node --format=cjs --print");
    return import_fs5.default.rmSync(import_path6.default.join(directory, this.sessionId)), results.toString();
  }
}, ImbaCompiler = _ImbaCompiler;
(() => {
  defineName$__4(_ImbaCompiler, "ImbaCompiler");
})();

// src/ImbaRepl.imba
var import_os3 = require("os"), import_path8 = require("path"), import_repl = __toESM(require("repl"));

// src/UpdateNotifier.imba
var import_fs6 = __toESM(require("fs")), import_https = __toESM(require("https")), import_os2 = __toESM(require("os")), import_path7 = __toESM(require("path"));
function defineName$__5(cls, name2) {
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
    this.package = $$ && ($2 = $$.package) !== void 0 ? $2 : "https://registry.npmjs.org/-/package/" + name + "/dist-tags", this.directory = $$ && ($2 = $$.directory) !== void 0 ? $2 : import_path7.default.join(import_os2.default.homedir(), "." + name);
  }
  constructor() {
    this[$__init__$3](), import_fs6.default.existsSync(this.directory) || import_fs6.default.mkdirSync(this.directory), this.shouldFetchLatestVersion() && this.fetchLatestVersion();
  }
  shouldFetchLatestVersion() {
    let file = import_path7.default.join(this.directory, "latest.json");
    if (!import_fs6.default.existsSync(file))
      return !0;
    let fileDate = import_fs6.default.statSync(file).mtime, currentDate = new Date(), _FILE_DATE = Date.UTC(fileDate.getFullYear(), fileDate.getMonth(), fileDate.getDate()), _CURRENT_DATE = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()), _MS_PER_DAY = 1e3 * 60 * 60 * 24, shouldRefresh = Math.floor((_CURRENT_DATE - _FILE_DATE) / _MS_PER_DAY > 0);
    return shouldRefresh && import_fs6.default.unlinkSync(file), shouldRefresh;
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
    let latestPath = import_path7.default.join(this.directory, "latest.json");
    return import_fs6.default.writeFileSync(latestPath, data);
  }
  check(callback = null) {
    if (!import_fs6.default.existsSync(import_path7.default.join(this.directory, "latest.json")))
      return;
    let response = JSON.parse(import_fs6.default.readFileSync(import_path7.default.join(this.directory, "latest.json")).toString());
    if (!this.compareVersion(response.latest))
      return;
    if (callback && typeof callback == "function")
      return response.current = version, callback(response);
    let repeat = function(char$) {
      return char$.repeat(name.length * 2);
    };
    return console.log("┌─────────────────────────────────────────────────────" + repeat("─") + "─┐"), console.log("│                                                      " + repeat(" ") + "│"), console.log("│  New version available: v" + response.latest + " (current: v" + version + ")     " + repeat(" ") + "│"), console.log("│  Run \x1B[32mnpm install -g " + name + "\x1B[0m or \x1B[32myarn global add " + name + "\x1B[0m to update!  │"), console.log("│                                                      " + repeat(" ") + "│"), console.log("└──────────────────────────────────────────────────────" + repeat("─") + "┘");
  }
}, UpdateNotifier = _UpdateNotifier;
(() => {
  defineName$__5(_UpdateNotifier, "UpdateNotifier");
})();

// src/ImbaRepl.imba
function iter$__(a) {
  let v;
  return a && ((v = a.toIterable) ? v.call(a) : a);
}
function defineName$__6(cls, name2) {
  Object.defineProperty(cls, "name", { value: name2, configurable: !0 });
}
var $__init__$4 = /* @__PURE__ */ Symbol.for("#__init__"), $__patch__$4 = /* @__PURE__ */ Symbol.for("#__patch__");
var _ImbaRepl = class {
  [$__patch__$4]($$ = {}) {
    var $1;
    ($1 = $$.ctxCallbacks) !== void 0 && (this.ctxCallbacks = $1), ($1 = $$.cmdCallbacks) !== void 0 && (this.cmdCallbacks = $1), ($1 = $$.update) !== void 0 && (this.update = $1), ($1 = $$.prompt) !== void 0 && (this.prompt = $1), ($1 = $$.historyPath) !== void 0 && (this.historyPath = $1);
  }
  [$__init__$4]($$ = null, deep = !0) {
    var $2;
    this.ctxCallbacks = $$ && ($2 = $$.ctxCallbacks) !== void 0 ? $2 : [], this.cmdCallbacks = $$ && ($2 = $$.cmdCallbacks) !== void 0 ? $2 : [], this.update = $$ && ($2 = $$.update) !== void 0 ? $2 : null, this.prompt = $$ && ($2 = $$.prompt) !== void 0 ? $2 : ">>> ", this.historyPath = $$ && ($2 = $$.historyPath) !== void 0 ? $2 : null;
  }
  constructor(prompt = ">>> ", historyPath = null) {
    if (this[$__init__$4](), typeof prompt != "string")
      throw new TypeError("Expected prompt to be a String.");
    if (historyPath && typeof historyPath != "string")
      throw new TypeError("Expected historyPath to be a String.");
    this.prompt = prompt, this.historyPath = historyPath;
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
    console.log("Imba Shell v" + version + " (imba " + ImbaRunner.version + ") by Donald Pakkies"), this.update && new UpdateNotifier().check(this.update);
    let server = await import_repl.default.start({ prompt: this.prompt, ...options });
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
      let compiledCode = ImbaCompiler.code(cmd, sessionId).get();
      return cmdEval(compiledCode, context, file, async function(error, results) {
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
  defineName$__6(_ImbaRepl, "ImbaRepl");
})();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Command,
  ContextHelpers,
  Errors,
  ImbaCompiler,
  ImbaRepl,
  ImbaRunner,
  UpdateNotifier
});
//__FOOT__
