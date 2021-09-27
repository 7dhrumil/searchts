interface ICommon {
    negator: boolean;
    text: boolean;
    word: boolean;
    regexp: boolean;
    start: boolean;
    end: boolean;
    separator: string;
    propertySearch: boolean;
    propertySearchDepth: number;
}
export interface IData {
    [key: string]: any;
}
export interface IOptions extends ICommon {
    joinAnd: boolean;
}
export interface IDefault extends ICommon {
    join: "AND" | "OR";
}
export interface ISearchOps extends IData {
    terms?: IData[];
    _not?: boolean;
    _join?: "AND" | "OR";
    _text?: boolean;
    _word?: boolean;
    _regexp?: boolean;
    _start?: boolean;
    _end?: boolean;
    _separator?: string;
    _propertySearch?: boolean;
    _propertySearchDepth?: number;
}
export declare function _getOptions(search: ISearchOps, _defaults: IDefault): IOptions;
export {};
