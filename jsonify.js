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
            // obj is `{"who":["John",{"age":10}]}`

            obj = jsonify("who:John,age:10");
            // obj is `{"who":"John","age":10}`

            obj = jsonify('{hack:alert("hello")}');
            // obj is `{"hack":"alert(\"hello\")"}`

    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, regexp: true */

var _jsonify_brace = /^[{\[]/,
    _jsonify_token = /[^,:{}\[\]]+/g,
    _jsonify_quote = /^['"](.*)['"]$/,
    _jsonify_escap = /"/g;

function jsonify(data) {
    if (typeof data === 'string') {
        var str = $.trim(data);
        if (_jsonify_brace.test(str) === false) {
            str = '{' + str + '}';
        }
        str = str.replace(_jsonify_token, function (a) {
            a = $.trim(a);
            return '' === a ||
                'true' === a || 'false' === a || 'null' === a ||
                (!isNaN(parseFloat(a)) && isFinite(a)) ?
                a : '"' + a.replace(_jsonify_quote, '$1')
                           .replace(_jsonify_escap, '\\"') + '"';
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
