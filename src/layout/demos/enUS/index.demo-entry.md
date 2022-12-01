# Layout

<!--single-column-->

Layout is for layout.

The component is a bit complicated to use. But like a manual gear car, it worths a shot.

If you are use version before v2.3.0, you may want to know about <n-a href="#Changes-After-v2.3.0">Changes After v2.3.0</n-a>.

## Demos

```demo
basic.vue
set-padding.vue
border.vue
embedded.vue
absolute.vue
scrollbar.vue
collapse.vue
collapse-right.vue
inverted.vue
show-sider-content.vue
scroll-to.vue
```

## API

### Layout, Layout Content Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| content-style | `string \| Object` | `undefined` | Style of scrollable content node. |
| embedded | `boolean` | `false` | Use darker background to show a embedded effect. Only work for light theme. |
| has-sider | `boolean` | `false` | Whether the component has sider inside. If so it must be `true`. |
| native-scrollbar | `boolean` | `true` | Whether to use native scrollbar on itself. If set to `false`, layout will use a naive-ui style scrollbar for content. |
| position | `'static' \| 'absolute'` | `'static'` | `static` position will make it css position set to `static`. `absolute` position will make it css position set to `absolute` and `left`, `right`, `top`, `bottom` to `0`. `absolute` position is very useful when you want to make content scroll in a fixed container or make the whole page's layout in a fixed position. You may need to change the style of the component to make it display as you expect. |
| scrollbar-props | `object` | `undefined` | See [Scrollbar props](scrollbar#Scrollbar-Props) |
| sider-placement | `'left' \| 'right'` | `left` | The sidebar is displayed on the left or the right side. |
| on-scroll | `(e: Event) => void` | `undefined` | Callback function when the content scroll. |

### Layout Footer Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `false` | Whether to show the border. |
| inverted | `boolean` | `false` | Whether to use inverted background. |
| position | `'static' \| 'absolute'` | `'static'` | `static` position will make it css position set to `static`. `absolute` position will make it css position set to `absolute` and `left`, `right`, `top` to `0`. `absolute` position is very useful when you want to make content scroll in a fixed container or make the whole page's layout in a fixed position. You may need to change the style of the component to make it display as you expect. |

### Layout Header Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `false` | Whether to show the border. |
| inverted | `boolean` | `false` | Whether to use inverted background. |
| position | `'static' \| 'absolute'` | `'static'` | `static` position will make it css position set to `static`. `absolute` position will make it css position set to `absolute` and `left`, `right`, `bottom` to `0`. `absolute` position is very useful when you want to make content scroll in a fixed container or make the whole page's layout in a fixed position. You may need to change the style of the component to ma ke as you expect. |

### Layout Sider Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `false` | Whether to show the border. |
| collapse-mode | `'transform' \| 'width'` | `'transform'` | If set to `'width'`, the sider's content width will be actually collapsed. If set to `'transform'`, the sider will only move it's position and won't change its content width. |
| collapsed | `boolean` | `undefined` | Whether the sider is collapsed. It only works for when `position` is `'static'`. |
| collapsed-trigger-style | `string \| Object` | `undefined` | Trigger style when collapsed. |
| collapsed-width | `number` | `48` | Folded width. |
| content-style | `string \| Object` | `undefined` | Style of scrollable content node. |
| default-collapsed | `boolean` | `false` | Default collapsed state in uncontrolled mode. |
| inverted | `boolean` | `false` | Whether to use inverted background. |
| native-scrollbar | `boolean` | `true` | Whether to use native scrollbar on itself. If set to `false`, sider will use a naive-ui style scrollbar for content. |
| position | `'static' \| 'absolute'` | `'static'` | `static` position will make it css position set to `static`. `absolute` position will make it css position set to `absolute` and `left`, `top`, `bottom` to `0`. `absolute` position is very useful when you want to make content scroll in a fixed container or make the whole page's layout in a fixed position. You may need to change the style of the component to make it as you expect. |
| scrollbar-props | `object` | `undefined` | See [Scrollbar props](scrollbar#Scrollbar-Props) |
| show-collapsed-content | `boolean` | `true` | Whether to show content in sider after it is collapsed. |
| show-trigger | `boolean \| 'bar' \| 'arrow-circle'` | `false` | Whether to show the built-in trigger button on sider. |
| trigger-style | `string \| Object` | `undefined` | Trigger style. |
| width | `number \| string` | `272` | Width CSS value. When it is number, px will be added. |
| on-after-enter | `() => void` | `undefined` | Callback after it's expanded. |
| on-after-leave | `() => void` | `undefined` | Callback after it's collapsed. |
| on-scroll | `(e: Event) => void` | `undefined` | Callback function when the content scroll. |
| on-update:collapsed | `(collapsed: boolean) => void` | `undefined` | Callback function when the folding state changes. |

### Layout, Layout Content, Layout Sider, Layout Header, Layout Footer Slots

| Name    | Parameters | Description     |
| ------- | ---------- | --------------- |
| default | `()`       | Layout content. |

### Layout, Layout Content, Layout Sider Methods

| Name | Type | Description |
| --- | --- | --- |
| scrollTo | `((xCoord: number, yCoord: number) => void) \| (options: { left?: number, top?: number, behavior: 'smooth' \| 'auto' }) => void` | Scroll to somewhere. |

## Changes After v2.3.0

Due to concerns about performance and SSR, after v2.3.0 you need to specify `has-sider` on the `n-layout` which contains `n-layout-sider`. Collapsing won't work for `n-layout-sider` with `position="absolute"`.

```html
Before v2.3.0:
<n-layout>
  <n-layout-sider />
  <n-layout />
</n-layout>

After v2.3.0:
<n-layout has-sider>
  <n-layout-sider />
  <n-layout />
</n-layout>
```
