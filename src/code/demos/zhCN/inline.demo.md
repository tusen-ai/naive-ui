# 行内显示

Javascript 的例子。

```html
<n-space :size="16">
  <n-text>js:</n-text>
  <n-code :code="code" language="javascript" inline />
  <n-text>yyds</n-text>
</n-space>
```

```js
export default {
  data () {
    return {
      code: 'console.log("Hello Naive UI")'
    }
  }
}
```
