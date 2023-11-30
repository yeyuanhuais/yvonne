"use strict";

export const { isArray } = Array;

export function forEach(obj, fn, { allOwnKeys = false } = {}) {
    if (obj === null || typeof obj === "undefined") {
        return;
    }
    let i;
    let l;
    if (typeof obj !== "object") {
        obj = [obj];
    }
    if (isArray(obj)) {
        for (i = 0, l = obj.length; i < l; i++) {
            fn.call(null, obj[i], i, obj);
        }
    } else {
        const keys = allOwnKeys
            ? Object.getOwnPropertyNames(obj)
            : Object.keys(obj);
        const len = keys.length;
        let key;
        for (i = 0; i < len; i++) {
            key = keys[i];
            fn.call(null, obj[key], key, obj);
        }
    }
}
