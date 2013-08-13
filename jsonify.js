/*
    jsonify.js
    2013-08-11

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing one method: jsonify.

        jsonify(value)
            value       string that will be converted to JavaScript value.

            This method produces a JSON string from a valid JSON like string
            that contain JavaScript object literals.

            Typical usage of this method is retrieving parameters from HTML5
            data attribute.

            Example:

            obj = jsonify("{who:['John',{age:10}]}");
            // obj is '{"who":["John",{"age":10}]}'

            obj = jsonify("who:John,age:10");
            // obj is '{"who":"John","age":10}'

            obj = jsonify("{hack:alert('hello')}");
            // obj is '{}'.

    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, regexp: true */

function jsonify(value, loose) {

function jsonify(value) {
    if (typeof value === 'string') {
        var s = $.trim(value);
        if (/^[{\[]/.test(s) === false) {
            s = '{' + s + '}';
        }
        try {
            value = JSON.parse(
                s.replace(/'/g, '"')
                 .replace(/([^",{}\[\]\d\s][^",}\]\s]*)\s*:/g, '"$1":')
                 .replace(/:\s*([^",{}\[\]\d\s][^",}\]\s]*)/g, ':"$1"')
                 .replace(/"(true|false|null)"/g, '$1')
            );
        } catch (e) {}
    }

    // if loose is undefined and value is string, return empty object.
    if (!loose && value === 'string') {
        value = {};
    }

    // object or undefined
    return JSON.stringify(value);
}
