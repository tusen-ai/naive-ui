# Menu

<!--single-column-->

No Food.

## Demos

```demo
horizontal
select
render-label
default-expanded-names
indent
collapse
inverted
long-label
```

## Props

### Menu Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| collapsed-icon-size | `number` | `24` | The icon size when menu is collapsed. If not set, menu will use `icon-size` in place of it. |
| collapsed-width | `number` | `48` | The menu width after collapsed. |
| collapsed | `boolean` | `false` | The collapsed status of menu, only works when menu is vertical. |
| default-expand-all | `boolean` | `false` |  |
| default-expanded-keys | `Array<string>` | `[]` | The default expanded submenu keys of menu in uncontrolled manner. |
| default-value | `string \| null` | `null` |  |
| expanded-keys | `Array<string>` | `undefined` | The expanded submenu keys. If set, menu will work in controlled manner and `default-expanded-names` won't work. |
| icon-size | `number` | `20` | The icon size when menu is not collapsed. |
| indent | `number` | `32` | The indent of menu. |
| inverted | `boolean` | `false` | Use inverted style. |
| options | `Array<MenuOption \| Submenu \| MenuOptionGroup>` | `[]` | Items data of menu. |
| mode | `'vertical' \| 'horizontal'` | `'vertical'` | Menu layout. |
| render-label | `(option: MenuOption \| MenuGroupOption) => VNodeChild` | `undefined` | Render function that renders all labels. |
| root-indent | `number` | `undefined` | The indent of menu's first level children. If not set, menu will use `indent` in place of it. |
| value | `string \| null` | `undefined` | The selected name of menu. |
| on-update:expanded-keys | `(keys: string[]) => void` | `undefined` | `keys` is the array of expanded menu options' `key`. |
| on-update:value | `(key: string, item: MenuOption) => void` | `undefined` | Callback when select a menu item. `key` is the `key` of the selected menu item. `item` is then original data of the menu item. |

### MenuOption Properties

| Name | Type | Description |
| --- | --- | --- |
| disabled? | `boolean` | Whether to disable the menu item. |
| extra? | `string \| (() => VNodeChild)` | The extra parts of the menu item. |
| icon? | `() => VNodeChild` | The icon for the menu item. |
| key | `string` | The indentifier of the menu item. |
| label | `string \| (() => VNodeChild)` | The label of the menu item. |

### Submenu Properties

| Name | Type | Description |
| --- | --- | --- |
| children | `Array<MenuOption \| Submenu \| MenuOptionGroup>` | Submenu child items. |
| disabled? | `boolean` | Whether to disable the submenu. |
| extra? | `string \| (() => VNodeChild)` | The extra parts of the menu item. |
| icon? | `() => VNodeChild` | The icon for the submenu item. |
| key | `string` | The indentifier of the submenu. |
| label | `string \| (() => VNodeChild)` | The label of the menu item. |

### MenuOptionGroup Properties

| Name | Type | Description |
| --- | --- | --- |
| children | `Array<MenuOption \| Submenu \| MenuOptionGroup>` | Group items. **required!** |
| key | `string` | The indentifier of the menu group. |
| label | `string \| (() => VNodeChild)` | The label of the menu item. |
| type | `'group'` | **required!** The type of the menu item. |
