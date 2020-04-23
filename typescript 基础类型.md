### 布尔值
```ts
let isDone: boolean = false;
```

### 数字
```ts
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744l;
```

### 字符串
```ts
let name: string = 'Bob';
name = "smith";
```
还可以使用模板字符串，它可以定义多行文本和内嵌表达式。
```ts
let name: string = 'Gene';
let age: number = 25;
let sentence: string = `Hello, my name is ${name}.
    I'm ${age} years old`;
```

### 数组
TypeScript 像 JavaScript 一样可以操作数组。有两种方式可以定义数组。第一种，可以在元素类型后面接上[]，表示由此类型元素组成的一个数组：
```ts
let list: number[] = [1, 2, 3];
```
第二种方法是使用泛型， ```Array<元素类型>```
```ts
let list: Array<number> = [1, 2, 3];
```

### 元祖Tuple
元祖类型允许表示一个一直元素数量和类型的数组，各元素的类型不必相同。比如，你可以定义一对值分别为```string```和```number```类型的元祖
```ts
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // ok
// Initialize it incorrectly
x = [10, 'hello']; // Error
```
当访问一个已知索引的元素没，会得到正确的类型：
```ts
console.log(x[0].substr(1)); // ok
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'
```
当访问一个越界的元素，会使用联合类型替代：
```ts
x[3] = 'world'; // ok, 字符串可以赋值给（string|number) 类型
console.log(x[5].toString()); // ok，'string' 和 'number' 都有 toString
x[6] = true; // Error, 布尔不是 (string|number) 类型
```

### 枚举
```enum```类型是对JavaScript标准数据类型的一个补充。像C#等其他语言一样，使用枚举类型可以为一组数值赋予友好的名字。
```ts
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```
默认情况下，从```0```开始为元素编号。你也可以手动指定成员的数值。例如，我们将上面的例子改成从```1```开始编号：
```ts
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;
```
或者全部采用手动赋值：
```ts
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;
```
枚举类型提供的一个便利是你可以由枚举的值得到它的名字。例如，我们知道数值为2，但是不确定它映射到Color的拿个名字，我们可以查找相应的名字：
```ts
enum Color {Red = 1, Green, Blue}
let colorName: string =  Color[2];

console.log(colorName); // 显示'Green'因为上面代码里它的值是2
```

### Any
有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。这些值可能来自于动态的内容，比如来自用户输入或者第三方代码库。这种情况下，我们不希望类型检查器对这些值进行检查而是直接让他们通过编译阶段的检查。那么我们可以使用``` any ```类型来标记这些变量：
```ts
let notSure: any = 4;
notSure = 'maybe a string instead';
notSure = false; //okay, definitely a boolean
```
在对现有代码进行改写的时候，any类型是十分有用的，它允许你在编译时可选择地包含或移除类型检查。你可能认为```Object```有相似的作用，就像它在其他语言中那样。但是```Object```类型的变量只是允许你给它赋任意值，但是却不能够在它上面调用任意的方法，即便它真的有这些方法：
```ts
let notSure: any = 4;
noSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)
let prettySure: Object = 4;
prettySure.toFixed(); // Error：Property 'toFixed' doesn't exist on type 'Object'.
```
当你只知道一部分数据的类型时， ```any```类型也是有用的。比如，你有一个数组，它包含了不同的类型的数据：
```ts
let list: any[] = [1, 'free', true];
list[1] = 100;
```

### Void
某种程度上来说，```void```类型像是与```any```类型相反，它表示没有任何类型。当一个函数没有返回值时，其返回值类型是```void```：
```ts
function warnUser() :void {
    console..log('This is my warning message');
}
```
声明一个```void```类型的变量没有什么大用，因为你只能为它赋予```undefined```和```null```：
```ts
let unusable: void = undefined;
```
 ### Null 和 Undefined
TypeScript 里，```undefined```和```null```两者各自有自己的类型分别叫做```undefined```和```null```。和```void```相似，他们本身的类型用处不是很大：
```ts
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;
```
默认情况下```undefined```和```null```是所有类型的子类型。也就是说你可以把```undefined```和```null```赋值给```number```类型的变量。
然而，当你指定了```--strictNullChecks```标记，```undefined```和```null```只能赋值给```void```和他们各自。这能避免很多常见问题。也许在某处你想传入一个```string```或```undefined```或```null```，你可以使用联合类型```string | null | undefined```。

### Never
```never```类型表示的是那些永不存在的值的类型，例如，```never```类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型；变量也可能是```never```类型，当它们被永不为真的类型保护所约束时
```never```类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是```never```的子类型或可以赋值给```never```类型(除了```never```本身之外)。即使```any```也不可以赋值给```never```。
下面是一些返回```never```类型的函数：
```ts
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error('Something failed');
}

function infiniteLoop(): never {
    while(true) {

    }
}
```

### Object
```object```表示非原始类型，也就是除```number```，```string```，```boolean```，```symbol```，```null```，```undefined```之外的类型。
使用```object```类型，就可以更好的表示像```Object.create```这样的API。例如：
```ts
declare function create(o: object | null): void;

create({prop: 0}); //OK
create(null); // OK
create(42); // Error
create('string'); // Error
create(false); // Error
create(undefined); // Error
```

### 类型断言
有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。通常这会发生在你清楚地知道一个实体具有比它更有类型更确切的类型。

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。类型断言好比其他语言里的类型转换，但是不进行特殊的数据检查和解构。他没有运行时的影响，只是在编译阶段起作用。TypeScript会假设你已经进行了必须的检查。

类型断言有两种形式。其一是"尖括号"语法：
```ts
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```
另一个为```as```的语法：
```ts
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```
两种形式是等价的。至于使用哪个大多数情况下凭个人爱好；然而，当你在TypeScript里使用JSX时，只有```as```语法断言是被允许的。

### 关于```let```
尽可能使用```let```来代替```var```。