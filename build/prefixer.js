"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorLevels;
(function (ErrorLevels) {
    ErrorLevels["Info"] = "INFO";
    ErrorLevels["Warn"] = "WARN";
    ErrorLevels["Error"] = "ERROR";
})(ErrorLevels = exports.ErrorLevels || (exports.ErrorLevels = {}));
class Prefixer {
    constructor(...variants) {
        this.prefix = (variant, message) => `[${variant}]${' '.repeat(this.maxLength - variant.length - 2)}${message.toString()}`;
        this.maxLength = 1;
        variants.forEach(variant => this.update(variant));
    }
    update(variant) {
        this.maxLength = Math.max(variant.length + 3, this.maxLength);
    }
}
exports.Prefixer = Prefixer;
exports.defaultPrefixer = new Prefixer();
exports.errorLevelPrefixer = new Prefixer(...Object.keys(ErrorLevels));
exports.errors = {
    info: (msg) => exports.errorLevelPrefixer.prefix(ErrorLevels.Info, msg),
    warn: (msg) => exports.errorLevelPrefixer.prefix(ErrorLevels.Warn, msg),
    error: (msg) => exports.errorLevelPrefixer.prefix(ErrorLevels.Error, msg),
};
