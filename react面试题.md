# React 面试题

## 1. React 对页面 render 异常捕获，错误边界处理。
   错误边界是一种 React 组件，这种组件可以捕获并打印在其子组件树任何位置的 JavaScript 错误，并且，它会渲染出备用 UI，而不是渲染哪些崩溃了的子组件数。错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误。

   > 注意:
   > 错误边界无法捕获以下场景中产生的错误
   > - 事件处理
   > - 异步代码 (例如 setTimeout 或 requestAnimationFrame 回调函数)
   > - 服务端渲染
   > - 它自身抛出来的错误 (并非它的子组件)

   如果一个class组件中定义了 <u>static getDerivedStateFromError()</u>或<u>componentDidCatch()</u>这两个生命周期中的任意一个(或两个)时，那么它就变成一个错误边界。当抛出错误后，请使用 static getDerivedStateFromError() 渲染备用 UI，使用 componentDidCatch() 打印错误消息。

```js
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // 将错误日志上报给服务器
        logErrorToMyService(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // 自定义降级
            return <h1>Something went wrong.</h1>
        }

        return this.props.children;
    }
}
```

然后你可以将它作为一个常规组件去使用
```js
<ErrorBoundary>
    <MyWidget />
<ErrorBoundary />    
```

错误边界的工作方式类似于 JavaScript 的 catch{}， 不同的地方在于错误边界只针对 React 组件。只有 class 组件才可以成为错误边界组件。大多数情况下，你只需要声明一次错误边界组件，并在整个应用中使用他。

注意<b>错误边界仅可以捕获其子组件的错误，</b>它无法捕获其自身的错误。如果一个错误边界无法渲染错误信息，则错误信息会冒泡至最近的上层错误边界，这也类似于 JavaScript 中 catch{} 的工作机制。