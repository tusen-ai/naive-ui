# 布局 Layout
布局是用来布局的。
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
```
## Props
### Layout, Layout Content Props
|名称|类型|默认值|介绍|
|-|-|-|-|
|use-native-scrollbar|`boolean`|`true`|是否在自身使用原生滚动条。如果设定为 `false`, Layout 将会对内容使用 naive-ui 风格的滚动条|
|mode|`'default' \| 'absolute'`|`default`|`default` 模式将会把 CSS `position` 设为 `static`. `absolute`  模式将会把 CSS `position` 设为 `absolute`，还将 `left`、`right`、`top`、`bottom` 设为 `0`。`absolute` 模式在你想将内容在一个固定容器或者将这个页面的布局设为固定位置的时候很有用。你可能需要修改一些 style 来确保它按照你预想的方式展示|

### Layout Footer
|名称|类型|默认值|介绍|
|-|-|-|-|
|bordered|`boolean`|`false`||
|mode|`'default' \| 'absolute'`|`default`|`default` 模式将会把 CSS `position` 设为 `static`. `absolute`  模式将会把 CSS `position` 设为 `absolute`，还将 `left`、`right`、`bottom` 设为 `0`。`absolute` 模式在你想将内容在一个固定容器或者将这个页面的布局设为固定位置的时候很有用。你可能需要修改一些 style 来确保它按照你预想的方式展示|

### Layout Header Props
|名称|类型|默认值|介绍|
|-|-|-|-|
|bordered|`boolean`|`false`||
|mode|`'default' \| 'absolute'`|`default`|`default` 模式将会把 CSS `position` 设为 `static`. `absolute`  模式将会把 CSS `position` 设为 `absolute`，还将 `left`、`right`、`top` 设为 `0`。`absolute` 模式在你想将内容在一个固定容器或者将这个页面的布局设为固定位置的时候很有用。你可能需要修改一些 style 来确保它按照你预想的方式展示|

### Layout Sider Props
|名称|类型|默认值|介绍|
|-|-|-|-|
|bordered|`boolean`|`false`||
|mode|`'default' \| 'absolute'`|`default`|`default` 模式将会把 CSS `position` 设为 `static`. `absolute`  模式将会把 CSS `position` 设为 `absolute`，还将 `left`、`top`、`bottom` 设为 `0`。`absolute` 模式在你想将内容在一个固定容器或者将这个页面的布局设为固定位置的时候很有用。你可能需要修改一些 style 来确保它按照你预想的方式展示。**当 Sider 的 mode 是 `absolute` 的时候，需要确保它旁边的 Layout 或者 Layout Content 的 mode 被设为 `absoulte`**|
|collapsed-width|`number`|`48`||
|width|`number`|`272`||
|collapse-mode|`'transform' \| 'width'`|`'transform'`|如果设定为 `'width'`，Sider 的内容宽度将会被实际改变；如果设定为 `'transform'`，边栏将只会移动它的位置而不会改变宽度。`'transform'` 的 collapse-mode 只适用于 `'absolute'` mode 的 Sider|
|collapsed|`boolean`|`false`||
|use-native-scrollbar|`boolean`|`true`|是否在自身使用原生滚动条。如果设定为 `false`, Sider 将会对内容使用 naive-ui 风格的滚动条|
|show-content|`boolean`|`true`|如果设为 `false`，Sider 的内容将会变透明。|
|show-trigger|`boolean`|`false`|内置的触发按钮是否展示|

## Events
### Layout Sider Events
|名称|参数|介绍|
|-|-|-|
|expand|`()`||
|collapse|`()`||