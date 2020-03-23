# 布局 Layout
布局是用来布局的。

这个组件用起来有点麻烦，但是就像手动挡的车，还是值得一试的。
<!--single-column-->
## 演示
```demo
basic
border
absolute
scrollbar
collapse
trigger-button
show-sider-content
scroll-to
```
## Props
### Layout, Layout Content Props
|名称|类型|默认值|说明|
|-|-|-|-|
|theme|`'light' \| 'dark'`|`null`||
|use-native-scrollbar|`boolean`|`true`|是否在自身使用原生滚动条。如果设定为 `false`, Layout 将会对内容使用 naive-ui 风格的滚动条|
|position|`'static' \| 'absolute'`|`'static'`|`static` 模式将会把 CSS `position` 设为 `static`， `absolute`  模式将会把 CSS `position` 设为 `absolute`，还将 `left`、`right`、`top`、`bottom` 设为 `0`。`absolute` 模式在你想将内容在一个固定容器或者将这个页面的布局设为固定位置的时候很有用。你可能需要修改一些 style 来确保它按照你预想的方式展示|

### Layout Footer Props
|名称|类型|默认值|说明|
|-|-|-|-|
|theme|`'light' \| 'dark'`|`null`||
|bordered|`boolean`|`false`||
|position|`'static' \| 'absolute'`|`'static'`|`static` 模式将会把 CSS `position` 设为 `static`， `absolute`  模式将会把 CSS `position` 设为 `absolute`，还将 `left`、`right`、`bottom` 设为 `0`。`absolute` 模式在你想将内容在一个固定容器或者将这个页面的布局设为固定位置的时候很有用。你可能需要修改一些 style 来确保它按照你预想的方式展示|

### Layout Header Props
|名称|类型|默认值|说明|
|-|-|-|-|
|theme|`'light' \| 'dark'`|`null`||
|bordered|`boolean`|`false`||
|position|`'static' \| 'absolute'`|`'static'`|`static` 模式将会把 CSS `position` 设为 `static`， `absolute`  模式将会把 CSS `position` 设为 `absolute`，还将 `left`、`right`、`top` 设为 `0`。`absolute` 模式在你想将内容在一个固定容器或者将这个页面的布局设为固定位置的时候很有用。你可能需要修改一些 style 来确保它按照你预想的方式展示|

### Layout Sider Props
|名称|类型|默认值|说明|
|-|-|-|-|
|theme|`'light' \| 'dark'`|`null`||
|bordered|`boolean`|`false`||
|position|`'static' \| 'absolute'`|`'static'`|`static` 模式将会把 CSS `position` 设为 `static`， `absolute`  模式将会把 CSS `position` 设为 `absolute`，还将 `left`、`top`、`bottom` 设为 `0`。`absolute` 模式在你想将内容在一个固定容器或者将这个页面的布局设为固定位置的时候很有用。你可能需要修改一些 style 来确保它按照你预想的方式展示。当 Sider 的 position 是 `absolute` 的时候，需要确保它旁边的 Layout 或者 Layout Content 的 position 被设为 `absolute`|
|collapsed-width|`number`|`48`||
|width|`number`|`272`||
|collapse-mode|`'transform' \| 'width'`|`'transform'`|如果设定为 `'width'`，Sider 的内容宽度将会被实际改变；如果设定为 `'transform'`，边栏将只会移动它的位置而不会改变宽度。`'transform'` 的 collapse-mode 只适用于 `'absolute'` position 的 Sider|
|collapsed|`boolean`|`false`||
|use-native-scrollbar|`boolean`|`true`|是否在自身使用原生滚动条。如果设定为 `false`, Sider 将会对内容使用 naive-ui 风格的滚动条|
|show-content|`boolean`|`true`|如果设为 `false`，Sider 的内容将会变透明|
|show-trigger|`boolean \| 'bar' \| 'arrow-circle'`|`false`|内置的触发按钮是否展示|

## Slots
### Layout, Layout Content, Layout Sider, Layout Header, Layout Footer Slots
|名称|参数|说明|
|-|-|-|
|default|`()`||

## Events
### Layout Sider Events
|名称|参数|说明|
|-|-|-|
|expand|`()`||
|collapse|`()`||

## Methods
### Layout, Layout Content, Layout Sider Methods
|名称|类型|说明|
|-|-|-|
|scrollTo|`((xCoord: number, yCoord: number) => void) \| ({ left?: number, top?: number, behavior: 'smooth' \| 'auto' }) => void`|滚动到某处|
