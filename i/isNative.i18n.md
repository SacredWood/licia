## CN

检查值是否是原生函数。

|参数名|类型|说明|
|-----|----|---|
|val|*|要检查的值|
|返回值|boolean|如果是原生函数，返回真|

```javascript
isNative(function () {}); // -> false
isNative(Math.min); // -> true
```