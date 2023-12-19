# Menu

<!--single-column-->

No Food.

## Demos

```demo
horizontal.vue
select.vue
render-label.vue
default-expanded-keys.vue
indent.vue
collapse.vue
inverted.vue
long-label.vue
accordion.vue
router-link.vue
customize-field.vue
expand-selected-option.vue
show.vue
```

## API

### Menu Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| accordion | `boolean` | `false` | Whether to use accordion mode. |  |
| children-field | `string` | `'children'` | Field name of children. |  |
| collapsed-icon-size | `number` | `24` | The icon size when menu is collapsed. If not set, menu will use `icon-size` in place of it. |  |
| collapsed-width | `number` | `48` | The menu width after collapsed. |  |
| collapsed | `boolean` | `false` | The collapsed status of menu, only works when menu is vertical. |  |
| default-expand-all | `boolean` | `false` | Whether to expand all menus. When options is set asynchronously, you can set `watch-props` to `['defaultExpandedKeys']` to make it work. |  |
| default-expanded-keys | `Array<string>` | `[]` | The default expanded submenu keys of menu in uncontrolled manner. |  |
| default-value | `string \| null` | `null` | Whether selected by default in uncontrolled mode. |  |
| disabled-field | `string` | `'disabled'` | Field name of disabled. | 2.33.0 |
| dropdown-placement | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end' \| ` | `'top'` | Only effective in horizontal mode. |  |
| dropdown-props | `DropdownProps` | `undefined` | The dropdown's props when menu is collapsed or horizontal mode，please see [Dropdown Props](dropdown#Dropdown-Props) |  |
| expanded-keys | `Array<string>` | `undefined` | The expanded submenu keys. If set, menu will work in controlled manner and `default-expanded-names` won't work. |  |
| expand-icon | `(option: MenuOption) => VNodeChild` | `undefined` | Render function that renders all expand icon. |  |
| icon-size | `number` | `20` | The icon size when menu is not collapsed. |  |
| indent | `number` | `32` | The indent of menu. |  |
| inverted | `boolean` | `false` | Use inverted style. |  |
| key-field | `string` | `'key'` | Field name of key. |  |
| label-field | `string` | `'label'` | Field name of label. |  |
| options | `Array<MenuOption \| MenuDividerOption \| MenuGroupOption>` | `[]` | Items data of menu. |  |
| node-props | `(option: MenuOption \| MenuGroupOption) => object` | `undefined` | Node's DOM attrs generator. | 2.28.3 |
| mode | `'vertical' \| 'horizontal'` | `'vertical'` | Menu layout. |  |
| render-extra | `(option: MenuOption \| MenuGroupOption) => VNodeChild` | `undefined` | Render function that renders all extras. |  |
| render-icon | `(option: MenuOption) => VNodeChild` | `undefined` | Render function that renders all icons. |  |
| render-label | `(option: MenuOption \| MenuGroupOption) => VNodeChild` | `undefined` | Render function that renders all labels. |  |
| responsive | `boolean` | `false` | Whether to collapsed menu items that overflows menu. Only work for menu with `mode='horizontal'`. | 2.36.0 |
| root-indent | `number` | `undefined` | The indent of menu's first level children. If not set, menu will use `indent` in place of it. |  |
| value | `string \| null` | `undefined` | The selected item key of the menu. |  |
| watch-props | `Array<'defaultValue' \| 'defaultExpandedKeys'>` | `undefined` | Default prop names that needed to be watched. Components will be updated after the prop is changed. Note: the `watch-props` itself is not reactive. |  |
| on-update:expanded-keys | `(keys: string[]) => void` | `undefined` | `keys` is the array of expanded menu options' `key`. |  |
| on-update:value | `(key: string, item: MenuOption) => void` | `undefined` | Callback when select a menu item. `key` is the `key` of the selected menu item. `item` is then original data of the menu item. |  |

### MenuOption Properties

| Name | Type | Description | Version |
| --- | --- | --- | --- |
| children? | `Array<MenuOption \| MenuGroupOption>` | Child menu options. |  |
| disabled? | `boolean` | Whether to disable the menu item. |  |
| extra? | `string \| (() => VNodeChild)` | The extra parts of the menu item. |  |
| icon? | `() => VNodeChild` | The icon for the menu item. |  |
| key | `string` | The indentifier of the menu item. |  |
| label | `string \| (() => VNodeChild)` | The label of the menu item. |  |
| show? | `boolean` | Whether to show the menu item. | 2.32.2 |

### MenuGroupOption Properties

| Name | Type | Description | Version |
| --- | --- | --- | --- |
| children | `Array<MenuOption \| MenuGroupOption>` | Group items, **required!** |  |
| key | `string` | The indentifier of the menu group. |  |
| label | `string \| (() => VNodeChild)` | The label of the menu item. |  |
| show? | `boolean` | Whether to show the menu item. | 2.32.2 |
| type | `'group'` | The type of the menu item, **required!** |  |

### MenuDividerOption Properties

| Name | Type | Description | Version |
| --- | --- | --- | --- |
| key | `string` | The indentifier of the menu group. |  |
| props | `HTMLAttributes` | Attributes of the divider. |  |
| show? | `boolean` | Whether to show the menu item. | 2.32.2 |
| type | `'divider'` | The type of the menu item, **required!** |  |

### Menu Methods

| Name | Type | Description | Version |
| --- | --- | --- | --- |
| deriveResponsiveState | `() => void` | Recalculate the collapsed state of the responsive menu content. When the width of the menu container is not solely determined by the external width, in the `responsive` mode, the menu content cannot automatically expand after being collapsed. You can call this method to ensure that the menu can be expanded again. | 2.36.0 |
| showOption | `(key: string \| number) => void` | Expand menu to show option with specified `key`. If `key` is not specified, selected option will be displayed. | 2.27.0 |
