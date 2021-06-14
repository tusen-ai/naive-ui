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
| accordion | `boolean` | `false` | Whether to set the accordion style |
| arrow-placement | `'left' \| 'right'` | `'left'` | Arrow position |
| default-expanded-names | `string \| number \| Array<string \| number> \| null` | `null` | If set to `accrodion`, it will be a non-array value. |
| display-directive | `'if' \| 'show'` | `'if'` | The display directive to use when its inner `n-collapse-item` render content. `'if'` corresponds to `v-if` and `'show'` corresponds to `v-show`. |
| expanded-names | `string \| number \| Array<string \| number> \| null` | `undefined` | If set to `accrodion`, it will be a non-array value. |
| on-update:expanded-names | `(expandedNames: Array<string \| number> \| string \| number \| null) => void` | `undefined` | Callback function triggered when expanded-names changes |
| on-item-header-click | `(data: { name: string \| number, expanded: boolean, event: MouseEvent }) => void` | `undefined` | Callback function triggered when the title is clicked |

### Collapse Item Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| display-directive | `'if' \| 'show'` | `undefined` | The display directive to use when it is rendering its content. `'if'` corresponds to `v-if` and `'show'` corresponds to `v-show`. When it is set to `undefined` the value will follow its outer `n-collapse`. |
| name | `string \| number` | random string | name value, useful when selected |
| title | `string` | `undefined` | title |

## Slots

### Collapse Slots

| Name | Parameters | Description |
| --- | --- | --- |
| default | `()` | Collapse default filled content |
| arrow | `(options: { collapsed: boolean })` | Collapse custom icon |

### Collapse Item Slots

| Name | Parameters | Description |
| --- | --- | --- |
| default | `()` | Collapse Item default filled content |
| header | `()` | The content filled in the header part of the Collapse Item |
| arrow | `(options: { collapsed: boolean })` | Collapse Item custom icon |
