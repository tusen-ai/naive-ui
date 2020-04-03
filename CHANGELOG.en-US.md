# CHANGELOG
## 1.0.6 （2020-04-03）
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