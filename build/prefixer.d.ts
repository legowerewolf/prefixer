export declare enum ErrorLevels {
    Info = "INFO",
    Warn = "WARN",
    Error = "ERROR"
}
export declare class Prefixer {
    maxLength: number;
    constructor(...variants: string[]);
    update(variant: string): void;
    prefix: (variant: string, message: Object) => string;
}
export declare let defaultPrefixer: Prefixer;
export declare let errorLevelPrefixer: Prefixer;
