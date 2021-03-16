# Menu

<!--single-column-->

No Food.

## Demos

```demo
horizontal
select
default-expanded-names
indent
collapse
```

## Props

### Menu Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| collapsed-icon-size | `number` | `undefined` | The icon size when menu is collapsed. If not set, menu will use `icon-size` in place of it. |
| collapsed-width | `number` | `undefined` | The menu width after collapsed. |
| collapsed | `boolean` | `false` | The collapsed status of menu, only works when menu is vertical. |
| default-expand-all | `boolean` | `false` |  |
| default-expanded-keys | `Array<string>` | `[]` | The default expanded submenu keys of menu in uncontrolled manner. |
| default-value | `string \| null` | `null` |  |
| expanded-keys | `Array<string>` | `undefined` | The expanded submenu keys. If set, menu will work in controlled manner and `default-expanded-names` won't work. |
| icon-size | `number` | `20` | The icon size when menu is not collapsed. |
| indent | `number` | `32` | The indend of menu |
| items | `Array<MenuItem \| Submenu \| MenuItemGroup>` | `[]` | Items data of menu. |
| mode | `'vertical' \| 'horizontal'` | `'vertical'` |  |
| root-indent | `number` | `undefined` | The indent of menu's first level children. If not set, menu will use `indent` in place of it. |
| value | `string \| null` | `undefined` | The selected name of menu. |
| on-update:expanded-keys | `(keys: string[]) => void` | `undefined` | `keys` is the array of expanded menu items' `key`. |
| on-update:value | `(key: string, item: MenuItem) => void` | `undefined` | Callback when select a menu item. `key` is the `key` of the selected menu item. `item` is then original data of the menu item. |

### MenuItem Properties

| Name | Type | Description |
| --- | --- | --- |
| disabled? | `boolean` |  |
| extra? | `string \| (() => VNodeChild)` |  |
| icon? | `() => VNodeChild` |  |
| key | `string` | The indentifier of the menu item. |
| label | `string \| (() => VNodeChild)` |  |

### Submenu Properties

| Name | Type | Description |
| --- | --- | --- |
| children | `Array<MenuItem \| Submenu \| MenuItemGroup>` |  |
| disabled? | `boolean` |  |
| extra? | `string \| (() => VNodeChild)` |  |
| icon? | `() => VNodeChild` |  |
| key | `string` | The indentifier of the submenu. |
| label | `string \| (() => VNodeChild)` |  |

### MenuItemGroup Properties

| Name | Type | Description |
| --- | --- | --- |
| children | `Array<MenuItem \| Submenu \| MenuItemGroup>` | **required** |
| key | `string` | The indentifier of the menu group. |
| label | `string \| (() => VNodeChild)` |  |
| type | `'group'` | **required** |
