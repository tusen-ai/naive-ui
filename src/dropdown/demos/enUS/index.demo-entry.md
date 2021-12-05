# Dropdown

When you have some functions to trigger.

## Demos

```demo
basic
icon
trigger
cascade
arrow
placement
size
manual-position
batch-render
render
option-props
```

## API

### Dropdown Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| animated | `boolean` | `true` | Use an animation when showing options. |
| inverted | `boolean` | `false` | Use the inverted style. |
| children-field | `string` | `'children'` | Field name of children. |
| keyboard | `boolean` | `true` | Whether the component supports keyboard operation. (Be careful about the potential conflicts with other components keyboard operations) |
| key-field | `string` | `'key'` | Field name of key. |
| label-field | `string` | `'label'` | Field name of label. |
| options | `Array<DropdownOption \| DropdownGroupOption \| DropdownDividerOption \| DropdownRenderOption>` | `[]` | Dropdown options. |
| render-icon | `(option: DropdownOption) => VNodeChild` | `undefined` | Render function that renders option icons. |
| render-label | `(option: DropdownOption) => VNodeChild` | `undefined` | Render function that renders option labels. |
| size | `'small'\|'medium'\|'large'\|'huge'` | `'medium'` | Dropdown size. |
| on-clickoutside | `(e: MouseEvent) => void` | `undefined` | Callback function triggered when there is a click outside of the component. |
| on-select | `(key: string \| number, option: DropdownOption) => void` | `undefined` | Callback function for after an option is selected. |

For other props, for example `placement`, please see [Popover Props](popover#Popover-Props). Note that `raw` is not available.

#### DropdownOption Type

| Property | Type | Description |
| --- | --- | --- |
| children? | `Array<DropdownOption \| DropdownDividerOption>` | Child options. |
| icon? | `() => VNodeChild` | Custom render function of an option icon. |
| key | `string \| number` | Option ID (should be unique). |
| label | `string` | Displayed label value. |
| disabled | `boolean` | Whether to disable the option. |
| props | `HTMLAttributes` | Customize option props. |

#### DropdownDividerOption Type

| Property | Type               | Description                            |
| -------- | ------------------ | -------------------------------------- |
| type     | `'divider'`        | The type of the DropdownDividerOption. |
| key      | `string \| number` | Divider ID (should be unique).         |

#### DropdownGroupOption Type

| Property | Type | Description |
| --- | --- | --- |
| type | `'group'` | The type of the DropdownGroupOption. |
| label | `string` | Group label value. |
| icon? | `() => VNodeChild` | Custom rendering function of the group icon. |
| key | `string \| number` | Group ID (should be unique). |
| children | `Array<DropdownOption \| DropdownDividerOption>` | Children options of DropdownGroupOption. |

#### DropdownRenderOption Type

| Property | Type               | Description                            |
| -------- | ------------------ | -------------------------------------- |
| type     | `'render'`         | The type of the DropdownRenderOption.  |
| key      | `string \| number` | Render option ID (should be unique).   |
| render   | `() => VNodeChild` | Render function of the option content. |
