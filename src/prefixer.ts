export enum ErrorLevels {
    Info = "INFO",
    Warn = "WARN",
    Error = "ERROR"
}

export class Prefixer {
    maxLength: number;

    constructor(...variants: string[]) {
        this.maxLength = 1;
        variants.forEach(variant => this.update(variant));
    }

    update(variant: string) {
        this.maxLength = Math.max(variant.length + 3, this.maxLength);
    }

    prefix = (variant: string, message: Object) => `[${variant}]${' '.repeat(this.maxLength - variant.length - 2)}${message.toString()}`
}

export let defaultPrefixer = new Prefixer();
export let errorLevelPrefixer = new Prefixer(...Object.keys(ErrorLevels));
