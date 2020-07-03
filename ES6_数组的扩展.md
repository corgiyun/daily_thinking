### Array.from()
Array.from方法用于将两类对象转为真正的数组：类似数组的对象和可遍历对象（包括ES6新增的数据结构Set和Map
）
下面是一个类数组对象，Array.from将它转为真正的数组
```js
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
}
// ES5的写法
var arr1 = [].slice.call(arrayLike); //['a', 'b', 'c']
// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```
