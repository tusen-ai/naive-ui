# 回到顶部 Back Top
<!--single-column-->
它可以帮你回到你曾经到过的地方。不过时间是回不去了。
## 演示
向下滚动页面查看效果。

```demo
basic
visibility-height
change-position
target-container-selector
```

## Props
|名称|类型|默认值|说明|
|-|-|-|-|
|bottom|`number`|`40`||
|listen-to|`string \| HTMLElement`|`undefined`|监听滚动的元素，如果为 `undefined` 会监听距离最近的一个可滚动的祖先节点|
|right|`number`|`40`||
|show|`boolean`|`undefined`|是否显示 BackTop（受控）|
|themed-style|`{ [themeName: string]: Object }`|`undefined`||
|theme|`'light' \| 'dark'  \| string`|`undefined`||
|to|`string \| HTMLElement`|`'body'`|BackTop 渲染的容器节点|
|visibility-height|`number`|`180`||
|on-update:show|`(value: boolean) => any`|`undefined`||