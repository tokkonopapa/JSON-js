/*
    jsonize.js
    2013-08-11

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing one method: jsonize.

        jsonize(value)
            value       string that will be converted to JavaScript value.

            This method produces a JSON string from a valid JSON like string
            that contain JavaScript object literals.

            Typical usage of this method is retrieving parameters from HTML5
            data attribute.

            Example:

            obj = jsonize("{who:['John',{age:10}]}");
            // obj is `{"who":["John",{"age":10}]}`

            obj = jsonize("who:John,age:10");
            // obj is `{"who":"John","age":10}`

            obj = jsonize('{hack:alert("hello")}');
            // obj is `{"hack":"alert(\"hello\")"}`

    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, regexp: true */

var _jsonize_brace = /^[{\[]/,
    _jsonize_token = /[^,:{}\[\]]+/g,
    _jsonize_quote = /^['"](.*)['"]$/,
    _jsonize_escap = /"/g;

function jsonize(data) {
    if (typeof data === 'string') {
        var str = $.trim(data);
        if (_jsonize_brace.test(str) === false) {
            str = '{' + str + '}';
        }
        str = str.replace(_jsonize_token, function (a) {
            a = $.trim(a);
            return '' === a ||
                'true' === a || 'false' === a || 'null' === a ||
                (!isNaN(parseFloat(a)) && isFinite(a)) ?
                a : '"' + a.replace(_jsonize_quote, '$1')
                           .replace(_jsonize_escap, '\\"') + '"';
        });
        try {
            data = JSON.parse(str);
        } catch (e) { /* alert(e); */ }
    }

    // if loose is undefined and data is string, return empty object.
    if (!loose && data === 'string') {
        data = {};
    }

    // object or undefined
    return JSON.stringify(data);
}
