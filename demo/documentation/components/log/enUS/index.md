# Log
<!--single-column-->
If you have some logs to show, use log.

<n-alert title="Note" type="warning" style="margin-bottom: 16px;">
  Due to package size, Naive UI doesn't include highlight.js. If you want highlight logs, make sure you have set highlightjs before using it.
</n-alert>

In hightlight demo, we defined a language called `naive-log` which will highlight all the numbers of line. The following code shows how we defined it. If you want to know more about hightlight.js, see <n-a href="https://highlightjs.org/">hightlight.js</n-a> and <n-a href="https://highlightjs.readthedocs.io/en/latest/index.html">highlight.js developer documentation</n-a>
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


## Demos
```demo
size
event
scroll
highlight
loading
```

## Props
|Name|Type|Default|Description|
|-|-|-|-|
|theme|`'light' \| 'dark'`|`null`||
|loading|`boolean`|`false`||
|trim|`boolean`|`false`||
|log|`string`|`null`||
|lines|`Array<string>`|`null`||
|font-size|`number`|`14`||
|line-height|`number`|`1.25`||
|language|`string`|`null`||
|rows|`number`|`15`||
|hljs|`object`|`null`||

## Events
|Name|Parameters|Description|
|-|-|-|
|require-more|`(from: 'top' \| 'bottom')`||
|reach-top|`()`|
|reach-bottom|`()`|

## Methods
|Name|Parameters|Description|
|-|-|-|
|scrollToTop|`(dismissEvent: boolean = false)`||
|scrollToBottom|`(dismissEvent: boolean = false)`||