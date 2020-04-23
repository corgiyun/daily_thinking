### 前言
最近项目开始使用ts来写，之前只是用ts写过一些边边角角简单的东西，这次打算开始好好琢磨学习。先做一些笔记，文章摘抄https://juejin.im/post/5cffb431f265da1b7401f466

### 1、keyof
```keyof``` 与 ```Object.keys``` 略有相似，只不过 ```keyof``` 取 ```interface``` 的键
```ts
interface point {
    x: number;
    y: number;
}

type keys = keyof Point
```
假设有一个```object```如下所示，我们需要使用```typescript```实现一个```get```函数来获取它的属性值
```ts
const data = {
    a: 3,
    hello: 'world'
}

function get(o: object, name: string) {
    return o[name]
}
```
我们刚开始可能会这么写，不过它有很多缺点
- 1. 无法确认返回类型：这将损失ts最大的类型校验功能
- 2. 无法对key做约束：可能会犯拼写错误

这时可以使用```keyof```来加强```get```函数的类型功能，有兴趣的同学可看看```_.get``的type标记以及实现
```ts
function get<T extends object, K extends keyof T>(o: T, name: K): T[K] {
    return o[name]
}
```