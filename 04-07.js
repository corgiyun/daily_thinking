// 立即执行函数 -- 独立的词法作用域。这不仅避免了外界访问此 IIFE 中的变量，而且又不会污染全局作用域。


// 1.函数声明
// getNum(1) // 不会报错，正常执行
function getNum(num) {
    console.log(num);
}


// 2.函数表达式
// getNum2(2)  // 报错，not defined
const getNum2 = function (num) {
    console.log(num);
}


// 3.函数声明式立即执行函数
// 报错，javascript引擎看到function关键字会认为这是函数声明语句，不应该以()结尾
// 所以要解决这个问题就要让引擎知道，()前面部分不是函数定义语句，而是一个表达式，可以对此进行运算
// 比如给前面表达式加上()，()具有优先级，先执行，或者使用运算符 + - ！~ 等
// 这种情况下 JavaScript 引擎就会认为这是一个表达式，而不是函数声明
// function getNum3() {
//     // console.log(3); // SyntaxError: Unexpected token )
// }();


// 4.函数表达式立即执行函数
const getNum4 = function () {
    // console.log(4);  // 4
}();


// 5.IIFE第一种写法
(function (num) {
    console.log(num); // 5
})(5);


// 6.IIFE第二种写法
(function (num) {
    console.log(6); // 6
}(6));


//  典型案例 jQuery
(function ($) {
    // 代码
    var jQuery = {
        a: 1
    }
    return jQuery
}());
console.log($);

