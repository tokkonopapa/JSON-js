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

        JSON.jsonify(value)
            value       string that will be converted to JavaScript value.

            This method produces a JavaScript value from string that indicate
            JavaScript object literals.

            Typical usage of this method is ...

            Example:

            obj = JSON.jsonify("{who:['John',{age:10}]}");
            // obj is '{"who":["John",{"age":10}]}' which is JavaScript object.

            obj = JSON.jsonify("{hack:alert(arguments.callee)}");
            // obj is just same as input string.

    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, regexp: true */

function jsonify(value) {
    if (typeof value === 'string') {
        try {
            var s = value.replace(/'/g, '"').replace(/(\w+)\s*:/g, '"$1":');
            value = JSON.parse(s);
        } catch (e) {}
    }
    return value;
};
