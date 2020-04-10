## call、apply、bind 的区别和使用场景

### 一、概念
改变函数体内部的 this 指向

### 二、call
call 第一个参数定义 this的指向， 后面传入的是一个参数列表。
当第一个参数为null、undefined的时候，默认指向window。 --->(接收单独变量)
```js
window.color = 'red';
var o = {color: 'blue'};
function sayColor() {
    console.log(this.color);
};
sayColor(); // red
sayColor.call(this); // red
sayColor.call(window); // red
sayColor.call(o); // blue
sayColor.call(); // red
sayColor.call(null); // red
sayColor.call(undefined); // red
```

#### 实现原理
```js
var foo = {count: 1};
function bar() {
    console.log(this.count);
};
bar.myCall(foo); // 1 

Function.prototype.myCall = function(context) {
    // 获取传入的上下文
    let context = context || window;
    // 给context添加一个属性，这里的this指向调用myCall的函数，比如bar函数
    context.fn = this;
    // 通过展开运算符和结构赋值取出 context 后面的参数，上文的例子没有传入参数列表
    let args = [...arguments].slice(1);
    // 执行函数 (相当于上文的 bar(...args))
    let result = context.fn(...args);
    // 删除函数
    delete context.fn;
    return result
}
```
#### 应用场景
判断对象类型
```js
var arr1 = [];
console.log(Object.prototype.toString.call(arr1)); // [object Array]
console.log(arr1.toString()); // 空
```
这是因为 toString 是 Object的原型方法，Array或者Function等引用类型作为Object的实例，都重写了toString方法，只会转为字符串类型。
想要获得对象的具体类型时，应该调用Object上原型toString方法


### apply
apply 接受两个参数， 第一个参数是要绑定给this的值，第二个参数是一个参数数组。
当第一个参数为null、undefined的时候，默认指向window。 --->(可以接收数组)
#### 实现原理
```js
var foo = {count: 1};
function bar() {
    console.log(this.count);
};
bar.myApply(foo); // 1 
 
Function.prototype.myApply = function(context) {
    let context = context || window;
    context.fn = this;
    let result;
    // 判断第二个参数是否存在，也就是context后面有没有一个数组
    // 如果存在，则需要展开数组
    if(arguments[1]) {
        result = context.fn(...arguments[1]);
    } else {
        result = context.fn();
    }
    delete context.fn;
    return result
}
```
#### 应用场景
1. 找出数组中最大或者最小的元素
```js
var arr2 = [10, 2, 5, 28, 9];
Math.max.apply(Math, arr2); // 28
Math.min.apply(null, arr2) // 2
```
2. 将伪数组转为真正的数组
```js
Array.prototype.slice.apply({0: 1, length: 1}); // [1]
Array.prototype.slice.apply({0: 1, length: 2}); // [1, undefined]
```
3. 数组追加
```js
let arr3 = [1, 2, 3];
let arr4 = [4, 5, 6];
[].push.apply(arr1, arr2);
console.log(arr1) // [1, 2, 3, 4, 5, 6]
```

### bind
bind 第一个参数是 this 的指向， 第二个参数开始是接收的参数列表
区别在于bind方法返回值是函数以及bind接收的参数列表的使用。
将某个函数指针(函数名)以值的形式进行传递，同时该函数必须在特定环境中执行，被绑定函数的效用就凸显出来了
```js
// 例子1
var obj = {
    name: 'Ming'
};
function printName() {
    console.log(this.name);
};
var dot = printName.bind(obj)
console.log(dot); // function
dot() // Ming
printName() // undefined
// 例子2
 var a ={
    name : "Cherry",
    fn : function (a,b) {
        console.log( a + b)
    }
}
var b = a.fn;
b.call(a,1,2);//立即调用该函数
b.bind(a,1,2)();//手动调用()，它返回一个原函数的拷贝（新的，不是原函数），并拥有指定的this值和初始参数。

// 例子3
var objectSayColor = sayColor.bind(o);
objectSayColor(); // blue
```
sayColor() 调用 bind() 并传入对象o, 创建了objectSayColor() 函数，objectSayColor() 函数的this 值等于 o，
因此即便是在全局作用域中调用这个函数，也是打印出 ‘blue’
#### 实现原理
```js
Function.prototype.myBind = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    };
    let _this = this;
    let args = [...arguments].slice(1);
    // 返回一个函数
    return function F() {
        if(this instanceof F) {
            return new _this(...args, ...arguments)
        }
        return _this.apply(context, args.concat(...arguments))
    }
}
```


#### 区别
call 和 apply作用相同，区别在于传参方式，第一个为this指向的上下文环境，后面有多个参数的话，call需要按顺序一个一个传递，apply只需要传递一个数组
bind 是返回对应函数，方便需要的时候调用，call 和 apply 是立即调用
用哪个，取决于你采取哪种给函数传递参数的方式最方便