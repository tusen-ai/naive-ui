# CHANGELOG

## 1.4.1 (2020-06-23)
### Features
- Add `autofocus` for `n-select`.

## 1.4.0 (2020-06-19)
### Breaking Changes
- `n-menu` not support slot API anymore.
### Features
- Add experimental setting primary color feature.

## 1.3.5 (2020-06-06)
### Features
- Add `attr-type` for `n-button`
### Fixes
- Fix the problem that if `n-input` is too width, its inner input elements' width won't expand.
- Fix style glitches of border of a `n-input-number` inside a `n-input-group`.

## 1.3.4 (2020-06-05)
### Fixes
- Fix the problem that `n-a`'s `to` prop can't be a object.

## 1.3.3 (2020-06-03)
### Features
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
### Features
- Add and adjust some colors in the style scheme of `n-config-consumer`.

## 1.3.0 (2020-06-01)
### Breaking Changes
- Default UI CSS bundle won't include external font files. If you need using it you should import it explicitly.
### Features
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
### Features
- Add `feedback` and `validation-status` props for `n-form-item`.

## 1.1.5 (2020-05-28)
### Features
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
### Features
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
### Features
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
### Features
- Add `fallback-option` prop for `n-select` to deal with the value with no corresponding option.
### Fixes
- Fix the problem that `max-height` and `min-height` are ill displayed on `n-data-table`.
### Breaking Changes
- `n-data-table`'s `max-height` and `min-height` will be applied to the entire table part, not only body.
- `n-select` will display value with no corrensponding option.

## 1.0.10 (2020-04-28)
### Features
- Add `arrow-placement` prop on `n-collapse`.
- Add `arrow` slot on `n-collapse-item`.
### Fixes
- Fix the problem that detachable components detached in wrong place when nested like `modal > drawer > component`.

## 1.0.9 (2020-04-23)
### Features
- Add `autofocus` prop on `n-input`.
- Add `closable` option on `NMessage`.
### Fixes
- Fix the problem that the default value of `n-tag` `closable` is set to `true`.
- Fix the problem that `n-data-table` can't use all `pagination`'s props.
- Fix the problem that `n-pagination`'s `on-page-size-change` prop doesn't work.

## 1.0.8 (2020-04-22)
### Features
- Add `n-dynamic-tags`.
- Add `tableHeaderOverlayBackgroundColor` & `inputOverlayBackgroundColor` to `styleScheme`

## 1.0.7 (2020-04-10)
### Features
- Add `filter-option-value` prop for `n-data-table`'s `column` to better deal with single filter mode.
### Fixes
- Fix the problem that `n-collpase-item` don't support `number` typed `name`.

## 1.0.6 (2020-04-03)
### Fixes
- Fix the problem that all the `console` statements are stripped in the bundle.

## 1.0.5 (2020-03-27)
### Features
- Change the data type of `n-data-table`'s filters from Array to Object.
### Fixes
- `n-data-table` cannot be filtered correctly when there are multiple filtered columns.

## 1.0.4 (2020-03-26)
### Features
- Filter menu in `n-data-table` is scrollable when there are too many items.

## 1.0.3 (2020-03-25)
### Features
- `$NMessage`, `$NNotification`, `$NConfirm`'s theme will be applied on their children components.
### Fixes
- View measuring element will confict when multiple naive-ui exist.
- `validate` method of `n-form-item`  won't be resolved for some validator.
- `$NConfirm`'s theme doesn't follow `n-config-provider`'s theme.

## 1.0.2 (2020-03-23)
### Fixes
- `n-transfer`'s options are not reinitialized after value changes.
- `n-nimbus-service-layout` (deprecated) doesn't deal with the compatibility of Vue Router(under 3.1)'s `push` method.

## 1.0.1 (2020-03-21)
### Features
- Add `'bar'` & `'arrow-circle'` on `show-trigger` prop of `n-layout-sider`.
### Fixes
- Rails of `n-scrollbar` shadow mouse event.