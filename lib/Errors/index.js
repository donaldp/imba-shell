globalThis.IMBA_MANIFEST={}
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// src/Errors/index.imba
var Errors_exports = {};
__export(Errors_exports, {
  ImbaMissingException: () => ImbaMissingException,
  InvalidLanguageException: () => InvalidLanguageException
});
module.exports = __toCommonJS(Errors_exports);

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

// src/Errors/InvalidLanguageException.imba
function defineName$__2(cls, name) {
  Object.defineProperty(cls, "name", { value: name, configurable: !0 });
}
function inheritClass$__2(cls) {
  var _a, _b;
  (_b = (_a = Object.getPrototypeOf(cls.prototype).constructor) == null ? void 0 : _a.inherited) == null || _b.call(_a, cls);
}
var _InvalidLanguageException = class extends Error {
}, InvalidLanguageException = _InvalidLanguageException;
(() => {
  defineName$__2(_InvalidLanguageException, "InvalidLanguageException"), inheritClass$__2(_InvalidLanguageException);
})();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ImbaMissingException,
  InvalidLanguageException
});
//__FOOT__
