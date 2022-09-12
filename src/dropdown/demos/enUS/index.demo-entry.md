# Dropdown

When you have some functions to trigger.

## Demos

```demo
basic.vue
icon.vue
trigger.vue
cascade.vue
arrow.vue
placement.vue
size.vue
batch-render.vue
manual-position.vue
render.vue
option-props.vue
render-option.vue
```

## API

### Dropdown Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| animated | `boolean` | `true` | Use an animation when showing options. |  |
| inverted | `boolean` | `false` | Use the inverted style. |  |
| children-field | `string` | `'children'` | Field name of children. |  |
| keyboard | `boolean` | `true` | Whether the component supports keyboard operation. (Be careful about the potential conflicts with other components keyboard operations) |  |
| key-field | `string` | `'key'` | Field name of key. |  |
| label-field | `string` | `'label'` | Field name of label. |  |
| node-props | `(option: DropdownOption \| DropdownGroupOption) => HTMLAttributes` | `undefined` | Option HTML attributes generator. | 2.29.1 |
| menu-props | `(option: DropdownOption \| undefined, options: (DropdownOption \| DropdownGroupOption)[]) => HTMLAttributes` | `undefined` | Menu HTML attributes generator. | 2.31.0 |
| options | `Array<DropdownOption \| DropdownGroupOption \| DropdownDividerOption \| DropdownRenderOption>` | `[]` | Dropdown options. |  |
| render-icon | `(option: DropdownOption) => VNodeChild` | `undefined` | Render function that renders option icons. |  |
| render-label | `(option: DropdownOption) => VNodeChild` | `undefined` | Render function that renders option labels. |  |
| render-option | `(props: { node: VNode, option: DropdownOption \| DropdownGroupOption }) => VNodeChild` | `undefined` | Render function that renders option itself. | 2.29.1 |
| size | `'small'\|'medium'\|'large'\|'huge'` | `'medium'` | Dropdown size. |  |
| on-clickoutside | `(e: MouseEvent) => void` | `undefined` | Callback function triggered when there is a click outside of the component. |  |
| on-select | `(key: string \| number, option: DropdownOption) => void` | `undefined` | Callback function for after an option is selected. |  |

For other props, for example `placement`, please see [Popover Props](popover#Popover-Props). Note that `raw` is not available.

#### DropdownOption Type

| Property | Type | Description | Version |
| --- | --- | --- | --- |
| children? | `Array<DropdownOption \| DropdownDividerOption \| DropdownGroupOption>` | Child options. |  |
| disabled? | `boolean` | Whether to disable the option. |  |
| icon? | `() => VNodeChild` | Custom render function of an option icon. |  |
| key? | `string \| number` | Option ID (should be unique). |  |
| label? | `string \| () => VNodeChild` | Displayed label value. |  |
| props? | `HTMLAttributes` | Customize option props. |  |
| show? | `boolean` | Whether to show the option. | 2.33.3 |

#### DropdownDividerOption Type

| Property | Type | Description | Version |
| --- | --- | --- | --- |
| key? | `string \| number` | Divider ID (should be unique). |  |
| show? | `boolean` | Whether to show the option. | 2.33.3 |
| type | `'divider'` | The type of the DropdownDividerOption. |  |

#### DropdownGroupOption Type

| Property | Type | Description | Version |
| --- | --- | --- | --- |
| children? | `Array<DropdownOption \| DropdownDividerOption>` | Children options of DropdownGroupOption. |  |
| icon? | `() => VNodeChild` | Custom rendering function of the group icon. |  |
| label? | `string` | Group label value. |  |
| key? | `string \| number` | Group ID (should be unique). |  |
| show? | `boolean` | Whether to show the option. | 2.33.3 |
| type | `'group'` | The type of the DropdownGroupOption. |  |

#### DropdownRenderOption Type

| Property | Type | Description | Version |
| --- | --- | --- | --- |
| key? | `string \| number` | Render option ID (should be unique). |  |
| render? | `() => VNodeChild` | Render function of the option content. |  |
| show? | `boolean` | Whether to show the option. | 2.33.3 |
| type | `'render'` | The type of the DropdownRenderOption. |  |
