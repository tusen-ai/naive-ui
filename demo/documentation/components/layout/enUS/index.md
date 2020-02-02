# Layout
<!--single-column-->
Layout is for layout.
## Demos
```demo
basic
border
absolute
scrollbar
collapse
trigger-button
show-sider-content
debug
```
## Props
### Layout, Layout Content Props
|Name|Type|Default|Description|
|-|-|-|-|
|use-native-scrollbar|`boolean`|`true`|If set to `false`, layout will use a naive-ui style scrollbar for content|
|mode|`'default' \| 'absolute'`|`default`|`default` mode will make it css position set to `static`. `absolute` mode will make it css position set to `absolute` and `left`, `right`, `top`, `bottom` to `0`. `absolute` mode is very useful when you want to make content scroll in a fixed container or make the whole page's layout in a fixed position. You may need to change the style of the component to make it work as you expect.|

### Layout Footer
|Name|Type|Default|Description|
|-|-|-|-|
|bordered|`boolean`|`false`||
|mode|`'default' \| 'absolute'`|`default`|`default` mode will make it css position set to `static`. `absolute` mode will make it css position set to `absolute` and `left`, `right`, `bottom` to `0`. `absolute` mode is very useful when you want to make content scroll in a fixed container or make the whole page's layout in a fixed position. You may need to change the style of the component to make it work as you expect.|

### Layout Header Props
|Name|Type|Default|Description|
|-|-|-|-|
|bordered|`boolean`|`false`||
|mode|`'default' \| 'absolute'`|`default`|`default` mode will make it css position set to `static`. `absolute` mode will make it css position set to `absolute` and `left`, `right`, `bottom` to `0`. `absolute` mode is very useful when you want to make content scroll in a fixed container or make the whole page's layout in a fixed position. You may need to change the style of the component to make it work as you expect.|

### Layout Sider Props
|Name|Type|Default|Description|
|-|-|-|-|
|bordered|`boolean`|`false`||
|mode|`'default' \| 'absolute'`|`default`|`default` mode will make it css position set to `static`. `absolute` mode will make it css position set to `absolute` and `left`, `top`, `bottom` to `0`. `absolute` mode is very useful when you want to make content scroll in a fixed container or make the whole page's layout in a fixed position. You may need to change the style of the component to make it work as you expect.**Make sure its adjacent n-layout or n-layout-content mode set to `'absolute'` when its mode is `'absolute'`.**|
|collapsed-width|`number`|`48`||
|width|`number`|`272`||
|collapse-mode|`'transform' \| 'width'`|`'transform'`|If set to `'width'`, the sider's content width will be actually collapsed. If set to `'transform'`, the sider will only move it's position and won't change its content width. `'transform'` collapse mode is designed to work with `'absolute'` mode.|
|collapsed|`boolean`|`false`||
|use-native-scrollbar|`boolean`|`true`|If set to `false`, layout will use a naive-ui style scrollbar for content.|
|show-content|`boolean`|`true`|If set to `false`, sider content will be invisible.|
|show-trigger|`boolean`|`false`|Whether to show the built-in trigger button on sider.|

## Events
### Layout Sider Events
|Name|Parameters|Description|
|-|-|-|
|expand|`()`||
|collapse|`()`||