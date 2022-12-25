# 布局 Layout

布局是用来布局的。

这个组件用起来有点麻烦，但是就像手动挡的车，还是值得一试的。

如果你正在使用 v2.3.0 以前的版本，你可能需要了解一下 <n-a href="#v2.3.0-的变化">v2.3.0 的变化</n-a>。

<!--single-column-->

## 演示

```demo
basic.vue
set-padding.vue
embedded.vue
border.vue
absolute.vue
scrollbar.vue
collapse.vue
collapse-right.vue
inverted.vue
show-sider-content.vue
scroll-to.vue
keep-alive-debug.vue
```

## API

### Layout, Layout Content Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| content-style | `string \| Object` | `undefined` | 可滚动内容节点的样式 |
| embedded | `boolean` | `false` | 使用更深的背景色展现嵌入效果，只对亮色主题生效 |
| has-sider | `boolean` | `false` | 组件内部是否有边栏，如果有的话必须设为 `true` |
| native-scrollbar | `boolean` | `true` | 是否在自身使用原生滚动条。如果设定为 `false`，`Layout` 将会对内容使用 `naive-ui` 风格的滚动条 |
| position | `'static' \| 'absolute'` | `'static'` | `static` 模式将会把 CSS `position` 设为 `static`，`absolute` 模式将会把 CSS `position` 设为 `absolute`，还将 `left`、`right`、`top`、`bottom` 设为 `0`。`absolute` 模式在你想将内容在一个固定容器或者将这个页面的布局设为固定位置的时候很有用。你可能需要修改一些 style 来确保它按照你预想的方式展示 |
| scrollbar-props | `object` | `undefined` | 属性参考 [Scrollbar props](scrollbar#Scrollbar-Props) |
| sider-placement | `'left' \| 'right'` | `left` | 组件折叠侧边栏在哪一侧 |
| on-scroll | `(e: Event) => void` | `undefined` | 内容的滚动事件回调函数 |

### Layout Footer Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| bordered | `boolean` | `false` | 是否显示边框 |
| inverted | `boolean` | `false` | 使用反转背景色 |
| position | `'static' \| 'absolute'` | `'static'` | `static` 模式将会把 CSS `position` 设为 `static`，`absolute` 模式将会把 CSS `position` 设为 `absolute`，还将 `left`、`right`、`bottom` 设为 `0`。`absolute` 模式在你想将内容在一个固定容器或者将这个页面的布局设为固定位置的时候很有用。你可能需要修改一些 style 来确保它按照你预想的方式展示 |

### Layout Header Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| bordered | `boolean` | `false` | 是否显示边框 |
| inverted | `boolean` | `false` | 使用反转背景色 |
| position | `'static' \| 'absolute'` | `'static'` | `static` 模式将会把 CSS `position` 设为 `static`， `absolute` 模式将会把 CSS `position` 设为 `absolute`，还将 `left`、`right`、`top` 设为 `0`。`absolute` 模式在你想将内容在一个固定容器或者将这个页面的布局设为固定位置的时候很有用。你可能需要修改一些 style 来确保它按照你预想的方式展示 |

### Layout Sider Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| bordered | `boolean` | `false` | 是否显示边框 |
| collapse-mode | `'transform' \| 'width'` | `'transform'` | 如果设定为 `'width'`，Sider 的内容宽度将会被实际改变；如果设定为 `'transform'`，边栏将只会移动它的位置而不会改变宽度 |
| collapsed | `boolean` | `undefined` | 边栏是否折叠。只在 `position` 为 `'static'` 时生效 |
| collapsed-trigger-style | `string \| Object` | `undefined` | 折叠时触发器样式 |
| collapsed-width | `number` | `48` | 折叠宽度 |
| content-style | `string \| Object` | `undefined` | 可滚动内容节点的样式 |
| default-collapsed | `boolean` | `false` | 非受控模式下的默认折叠状态 |
| inverted | `boolean` | `false` | 使用反转背景色 |
| native-scrollbar | `boolean` | `true` | 是否在自身使用原生滚动条。如果设定为 `false`，`Sider` 将会对内容使用 naive-ui 风格的滚动条 |
| position | `'static' \| 'absolute'` | `'static'` | `static` 模式将会把 CSS `position` 设为 `static`， `absolute` 模式将会把 CSS `position` 设为 `absolute`，还将 `left`、`top`、`bottom` 设为 `0`。`absolute` 模式在你想将内容在一个固定容器或者将这个页面的布局设为固定位置的时候很有用。你可能需要修改一些 style 来确保它按照你预想的方式展示 |
| scrollbar-props | `object` | `undefined` | 属性参考 [Scrollbar props](scrollbar#Scrollbar-Props) |
| show-collapsed-content | `boolean` | `true` | 是否在 `sider` 折叠后展示内部内容 |
| show-trigger | `boolean \| 'bar' \| 'arrow-circle'` | `false` | 内置的触发按钮是否展示 |
| trigger-style | `string \| Object` | `undefined` | 触发器样式 |
| width | `number \| string` | `272` | 宽度的 CSS 值，为数字时会添加 px |
| on-after-enter | `() => void` | `undefined` | 完成展开后的回调 |
| on-after-leave | `() => void` | `undefined` | 完成折叠后的回调 |
| on-scroll | `(e: Event) => void` | `undefined` | 内容的滚动事件回调函数 |
| on-update:collapsed | `(collapsed: boolean) => void` | `undefined` | 折叠状态发生改变时的回调函数 |

### Layout, Layout Content, Layout Sider, Layout Header, Layout Footer Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | `()` | 布局的内容 |

### Layout, Layout Content, Layout Sider Methods

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| scrollTo | `((xCoord: number, yCoord: number) => void) \| (options: { left?: number, top?: number, behavior: 'smooth' \| 'auto' }) => void` | 滚动到某处 |

## v2.3.0 的变化

出于性能和未来 SSR 相关的考虑，在 v2.3.0 后，对于包含 `n-layout-sider` 的 `n-layout` 组件，需要显示的设定 `has-sider`. 同时折叠对于 `position="absolute"` 的 `n-layout-sider` 不再生效。

```html
v2.3.0 前:
<n-layout>
  <n-layout-sider />
  <n-layout />
</n-layout>

v2.3.0 后:
<n-layout has-sider>
  <n-layout-sider />
  <n-layout />
</n-layout>
```
