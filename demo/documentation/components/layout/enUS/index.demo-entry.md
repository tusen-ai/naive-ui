# Layout
<!--single-column-->
Layout is for layout.

The component is a bit complicated to use. But like a manual gear car, it worths a shot. 
## Demos
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
|Name|Type|Default|Description|
|-|-|-|-|
|position|`'static' \| 'absolute'`|`'static'`|`static` position will make it css position set to `static`. `absolute` position will make it css position set to `absolute` and `left`, `right`, `top`, `bottom` to `0`. `absolute` position is very useful when you want to make content scroll in a fixed container or make the whole page's layout in a fixed position. You may need to change the style of the component to make it display as you expect.|
|themed-style|`{ [themeName: string]: Object }`|`null`||
|theme|`'light' \| 'dark' \| null \| string`|`null`||
|use-native-scrollbar|`boolean`|`true`|Whether to use native scrollbar on itself. If set to `false`, layout will use a naive-ui style scrollbar for content|

### Layout Footer Props
|Name|Type|Default|Description|
|-|-|-|-|
|bordered|`boolean`|`false`||
|position|`'static' \| 'absolute'`|`'static'`|`static` position will make it css position set to `static`. `absolute` position will make it css position set to `absolute` and `left`, `right`, `top` to `0`. `absolute` position is very useful when you want to make content scroll in a fixed container or make the whole page's layout in a fixed position. You may need to change the style of the component to make it display as you expect.|
|theme|`'light' \| 'dark' \| null \| string`|`null`||


### Layout Header Props
|Name|Type|Default|Description|
|-|-|-|-|
|bordered|`boolean`|`false`||
|position|`'static' \| 'absolute'`|`'static'`|`static` position will make it css position set to `static`. `absolute` position will make it css position set to `absolute` and `left`, `right`, `bottom` to `0`. `absolute` position is very useful when you want to make content scroll in a fixed container or make the whole page's layout in a fixed position. You may need to change the style of the component to ma ke as you expect.|
|theme|`'light' \| 'dark' \| null \| string`|`null`||

### Layout Sider Props
|Name|Type|Default|Description|
|-|-|-|-|
|bordered|`boolean`|`false`||
|collapse-mode|`'transform' \| 'width'`|`'transform'`|If set to `'width'`, the sider's content width will be actually collapsed. If set to `'transform'`, the sider will only move it's position and won't change its content width. `'transform'` collapse mode only work with sider in `'absolute'` position.|
|collapsed|`boolean`|`false`||
|collapsed-width|`number`|`48`||
|position|`'static' \| 'absolute'`|`'static'`|`static` position will make it css position set to `static`. `absolute` position will make it css position set to `absolute` and `left`, `top`, `bottom` to `0`. `absolute` position is very useful when you want to make content scroll in a fixed container or make the whole page's layout in a fixed position. You may need to change the style of the component to make it as you expect. Make sure its adjacent n-layout or n-layout-content position set to `'absolute'` when its position is `'absolute'`.|
|show-content|`boolean`|`true`|If set to `false`, sider content will be invisible.|
|show-trigger|`boolean \| 'bar' \| 'arrow-circle'`|`false`|Whether to show the built-in trigger button on sider.|
|theme|`'light' \| 'dark' \| null \| string`|`null`||
|use-native-scrollbar|`boolean`|`true`|Whether to use native scrollbar on itself. If set to `false`, sider will use a naive-ui style scrollbar for content|
|width|`number`|`272`||
|on-update:collapsed|`(collapsed: boolean) => any`|`undefined`||

## Slots
### Layout, Layout Content, Layout Sider, Layout Header, Layout Footer Slots
|Name|Parameters|Description|
|-|-|-|
|default|`()`||

## Methods
### Layout, Layout Content, Layout Sider Methods
|Name|Type|Description|
|-|-|-|
|scrollTo|`((xCoord: number, yCoord: number) => void) \| (options: { left?: number, top?: number, behavior: 'smooth' \| 'auto' }) => void`|Scroll to somewhere.|