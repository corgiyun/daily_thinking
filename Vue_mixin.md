## Vue 中的 mixin

#### 前言
之前一直有听过或者看到过别人Vue代码中使用mixin，所以今天想起来就花点时间简单了解一下使用方法和场景。下次再在实际项目开发中尝试使用。

#### 理论
混入(mixin)用来分发Vue组件中的复用功能，所有对象选项将混入进组件本身。

#### 基本使用
混入对象会和组件数据合并，混入对象的钩子将在组件自身钩子之前调用。但是当有命名冲突时，会以组件数据优先（组件数据覆盖混入对象数据）
```js
// 定义 mixin
var myMixin = {
    data() {
        return {
            msg: 'from mixin',
            a: 1
        };
    },
    mounted() {
        console.log('This is mixin')
    }
};
// 使用
new Vue({
    mixins: [myMixin],
    data() {
        return {
            msg: 'from component',
            b: 2
        }
    },
    mounted() {
        console.log('This is component');
        console.log(this.$data) 
    }
})


// => ’This is mixin‘  混入的对象会先调用
// => ’This is component‘  组件在后
// => {msg: "from component", a: 1, b: 2}  组件数据优先
```

钩子函数也是如此，命名冲突时以组件优先，组件方法覆盖混入对象方法
```js
var myMixin = {
    methods: {
        print() {
            console.log('print mixin')
        }
    }
};

new Vue({
    mixins: [myMixin],
    methods: {
        print() {
            console.log('print component')
        }
    },
    mounted() {
        this.print()
    }
})

// => ’print component'
```

#### 在全局中混入

也可以在全局进行混入操作，不过官方不建议这样做，会影响到每一个Vue实例，具体情况还是看需求吧。
```js
// 记录每个实例创建和销毁
Vue.mixin ({
    created() {
        console.log(`${this.$route.name} is created`)
    },
    destroyed() {
        console.log(`${this.$route.name} is destroyed`)
    }
});

new Vue({
    // 每个Vue实例都会在控制台输出...
})
```

#### 使用场景
监听键盘事件、窗口事件、滚动处理等，还有做埋点处理，或者说可复用组件方法，都可以使用混入

#### 最后
其实官方文档写的很清晰明了，一看就明白的那种 https://cn.vuejs.org/v2/guide/mixins.html#%E5%9F%BA%E7%A1%80
除了知道基本使用方法和场景，有时间可以看看源码，了解背后的实现。