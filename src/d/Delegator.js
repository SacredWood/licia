/* Object delegation.
 *
 * ### constructor
 *
 * |Name  |Type         |Desc             |
 * |------|-------------|-----------------|
 * |host  |object       |Host object      |
 * |target|string object|Delegation target|
 *
 * ### method
 *
 * Allow method to be accessed on the host object.
 *
 * |Name       |Type  |Desc              |
 * |-----------|------|------------------|
 * |name       |string|Host method name  |
 * |target=name|string|Target method name|
 *
 * ### getter
 *
 * Create a getter.
 *
 * ### setter
 *
 * Create a setter.
 *
 * ### access
 *
 * Create a accessor, same as calling both setter and getter.
 */

/* example
 * const host = {
 *     target: {
 *         a() { return 'a'; },
 *         b: 'b',
 *         c: 'c',
 *         d: 'd',
 *         e() { return 'e'; }
 *     }
 * };
 * const delegator = new Delegator(host, 'target');
 * delegator.method('a').getter('b').setter('c').access('d');
 * // @ts-ignore
 * host.a(); // -> 'a'
 * // @ts-ignore
 * host.b; // -> 'b'
 * // @ts-ignore
 * host.c = 5;
 * // @ts-ignore
 * host.target.c; // -> 5
 * // @ts-ignore
 * host.d; // -> 'd'
 * // @ts-ignore
 * host.d = 5;
 * // @ts-ignore
 * host.d; // -> 5
 */

/* module
 * env: all
 */

/* typescript
 * export declare class Delegator {
 *     constructor(host: object, target: object | string);
 *     method(name: string, target?: string): Delegator;
 *     getter(name: string, target?: string): Delegator;
 *     setter(name: string, target?: string): Delegator;
 *     access(name: string, target?: string): Delegator;
 * }
 */

_('Class safeGet defineProp isStr');

exports = Class({
    initialize: function Delegator(host, target) {
        this._host = host;
        if (isStr(target)) {
            target = safeGet(host, target);
        }
        this._target = target;
    },
    method(name, targetName) {
        const target = this._target;

        const fn = target[targetName || name];
        this._host[name] = function() {
            return fn.apply(target, arguments);
        };

        return this;
    },
    getter(name, targetName) {
        const target = this._target;
        targetName = targetName || name;

        defineProp(this._host, name, {
            get() {
                return target[targetName];
            },
            configurable: true
        });

        return this;
    },
    setter(name, targetName) {
        const target = this._target;
        targetName = targetName || name;

        defineProp(this._host, name, {
            set(val) {
                return (target[targetName] = val);
            },
            configurable: true
        });

        return this;
    },
    access(name, targetName) {
        return this.getter(name, targetName).setter(name, targetName);
    }
});