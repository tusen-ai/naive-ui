# 弹出选择 Popselect

如果你想选择一些数据，还不想看到那个框子，可以使用 Popselect。

## 演示

```demo
basic
size
scrollable
multiple
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| multiple | `boolean` | `false` |  |
| options | `Array<SelectOption \| SelectGroupOption>` | `[]` |  |
| scrollable | `boolean` | `false` |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` |  |
| value | `string \| number \| Array<string \| number> \| null` | `null` |  |
| on-update:value | `(string \| number \| Array<string \| number> \| null) => any` | `undefined` |  |

对于 SelectOption & SelectGroupOption，参考 [Select](n-select#SelectOption-Type)

对于其他 props，参考 [Popover](n-popover#Props)
