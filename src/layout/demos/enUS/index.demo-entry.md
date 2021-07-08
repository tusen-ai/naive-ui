# Layout

<!--single-column-->

Layout is for layout.

The component is a bit complicated to use. But like a manual gear car, it worths a shot.

If you are use version before v2.3.0, you may want to know about <n-a href="#Changes-After-v2.3.0">Changes After v2.3.0</n-a>.

## Demos

```demo
basic
set-padding
border
embedded
absolute
scrollbar
collapse
inverted
show-aside-content
scroll-to
```

## Props

### Layout, Layout Content Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| content-style | `string \| Object` | `undefined` | Style of scrollable content node. |
| embedded | `boolean` | `false` | Use darker background to show a embedded effect. Only work for light theme. |
| has-aside | `boolean` | `false` | Whether the component has aside inside. If so it must be `true`. |
| native-scrollbar | `boolean` | `true` | Whether to use native scrollbar on itself. If set to `false`, layout will use a naive-ui style scrollbar for content |
| position | `'static' \| 'absolute'` | `'static'` | `static` position will make it css position set to `static`. `absolute` position will make it css position set to `absolute` and `left`, `right`, `top`, `bottom` to `0`. `absolute` position is very useful when you want to make content scroll in a fixed container or make the whole page's layout in a fixed position. You may need to change the style of the component to make it display as you expect. |

### Layout Footer Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `false` |  |
| inverted | `boolean` | `false` | Whether to use inverted background. |
| position | `'static' \| 'absolute'` | `'static'` | `static` position will make it css position set to `static`. `absolute` position will make it css position set to `absolute` and `left`, `right`, `top` to `0`. `absolute` position is very useful when you want to make content scroll in a fixed container or make the whole page's layout in a fixed position. You may need to change the style of the component to make it display as you expect. |

### Layout Header Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `false` |  |
| inverted | `boolean` | `false` | Whether to use inverted background. |
| position | `'static' \| 'absolute'` | `'static'` | `static` position will make it css position set to `static`. `absolute` position will make it css position set to `absolute` and `left`, `right`, `bottom` to `0`. `absolute` position is very useful when you want to make content scroll in a fixed container or make the whole page's layout in a fixed position. You may need to change the style of the component to ma ke as you expect. |

### Layout Aside Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `false` |  |
| collapse-mode | `'transform' \| 'width'` | `'transform'` | If set to `'width'`, the aside's content width will be actually collapsed. If set to `'transform'`, the aside will only move it's position and won't change its content width. |
| collapsed | `boolean` | `undefined` | Whether the aside is collapsed. It only works for when `position` is `'static'`. |
| collapsed-width | `number` | `48` |  |
| content-style | `string \| Object` | `undefined` | Style of scrollable content node. |
| default-collapsed | `boolean` | `false` |  |
| inverted | `boolean` | `false` | Whether to use inverted background. |
| native-scrollbar | `boolean` | `true` | Whether to use native scrollbar on itself. If set to `false`, aside will use a naive-ui style scrollbar for content |
| position | `'static' \| 'absolute'` | `'static'` | `static` position will make it css position set to `static`. `absolute` position will make it css position set to `absolute` and `left`, `top`, `bottom` to `0`. `absolute` position is very useful when you want to make content scroll in a fixed container or make the whole page's layout in a fixed position. You may need to change the style of the component to make it as you expect. |
| show-collapsed-content | `boolean` | `true` | Whether to show content in aside after it is collapsed. |
| show-trigger | `boolean \| 'bar' \| 'arrow-circle'` | `false` | Whether to show the built-in trigger button on aside. |
| trigger-style | `string \| Object` | `undefined` |  |
| width | `number` | `272` |  |
| on-update:collapsed | `(collapsed: boolean) => void` | `undefined` |  |

## Slots

### Layout, Layout Content, Layout Aside, Layout Header, Layout Footer Slots

| Name    | Parameters | Description |
| ------- | ---------- | ----------- |
| default | `()`       |             |

## Methods

### Layout, Layout Content, Layout Aside Methods

| Name | Type | Description |
| --- | --- | --- |
| scrollTo | `((xCoord: number, yCoord: number) => void) \| (options: { left?: number, top?: number, behavior: 'smooth' \| 'auto' }) => void` | Scroll to somewhere. |

## Changes After v2.3.0

Due to concerns about performance and SSR, after v2.3.0 you need to specify `has-aside` on the `n-layout` which contains `n-layout-aside`. Collapsing won't work for `n-layout-aside` with `position="absolute"`.

```html
Before v2.3.0:
<n-layout>
  <n-layout-aside />
  <n-layout />
</n-layout>

After v2.3.0:
<n-layout has-aside>
  <n-layout-aside />
  <n-layout />
</n-layout>
```
