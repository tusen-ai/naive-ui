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
```

## Props

### Collapse Props

| Name | Type | Default | Description |
| --- | --- | --- | --- | --- | --- | --- |
| accordion | `boolean` | `false` |  |
| arrow-placement | `'left' \| 'right'` | `'left'` |  |
| default-expanded-names | `string \| number | Array<string \| number> | null` | `null` | If set to `accrodion`, it will be a non-array value. |
| display-directive | `'if' \| 'show'` | `'if'` | The display directive to use when its inner `n-collapse-item` render content. `'if'` corresponds to `v-if` and `'show'` corresponds to `v-show`. |
| expanded-names | `string \| number | Array<string \| number> | null` | `undefined` | If set to `accrodion`, it will be a non-array value. |
| on-update:expanded-names | `(expandedNames: Array<string \| number> | string | number | null) => any` | `undefined` |  |
| on-item-header-click | `(data: { name: string | number, expanded: boolean, event: MouseEvent }) => any` | `undefined` |  |

### Collapse Item Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| display-directive | `'if' \| 'show'` | `undefined` | The display directive to use when it is rendering its content. `'if'` corresponds to `v-if` and `'show'` corresponds to `v-show`. When it is set to `undefined` the value will follow its outer `n-collapse`. |
| name | `string \| number` | required |  |
| title | `string` | `undefined` |  |

## Slots

### Collapse Slots

| Name    | Parameters | Description |
| ------- | ---------- | ----------- |
| default | `()`       |             |

### Collapse Item Slots

| Name    | Parameters                          | Description |
| ------- | ----------------------------------- | ----------- |
| default | `()`                                |             |
| header  | `()`                                |             |
| arrow   | `(options: { collapsed: boolean })` |             |
