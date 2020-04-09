function myNew() {
    // 1.创建一个新对象
    let obj = {};  
    // 2.获取构造函数
    let cons = [].shift.call(arguments);
    // 3.显式链接到原型
    obj._proto_ = cons.prototype;
    // 4.将新建的对象绑定this
    let result = cons.apply(obj, arguments);
    // 5.return 出对象
    return typeof result === 'object' ? result : obj
  }

function Person(name, age) {
    this.name = name;
    this.age = age;
    this.say = function() {
        console.log(`My name is ${this.name}, and I'm ${this.age} years old`)
    }
};

class Person2 {
    constructor(name, age) {
        this.name = name;
        this.age = age
    }
    say() {
        console.log(`My name is ${this.name}, and I'm ${this.age} years old`)
    }
}


let Bily = new Person2('Bily', 20)
Bily.say();

let Lily = myNew(Person, 'Lily', 18);
Lily.say()