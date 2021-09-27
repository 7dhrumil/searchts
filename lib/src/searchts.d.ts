import { IData, ISearchOps } from "./option";
export declare function setDefaults(options: IData): void;
export declare function resetDefaults(): void;
export declare function _singleMatch(field: any, s: any, text: boolean, word: boolean, regexp: boolean, start: boolean, end: boolean): boolean;
export declare function matchArray(ary: IData[], search: ISearchOps): any[];
export declare function matchObject(obj: IData, search: ISearchOps): boolean;
