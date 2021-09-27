export declare function toType(obj: any): string;
interface IData {
    [key: string]: any;
}
export declare function deepField(data: IData[] | IData, propertyPath: string[], propertySearch: boolean, propertySearchDepth: number): any;
export {};
