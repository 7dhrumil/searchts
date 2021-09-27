"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchObject = exports.matchArray = exports._singleMatch = exports.resetDefaults = exports.setDefaults = void 0;
const util_1 = require("./util");
const option_1 = require("./option");
let _defaults = {};
function setDefaults(options) {
    for (const key in options) {
        _defaults[key] = options[key];
    }
}
exports.setDefaults = setDefaults;
function resetDefaults() {
    _defaults = {};
}
exports.resetDefaults = resetDefaults;
function _singleMatch(field, s, text, word, regexp, start, end) {
    let oneMatch = false, t, re, j, from, to;
    t = typeof field;
    if (field === null) {
        oneMatch = s === null;
    }
    else if (field === undefined) {
        oneMatch = s === undefined;
    }
    else if (t === "boolean") {
        oneMatch = s === field;
    }
    else if (t === "number" || field instanceof Date) {
        if (s !== null && s !== undefined && (0, util_1.toType)(s) === "object") {
            if (s.from !== undefined || s.to !== undefined || s.gte !== undefined || s.lte !== undefined) {
                from = s.from || s.gte;
                to = s.to || s.lte;
                oneMatch = (s.from !== undefined || s.gte !== undefined ? field >= from : true) && (s.to !== undefined || s.lte !== undefined ? field <= to : true);
            }
            else if (s.gt !== undefined || s.lt !== undefined) {
                oneMatch = (s.gt !== undefined ? field > s.gt : true) && (s.lt !== undefined ? field < s.lt : true);
            }
        }
        else {
            if (field instanceof Date && s instanceof Date) {
                oneMatch = field.getTime() === s.getTime();
            }
            else {
                oneMatch = field === s;
            }
        }
    }
    else if (t === "string") {
        if (typeof s === "string") {
            s = s.toLowerCase();
        }
        field = field.toLowerCase();
        if (text) {
            oneMatch = field.indexOf(s) !== -1;
        }
        else if (regexp) {
            re = _regexParser(s);
            oneMatch = field && field.match(re) !== null;
        }
        else if (word) {
            re = new RegExp("(\\s|^)" + s + "(?=\\s|$)", "i");
            oneMatch = field && field.match(re) !== null;
        }
        else if (start) {
            re = new RegExp("^" + s, "i");
            oneMatch = field && field.match(re) !== null;
        }
        else if (end) {
            re = new RegExp(s + "$", "i");
            oneMatch = field && field.match(re) !== null;
        }
        else if (s !== null && s !== undefined && (0, util_1.toType)(s) === "object") {
            if (s.from !== undefined || s.to !== undefined || s.gte !== undefined || s.lte !== undefined) {
                from = s.from || s.gte;
                to = s.to || s.lte;
                oneMatch = (s.from !== undefined || s.gte !== undefined ? field >= from : true) && (s.to !== undefined || s.lte !== undefined ? field <= to : true);
            }
            else if (s.gt !== undefined || s.lt !== undefined) {
                oneMatch = (s.gt !== undefined ? field > s.gt : true) && (s.lt !== undefined ? field < s.lt : true);
            }
        }
        else {
            oneMatch = s === field;
        }
    }
    else if (field.length !== undefined) {
        for (j = 0; j < field.length; j++) {
            oneMatch = _singleMatch(field[j], s, text, word, regexp, start, end);
            if (oneMatch) {
                break;
            }
        }
    }
    else if (t === "object") {
        oneMatch = field[s] !== undefined;
    }
    return oneMatch;
}
exports._singleMatch = _singleMatch;
function matchArray(ary, search) {
    let matched = false, i, ret = [], options = (0, option_1._getOptions)(search, _defaults);
    if (ary && ary.length > 0) {
        for (i = 0; i < ary.length; i++) {
            matched = _matchObj(ary[i], search, options);
            if (matched) {
                ret.push(ary[i]);
            }
        }
    }
    return ret;
}
exports.matchArray = matchArray;
function matchObject(obj, search) {
    const options = (0, option_1._getOptions)(search, _defaults);
    return _matchObj(obj, search, options);
}
exports.matchObject = matchObject;
function _matchObj(obj, search = {}, options) {
    let i, j, matched, oneMatch, ary, searchTermParts;
    matched = !!options.joinAnd;
    if (search.terms) {
        for (j = 0; j < search.terms.length; j++) {
            oneMatch = matchObject(obj, search.terms[j]);
            if (options.negator) {
                oneMatch = !oneMatch;
            }
            if (options.joinAnd && !oneMatch) {
                matched = false;
                break;
            }
            else if (!options.joinAnd && oneMatch) {
                matched = true;
                break;
            }
        }
    }
    else {
        for (i in search) {
            if (search.hasOwnProperty(i) && i.indexOf("_") !== 0) {
                searchTermParts = i.split(options.separator);
                ary = [].concat(search[i]);
                for (j = 0; j < ary.length; j++) {
                    oneMatch = _singleMatch((0, util_1.deepField)(obj, searchTermParts, options.propertySearch, options.propertySearchDepth), ary[j], options.text, options.word, options.regexp, options.start, options.end);
                    if (oneMatch) {
                        break;
                    }
                }
                if (options.negator) {
                    oneMatch = !oneMatch;
                }
                if (options.joinAnd && !oneMatch) {
                    matched = false;
                    break;
                }
                else if (!options.joinAnd && oneMatch) {
                    matched = true;
                    break;
                }
            }
        }
    }
    return matched;
}
function _regexParser(input) {
    var m = input.match(/(\/?)(.+)\1([a-z]*)/i);
    if (m[3] && !/^(?!.*?(.).*?\1)[gmixXsuUAJ]+$/.test(m[3])) {
        return RegExp(input);
    }
    return new RegExp(m[2], m[3]);
}
//# sourceMappingURL=searchts.js.map