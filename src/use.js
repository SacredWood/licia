/* Use modules that is created by define.
 *
 * |Name    |Desc                |
 * |--------|--------------------|
 * |requires|Dependencies        |
 * |method  |Codes to be executed|
 */

/* example
 * // define('A', () => 'A');
 * use(['A'], function(A) {
 *     console.log(A + 'B'); // -> 'AB'
 * });
 */

/* module
 * env: all
 */

/* typescript
 * export declare function use(requires: string[], method: types.AnyFn): void;
 * export declare function use(method: types.AnyFn): void;
 */

_('map define has toArr types');

exports = function(requires, method) {
    if (method == null) {
        method = requires;
        requires = [];
    }

    requires = map(toArr(requires), function(val) {
        return req(val);
    });

    method.apply(null, requires);
};

const modules = define._modules;

const requireMarks = {};

function req(name) {
    if (has(requireMarks, name)) return modules[name];

    const requires = modules[name].requires;
    const body = modules[name].body;
    const len = requires.length;

    for (let i = 0; i < len; i++) requires[i] = req(requires[i]);

    const exports = body.apply(null, requires);
    if (exports) modules[name] = exports;

    requireMarks[name] = true;

    return modules[name];
}
