# 日志 Log
<!--single-column-->
如果你有一些日志要展示，可以使用 Log。

<n-alert title="注意" type="warning" style="margin-bottom: 16px;">
  由于尺寸原因，Naive UI 并不把 hightlight.js 内置。如果你需要高亮日志，请确保你在使用之前已经设定了 highlight.js。
</n-alert>

在本页如何高亮的演示中，我们定义了一个叫做 `naive-log` 的语言来高亮全部的数字。下面的代码是我们怎么定义的。如果你想了解 highlight.js，可以参考 <n-a href="https://highlightjs.org/">hightlight.js</n-a> 和 <n-a href="https://highlightjs.readthedocs.io/en/latest/index.html">highlight.js developer documentation</n-a>
```js
...
hljs.registerLanguage('naive-log', () => ({
  contains: [
    {
      className: 'number',
      begin: /\d+/
    }
  ]
}))

Vue.use(NaiveUI)
NaiveUI.setHljs(hljs)
...
```


## 演示
```demo
size
event
scroll
highlight
loading
```

## Props
|名称|类型|默认值|说明|
|-|-|-|-|
|theme|`'light' \| 'dark' \| null`|`null`||
|loading|`boolean`|`false`||
|trim|`boolean`|`false`||
|log|`string`|`null`||
|lines|`Array<string>`|`null`||
|font-size|`number`|`14`||
|line-height|`number`|`1.25`||
|language|`string`|`null`||
|rows|`number`|`15`||
|hljs|`Object`|`null`||

## Events
|名称|参数|说明|
|-|-|-|
|require-more|`(from: 'top' \| 'bottom')`||
|reach-top|`()`|
|reach-bottom|`()`|

## Methods
|名称|参数|说明|
|-|-|-|
|scrollToTop|`(dismissEvent: boolean = false)`||
|scrollToBottom|`(dismissEvent: boolean = false)`||
