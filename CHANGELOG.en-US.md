# CHANGELOG
## 1.1.1 (2020-05-18)
### Fixes
- Update css-render dependencies.
- Color of default typed button icon.
### Performance Imporvements
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