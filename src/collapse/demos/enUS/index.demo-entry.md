# Collapse

I saw it appears in many side control panels.

## Demos

```demo
basic.vue
arrow-placement.vue
accordion.vue
nested.vue
display-directive.vue
item-header-click.vue
customize-icon.vue
default-expanded.vue
header-extra.vue
disabled.vue
```

## API

### Collapse Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| accordion | `boolean` | `false` | Only allow one panel open at a time. |
| arrow-placement | `'left' \| 'right'` | `'left'` | Arrow placement side of text. |
| default-expanded-names | `string \| number \| Array<string \| number> \| null` | `null` | Pre-expanded panels that can still be collapsed. If `accordion` mode is set, it should be a non-array value. |
| display-directive | `'if' \| 'show'` | `'if'` | The display directive to use when `n-collapse-item` renders content. `'if'` corresponds to `v-if` and `'show'` corresponds to `v-show`. |
| expanded-names | `string \| number \| Array<string \| number> \| null` | `undefined` | Expanded panels that cannot be collapsed. If `accordion` mode is set, it should be a non-array value. |
| on-update:expanded-names | `(expandedNames: Array<string \| number> \| string \| number \| null) => void` | `undefined` | Callback function triggered when the expanded-names array is changed. |
| on-item-header-click | `(data: { name: string \| number, expanded: boolean, event: MouseEvent }) => void` | `undefined` | Callback function triggered when the title is clicked. |

### CollapseItem Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| disabled | `boolean` | `false` | Whether the item is disabled. | 2.32.2 |
| display-directive | `'if' \| 'show'` | `undefined` | The display directive to use when it is rendering its content. `'if'` corresponds to `v-if` and `'show'` corresponds to `v-show`. When it is set to `undefined` the value will follow its outer `n-collapse`. |  |
| name | `string \| number` | random string | Item identifier (should be unique). |  |
| title | `string` | `undefined` | Title. |  |

### Collapse Slots

| Name | Parameters | Description |
| --- | --- | --- |
| default | `()` | The contents of the collapsible panel. |
| arrow | `(props: { collapsed: boolean })` | Custom icons for folding panels. |

### CollapseItem Slots

| Name | Parameters | Description |
| --- | --- | --- |
| default | `()` | The contents of the collapsible panel node. |
| header | `(props: { collapsed: boolean })` | The content of the header of the collapsed panel node. |
| header-extra | `(props: { collapsed: boolean })` | The extra content of the header of the collapsed panel node. |
| arrow | `(props: { collapsed: boolean })` | The custom icon of the node header of the collapsible panel. |
