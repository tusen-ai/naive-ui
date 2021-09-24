# CHANGELOG

## Pending

### Localization

- Add ukUA locale.

### Fixes

- Fix `n-global-style` applies style transition on first mount.
- Fix `n-drawer` border transition [#1211].
- Fix `n-alert` aria support.
- Fix `n-checkbox` aria support.

## 2.19.1 (2021-09-21)

### Fixes

- Fix `DialogReactive` props are readonly.
- Fix `n-tree-select` sets `check-strategy='child'` not working in single select mode.
- Fix `n-upload`'s trigger is compressed in `image-card` mode when it's the only item in the row.
- Fix `n-upload-dragger` has no border transition.
- Fix `n-upload` can't upload files.
- Fix `n-tree`'s `checkable` prop doesn't work when `cascade` is `false`.
- Fix `n-tree-select`'s `checkable` prop doesn't work when `cascade` or `multiple` is `false`.

## 2.19.0 (2021-09-19)

### Breaking Changes

- `n-layout-sider`'s `arrow-circle` trigger is changed into new style.

### Feats

- `n-layout-sider` add `collapsed-trigger-style` prop.
- `n-menu` add `accordion` prop , closes [#917](https://github.com/TuSimple/naive-ui/issues/917).
- `n-input-number` add `readonly` prop , closes [#1198](https://github.com/TuSimple/naive-ui/issues/1198).
- `n-spin` add `description` prop and slot.
- `n-anchor` add `type` prop.
- `n-upload` add `abstract` prop, add `n-upload-trigger` 和 `n-upload-file-list` component, closes [#1102](https://github.com/TuSimple/naive-ui/issues/1102).
- `n-tree` add `indeterminate-keys` prop.
- `n-tree-select` add `indeterminate-keys` prop.
- `n-tree` add `on-update:indeterminate-keys` prop.
- `n-tree-select` add `on-update:indeterminate-keys` prop.
- `n-tabs` `type` prop add `'segment'` option, closes [#1133](https://github.com/TuSimple/naive-ui/issues/1133).
- `n-popover` add `z-index` prop, closes [#764](https://github.com/TuSimple/naive-ui/issues/764).
- `n-modal` add `on-after-enter` prop.
- `n-modal` add `on-after-leave` prop.

### Fixes

- Fix `n-select` focus input when closing tag with `filterable` , closes [#1170](https://github.com/TuSimple/naive-ui/issues/1170).
- Fix `n-button` border on hover conflicts with `n-badge`, closes [#1195](https://github.com/TuSimple/naive-ui/issues/1195).
- Fix `n-upload` prop `v-model:file-list` dosen't work well when prop `multiple` is `true`, closes [#418](https://github.com/TuSimple/naive-ui/issues/418).
- Fix `useThemeVars` doesn't apply theme overrides, closes [#1194](https://github.com/TuSimple/naive-ui/issues/1194), [#1176](https://github.com/TuSimple/naive-ui/issues/1176).
- Fix `n-tabs`'s left shadow isn't displayed in card type.

## 2.18.2 (2021-09-14)

### Feats

- `n-cascader` show `Empty` component when `options` prop is empty, closes [#1092](https://github.com/TuSimple/naive-ui/issues/1092).
- `n-cascader`'s `on-update:value` prop add option info.
- `n-tree` add `check-strategy` prop.
- `n-date-picker` add `input-readonly` prop, closes [#1120](https://github.com/TuSimple/naive-ui/issues/1120).
- `n-time-picker` add `input-readonly` prop, closes [#1120](https://github.com/TuSimple/naive-ui/issues/1120).
- `n-config-provider` add global config of the `Empty` component, closes [#1092](https://github.com/TuSimple/naive-ui/issues/1092).
- `n-select` add `on-update:show` prop.
- `n-auto-complete` exports `AutoCompleteOption` and `AutoCompleteGroupOption` types.
- `n-page-header` add `RTL` support.
- `n-select` support variadic height option rendering.
- `n-tree-select`'s `on-update:value` prop add option info.
- `n-select`'s `on-update:value` prop add option info.
- `n-popselect`'s `on-update:value` prop add option info.
- `n-card` add `embedded` prop.

### Fixes

- Fix `n-p` warns when `depth` is number.
- Fix `n-date-picker`‘s type of `actions` prop.
- Fix `n-select` can't override `n-empty`'s theme variables.
- Fix `n-dynamic-tags` add button is not disabled when it is disabled.
- Fix `n-select` closes menu when enter key is pressed in filterable mode without options data.
- Fix `n-auto-complete`'s `children` prop can't use `AutoCompleteOption` type.
- Fix `n-gi`'s `collapsed` does not work in `n-form-item-gi`, closes [#1160](https://github.com/TuSimple/naive-ui/issues/1160).

## 2.18.1 (2021-09-08)

### Feats

- `useDialog` option add `style` prop, closes [#1054](https://github.com/TuSimple/naive-ui/issues/1054).
- `n-timeline` add `icon` slot, closes [#1096](https://github.com/TuSimple/naive-ui/issues/1096).
- `n-timeline` add `icon-size` prop.

### Fixes

- Fix `n-step` doesn't work with `v-for` children.
- Fix `n-input-number` cannot enter decimals when `step` is not a decimal.

## 2.18.0 (2021-09-07)

### Breaking Changes

- `n-form` & `n-form-item` split `show-require-mark` into `show-require-mark` and `require-mark-placement`.

### Feats

- `n-drawer` add `on-mask-click` prop.
- `n-for` add `require-mark-placement` prop, closes [#1055](https://github.com/TuSimple/naive-ui/issues/1055).
- `n-form-item` add `require-mark-placement` prop, closes [#1055](https://github.com/TuSimple/naive-ui/issues/1055).

### Fixes

- Fix `n-step` must be passed with `internal-index`.
- Fix `n-radio-group`'s `on-update:value` and `on-update-value` can't be array.
- Fix `n-cascader` `check-strategy="child"` doesn't behaves the same as previous `leaf-only`.

## 2.17.2 (2021-09-06)

### Fixes

- Fix `n-tree-select` shows key not label when `show-path=true`, closes [#1095](https://github.com/TuSimple/naive-ui/issues/1095).

## 2.17.1 (2021-09-06)

### Fixes

- Fix `n-cascader` menu not showing correct checked keys.

## 2.17.0 (2021-09-05)

### Breaking Changes

- `n-tree-select`'s `leaf-only` prop is deprecated, please use `check-strategy="child"` instead.
- `n-cascader`'s `leaf-only` prop is deprecated, please use `check-strategy="child"` instead.
- `n-input`'s `show-password-toggle` is deprecated, please use `show-password-on="click"` instead.

### Fixes

- Fix `n-cascader` click tag to delete the sub option in multi selection mode, and the tree option is not updated.
- Fix `n-input` chinese input method not correct while mouse leave the input in `clearable` is true, closes [#905](https://github.com/TuSimple/naive-ui/issues/905).
- Fix `n-description`'s warning caused by `v-if` that should not appear, closes [#1083](https://github.com/TuSimple/naive-ui/issues/1083).
- Fix `n-layout`'s `sider-placement` doesn't work after build, closes [#978](https://github.com/TuSimple/naive-ui/issues/978).
- Fix `n-input-number`'s `step` calculate error when the value is decimal, closes [#1007](https://github.com/TuSimple/naive-ui/issues/1007).
- Fix `n-popselect`' s default placement and padding.
- Fix `n-calendar`'s text color of disabled date.

### Feats

- `n-cascader` add `onUpdateValue` prop.
- `n-auto-complete` add `onUpdateValue` prop.
- `n-data-table`'s column's `renderFilterMenu` add `hide` param.
- `n-tree` add `key-field` prop.
- `n-tree` add `label-field` prop.
- `n-tree` add `children-field` prop.
- `n-tree-select` add `key-field` prop.
- `n-tree-select` add `label-field` prop.
- `n-tree-select` add `children-field` prop.
- `n-cascader` add `key-field` prop.
- `n-cascader`add `label-field` prop.
- `n-cascader` add `children-field` prop.
- `n-dropdown` option add `props` prop, closes [#813](https://github.com/TuSimple/naive-ui/issues/813).
- `n-data-table` supports multi-selection by holding down `shift`, closes [#554](https://github.com/TuSimple/naive-ui/issues/554).
- `n-tree-select` add `check-strategy` prop, closes [#624](https://github.com/TuSimple/naive-ui/issues/624).
- `n-cascader` add `check-strategy` prop.
- `n-message` option add `keepAliveOnHover`, closes [#1036](https://github.com/TuSimple/naive-ui/issues/1036).
- `n-message-provider` add `keep-alive-on-hover` prop, closes [#1036](https://github.com/TuSimple/naive-ui/issues/1036).
- `n-upload` export `UploadFile` type.
- `n-cascader` export `CascaderOption` type.
- `n-mention` export `MentionOption` type.
- `n-transfer` export `TransferOption` type.
- `n-pagination` export `PaginationInfo` type.
- `n-data-table` export `DataTableCreateSummary` type.
- `n-code` add `inline` prop, closes [#834](https://github.com/TuSimple/naive-ui/issues/834)
- `n-collapse` add `header-extra` slot, closes [#1046](https://github.com/TuSimple/naive-ui/issues/1046).
- `n-input` add `show-password-on` prop.
- `n-upload` add `list-type`, `show-preview-button`, `on-preview` and `create-thumbnail-url` prop.

## 2.16.7 (2021-08-27)

### Feats

- `n-mention` add `focus` and `blur` methods.

### Fixes

- Fix `n-mention`'s menu is too far from text in input mode.
- Fix `n-tree` node can not expanded.

## 2.16.6 (2021-08-26)

### Feats

- `n-timeline` add `horizontal` prop, closes [#887](https://github.com/TuSimple/naive-ui/issues/887).
- `n-image` add `preview-src` prop, closes [#922](https://github.com/TuSimple/naive-ui/issues/922)
- `n-dynamic-tags` add `input` and `add` slot, closes [#499](https://github.com/TuSimple/naive-ui/issues/499).
- `n-timeline-item` add `color` prop.

### Fixes

- Fix `n-image` not initializing `rotate` after switching images, closes [#921](https://github.com/TuSimple/naive-ui/issues/921).
- Fix `n-data-table`'s loading is not centered, closes [#929](https://github.com/TuSimple/naive-ui/issues/929).
- Fix `n-tree` throws an exception when onLoad callback does not add children, closes [#772](https://github.com/TuSimple/naive-ui/issues/772).
- Fix `n-input` will show placeholder and 0 simultaneously while passing `value=ref(0)` in n-input, closes [#914](https://github.com/TuSimple/naive-ui/issues/914).
- Fix `n-data-table` `flex-height` not working without `scroll-x`, closes [#952](https://github.com/TuSimple/naive-ui/issues/952).

## 2.16.5 (2021-08-20)

### Feats

- `n-input-number` add `clearable` prop.
- `n-form` add `show-label` prop, closes [#858](https://github.com/TuSimple/naive-ui/issues/858).

### Fixes

- Fix `n-notification`'s exported `NotificationReactive` type is not writable, closes [#876](https://github.com/TuSimple/naive-ui/issues/876).
- Fix `n-tabs` style glitches when different types tabs are nested, closes [#850](https://github.com/TuSimple/naive-ui/issues/850).
- Fix `n-dropdown`'s inner link click trigger area is not the entire option, closes [#823](https://github.com/TuSimple/naive-ui/issues/823).
- Fix `n-popover` arrow's misplacement when placed in nested popovers with different placement, closes [#916](https://github.com/TuSimple/naive-ui/issues/916).
- Fix `n-ellpisis` doesn't work after content is updated, closes [#776](https://github.com/TuSimple/naive-ui/issues/776).

## 2.16.4 (2021-08-16)

### Fixes

- Fix ruRU locale exports.

## 2.16.3 (2021-08-16)

### i18n

- Add ruRU locale [#852](https://github.com/TuSimple/naive-ui/pull/852).

### Feats

- `n-message-provider` add `container-style` prop.
- `n-message-provider` add `placement` prop.
- `n-message` add class to distinguish type.
- `n-date-picker` add `shortcuts` props, closes [#280](https://github.com/TuSimple/naive-ui/issues/280).

### Fixes

- Fix `n-rate` half star overlays star background in dark mode.
- Fix `n-menu` renders unexpectly when `render-icon` returns `true`.
- Fix `n-space` render empty placeholder while use `v-if`, closes [#824](https://github.com/TuSimple/naive-ui/issues/824).

## 2.16.2 (2021-08-09)

### Feats

- `n-message-provider` add `closable` prop, closes [#795](https://github.com/TuSimple/naive-ui/issues/795).
- `n-tree-select` add `show-path` prop, closes[#625](https://github.com/TuSimple/naive-ui/issues/623).
- `n-layout` add `sider-placement` prop, closes [#566](https://github.com/TuSimple/naive-ui/issues/566).

### Fixes

- Fix `n-avatar`'s scale value is incorrect while use v-show, closes [#779](https://github.com/TuSimple/naive-ui/issues/779).
- Fix `n-menu` show a blue background when click the menu on mobile phone, closes [#799](https://github.com/TuSimple/naive-ui/issues/799).
- Fix `n-select` filterable select breaks, closes [#510](https://github.com/TuSimple/naive-ui/issues/510).
- Fix `n-data-table` When selectAll is selected, the state display of selectAll should not contain disabled rows, closes [#778](https://github.com/TuSimple/naive-ui/issues/778).
- Fix `n-color-picker`'s `on-complete` callback's argument `value` is incorrect, closes [#748](https://github.com/TuSimple/naive-ui/issues/748).

## 2.16.1 (2021-08-06)

### Feats

- `n-loading-bar` add `loading-bar-style` props, closes [#457](https://github.com/TuSimple/naive-ui/issues/457).
- `n-button` add `text-color` prop.
- `n-form` export `FormValidationError` type.
- `n-popconfirm` support not show action components, closes [#770](https://github.com/TuSimple/naive-ui/issues/770).

### Fixes

- Fix `n-slider` loss floating point decimal precision, closes [#751](https://github.com/TuSimple/naive-ui/issues/751).
- Fix `n-data-table` `onUpdatePage` and `onUpdatePageSize` not triggered while using jsx.
- Fix `n-progress`'s `percentage` prop default value doesn't work with different types.
- Fix `n-select` hide close icon when option is disabled.
- Fix `n-modal` can't be closed when using custom content, closes [#788](https://github.com/TuSimple/naive-ui/issues/788).

## 2.16.0 (2021-08-02)

### Breaking Changes

- `useLoadingBar`'s `finish` method won't work if no `start` is called.
- `n-input`'s `type='input'` is renamed to `type='text'`.

### Feats

- `n-scrollbar` add `scrollbarWidth`, `scrollbarHeight` and `scrollbarBorderRadius` common theme variables, closes [#649](https://github.com/TuSimple/naive-ui/issues/649).
- `n-menu` doesn't should icon placeholder when `render-icon` returns falsy value, closes [#722](https://github.com/TuSimple/naive-ui/issues/722).
- `n-menu` add `render-extra` prop.
- `n-select` add `on-clear` prop.
- `n-form` add `disabled` prop, closes [#538](https://github.com/TuSimple/naive-ui/issues/538).
- `n-dynamic-tags` add `max` prop.

### Fixes

- Fix `n-dropdown` click exception when using v-for.
- Fix `n-modal` cannot customize classes when use preset, closes [#744](https://github.com/TuSimple/naive-ui/issues/744).
- Fix `n-cascader` menu width shifts in virtual scroll mode, closes [#728](https://github.com/TuSimple/naive-ui/issues/728).

## 2.15.11 (2021-07-29)

### Fixes

- Fix `n-data-table` pagination's error.

## 2.15.10 (2021-07-29)

### Feats

- `n-pagination` adds `prev` and `next` slots, ref [#648](https://github.com/TuSimple/naive-ui/issues/648).
- `n-tag` add `color` prop, closes [#693](https://github.com/TuSimple/naive-ui/issues/693).
- `n-dynamic-tags` add `color`, closes [#693](https://github.com/TuSimple/naive-ui/issues/693).
- `n-time-picker` optimization the now button logic, closes [#401](https://github.com/TuSimple/naive-ui/issues/401).
- `n-pagination` `PaginationInfo` add `itemCount` prop, closes [#585](https://github.com/TuSimple/naive-ui/issues/585).
- `n-select` add `on-clear` prop.

### Fixes

- Fix `n-message`'s `destroyAll` method doesn't work.
- Fix `n-timeline`'s header slot is invalid when using alone.
- Fix `n-select` incorrect style when props has `disabled` and `filterable`, closes [#698](https://github.com/TuSimple/naive-ui/issues/698).
- Fix `n-upload` operation buttons displayed when has `file-list` & `disabled` props, closes [#668](https://github.com/TuSimple/naive-ui/issues/668).

## 2.15.9 (2021-07-28)

### Feats

- `n-message` add `destroyAll` method.
- `n-input-number` add `prefix`, `suffix` slots, closes [#609](https://github.com/TuSimple/naive-ui/issues/609).

### Fixes

- Fix `n-message` options' `duration` prop doesn't work.

## 2.15.8 (2021-07-27)

### Feats

- `n-menu` add `expand-icon` prop, closes [#414](https://github.com/TuSimple/naive-ui/issues/414).
- `n-descriptions`, `n-descriptions-item` add `label-style` and `content-style` props, closes [#536](https://github.com/TuSimple/naive-ui/issues/536).

### Fixes

- Fix `n-data-table` the style penetration of the `n-spin`, closes [#663](https://github.com/TuSimple/naive-ui/issues/663).

## 2.15.7 (2021-07-25)

### Feats

- `n-dropdown` add `show-arrow` prop, closes [#647](https://github.com/TuSimple/naive-ui/issues/647).
- `n-time-picker` add `actions` prop, closes [#401](https://github.com/TuSimple/naive-ui/issues/401).
- `n-mention` add `render-label` prop.
- `n-switch` add `checked`, `unchecked` slots.
- `n-switch` add `loading` prop, closes [#301](https://github.com/TuSimple/naive-ui/issues/301).
- `n-select` pressing arrow down can open menu, ref [#300](https://github.com/TuSimple/naive-ui/issues/300).
- `n-tree-select` pressing arrow down can open menu, ref [#300](https://github.com/TuSimple/naive-ui/issues/300).
- `n-cascader` pressing arrow down can open menu, ref [#300](https://github.com/TuSimple/naive-ui/issues/300).
- `n-popover`'s `trigger` prop support `'focus'`, closes [#477](https://github.com/TuSimple/naive-ui/issues/477).
- `n-message-provider` add `duration` and `max` props.
- `n-data-table` add `flex-height` prop, closes [#596](https://github.com/TuSimple/naive-ui/issues/596).

### Fixes

- Fix `n-carousel` arrow buttons cannot be displayed in a specific browser, closes [#625](https://github.com/TuSimple/naive-ui/issues/625).
- Fix `n-layout-sider`'s `width` prop can't be string, closes [#607](https://github.com/TuSimple/naive-ui/issues/607).
- Fix `n-slider` prop `disabled` doesn't work, closes [#641](https://github.com/TuSimple/naive-ui/issues/641).
- Fix `n-input` show clear button when readonly.
- Fix `n-data-table` doesn't show scrollbar when table-layout is auto, closes [#518](https://github.com/TuSimple/naive-ui/issues/518).
- Fix `n-data-table`'s header checkbox always displays checked when data is empty.
- Fix `n-data-table` header and body's scrollings are not sync.

## 2.15.6 (2021-07-23)

### Feats

- `n-menu` add `render-icon` prop.
- `n-upload` add `show-file-list` prop.
- `n-dropdown` add `render-icon` prop.
- `n-checkbox-group` add `min` and `max` prop.
- `n-mention` add `empty` slot.
- `useDialog` option add `on-mask-click` prop, closes [#419](https://github.com/TuSimple/naive-ui/issues/419).
- `n-space` `justify` prop supports `center`, `space-around` and `space-between`.
- `n-date-picker` add `close-on-select` prop, closes [#541](https://github.com/TuSimple/naive-ui/issues/541).
- `n-dialog` add `action` prop, closes [#550](https://github.com/TuSimple/naive-ui/issues/550).
- `n-mention`’s `option.label` support render function.
- `n-color-picker` add `actions` prop, closes [#319](https://github.com/TuSimple/naive-ui/issues/319).

### Fixes

- Fix `n-space`'s inner `display: grid` element breaks item height, closes `https://github.com/TuSimple/naive-ui/issues/546`.
- Fix `n-dropdown`'s `render-label` prop is invalid for group type option.
- Fix `n-datatable`'s `scroll-x` prop is setted, the table content width is not full of the container width, closes [#518](https://github.com/TuSimple/naive-ui/issues/518).
- Fix `n-descriptions` doesn't work with `v-for` children.
- Fix `n-dialog` display an empty button when `positive-text` is not set, closes [#549](https://github.com/TuSimple/naive-ui/issues/549).
- Fix `n-pagination` `PaginationInfo`'s `endIndex` data error, closes [#584](https://github.com/TuSimple/naive-ui/issues/584).
- Fix `n-data-table` `rowClassName` doesn't work when type is string, closes [#582](https://github.com/TuSimple/naive-ui/issues/582).

## 2.15.5 (2021-07-16)

### Feats

- `n-tree` add `render-label`, `render-prefix` and `render-suffix` props.
- `n-rate` add `allow-half` prop.
- `n-carousel` add `show-arrow` prop.
- `n-slider` add `format-tooltip` prop.
- `n-upload` add `event` in `on-finish` callback params.
- `n-rate` add `readonly` prop.
- `n-time-picker` add `seconds`, `minutes`, `hours` props.
- `n-notification` export `NotificationApi`, `NotificationOptions` and `NotificationReactive` type.
- `n-avatar` add `on-error` prop, closes [#394](https://github.com/TuSimple/naive-ui/issues/394).
- `n-image` add `on-error` prop, closes [#394](https://github.com/TuSimple/naive-ui/issues/394).
- `n-image` add `object-fit` prop, closes [#394](https://github.com/TuSimple/naive-ui/issues/394).
- `n-avatar` add `object-fit` prop, closes [#394](https://github.com/TuSimple/naive-ui/issues/394).
- `n-menu` expands all the ascendant of selected item by default, closes [#481](https://github.com/TuSimple/naive-ui/issues/481).

### Fixes

- Fix `n-calendar`'s `default-value` prop cannot be used.
- Fix `n-pagination` page count is not correct when `item-count` is 0.
- Fix `n-scrollbar` `content-style` can not override the default width of style.
- Fix `n-select` placeholder transition.
- Fix `n-loading-bar` `useLoadingBar`'s return type can be undefined.
- Fix `n-tag`'s `type` prop add `primary` type.
- Fix `n-dynamic-tags`'s `type` prop add `primary` type.

## 2.15.4 (2021-07-09)

### Feats

- `n-steps` add icon customization in `'finish'` and `'error'` status.
- `n-tree` exports `TreeDragInfo` & `TreeDropInfo` type.
- `n-empty` export `icon` slot.
- `useDialog` option add `maskClosable` prop, closes [#420](https://github.com/TuSimple/naive-ui/issues/420).

### Fixes

- Fix `n-data-table` fixed column box-shadow doesn't update when there is only on side fixed.
- Fix `n-data-table` fixed column box-shadow doesn't update when `props.scrollX` is not set but each column's width is set.
- Fix `n-result` image doesn't show on Safari and mobile phone.
- Fix `n-drawer-content`'s `header-style` style not applied to header.
- Fix `n-dialog` instance throws error when calling `destroy`.
- Fix `n-image-group` initialize zoom scale when switching a picture [#423](https://github.com/TuSimple/naive-ui/issues/423).
- Fix `n-select` bug in using custom label, closes [#352](https://github.com/TuSimple/naive-ui/issues/352).
- Fix `n-carousel` when `autoplay` dot active status isn't displayed correctly, closes [#434](https://github.com/TuSimple/naive-ui/issues/434).
- Fix `n-input` fixed clearable position, closes [#428](https://github.com/TuSimple/naive-ui/issues/428).
- Fix `n-image` doesn't accept attributes.
- Fix `n-image` set border-radius not working, closes [#427](https://github.com/TuSimple/naive-ui/issues/427).
- Fix `n-tab-pane` throws error when there's no children.
- Fix `n-select` clear button is too big in `n-spin`, closes [#454](https://github.com/TuSimple/naive-ui/issues/454).
- Fix `n-select` options are not updated properly, closes [#441](https://github.com/TuSimple/naive-ui/issues/441).

## 2.15.3 (2021-07-05)

### Feats

- `n-loading-bar` export `LoadingBarApi` type.
- `n-image` add `img-props` prop.
- Add native `title` attributes to some components to enhance the experience.
- `n-tree` add `prefix` and `suffix` in TreeOption.
- `n-carousel` add `dot-placement` prop.
- `n-auto-complete` add `loading` prop, closes [#241](https://github.com/TuSimple/naive-ui/issues/241).
- `n-slider` add `tooltip` prop, closes [#362](https://github.com/TuSimple/naive-ui/issues/362).
- `n-input` add `loading` prop.

### Fixes

- Fix `n-upload` `multiple=false` doesn't work for drag & drop, closes [#363](https://github.com/TuSimple/naive-ui/issues/363).
- Fix `n-dropdown`'s inner `<a />`'s style.
- Fix `n-menu` tooltip's inner `<a />`'s style, closes [#338](https://github.com/TuSimple/naive-ui/issues/338).
- Fix `n-carousel` doesn't work with `v-for` children.
- Fix `n-form` `label-align` prop not working, closes [#213](https://github.com/TuSimple/naive-ui/issues/213)
- Fix `n-data-table` fixed column shadow doesn't work when `max-height` is set, closes [#376](https://github.com/TuSimple/naive-ui/issues/376).

## 2.15.2 (2021-07-02)

### Feats

- `n-carousel` add `trigger` prop.
- `n-menu` add `dropdown-placement` prop.
- `n-upload` add `before-upload` prop.
- `n-image` add `alt` prop.
- Support the enter key on the numeric keypad.
- `n-spin` support `icon` slot for icon customizing, closes[#260](https://github.com/TuSimple/naive-ui/issues/260).
- `n-spin` add `rotate` prop fro slot icon to rotate.
- `n-form` export `FormItemRule` & `FormRules` type.
- `n-select` add `render-tag` prop.

### Fixes

- Fix `n-log` warn on highlight.js when no language is set, closes [#327](https://github.com/TuSimple/naive-ui/issues/327).
- Remove `n-calendar`'s useless `console.log`.
- Fix loading-bar disappears unexpectl, closes [#343](https://github.com/TuSimple/naive-ui/issues/343).
- Fix `n-select` doesn't scroll to selected item when menu is opened, closes [#346](https://github.com/TuSimple/naive-ui/issues/346).
- Fix `n-tab-pane` throws error when using v-if.
- Fix `n-modal` still closes when `on-negative-click` returns `false`.
- Fix `n-collapse` `defaultExpandedNames` does not work in accrodion mode, closes [#350](https://github.com/TuSimple/naive-ui/issues/350).
- Fix `n-tag` lacks `on-update-checked` prop.
- Fix `n-menu` `render-label` not working for dropdown in collapsed mode.

## 2.15.1 (2021-06-30)

- Fix no `web-types.json`.

## 2.15.0 (2021-06-29)

### Breaking Changes

- `n-select`'s `SelectOption`'s `render` no longer render label but the entire option.

### Feats

- `n-carousel` supports touch operation, closes [#271](https://github.com/TuSimple/naive-ui/issues/271).
- `n-input` add `input-props` prop.
- `n-message` optimize the error message of `useMessage` when there is no `n-message-provider`, add the related document link.
- Add `web-types.json` for webstorm, however I recommend using VSCode and Volar. `web-types.json` only provides limited information for coding.
- `n-tree-select` add `leaf-only` prop.
- `n-tree` add `leaf-only` prop.
- `n-select`'s `SelectOption`'s `label` supports render function.
- `n-select` add `render-option` prop.
- `n-select` export `SelectOption` & `SelectGroupOption` type.
- `n-popover` add `header` slot.
- `n-dropdown` add `render-label` prop.

### Fixes

- Fix `n-date-picker` `n-provider` pass `date-locale` not work, closes [#250](https://github.com/TuSimple/naive-ui/issues/250).
- Fix `n-input` clear button placeholder prevent clicking on actual component [#288](https://github.com/TuSimple/naive-ui/issues/288)
- Fix `n-carousel` click the at current item button, the component behaves abnormally.
- Fix `n-menu` `render-label` not working for tooltip in collapsed mode.
- Fix `n-dropdown` can't render `n-popover` in option.

## 2.14.0 (2021-06-23)

### Breaking Changes

- `n-element` removes `abstract` prop.
- `n-element` doesn't return theme variables in default slot. Please use `useThemeVars` instead.

### Feats

- Add `n-carousel` component.
- Add `useThemeVars` composable to provide theme variables.
- `n-upload` add `on-update:file-list` prop, closes [#135](https://github.com/TuSimple/naive-ui/issues/135).
- `n-date-picker` add `update-value-on-close` prop.

### Fixes

- Fix `n-select` can't input in filterable mode in single mode in iOS Safari, closes [#230](https://github.com/TuSimple/naive-ui/issues/230)
- Fix `n-input-number` lacks `on-update-value` prop.
- Fix `n-input-number`'s value can't be null.
- Fix `n-input-number`'s button doesn't work after value is cleared, closes [#251](https://github.com/TuSimple/naive-ui/issues/251).
- Fix `n-data-table` expand trigger's cursor is not pointer, closes [#261](https://github.com/TuSimple/naive-ui/issues/261).

## Refactors

- `n-input-number` will focus directly, closes [#244](https://github.com/TuSimple/naive-ui/issues/244).

## 2.13.0 (2021-06-21)

### Feats

- `n-dropdown` add `on-clickoutside` prop, closes [#123](https://github.com/TuSimple/naive-ui/issues/123).
- `n-menu` add `render-label` prop, closes [#84](https://github.com/TuSimple/naive-ui/issues/84)
- `n-tree` supports keyboard operations.
- Add `n-tree-select` component.

### Fixes

- Fix `n-tree` drag over leaf node causes error, closes [#200](https://github.com/TuSimple/naive-ui/issues/200).
- Fix `n-tree` misses `on-update-expanded-keys`, `on-update-selected-keys`, `on-update-checked-keys` prop.
- Fix `n-tree`'s `selected-keys` prop influences original array.
- Fix `n-select`'s input has useless empty row in multiple filterable mode.
- Fix `n-button`'s loading icon doesn't show on iOS Safari, closes [#219](https://github.com/TuSimple/naive-ui/issues/219).
- Fix `n-date-picker` doesn't show icon when clearable.
- Fix `n-time-picker` icon mis-aligned when clearable, closes [#222](https://github.com/TuSimple/naive-ui/issues/222).

## 2.12.2 (2021-06-19)

### Fixes

- Fix `n-form-item` always show require mark.

## 2.12.1 (2021-06-19)

### Feats

- `n-form`, `n-form-item` enhance `show-require-mark` prop，closes [#171](https://github.com/TuSimple/naive-ui/issues/171)
- `n-dropdown` support class attr, closes [#180](https://github.com/TuSimple/naive-ui/issues/180).
- `n-input` add `show-password-toggle` prop.
- `n-popselect` support class attr.
- `n-select` add `render-label` prop.
- `n-popselect` add `render-label` prop.

### Fixes

- Fix `n-input` baseline shifts when mix Chinese and English characters in input, closes [#174](https://github.com/TuSimple/naive-ui/issues/174).
- Fix `n-icon` use setup script, `$parent` is an empty object by default, and access `$parent.$options` will be `undefined`.
- Fix `n-notification` position not correct.
- Fix `n-message` content & option type not correct.

## 2.12.0 (2021-06-16)

### Breaking Changes

- `n-a`'s `to` prop is removed. Now if you want to use `n-a` like a router link, you can follow the doc site.

### Feats

- `n-tree` support `disabled` & `checkboxDisabled` on option.
- `n-input-number` support keyboard events ArrowUp and ArrowDown operations.

### Fixes

- Fix `n-cascader` text blur in win10 Chrome.
- Fix `n-tree` click on indent won't trigger select in block line mode.

## 2.11.12 (2021-06-16)

### Feats

- `n-drawer-content` add `closable` prop, closes [#139](https://github.com/TuSimple/naive-ui/issues/139).
- `n-element` pass `themeVars` to default slot.
- `n-element` add `abstract` prop.

### Fixes

- Fix `n-radio-group` doesn't trigger form item validation.
- Fix `n-auto-complete` customizing input not working.

## 2.11.11 (2021-06-15)

### Feats

- `n-tag` add `RTL` support

### Fixes

- Move `vue` & `vue-router` to peer dependencies to avoid redundant bundle.

## 2.11.9 (2021-06-15)

### Feats

- `n-space` supports wai-aria.
- `n-button-group` supports wai-aria.
- `n-progress` supports wai-aria.
- `n-menu` supports use `<a />` and `<router-link />` as label, closes [#84](https://github.com/TuSimple/naive-ui/issues/84).
- `n-input-number` add `show-button` prop.
- `n-rate` support `default` slot for icon customizing.
- `n-rate` add color prop.
- `n-rate` add size prop.

### Fixes

- Fix `n-card`'s `header-style` it not applied to header. [#103](https://github.com/TuSimple/naive-ui/issues/103)
- Fix `n-dialog` misses `destroyAll` method.
- Fix `n-data-table` misses `on-update-sorter`, `on-update-filters`, `on-update-page` and `on-update-page-size` props.

## 2.11.8 (2021-06-13)

### Feats

- `n-data-table` exports `DataTableCreateRowClassName`, `DataTableCreateRowKey` and `DataTableCreateRowProps` type.

### Fixes

- Fix `n-calendar`'s `on-update:value` prop type.
- Fix `n-form-item`'s style attribute `grid-template-columns` influence on the layout of child elements. [#93](https://github.com/TuSimple/naive-ui/pull/93)
- Fix `n-data-table`'s prop types of `rowKey`, `rowClassName`, `rowProps`, `summary` aren't compatible with expected value.

## 2.11.7 (2021-06-12)

### Fixes

- Fix `n-slider` doesn't prevent scrolling when touchstart.
- Fix `n-color-picker`'s default value doesn't follow modes.
- Fix not `lodash` & `lodash-es` type.

## 2.11.6 (2021-06-11)

### Feats

- `n-spin`'s `size` prop support number.
- `n-date-picker` add `footer` slot.

### Fixes

- Fix `n-slider` doesn't support touch events
- Fix `n-button` causes crash when it's imported in script inside head tag. [#68](https://github.com/TuSimple/naive-ui/pull/68)
- Fix `n-spin` animation shifts.
- Fix `n-menu` lack `on-update-value` and `on-update-expanded-keys` props.
- Fix `n-popconfirm` icon slot not working.
- Fix `n-tabs` logs useless info.
- Fix `n-color-picker` set `modes` not working. [#77](https://github.com/TuSimple/naive-ui/issues/77)

## 2.11.5 (2021-06-10)

### Feats

- `n-dropdown` add `disabled` prop
- `n-card` add `:target` style

### Fixes

- Fix `n-popover` sometimes won't sync position in manual mode.
- Fix `n-transfer`'s empty icon is no toggling transition.
- Fix `n-message` API option is not optional.
- Fix `n-calendar` date calculate incorrectly.
- Fix `n-input` misses the `password` type declaration.
- Fix `n-menu` the type definition of `extra` property of menu and submenu.
- Fix `n-dropdown` mouse cursor is not pointer.

## 2.11.4

### Feats

- `n-button` supports wai-aria.
- `n-card` supports wai-aria.
- `n-switch` supports wai-aria.
- `n-menu` supports basic wai-aria.
- `n-divider` supports basic wai-aria.
- `n-data-table` add `row-props` prop.
- `n-date-picker` add `ranges` prop.

### Fixes

- Fix `n-tab-pane` `display-directive` not working.
- Fix `n-drawer` animation.
- Fix `n-scrollbar`'s track may be overlayed in chrome windows.

## 2.11.3

- Fix `n-collapse` `default-expanded-names` not working.

## 2.11.2

### Fixes

- Fix `n-dropdown` default placement is not `bottom`.
- Fix `n-date-picker`'s input theme is not set in `date` & `datetime` type.
- Fix `n-config-provider` doesn't merge inherited theme.

### Feats

- `n-collapse` add `arrow` slot

## 2.11.1

Update package.json & README.md.

## 2.11.0

### Breaking Changes

- `n-affix`'s `listen-to` prop is `document` by default (first scrollable parent before).

### Feats

- `n-affix`'s `listen-to` prop support `Window | Document | HTMLElement`.
- `n-anchor` add `offset-target` prop.
- `n-select` add `virtual-scroll` prop.
- `n-select` add `consistent-menu-width` prop.
- `n-date-picker` update value after confirm is clicked.

### Fixes

- Fix `n-date-picker` doesn't disable start date correctly when value is empty.
- Fix `n-input-number` not restore valid value after blur.
- Fix `n-date-picker` display selected date when value is null in date mode.

### Deprecated

- `n-affix`'s `offset-top` prop is deprecated, please use `trigger-top` instead.
- `n-affix`'s `offset-bottom` prop is deprecated, please use `trigger-bottom` instead.
- `n-anchor`'s `listen-to` prop is removed.

## 2.10.0

### Breaking Changes

- `n-popover`'s `placement` prop default value is set to `'top'`.

### Feats

- `n-tabs` add `on-close` prop.
- `n-tabs` add `on-add` prop.
- `n-tabs` add `tab` slot.
- `n-tab-pane`'s `tab` prop support render function & VNode.
- `n-tabs`'s `type` prop support `'line'` option.
- `n-tabs` add box shadow to indicate scroll status.
- `n-tabs` add `pane-style` prop

### Fixes

- Fix `n-layout`'s `scrollTo` not working when using native scrollbar.

### Deprecated

- `n-tab-pane`'s `label` prop is deprecated. Please use `tab` prop instead.

## 2.9.0

### Breaking Changes

- `n-layout-sider` removed `show-content` prop. Please use `show-collapsed-content` instead.

### Feats

- `n-data-table` support tree data.
- `n-data-table` add `cascade` prop.
- `n-data-table` add `children-key` prop.
- `n-data-table` add `indent` prop.
- `n-button` add `tag` prop.
- `n-data-table` add `table-layout` prop.
- `n-tree` add `block-line` prop.
- `n-tree` support drag & drop.
- `n-menu` add `inverted` prop.
- `n-dropdown` add `inverted` prop.
- `n-tabs` add `addable` prop.
- `n-tabs` add `tab-style` prop.
- `n-tabs` add `tabs-padding` prop.
- `n-tabs` add `default-value` prop.
- `n-layout-sider` & `n-layout-footer` & `n-layout-header` add `inverted` prop.
- `n-data-table`'s `max-height` & `min-height` prop accept CSS value.
- `n-layout` & `n-layout-content` add `embedded` prop.

### Fixes

- `n-layout` & `n-layout-sider`'s `scrollTo` not working with native scrollbar.
- `n-layout-sider`'s `collapse-mode` not working.
- Internal selection component's theme peers has wrong key for popover.

## 2.8.0

### Perf

- Optimize `n-data-table` init render count.
- Optimize `n-select` open duration after first opening.
- Optimize `n-anchor` scroll performance.

### Feats

- `n-tree` add `virtual-scroll` prop.
- `n-data-table` add `virtual-scroll` prop.
- `n-cascader` add `virtual-scroll` prop.
- `n-pagination` add `item-count` prop.
- `n-pagination` add `prefix` prop.
- `n-pagination` add `prefix` slot.
- `n-pagination` add `suffix` prop.
- `n-pagination` add `suffix` slot.
- `n-input` add `show-count` prop.

### Fixes

- Fix `n-layout-sider` doesn't show menu after collapsed.
- Fix `n-input-number` doesn't reset to origin value when blur with invalid value.
- Fix `n-pagination` doesn't update page in uncontrolled mode.

## 2.7.4

### Feats

- `n-form-item` works without `n-form`.

### Fixes

- Fix `n-checkbox` check mark not displayed.
- Fix `n-date-picker` icon transition style in trigger.
- Fix `n-p`, `n-ol`, `n-ul` margin bottom is not 0 when they are last child.
- Fix `n-checkbox-group` not working in uncontrolled mode.
- Fix `n-data-table` clear check all in table now working.

## 2.7.3

### Feats

- `n-data-table` highlight sorted col.
- `n-data-table` col add `render-filter` prop.
- `n-data-table` col add `render-filter-icon` prop.

### Fixes

- `n-data-table` fixed column box-shadow more clear in dark theme.
- Fix `n-color-picker` value has line wrap.
- Fix `n-form` FormRuleItem.trigger types.

## 2.7.2

### Feats

- `n-data-table` add `summary` prop.
- `n-data-table` add `options` on `'type=selection'` column.

### Fixes

- Fix `n-layout` overflow on horizontal direction.

## 2.7.1

### Feats

- `n-checkbox` add `focusable` prop.
- `n-cascader` add `action` slot.

### Fixes

- Fix `n-cascader` loading triggered when click checkbox.
- Fix `n-cascader` menu mask style.

## 2.7.0

### Breaking Changes

- `n-drawer` doesn't have padding by default. `n-drawer-content` is provided to fill the drawer.

## 2.6.0

### Feats

- `n-drawer` add `content-style` prop.
- `n-layout` add `content-style` prop.
- `n-layout-sider` add `content-style` prop.

### Feats

- `n-config-provider` Add `cls-prefix` prop.

### Fixes

- Fix `n-popover` may influence other popover when static props is hoisted.

## 2.5.1

### Feats

- `n-color-picker` add `show-alpha` prop.

### Fixes

- Fix `n-select` default `fallback-option` breaks the component.

## 2.5.0

### Feats

- Add `n-skeleton` component.
- Add `n-calendar` component.
- Add `n-color-picker` component.
- `n-date-picker` locale add `firstDayOfWeek`.
- `n-select` add `showArrow` prop.

### Fixes

- Fix `n-date-picker` trigger has no focus style in focus is in panel.
- Fix `n-button` loading's fade-in transtion drifts.
- Fix `n-time-picker` close animation drifts in `n-date-picker`.
- Fix detached components in popover should stay in popover.

## 2.4.2

### Feats

- Add `n-form-item-gi` component.

### Fixes

- Fix `n-ellipsis` & `n-data-table` ellpisis cell mis-vertical-aligned.
- Fix `n-select` filterable doesn't work with composite events.

## 2.4.1

### Fixes

- Fix `n-select` caret color in single filter mode.
- Fix `n-select` menu action part can't be focused.

## 2.4.0

### Feats

- Add `n-image` component.
- Add `n-global-style` component.
- Add `n-theme-editor` component.
- Add `n-page-header` component.
- `n-statistic` add `label` slot.
- `n-breadcrumb-item` add `separator` slot & prop.
- `n-button` add `bordered` prop.
- `n-card` add `footer-style` prop.

### Refactors

- Refactor `n-statistic`'s style
- `n-menu` add `options` prop to replace `items` prop, `items` prop is deprecated.

### Fixes

- Fix `n-anchor` `ignore-gap` not working
- Fix `n-collapse` content is truncated by `overflow: hidden`.
- Fix `n-select` tag text overflow.
- Fix `n-popover` doesn't hide as expected in mobile phone.

## 2.3.1

### Fixes

- Fix `n-layout-sider` horizontal content overflows.

## 2.3.0

### Breaking Changes

- Collapsing won't work for `n-layout-sider` with `position="absolute"`.
- For `n-layout` contains `n-layout-sider` as a direct child `has-sider` must be set.

## 2.2.0

### Feats

- Add `n-mention` component.
- `n-data-table` supports expanding rows.

### Fixes

- Fix `n-input` focused background color not correct in warning & error status in dark theme.
- Fix `n-input` caret color not correct in warning & error status.
- Fix `n-select`'s namespace not correct.
- Fix `n-cascader`'s namespace not correct.
- Fix `n-input` in textarea mode can't select text.
- Fix `n-input` in textarea mode has no box-shadow.
- Fix `n-input` in textarea mode `autosize` line not correct due to inconsistant font family.
- Fix `n-input` in textarea mode `autosize` rows not changed if props.value is changed from outside.

### Refactors

- Change `n-empty`'s icon and make it size larger

## 2.1.3

### Fixes

- Fix `n-data-table` has no right border of non-last td.
- Fix `n-data-table` header has no enough width when table width is more than `scroll-x`

## 2.1.2

### Feats

- `n-data-table`'s column add `colSpan` and `rowSpan` prop.
- `n-data-table`'s column add `titleColSpan` prop.

### Fixes

- Fix `n-dropdown` with `x` and `y` set logs errors when mouse move outside it.

## 2.1.1

### Fixes

- Fix `n-select` selection overflow counter wrong popover trigger area

## 2.1.0

### Breaking Changes

- `n-popover` default `duration` is set to `100`.
- `n-popover` default `delay` is set to `100`.
- `n-tooltip` default `showArrow` is set to `true`.

### Feats

- `n-config-provider` prop `theme-overrides` support inheritance.
- `n-card` add `hoverable` prop.
- `n-select` add `max-tag-count` prop.
- `n-cascader` add `max-tag-count` prop.
- `n-popover` add `get-disabled` prop.
- add `n-ellipsis` component.
- `n-popover`'s `width` prop add `'trigger'` option.
- `n-data-table`'s columns's `ellipsis` prop can be set as props of `n-ellipsis`.

### Fixes

- Fix `n-cascader` menu appears after click clear button.
- Fix `n-card`'s action not placed at bottom after style height is set.
- Fix `n-popover`'s `duration` and `delay` prop works unexpectly.

## 2.0.1

### Feats

- `n-layout-sider` add `default-collapsed` prop.
- `n-modal` support custom position.

### Fixes

- Fix `n-menu` tooltip of `n-menu-item` won't show when vertical collapsed.
- Fix `n-menu` `collapsed-icon-size` not working.
- Fix `n-menu` callback props validate array with error.
- Fix `n-layout-sider` toggle button is covered.

## 2.0.0

See vue3.md

## 1.6.0

### Fixes

- Fix the problem that `n-auto-complete`'s menu can't be closed when use `textarea` as input.
- Fix the problem that nested `n-icon` is not flattened.
- Fix the problem that `n-date-picker` has no year in panel when type is `date` and `datetime`.

### Feats

- `n-button` add `dashed` props
- Add `n-space` component.
- Make `n-drawer` content scrollable.

### Localization

- Add zhCN for `n-log`

## 1.5.5 (2020-08-15)

### Breaking Changes

- Fix all typos of `separator`. (Originally it was `seperator`.)

### Fixes

- Fix the problem that when theme is not set, style errors will be logged.
- Fix the text color of `n-select`'s placeholder when `single` `filterable`.

## 1.5.4 (2020-08-08)

### Fixes

- Fix the problem that Message, Notification, Confirm doesn't follow theme change.

## 1.5.3 (2020-07-23)

### Fixes

- Fix the problem that `n-select` display with mistakes when `placeholder` is empty.

## 1.5.2 (2020-07-22)

### Fixes

- Fix the problem that `n-radio` can not be focused.
- Fix the problem that `n-data-table`'s `max-height` style is broken. https://bugs.chromium.org/p/chromium/issues/detail?id=1107223

### Refactors

- Refactor `n-tag` styles.

## 1.5.1 (2020-07-20)

### Feats

- Add `disabled` for `n-time-picker`.

### Fixes

- Fix the child elements of `n-radio` cannot focus.

## 1.5.0 (2020-07-09)

### Breaking Changes

- Refactor experimental setting primary color feature.

### Fixes

- Fix some style glitches.

## 1.4.1 (2020-06-23)

### Feats

- Add `autofocus` for `n-select`.

## 1.4.0 (2020-06-19)

### Breaking Changes

- `n-menu` doesn't support slot API anymore.

### Feats

- Add experimental setting primary color feature.

## 1.3.5 (2020-06-06)

### Feats

- Add `attr-type` for `n-button`

### Fixes

- Fix the problem that if `n-input` is too width, its inner input elements' width won't expand.
- Fix style glitches of border of a `n-input-number` inside a `n-input-group`.

## 1.3.4 (2020-06-05)

### Fixes

- Fix the problem that `n-a`'s `to` prop can't be a object.

## 1.3.3 (2020-06-03)

### Feats

- Add `$NOs.theme` to get the current theme of the OS.

## 1.3.2 (2020-06-02)

### Fixes

- Fix the problem that `n-log`'s loading indicator uses monospace font.
- Fix the problem that icon-related class name isn't applied properly.

## 1.3.1 (2020-06-01)

### Fixes

- Fix the problem that checkbox in the selection column of `n-data-table` is not center aligned.
- Fix the problem that header of `n-data-table` has no border-color transition.
- Fix the problem that `show-icon` & `closable` & `bordered` props of `$NConfirm` don't work.

### Feats

- Add and adjust some colors in the style scheme of `n-config-consumer`.

## 1.3.0 (2020-06-01)

### Breaking Changes

- Default UI CSS bundle won't include external font files. If you need using it you should import it explicitly.

### Feats

- Add `themed-style` prop on `n-layout`.

### Fixes

- Fix the problem that round toggle button won't rotate `n-layout-sider` when collapsed status is changed.
- Fix the problem that `n-form-item`'s feedback has no leave animation if it is set at first.
- Fix the problem that max-height related styles of `n-data-table` are applied all the time.
- Fix some style glitches.

### Refactors

- Refactor some components' styles in the light theme.

## 1.2.1 (2020-05-29)

### Fixes

- Fix the problem that `n-slider` tooltip has no z-index.

## 1.2.0 (2020-05-29)

### Feats

- Add `feedback` and `validation-status` props for `n-form-item`.

## 1.1.5 (2020-05-28)

### Feats

- Add `display-directive` prop for `n-collapse` and `n-collapse-item`.
- Add `class` and `style` prop for `n-select`'s `option`.
- Add `debug` prop for `n-select`.

### Fixes

- Fix the problem that `n-select` can still be cleared when disabled.

## 1.1.4 (2020-05-28)

### Fixes

- Fix the problem that the input value of `n-select` may be modified directly.

### Refactors

- An UI instance can be install to a Vue instance for no more than once.

## 1.1.3 (2020-05-20)

### Chores

- Update css-render dependencies.

### Fixes

- Fix the problem that `n-transfer`'s animation disorder when value changes.

## 1.1.2 (2020-05-19)

### Feats

- Add content slot for `n-step`.
- Add `label` prop for `n-checkbox`.

### Performance Improvements

- All placeable components register listeners on demand.
- Use cache when finding scrollable parent node.
- Imporve performance of `n-button`'s beforeDestroy.
- Reduce the useless re-rendering of `n-checkbox` when checked status isn't changed.
- Imporve performance of text typed `n-avatar`.

## 1.1.1 (2020-05-18)

### Fixes

- Update css-render dependencies.
- Color of default typed button icon.

### Performance Improvements

- Reduce useless re-renders of `n-menu-item`.
- Reduce useless re-renders of doc page.

### Refactors

- Refactor the codes of `n-nimbus-service-layout` for performance reason, may be there will be some bugs.

## 1.1.0 (2020-05-16)

### Feats

- `n-button` now accepts custom color.

### Refactors

- Replace all $slots by $scopedSlots for better robustness.
- Move some static button styles inside button component to create dynamically.

## 1.0.14 (2020-05-15)

### Fixes

- Fix the problem that `line` typed `n-tabs`'s line position stays still when `activeName` changes.
- Fix the problem that `n-tabs` scroll button is not triggered when tabs' width changes.
- Fix the problem that height change of `n-tabs` will unexpectly trigger some re-render callbacks.

## 1.0.13 (2020-05-14)

### Fixes

- Fix the problem that label slot of the `n-form-item-col` & `n-form-item-row` cannot display.

## 1.0.12 (2020-04-30)

### Fixes

- Fix the problem that some CSS length props are badly formated.

## 1.0.11 (2020-04-30)

### Feats

- Add `fallback-option` prop for `n-select` to deal with the value with no corresponding option.

### Fixes

- Fix the problem that `max-height` and `min-height` are ill displayed on `n-data-table`.

### Breaking Changes

- `n-data-table`'s `max-height` and `min-height` will be applied to the entire table part, not only body.
- `n-select` will display value with no corrensponding option.

## 1.0.10 (2020-04-28)

### Feats

- Add `arrow-placement` prop on `n-collapse`.
- Add `arrow` slot on `n-collapse-item`.

### Fixes

- Fix the problem that detachable components detached in wrong place when nested like `modal > drawer > component`.

## 1.0.9 (2020-04-23)

### Feats

- Add `autofocus` prop on `n-input`.
- Add `closable` option on `NMessage`.

### Fixes

- Fix the problem that the default value of `n-tag` `closable` is set to `true`.
- Fix the problem that `n-data-table` can't use all `pagination`'s props.
- Fix the problem that `n-pagination`'s `on-page-size-change` prop doesn't work.

## 1.0.8 (2020-04-22)

### Feats

- Add `n-dynamic-tags`.
- Add `tableHeaderOverlayBackgroundColor` & `inputOverlayBackgroundColor` to `styleScheme`

## 1.0.7 (2020-04-10)

### Feats

- Add `filter-option-value` prop for `n-data-table`'s `column` to better deal with single filter mode.

### Fixes

- Fix the problem that `n-collpase-item` don't support `number` typed `name`.

## 1.0.6 (2020-04-03)

### Fixes

- Fix the problem that all the `console` statements are stripped in the bundle.

## 1.0.5 (2020-03-27)

### Feats

- Change the data type of `n-data-table`'s filters from Array to Object.

### Fixes

- `n-data-table` cannot be filtered correctly when there are multiple filtered columns.

## 1.0.4 (2020-03-26)

### Feats

- Filter menu in `n-data-table` is scrollable when there are too many items.

## 1.0.3 (2020-03-25)

### Feats

- `$NMessage`, `$NNotification`, `$NConfirm`'s theme will be applied on their children components.

### Fixes

- View measuring element will confict when multiple naive-ui exist.
- `validate` method of `n-form-item` won't be resolved for some validator.
- `$NConfirm`'s theme doesn't follow `n-config-provider`'s theme.

## 1.0.2 (2020-03-23)

### Fixes

- `n-transfer`'s options are not reinitialized after value changes.
- `n-nimbus-service-layout` (deprecated) doesn't deal with the compatibility of Vue Router(under 3.1)'s `push` method.

## 1.0.1 (2020-03-21)

### Feats

- Add `'bar'` & `'arrow-circle'` on `show-trigger` prop of `n-layout-sider`.

### Fixes

- Rails of `n-scrollbar` shadow mouse event.

### Feats

- `n-date-table` add `empty` slot. [#86](https://github.com/TuSimple/naive-ui/issues/86)
