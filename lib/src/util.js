"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepField = exports.toType = void 0;
function toType(obj) {
    return {}.toString
        .call(obj)
        .match(/\s([a-zA-Z]+)/)[1]
        .toLowerCase();
}
exports.toType = toType;
function deepField(data, propertyPath, propertySearch, propertySearchDepth) {
    let ret = null, i, copyPropertyPath, itemValue, parameter, newPropertySearchDepth = -1;
    if (propertySearch === true) {
        if (propertySearchDepth === 0) {
            return null;
        }
        else if (propertySearchDepth !== -1) {
            newPropertySearchDepth = propertySearchDepth - 1;
        }
    }
    if (data === null || data === undefined || propertyPath === null || propertyPath === undefined || !Array.isArray(propertyPath) || propertyPath.length < 1) {
        ret = null;
    }
    else if (Array.isArray(data)) {
        ret = [];
        for (i = 0; i < data.length; i++) {
            copyPropertyPath = propertyPath.slice(0);
            itemValue = deepField(data[i], copyPropertyPath, propertySearch, newPropertySearchDepth - 1);
            if (itemValue !== null) {
                ret.push(itemValue);
            }
        }
        if (ret.length === 0) {
            ret = null;
        }
    }
    else if (typeof data === "object") {
        parameter = propertyPath[0];
        if (!data.hasOwnProperty(parameter) && propertySearch) {
            const propertyNames = Object.keys(data);
            ret = [];
            for (i = 0; i < propertyNames.length; i++) {
                const propertyData = data[propertyNames[i]];
                if (propertyData === null || propertyData === undefined) {
                    continue;
                }
                if (Array.isArray(propertyData)) {
                    propertyData.forEach(function (propertyDataItem) {
                        const foundValue = deepField(propertyDataItem, propertyPath, propertySearch, newPropertySearchDepth);
                        if (foundValue !== null) {
                            ret.push(foundValue);
                        }
                    });
                }
                else if (propertyData.constructor.name === "Object") {
                    const foundValue = deepField(propertyData, propertyPath, propertySearch, newPropertySearchDepth);
                    if (foundValue !== null) {
                        ret.push(foundValue);
                    }
                }
            }
            if (ret.length === 0) {
                ret = null;
            }
            else if (ret.length === 1) {
                ret = ret[0];
            }
        }
        else if (propertyPath.length < 2) {
            ret = data[parameter];
        }
        else {
            ret = deepField(data[parameter], propertyPath.slice(1), propertySearch, newPropertySearchDepth);
        }
    }
    return ret;
}
exports.deepField = deepField;
//# sourceMappingURL=util.js.map