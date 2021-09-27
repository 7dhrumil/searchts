"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._getOptions = void 0;
function _getSingleOpt(first, override, fallback) {
    if (first !== undefined) {
        return first;
    }
    else if (override !== undefined) {
        return override;
    }
    else {
        return fallback;
    }
}
function _getOptions(search = {}, _defaults) {
    const options = {};
    options.negator = _getSingleOpt(search._not, _defaults.negator, false);
    options.joinAnd = _getSingleOpt(search._join, _defaults.join, "AND") !== "OR";
    options.text = _getSingleOpt(search._text, _defaults.text, false);
    options.word = _getSingleOpt(search._word, _defaults.word, false);
    options.regexp = _getSingleOpt(search._regexp, _defaults.regexp, false);
    options.start = _getSingleOpt(search._start, _defaults.start, false);
    options.end = _getSingleOpt(search._end, _defaults.end, false);
    options.separator = search._separator || _defaults.separator || ".";
    options.propertySearch = _getSingleOpt(search._propertySearch, _defaults.propertySearch, false);
    options.propertySearchDepth = _getSingleOpt(search._propertySearchDepth, _defaults.propertySearchDepth, -1);
    return options;
}
exports._getOptions = _getOptions;
//# sourceMappingURL=option.js.map