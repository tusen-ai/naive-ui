# Collapse

I saw it appears in many side control panels.

## Demos

```demo
basic
arrow-placement
accordion
nested
display-directive
item-header-click
customize-icon
```

## Props

### Collapse Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| accordion | `boolean` | `false` | Whether to only allow on panel open. |
| arrow-placement | `'left' \| 'right'` | `'left'` | Arrow placement. |
| default-expanded-names | `string \| number \| Array<string \| number> \| null` | `null` | Panel expanded in uncontrolled mode. If `accrodion` is set, it should be a non-array value. |
| display-directive | `'if' \| 'show'` | `'if'` | The display directive to use when its inner `n-collapse-item` render content. `'if'` corresponds to `v-if` and `'show'` corresponds to `v-show`. |
| expanded-names | `string \| number \| Array<string \| number> \| null` | `undefined` | Expanded panel in controlled mode. If `accrodion` is set, it should be a non-array value.  |
| on-update:expanded-names | `(expandedNames: Array<string \| number> \| string \| number \| null) => void` | `undefined` | Callback function triggered when expanded-names changes. |
| on-item-header-click | `(data: { name: string \| number, expanded: boolean, event: MouseEvent }) => void` | `undefined` | Callback function triggered when the title is clicked. |

### Collapse Item Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| display-directive | `'if' \| 'show'` | `undefined` | The display directive to use when it is rendering its content. `'if'` corresponds to `v-if` and `'show'` corresponds to `v-show`. When it is set to `undefined` the value will follow its outer `n-collapse`. |
| name | `string \| number` | random string | Name. |
| title | `string` | `undefined` | Title. |

## Slots

### Collapse Slots

| Name | Parameters | Description |
| --- | --- | --- |
| default | `()` | The contents of the collapsible panel. |
| arrow | `(options: { collapsed: boolean })` | Custom icons for folding panels. |

### Collapse Item Slots

| Name | Parameters | Description |
| --- | --- | --- |
| default | `()` | The contents of the collapsible panel node. |
| header | `()` | The content of the header of the collapsed panel node. |
| arrow | `(options: { collapsed: boolean })` | The custom icon of the node header of the collapsible panel. |
