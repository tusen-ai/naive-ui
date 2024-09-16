# CHANGELOG

## NEXT_VERSION

`xxxx-xx-xx`

### Breaking Changes

- Fix `n-config-provider` inherit the class prefix from it's parent by default, closes [#5970](https://github.com/tusen-ai/naive-ui/issues/5970).
- Fix `n-date-picker` default `weekFormat` that year and week standards are different and use local week and local year

### Fixes

- Fix `n-infinite-scroll` bottoming out judgment error, closes [#6133](https://github.com/tusen-ai/naive-ui/issues/6133).
- Fix `n-slider`'s rail may have styling issue in `vertical` mode when global box-sizing is overrided, closes [#6114](https://github.com/tusen-ai/naive-ui/issues/6114).
- Fix `n-tabs` has style issue when using `prefix` slot, `suffix` slot or `addable` prop with vertical placement, closes [#6059](https://github.com/tusen-ai/naive-ui/issues/6059), [#6060](https://github.com/tusen-ai/naive-ui/pull/6060).
- Fix `n-upload` can only upload a maximum of 100 files in certain old browsers when uploading directories, closes [#6027](https://github.com/tusen-ai/naive-ui/issues/6027).
- Fix `n-date-picker`'s `input-readonly` prop not work in the panel's input for `'datetime'` or `'datetimerange'`.
- Fix `n-menu` can't apply HTML attributes correctly on the component when `responsive` is set.
- Fix `n-float-button` error when used with `popover` component, closes [#5933](https://github.com/tusen-ai/naive-ui/issues/5933).
- Fix `n-badge` unable to mask focus element border, closes [#5929](https://github.com/tusen-ai/naive-ui/issues/5929)
- Fix `n-button` font-weight CSS variable name error, closes [#5922](https://github.com/tusen-ai/naive-ui/issues/5922)
- Fix `n-icon`'s `component` prop not accepting FunctionalComponent.
- Fix `n-mention`'s panel is misplaced if `placement` is set to `'top'` or padding is set to component's style, closes [#6241](https://github.com/tusen-ai/naive-ui/issues/6241).
- Fix `n-carousel` transition not working as expected, closes [#5993](https://github.com/tusen-ai/naive-ui/issues/5993).
- Fix `n-dialog`, props types now correct if passed getter or ref, added new example of async dialog

### Features

- `n-scrollbar` adds `x-placement` and `y-placement` props, closes [#6089](https://github.com/tusen-ai/naive-ui/issues/6089).
- `n-date-picker` adds `clear` `now` `confirm` slot, closes [#6013](https://github.com/tusen-ai/naive-ui/issues/6013).
- `n-upload` adds `on-retry` prop, closes [#6031](https://github.com/tusen-ai/naive-ui/issues/6031)
- Adds `n-highlight` component.
- `n-slider` `marks` prop to support render function, closes [#5967](https://github.com/tusen-ai/naive-ui/issues/5967)
- `n-transfer` `source-title` `target-title` prop to support render function, closes [#6004](https://github.com/tusen-ai/naive-ui/issues/6004)
- `n-empty` `size` prop to support `tiny` size.
- `n-config-provider` adds `style-mount-target` prop to control where to mount components' style.
- `n-cascader` filter ignore case sensitive.
- `n-data-table` adds `allowExport` prop for column.
- `n-date-picker` adds `year-range` prop.
- `n-tree-select` adds `header` slot, closes [#5915](https://github.com/tusen-ai/naive-ui/issues/5915).

## 2.39.0

`2024-07-15`

### Breaking Changes

- Fix `n-input-number` Exception when the value is a string in precision mode, closes [#6091](https://github.com/tusen-ai/naive-ui/issues/6091).

### Fixes

- Fix `n-form-item` validation state is not correctly updated [#6068](https://github.com/tusen-ai/naive-ui/issues/6068).
- Fix `n-select`'s header make inner input unavailable, closes [#6030](https://github.com/tusen-ai/naive-ui/issues/6030).
- Fix `n-tree` may have incorrect node selection status when `show-irrelevant-nodes` is disabled, close [#6115](https://github.com/tusen-ai/naive-ui/issues/6115).

### Features

- `n-data-table` adds `filter-icon-popover-props` prop, closes [#6111](https://github.com/tusen-ai/naive-ui/issues/6111).
- `n-input-number` adds `round` prop, closes [#6097](https://github.com/tusen-ai/naive-ui/issues/6097).
- `n-color-picker` add `on-clear` props.
- `n-upload`'s `on-preview` prop adds `detail.event` parameter. You can use `preventDefault` to prevent default anchor link open behavior. Closes [#6036](https://github.com/tusen-ai/naive-ui/issues/6036).
- `n-data-table` adds `thColorSorting`, `thColorSortingModal`, `thColorSortingPopover`, `tdColorSorting`, `tdColorSortingModal` and `tdColorSortingPopover` theme variables, closes [#6118](https://github.com/tusen-ai/naive-ui/issues/6118), [#6120](https://github.com/tusen-ai/naive-ui/issues/6120)

### i18n

- Add azAZ locale.
- Add uzUZ locale.

## 2.38.2

`2024-05-03`

### Fixes

- Fix `n-menu` Submenu's wai-aria role is not correct, closes [#5729](https://github.com/tusen-ai/naive-ui/issues/5729).
- Fix `n-tabs` style bug with type is `segment`，closes [#5728](https://github.com/tusen-ai/naive-ui/issues/5728).
- Fix the get\*String() methods for UTC/locale mismatch, closes [#5702](https://github.com/tusen-ai/naive-ui/issues/5702).
- Fix `n-dialog` / `n-modal` calling `destroy` method may throw error.
- Fix `useModal` setting `card` preset without corresponding props in `n-card` slots, closes [#5746](https://github.com/tusen-ai/naive-ui/issues/5746).
- Fix `Submenu` component's wai-aria role setting error of `n-menu`，closes [#5729](https://github.com/tusen-ai/naive-ui/issues/5729).
- Fix the `common` type error in the `theme-overrides` prop when modifying components' themes.
- Fix `n-split` may emit value less than `0`.

### Features

- `n-watermark` support multi-lines in content.
- Adds `n-infinite-scroll` component.
- `n-watermark` adds `text-align` prop.
- `n-qr-code` adds `type` prop, Customize rendering output by setting `type`, providing two options: `canvas` and `svg`.
- `n-card` adds `action`, `content`, `cover`, `footer` and `header-extra` props.
- `n-card`'s `title` prop supports render function.
- `n-upload` expose the `index` arg in `on-remove` function, closes [#5747](https://github.com/tusen-ai/naive-ui/issues/5747).
- `n-upload` exports `UploadOnDownload`, `UploadOnRemove`, `UploadOnFinish` and `UploadOnChange` types.
- `n-dialog` adds `action-class`, `action-style`, `content-class`, `content-style`, `title-class` and `title-style` props.
- `n-split` adds `pane1-class`, `pane1-style`, `pane2-class` and `pane2-style` props.
- `n-mention` adds `filter` method, closes [#5721](https://github.com/tusen-ai/naive-ui/pull/5721).
- `n-slider` adds wai-aria support.
- `n-date-picker` adds `time-picker-format` prop.
- `n-form-item` adds `feedback-class` and `feedback-style` props.
- `n-split` supports using pixel unit string as `value`.
- `n-scrollbar` adds `content-style` and `content-class` props, closes [#4497](https://github.com/tusen-ai/naive-ui/issues/4497).
- `n-image` adds `render-toolbar` prop.
- `n-cascader` adds `get-column-style` prop.
- `n-cascader` adds `get-render-prefix` prop.
- `n-cascader` adds `get-render-suffix` prop.
- `n-image` optimizes download icon style.
- `n-scrollbar` adds `height`, `width`, `radius`, `railInsetHorizontal`, `railInsetVertical` and `railColor` theme variables.

### i18n

- Add csCZ locale.
- Add missing itIT locale translations

## 2.38.1

`2024-02-26`

### Fixes

- Fix `n-split`'s `min` attribute does not take effect.
- Fix `n-result` built-in icons not re-rendered after hydration.
- Fix `n-tabs` whose `type` is `'segment'` has capsule with wrong width and position after resize, closes [#5705](https://github.com/tusen-ai/naive-ui/issues/5705).
- Fix `n-tabs`'s capsule wrong width and position after resize within `n-modal`, closes [#5569](https://github.com/tusen-ai/naive-ui/issues/5569).
- Fix `n-split` doesn't work with `inline-theme-disabled` prop.
- Fix `n-float-button` doesn't work with `inline-theme-disabled` prop.

### Features

- `n-date-picker` adds `default-calendar-start-time` props when `type` is `'date'`/`'datetime'` or `'week'`, closes [#4493](https://github.com/tusen-ai/naive-ui/issues/4493).
- `n-tree-select` adds `get-children` prop.

## 2.38.0

`2024-02-22`

### Breaking Changes

- Fix `n-scrollbar`'s `scrollTo(x: number, y: number)` error where the order of method parameters does not match the document.

### Fixes

- Fix `n-tree`'s `override-default-node-click-behavior` prop may conflict with default switcher click or checkbox click behavior.
- Fix `n-scrollbar`'s typo on `aria-hidden` attribute.
- Fix `n-form-item`'s feedback may hide and show again, closes [#5583](https://github.com/tusen-ai/naive-ui/issues/5583).
- Fix `n-popselect`'s header make inner input unavailable, closes [#5494](https://github.com/tusen-ai/naive-ui/pull/5494).
- Fix `n-qr-code`'s style of size.
- Fix `n-badge` affects child elements' text color.

### Features

- 🌟 Adds `n-modal-provider` component and `useModal` method.
- 🌟 Adds `n-float-button` and `n-float-button-group` component.
- 🌟 Provides ES module bundle at `/dist/index.mjs` and `/dist/index.prod.mjs`.
- `n-auto-complete` adds `append` prop.
- `n-select` add native `title` attribute when `filterable` and blur input.
- `n-split` adds `size` prop and `on-update:size` prop.
- `n-split` adds `watch-props` prop, closes [#5526](https://github.com/tusen-ai/naive-ui/issues/5526).
- `n-drawer` adds `borderRadius` theme variable.
- adds `n-float-button` component.
- Provides ES module bundle.

### i18n

- Add `etEE` locale.

## 2.37.3

`2024-01-09`

### Fixes

- Fix `n-split` has no color if it's not used in a card.

## 2.37.2

`2024-01-09`

### Fixes

- `n-data-table`'s `downloadCsv` method will export selection & expand column.

## 2.37.1

`2024-01-08`

### Fixes

- Click clear button on components with popup may trigger reopen behaviors.
- Fix `n-form`'s `validate` returned `Promise` may not `resolve`.

### Features

- `n-collapse` adds `trigger-areas` prop.
- `n-date-picker`'s `is-date-disabled` callback prop supports get detail info of date/year/month/quarter button as parameter, closes [#4649](https://github.com/tusen-ai/naive-ui/issues/4649).
- `n-auto-complete` adds `empty` slot.
- `n-auto-complete` adds `show-empty` prop.

## 2.37.0

`2024-01-07`

### Breaking Changes

- `module` prop in `package.json` is changed from `es/index.js` to `es/index.mjs`

### Fixes

- Fix `n-space` vnode reuse problem caused by filtering out comment nodes of slot, closes [#5136](https://github.com/tusen-ai/naive-ui/issues/5136).
- Fix `n-data-table`'s prop `pagination`'s `default-page-size` and `default-page` not work in uncontrolled mode, closes [#5201](https://github.com/tusen-ai/naive-ui/issues/5201).
- Fix `n-time-picker` formatting (format="HH: mm: ss. SSS") preventing modification of milliseconds in the edit box, closes [#5224](https://github.com/tusen-ai/naive-ui/issues/5224).
- Fix `n-notification` notification clips out of screen when screen width is less than 400px wide.
- Fix `n-carousel` transition effect incorrect when using the `slide` effect in loop mode with only two elements, closes [#4323](https://github.com/tusen-ai/naive-ui/issues/4323).
- Fix `n-carousel` trigger incorrect `current-index` value on arrow button click with single image, closes [#5130](https://github.com/tusen-ai/naive-ui/issues/5130).
- Fix `n-upload-trigger` in directory drag mode with a lot of files, some of the files are not read.
- Fix `n-dynamic-tags`'s abnormal behavior when using keyboard to trigger add button, closes [#5077](https://github.com/tusen-ai/naive-ui/issues/5077).
- Fix `n-tree` leaf node line color.
- Fix `n-collapse-item` cursor pointer to correct element, closes [#5482](https://github.com/tusen-ai/naive-ui/issues/5482).
- Fix `n-data-table` throws error if summary config has empty column.
- Fix `n-drawer`'s `on-mask-click` may be called multiple times.
- Fix `n-tree`'s `data` When the data source 'data' switches several times according to a certain scene, some logic of animation processing can cause errors in rendering the displayed data, closes [#5217](https://github.com/tusen-ai/naive-ui/issues/5217)
- Fix `n-radio` value's native input element's checked value is not updated, closes [#5184](https://github.com/tusen-ai/naive-ui/issues/5184).
- Fix `n-data-table` height incorrect when set `min-height` in empty state，closes [#5108](https://github.com/tusen-ai/naive-ui/issues/5108).
- Fix `n-tabs`'s bar not hidden when `value` is set manually to the value other than the children `n-tab`s, closes [#5100](https://github.com/tusen-ai/naive-ui/issues/5100).
- Fix `n-spin` abnormal animation, closes [#3556](https://github.com/tusen-ai/naive-ui/issues/3556).
- Fix `n-avatar`'s lazy loading and `fallback-src` prop not working when load error in lazy, closes [#5007](https://github.com/tusen-ai/naive-ui/issues/5007).
- <del>Fix `n-split` has no color if it's not used in a card.</del>
- Fix `n-card` `footer-class` prop not working.
- Fix `n-input` click clear icon to trigger twice when using the `clearable`, closes [#5510](https://github.com/tusen-ai/naive-ui/issues/5510).
- Fix `n-tabs` may miss over-scroll shadow if `placement` is `'left'` or `'right'`.
- Fix `n-date-picker` with range type can input start time that is later than end time, closes [#5544](https://github.com/tusen-ai/naive-ui/issues/5544).

### Features

- 🌟 Adds `n-flex` component.
- 🌟 `n-date-picker`'s `type` prop supports `'week'`.
- 🌟 `n-data-table` adds `downloadCsv` method, closes [#4260](https://github.com/tusen-ai/naive-ui/issues/4260).
- 🌟 `n-date-picker` adds `month-format`, `year-format` and `quarter-format` props, closes [#4891](https://github.com/tusen-ai/naive-ui/issues/4891).
- 🌟 `n-tree` adds `override-default-node-click-behavior` prop.
- 🌟 `n-tree-select` adds `override-default-node-click-behavior` prop.
- `n-space` adds `reverse` prop.
- `n-input` adds `clear` method, closes [#5423](https://github.com/tusen-ai/naive-ui/issues/5423).
- `n-time-picker` adds `'clear'` action, closes [#5334](https://github.com/tusen-ai/naive-ui/issues/5334).
- `n-select` supports RTL.
- `n-data-table` supports RTL.
- `n-dialog` supports RTL.
- `n-date-picker` adds `on-prev-month` `on-next-month` `on-prev-year` `on-next-year` prop, closes [#5350](https://github.com/tusen-ai/naive-ui/issues/5350).
- `n-input-number` adds `input-props` prop, closes [#5450](https://github.com/tusen-ai/naive-ui/issues/5450).
- Update `ruRU` locale.
- `n-drawer` adds `content-class` prop.
- `n-drawer-content` adds `body-class` `body-content-class` `footer-class` and `header-class` props.
- `n-tree` adds multiple `scrollTo` configurations.
- `n-form` adds `level` property from `FormItemRule` to show abnormal values but not block submit.
- `n-cascader` adds `ellipsis-tag-popover-props` prop.
- `n-select` adds `ellipsis-tag-popover-props` prop.
- `n-tree-select` adds `ellipsis-tag-popover-props` prop.
- `n-avatar-group` adds `expand-on-hover` prop.
- `n-tabs` adds `tab-class`, `add-tab-style` and `add-tab-class` props.
- `n-tree` adds `override-default-node-click-behavior` prop.
- `n-tree-select` adds `override-default-node-click-behavior` prop.
- Adds `n-flex` component.
- `n-pagination` adds `show-quick-jump-dropdown` prop, closes [#5251](https://github.com/tusen-ai/naive-ui/issues/5251).

## 2.36.0

`2023-12-18`

### Fixes

- Fix `n-tree` unexposed line color variable `--n-line-color`, closes [#5339](https://github.com/tusen-ai/naive-ui/issues/5339).
- Fix `n-tree` The style of the selected node is not displayed in the case of 'disabled'.
- Fix `n-tree` on `virtual-scroll` empty data placeholder lost problem.
- Fix `n-watermark` won't clear it's content when `content` prop is set to empty.
- Fix `n-tree` use `render-switcher-icon` prop to customize switcher icon will cause node selection, closes [#5380](https://github.com/tusen-ai/naive-ui/issues/5380).
- Fix `n-input` will display the password reveal button by default when the `type` is set to `password`. Starting with Microsoft Edge browser Version 87. closes [#5384](https://github.com/tusen-ai/naive-ui/issues/5384).
- Fix `n-radio-button` css var `buttonColor` not working.
- Fix `n-input` not display vertical scrollbar when `type` is `textarea` and the inline theme is disabled, closes [#5418](https://github.com/tusen-ai/naive-ui/issues/5418).
- Fix if `inline-theme-disabled` is set, custom color whose params include decimal won't work in `n-tag`, `n-avatar`, `n-badge`, `n-button`, `n-rate`.
- Fix `n-tabs`'s border height in `vertical` mode.
- Fix `n-tree`'s node's hover color has higher priority than selected color in `block-line` mode.
- Fix `n-tree` click expand switch causes checkbox being checked.

### Features

- `n-tree` adds `treeGetClickTarget` method to get click target of node click event, closes [#5375](https://github.com/tusen-ai/naive-ui/issues/5375).
- `n-space` adds `item-class` prop.
- `n-layout` adds `content-class` prop.
- `n-layout-sider` adds `collapsed-trigger-class` and `trigger-class` props.
- `n-spin` adds `content-class` and `content-style` props.
- `n-popover` adds `arrow-class`, `arrow-wrapper-class`, `arrow-wrapper-style`, `content-class`, `footer-class` and `header-class` props.
- `n-notification-provider` adds `container-class` prop.
- `n-message-provider` adds `container-class` prop.
- `n-loading-bar-provider` adds `container-class` prop.
- `n-thing` adds `content-class` and `description-class` props.
- `n-card` adds `content-class`, `footer-class`, `header-class` and `header-extra-class` props.
- `n-descriptions` adds `content-class` and `label-class` props.
- `n-upload` adds `file-list-class` and `trigger-class` props.
- `n-dynamic-tags` adds `input-class` and `tag-class` props.
- `n-dynamic-input` adds `item-class` prop.
- `n-slider` adds `on-dragstart` `on-dragend` prop, closes [#5365](https://github.com/tusen-ai/naive-ui/issues/5365).
- `n-dialog` adds `close` slot.
- `n-equation` export the `EquationProps` type.
- `n-popselect` adds `header` slot.
- `n-tree-select` adds `watch-props` prop.
- Adds `n-split` component, closes [#3557](https://github.com/tusen-ai/naive-ui/issues/3557).
- Adds `n-virtual-list` component.
- Adds `n-qr-code` component, closes [#2535](https://github.com/tusen-ai/naive-ui/issues/2535).
- `n-menu` add `responsive` prop, it will collapse overflow menu items in horizontal mode.
- `n-menu` add `deriveResponsiveState` method.

## 2.35.0

`2023-10-02`

### Breaking Changes

- `n-input`'s `suffix` to the back of `loading`, close [#4685](https://github.com/tusen-ai/naive-ui/issues/4685).
- Fix `n-log`'s `silent` attribute spelling problem, closes [#4875](https://github.com/tusen-ai/naive-ui/issues/4875).

### Fixes

- Fix `n-radio` export `radioProps` dosen't not includes `theme-overrides`.
- Fix `n-description-item`'s `span` doesn't work when `n-descriptions`'s `label-placement` is `'top'` if there's only single line, closes [#4874](https://github.com/tusen-ai/naive-ui/issues/4874).
- Fix `n-upload`'s `data` prop type can't include `Blob` element.
- Fix `n-select` allows option to be created with existed label, closes [#4703](https://github.com/tusen-ai/naive-ui/issues/4703)
- Fix `n-upload`'s `render-icon` prop's type.
- Fix `n-auto-complete`'s `onSelect` type, closes [#4617](https://github.com/tusen-ai/naive-ui/issues/4617).
- Fix `n-grid-item`'s suffix prop won't work with responsive config, closes [#4635](https://github.com/tusen-ai/naive-ui/issues/4635)
- Fix `n-tabs`'s `paneWrapperStyle` prop missing height after animation
- Fix `n-tree` should check all items instead of uncheck all if indeterminate checkbox is clicked, closes [#4941](https://github.com/tusen-ai/naive-ui/issues/4941).
- Fix the Popover was not displayed when the `n-internal-selection` was disabled and the mouse was moved over the '+n' tag. closes [#4789](https://github.com/tusen-ai/naive-ui/issues/4789)
- Fix `n-input` doesn't display the vertical scroll bar when `type` is `textarea`, closes [#4570](https://github.com/tusen-ai/naive-ui/issues/4570).
- Fix `n-alert`'s content style problem, when there is no title and use closable, closes [#4588](https://github.com/tusen-ai/naive-ui/issues/4588).
- Fix `n-select`'s `empty` slot action then it is an interactive component, closes [#4700](https://github.com/tusen-ai/naive-ui/issues/4700).
- Fix `n-data-table` header and body's scrolling are not sync when using the keyboard, closes [#3941](https://github.com/tusen-ai/naive-ui/issues/3941).
- Fix `n-data-table` drag column causing text selection in Safari, closes [#4957](https://github.com/tusen-ai/naive-ui/issues/4957).
- Fix `n-data-table` ellipsis content in table cell would wrap with expand button when using tree data, closes [#3755](https://github.com/tusen-ai/naive-ui/issues/3755).
- Fix `useLoadingBar` can't finish loading when called `finish` method, closes [#4965](https://github.com/tusen-ai/naive-ui/issues/4965).
- Fix `n-select` can still trigger focus and blur event in the disabled state, closes [#4454](https://github.com/tusen-ai/naive-ui/issues/4454).
- Fix `n-steps` may have line wrap issue if step is more than 9.
- Fix `n-grid` v-show reports errors when switching multiple times, closes [#4422](https://github.com/tusen-ai/naive-ui/issues/4422).
- Fix `n-tree`'s `TreeOption`'s `checkboxDisabled` prop doesn't work when `check-on-click` is `true`.
- Fix rapid clicks on `n-date-input`'s buttons triggering a text select for the rest of the website.
- Fix `n-auto-complete`'s autocomplete menu's unexpected open when clicking the clear icon with the input not focused, closes [#4658](https://github.com/tusen-ai/naive-ui/issues/4658).
- Fix `n-input`'s `on-keyup` prop type, closes [#5101](https://github.com/tusen-ai/naive-ui/issues/5101)
- Fix `n-data-table`'s default sorter to place null values at the very top or bottom, closes [#5281](https://github.com/tusen-ai/naive-ui/issues/5281).
- Fix `n-popconfirm`'s action button should not be triggered multiple times，closes [#4687](https://github.com/tusen-ai/naive-ui/issues/4687).

### Features

- `n-drawer` adds `max-height`, `min-height`, `max-width` and `max-width` props.
- `n-progress` supports indicator slot when the `indicator-placement` is set to `'inside'` in the `'line'` type, closes [#4888](https://github.com/tusen-ai/naive-ui/issues/4888).
- `n-image-preview` adds `downaload` button, closes [#4302](https://github.com/tusen-ai/naive-ui/issues/4302).
- `n-transfer` adds `select-all-text` and `clear-text` prop, closes [#4910](https://github.com/tusen-ai/naive-ui/issues/4910).
- `n-tree` adds `scrollbar-props` prop, closes [#4021](https://github.com/tusen-ai/naive-ui/issues/4666).
- `n-select` adds `focusInput` `blurInput` methods.
- `n-tree-select` adds `focusInput` `blurInput` methods.
- `n-image-group` adds `on-preview-prev` `on-preview-next` prop.
- `n-tree` adds `show-line` prop, closes [#3796](https://github.com/tusen-ai/naive-ui/issues/3796), [#4554](https://github.com/tusen-ai/naive-ui/pull/4554).
- `n-tree` adds node information for `render-switcher-icon` props, closes [#4815](https://github.com/tusen-ai/naive-ui/issues/4815).
- `n-input-number` export the `select` method.
- `n-data-table` adds `n-data-table-tr--expanded` class to expanded rows, and `n-data-table-tr n-data-table-tr--expand` class to the additional row, closes [#4420](https://github.com/tusen-ai/naive-ui/issues/4420).
- `n-spin` adds `delay` prop.
- Adds `n-performant-ellipsis` component.
- `DataTableBaseColumn` adds `ellipsisComponent` prop.

### i18n

- Update `zhTW` locale.
- Add `svSE` locale.
- Update `jaJP` locale.

## 2.34.4

`2023-05-21`

### Fixes

- Fix `n-notification`'s `description` does not wrap when there is English, closes [#4609](https://github.com/tusen-ai/naive-ui/issues/4609).
- Fix `n-dynamic-input` can't access `value[index]` by `index` passed in `on-remove` prop.
- Fix `n-dynamic-input` doesn't return correct `index` in `on-create` callback.
- Fix `trTR` i18n, closes [#4231](https://github.com/tusen-ai/naive-ui/issues/4231).
- Fix `n-input`'s show password icon is offset when use both `password` and `disabled`, closes [#4364](https://github.com/tusen-ai/naive-ui/issues/4364).
- Fix `n-image` set `fallback-src` prop and lazy loading dosen't work, closes[#4480](https://github.com/tusen-ai/naive-ui/issues/4480).
- Fix `n-upload` warning cause by extraneous non-props attributes were passed to vue component `TransitionGroup` but could not be automatically inherited, closes [#4447](https://github.com/tusen-ai/naive-ui/issues/4447).
- Fix `n-menu` `show` `default` attribute spelling problem, closes [#4750](https://github.com/tusen-ai/naive-ui/issues/4750).
- Fix `n-icon-wrapper`'s theme error, closes [#4768](https://github.com/tusen-ai/naive-ui/issues/4768).

### Feats

- `n-dynamic-input` adds `action` slot, closes [#3981](https://github.com/tusen-ai/naive-ui/issues/3981).
- `n-dynamic-input` add `disabled` prop, closes [#4055](https://github.com/tusen-ai/naive-ui/issues/4055).
- `n-data-table` adds `titleAlign` prop, closes [#3954](https://github.com/tusen-ai/naive-ui/issues/3954).
- `n-rate` exposes `index` in the default slot, closes [#4413](https://github.com/tusen-ai/naive-ui/issues/4413).
- `n-scrollbar` adds `size` prop, closes [#3896](https://github.com/tusen-ai/naive-ui/issues/3896).
- `n-data-table`'s `render-expand-icon` add `expanded` param, closes [#4439](https://github.com/tusen-ai/naive-ui/issues/4439).
- `n-tabs` adds `pane-wrapper-class` `pane-wrapper-style` prop.
- `n-collapse` adds `titlePadding` theme variable, closes [#4728](https://github.com/tusen-ai/naive-ui/issues/4728).
- `n-tabs` adds `placement` prop.

### i18n

- Update `zhTW` locale.
- Add `faIR` locale.

## 2.34.3

`2022-12-24`

### Fixes

- Fix `n-progress`'s `indicator-text-color` prop doesn't work when `indicator-placement` is `'inside'`.
- Fix `n-image` error while operating the previewed image, closes [#4157](https://github.com/tusen-ai/naive-ui/issues/4157).
- Fix `n-tree` cannot access `mergedFilterRef` before initialization error, closes [#4134](https://github.com/tusen-ai/naive-ui/issues/4134).
- Fix `n-menu` can't override submenu dropdown's `trigger` by `dropdown-props`, closes [#4147](https://github.com/tusen-ai/naive-ui/issues/4147).
- Fix `n-ellipsis` cannot be closed when using `keep-alive`, closes [#4079](https://github.com/tusen-ai/naive-ui/issues/4079).
- Fix `n-upload` doesn't show thumbnail for file with image type file name, closes [#4198](https://github.com/tusen-ai/naive-ui/issues/4198).
- Fix `n-input` style bug of tiny size with autosize prop, closes [#4167](https://github.com/tusen-ai/naive-ui/issues/4167).
- Fix `n-image` & `n-avatar` in `lazy` mode, after setting the `intersection-observer-options` `rootMargin` attribute, the preload does not take effect.

### Feats

- `n-tree` adds `get-children` prop, closes [#4128](https://github.com/tusen-ai/naive-ui/issues/4128).
- `n-badge` adds `offset` prop, closes [#4149](https://github.com/tusen-ai/naive-ui/issues/4149).
- `n-card` adds `tag` prop.
- demos can now use `<script setup />`.
- `n-pagination` adds `select-props` prop, closes [#4199](https://github.com/tusen-ai/naive-ui/issues/4199).
- `n-select` adds `show-on-focus` prop, closes [#4191](https://github.com/tusen-ai/naive-ui/issues/4191).
- `n-pagination` adds `goto` prop, closes [#4133](https://github.com/tusen-ai/naive-ui/issues/4133).
- `n-upload` won't set `file` field of file info to `null` after file is uploaded, closes [#3868](https://github.com/tusen-ai/naive-ui/issues/3868).
- `n-form` adds `labelFontWeight` theme variable, closes [#3516](https://github.com/tusen-ai/naive-ui/issues/3516).
- `n-radio` adds `labelFontWeight` theme variable, closes [#3516](https://github.com/tusen-ai/naive-ui/issues/3516).
- `n-checkbox` adds `labelFontWeight` theme variable, closes [#3516](https://github.com/tusen-ai/naive-ui/issues/3516).
- `n-tree`'s `on-load` prop allows returned promise to resolve `false` to finish loading effect, closes [#4038](https://github.com/tusen-ai/naive-ui/issues/4038).

### i18n

- Update koKr locale.

## 2.34.2

`2022-11-22`

### Fixes

- Fix `n-config-provider`'s katex type issue.
- Fix `n-image` error in toolbar operation during preview, closes [#4144](https://github.com/tusen-ai/naive-ui/issues/4144).

## 2.34.1

`2022-11-21`

### Fixes

- Fix `n-select` will print useless content in console in multiple select mode.
- Fix `n-tree` misses `getCheckedData` and `getIndeterminateData` methods, closes [#4064](https://github.com/tusen-ai/naive-ui/issues/4064).
- Fix `n-data-table`'s column's `align` doesn't work for table header, closes [#4063](https://github.com/tusen-ai/naive-ui/issues/4063).

## 2.34.0

`2022-11-21`

### Breaking Changes

- Wrap a `div` container around the columns of `n-data-table` to optimize the layout of filter button, closes [#3853](https://github.com/tusen-ai/naive-ui/issues/3853).

### Feats

- 'themeOverRides' provide `labelFontWeight` for `n-form`, `n-radio`, `n-checkbox`, closes[#3516](https://github.com/tusen-ai/naive-ui/issues/3516)
- `n-avatar-group` exports `AvatarGroupOption` type, closes [#3879](https://github.com/tusen-ai/naive-ui/issues/3879).
- `n-transfer` adds `show-selected` prop, closes [#3711](https://github.com/tusen-ai/naive-ui/issues/3711).
- `n-data-table` adds `loading` slot, closes [#3865](https://github.com/tusen-ai/naive-ui/issues/3865).
- `n-mention` adds `on-update:show` prop, closes [#3882](https://github.com/tusen-ai/naive-ui/issues/3882).
- `n-tree` adds trigger node information for `on-update:expanded-keys`, `on-update:checked-keys` and `on-update:selected-keys` props, closes [#3885](https://github.com/tusen-ai/naive-ui/issues/3885).
- `n-tree-select` adds trigger node information for `on-update:expanded-keys` and `on-update:value` props, closes [#3885](https://github.com/tusen-ai/naive-ui/issues/3885).
- `n-tree` adds `getCheckedData` method.
- `n-tree` adds `getIndeterminateData` method.
- `n-tree-select` adds `getCheckedData` method.
- `n-tree-select` adds `getIndeterminateData` method.
- `n-tree-select` adds `focus` method.
- `n-tree-select` adds `blur` method.
- `n-cascader` adds `getCheckedData` method.
- `n-cascader` adds `getIndeterminateData` method.
- `n-input` adds `count-graphemes` prop, closes [#3967](https://github.com/tusen-ai/naive-ui/issues/3967).
- `n-cascader` adds `not-found` slot, closes [#3862](https://github.com/tusen-ai/naive-ui/issues/3862).
- `n-avatar` adds `img-props` prop, closes [#3963](https://github.com/tusen-ai/naive-ui/issues/3963).
- `n-data-table` adds `spin-props` prop, closes [#3649](https://github.com/tusen-ai/naive-ui/issues/3649).
- `n-button` adds `render-icon` prop, closes [#4007](https://github.com/tusen-ai/naive-ui/issues/4007).
- Add `n-equation` component.
- `n-image` adds `previewed-img-props` prop.
- `n-data-table` adds `scrollbar-props` prop, closes [#4021](https://github.com/tusen-ai/naive-ui/issues/4021).
- `n-upload` adds `should-use-thumbnail-url` prop, closes [#3861](https://github.com/tusen-ai/naive-ui/issues/3861).
- `n-upload` adds `render-icon` prop.
- `n-tree`'s `render-switcher-icon` prop is passed with `expanded` & `selected` state.
- `useDialog`'s option support `transformOrigin`, closes [#3901](https://github.com/tusen-ai/naive-ui/issues/3901).

### Fixes

- Fix `n-image` can be dragged by any button on mouse in preview mode, closes [#3950](https://github.com/tusen-ai/naive-ui/issues/3950).
- Fix `n-form-item`'s label text is in wrong position when `label-align="left"` and `require-mark-placement="left"` and `label-placement="left"`, closes [#3871](https://github.com/tusen-ai/naive-ui/issues/3871).
- Fix `n-tree`'s dragging causes partial white screen in Chrome and Edge with version 106, closes [#3909](https://github.com/tusen-ai/naive-ui/issues/3909).
- Fix `n-select` shows wrong value in select box after `value-field` is set and `max-tag-count="responsive"` and remove selected option in overflow tag's popover, closes [#3869](https://github.com/tusen-ai/naive-ui/issues/3869).
- Fix `n-ellipsis` won't overflow in `n-card`'s title, closes [#3935](https://github.com/tusen-ai/naive-ui/issues/3935).
- Fix `n-timeline-item`'s `line-type="dashed"` not working when `n-timeline`'s `horizontal` is set, closes [#4014](https://github.com/tusen-ai/naive-ui/issues/4014).
- Fix `n-popover` doesn't wrap line if word is too long.
- Fix `n-date-picker` can't delete all input content in some cases, closes [#3922](https://github.com/tusen-ai/naive-ui/issues/3922).
- Fix `n-input`'s `autosize` prop doesn't work properly if there are multiple spaces, closes [#4027](https://github.com/tusen-ai/naive-ui/issues/4027).
- Fix `n-pagination`'s `endIndex` maybe incorrect in last page, closes [#4057](https://github.com/tusen-ai/naive-ui/issues/4057).
- Fix `n-image` doesn't prevent space pressing scroll behavior in preview mode, closes [#3919](https://github.com/tusen-ai/naive-ui/issues/3919).

### i18n

- Add arDZ locale.
- Add trTR locale.

## 2.33.5

`2022-10-12`

### Fixes

- Fix `n-data-table` throws error on tree data check action, closes [#3832](https://github.com/tusen-ai/naive-ui/issues/3832).

## 2.33.4

`2022-10-06`

### Fixes

- Fix `n-timeline-item`'s `title`'s `margin-bottom` can't be set by theme variable, closes [#3722](https://github.com/tusen-ai/naive-ui/issues/3722).
- Fix `n-timeline-item`'s `meta` part's `margin-bottom` is overrided when nested in horizontal and vertical mode.
- Fix `n-tree-select` would remove selected first option if it's clicked when placed in `label` tag, closes [#3715](https://github.com/tusen-ai/naive-ui/issues/3715).
- Fix `n-popover` will show after `disabled` is set to `true` then `false` if it's shown at first.
- Fix `n-select`'s overflow popover won't hide after removing all options in it when `maxTagCount="responsive"`, closes [#3801](https://github.com/tusen-ai/naive-ui/issues/3801).
- Fix `n-upload` may only allow selecting directory in Firefox, closes [#3798](https://github.com/tusen-ai/naive-ui/issues/3798).
- Remove `package.json`'s `exports` field due to its poor compatibility, closes [#3786](https://github.com/tusen-ai/naive-ui/issues/3786).
- Fix `createDiscreteApi` throws error in SSR environment, closes [#3813](https://github.com/tusen-ai/naive-ui/issues/3813).
- Fix `n-tree-select` has wrong focus behavior when `filterable` and in single select mode.
- Fix `n-input-number` may not update input when value is set in `on-blur` callback.

### Feats

- `n-collapse-item`'s `header-extra` & `header` slots support `collapsed` param, closes [#3723](https://github.com/tusen-ai/naive-ui/issues/3723).
- `n-loading-bar-provider` adds `to` prop, closes [#3724](https://github.com/tusen-ai/naive-ui/issues/3724).
- `n-data-table`'s `on-update:checked-row-keys` will pass current row data and state, closes [#3626](https://github.com/tusen-ai/naive-ui/issues/3626).
- `n-data-table` column adds `resizable` prop, closes [#3165](https://github.com/tusen-ai/naive-ui/issues/3165).
- `createDiscreteApi` contains Vue app in returned value.
- Export `LayoutContentInst` type, closes [#3743](https://github.com/tusen-ai/naive-ui/issues/3743).
- Export `CarouselInst` type, closes [#3742](https://github.com/tusen-ai/naive-ui/issues/3742).
- `n-collapse` adds `itemMargin` theme variable, closes [#3788](https://github.com/tusen-ai/naive-ui/issues/3788).
- `n-select` adds `ignore-composition` prop, closes [#3789](https://github.com/tusen-ai/naive-ui/issues/3789).
- `n-card` exports `CardSegmented` type, closes [#3775](https://github.com/tusen-ai/naive-ui/issues/3775).
- `n-date-picker` adds `next-month` slot, closes [#3570](https://github.com/tusen-ai/naive-ui/issues/3570).
- `n-date-picker` adds `next-year` slot, closes [#3570](https://github.com/tusen-ai/naive-ui/issues/3570).
- `n-date-picker` adds `prev-month` slot, closes [#3570](https://github.com/tusen-ai/naive-ui/issues/3570).
- `n-date-picker` adds `prev-year` slot, closes [#3570](https://github.com/tusen-ai/naive-ui/issues/3570).
- `n-pagination` adds `to` prop, closes [#3773](https://github.com/tusen-ai/naive-ui/issues/3773).
- `n-avatar` adds `render-placeholder` prop, closes [#3751](https://github.com/tusen-ai/naive-ui/issues/3751).
- `n-avatar` adds `render-fallback` prop, closes [#3751](https://github.com/tusen-ai/naive-ui/issues/3751).
- `n-avatar` adds `fallback` slot
- `n-transfer` adds `render-target-list` prop.
- `n-select` adds `show-checkmark` prop, closes [#3749](https://github.com/tusen-ai/naive-ui/issues/3749).
- `n-tree` adds `animated` prop, closes [#3784](https://github.com/tusen-ai/naive-ui/issues/3784).
- `n-slider` adds `markFontSize` theme variable, closes [#3820](https://github.com/tusen-ai/naive-ui/issues/3820).
- `n-avatar-group` adds `gap` theme variable, closes [#3819](https://github.com/tusen-ai/naive-ui/issues/3819).

## 2.33.3

`2022-09-13`

### Feats

- `n-dialog` adds `onAfterLeave` in DialogOptions Properties, closes [#3662](https://github.com/tusen-ai/naive-ui/issues/3662).
- `n-dynamic-tags` export `DynamicTagsOption` type, closes [#3677](https://github.com/tusen-ai/naive-ui/issues/3677).
- `n-upload` adds `responseType` prop, closes [#3666](https://github.com/tusen-ai/naive-ui/issues/3666).
- `n-dropdown`'s `DropdownOption` adds `show` prop, closes [#3703](https://github.com/tusen-ai/naive-ui/issues/3703).
- `n-data-table` adds `summary-placement` prop, closes [#3681](https://github.com/tusen-ai/naive-ui/issues/3681).
- `n-tabs` will scroll to active tab, closes [#3683](https://github.com/tusen-ai/naive-ui/issues/3683).

### Performance

- Fix `n-menu`'s `value` will cause useless rendering of menu item, closes [#3670](https://github.com/tusen-ai/naive-ui/issues/3670).

### Fixes

- Fix `n-date-picker`'s style is unexpected in `inline-theme-disabled` mode, closes [#3655](https://github.com/tusen-ai/naive-ui/issues/3655).
- Fix `n-data-table` can't set `n-dropdown`'s `theme-overrides`, closes [#3613](https://github.com/tusen-ai/naive-ui/issues/3613).
- Fix `n-carousel` displays abnoramlly if `transform: scale` style is set, closes [#3684](https://github.com/tusen-ai/naive-ui/issues/3684).
- Fix `n-tree`'s node is disabled after `checkboxDisabled` is set, closes [#3620](https://github.com/tusen-ai/naive-ui/issues/3620).
- Fix `n-tree`'s switcher won't work when `:show-irrelevant-nodes="false"` is set & being searched, closes [#3647](https://github.com/tusen-ai/naive-ui/issues/3647).
- Fix `n-progress`'s graph may overflow if `type="circle"` and `stroke-width` is too large, closes [#3638](https://github.com/tusen-ai/naive-ui/issues/3638).

## 2.33.2

`2022-09-01`

### Fixes

- Fix UMD bundle doesn't work, closes [#3642](https://github.com/tusen-ai/naive-ui/issues/3642).
- Fix `n-calendar`'s displayed month doesn't follow `default-value`, closes [#3645](https://github.com/tusen-ai/naive-ui/issues/3645).
- Fix `n-form-item`'s `require-mark-placement` prop not working when set to `left`, closes [#3628](https://github.com/tusen-ai/naive-ui/issues/3628).
- Fix `n-upload`'s `OnBeforeUpload` return type can only be `Promise<boolean>`.

### Feats

- `n-radio` adds `colorActive` theme variable, closes [#3610](https://github.com/tusen-ai/naive-ui/issues/3610).

## 2.33.1

`2022-08-29`

### Fixes

- Fix could not resolve "@vicons/ionicons5" error, closes [#3616](https://github.com/tusen-ai/naive-ui/issues/3616).

## 2.33.0

`2022-08-29`

### Breaking Changes

- `n-rate`'s `default-value` prop's default value is changed from `0` to `null`.

### Fixes

- Fix `n-select`'s menu missing option check mark in SSR mode, closes <https://github.com/07akioni/naive-ui-nuxt-demo/issues/4>
- Fix `n-card`'s `embedded` prop not work in `n-dialog`, closes [#3592](https://github.com/tusen-ai/naive-ui/issues/3592).
- Fix `n-radio` warning when value prop type is boolean, closes [#3540](https://github.com/tusen-ai/naive-ui/issues/3540).
- Fix `n-tree` content width may overflow container, closes [#3561](https://github.com/tusen-ai/naive-ui/issues/3561).
- Fix `n-form-item` label text may overflow when it's left placement, closes [#3593](https://github.com/tusen-ai/naive-ui/issues/3593).

### Feats

- `n-menu` adds `disabled-field` prop.
- `n-rate` adds `clearable` prop.
- `n-slider` adds `keyboard` prop, closes [#3528](https://github.com/tusen-ai/naive-ui/issues/3528).
- Add `useDialogReactiveList` method, closes [#2041](https://github.com/tusen-ai/naive-ui/issues/2041).
- `DialogReactive` supports `onAfterEnter` prop, closes [#3569](https://github.com/tusen-ai/naive-ui/issues/3569).
- `DialogOptions` supports `class` prop, closes [#3591](https://github.com/tusen-ai/naive-ui/issues/3591).

## 2.32.2

`2022-08-19`

### Fixes

- Fix `n-menu` extra not working in submenu, closes [#3390](https://github.com/tusen-ai/naive-ui/issues/3390).
- Fix `n-tree` can't expand node with `type='group'`, closes [#3388](https://github.com/tusen-ai/naive-ui/issues/3388).
- Fix `n-pagination`'s' `default-page-size` prop doesn't follows `page-sizes` prop, closes [#3369](https://github.com/tusen-ai/naive-ui/issues/3369).
- Added `exports` field in package.json [#3410](https://github.com/tusen-ai/naive-ui/pull/3410).
- Fix `n-dropdown` option prefix & suffix's z-index, closes [#3433](https://github.com/tusen-ai/naive-ui/issues/3433).
- Fix `n-input-number`'s peers theme can't be configured, closes [#3422](https://github.com/tusen-ai/naive-ui/issues/3422).
- Fix `n-tag` pointer should be not allow when disabled, closes [#3494](https://github.com/tusen-ai/naive-ui/issues/3494).
- Fix `n-transfer` throws error if value has no corresponding option, closes [#3406](https://github.com/tusen-ai/naive-ui/issues/3406).
- Fix `n-data-table` column `onSelect`'s type, closes [#3430](https://github.com/tusen-ai/naive-ui/issues/3430).
- Fix `n-pagination` don't trigger quick jumper on quick jumper blur, closes [#3387](https://github.com/tusen-ai/naive-ui/issues/3387).
- Fix some components works abnormally in open mode shadow DOM, closes [#3281](https://github.com/tusen-ai/naive-ui/issues/3281).
- Fix `n-carousel` in `loop='true'` and `effect='slide'`, When there are only two elements, the transition switching effect of the rotation is opposite, closes [#3414](https://github.com/tusen-ai/naive-ui/issues/3413).
- Fix `n-input` can't input value after compositing is interrupted by rerender, closes [#3503](https://github.com/tusen-ai/naive-ui/issues/3503).
- Fix `n-layout`'s `embedded` prop not working after `n-config-provider` has set `inline-theme-disabled`, closes [#3500](https://github.com/tusen-ai/naive-ui/issues/3500).
- Fix `n-input` has duplicate placeholder if disabled, closes [#3467](https://github.com/tusen-ai/naive-ui/issues/3467).
- Fix `n-date-picker`'s `iconColor` theme variable not working, closes [#3501](https://github.com/tusen-ai/naive-ui/issues/3501).
- Fix `n-time-picker`'s `iconColor` theme variable not working, closes [#3501](https://github.com/tusen-ai/naive-ui/issues/3501).
- Fix `n-select`'s `node-props` prop doesn't work.
- Fix Nuxt report `CSSRender is not a function` error on preview, closes [#3506](https://github.com/tusen-ai/naive-ui/issues/3506).
- Fix `n-data-table`'s rows disabled by `column.expandable` can still be expanded, closes [#3373](https://github.com/tusen-ai/naive-ui/issues/3373).
- Fix `n-input-number` click add or minus button quickly may trigger value change loop, closes [#3329](https://github.com/tusen-ai/naive-ui/issues/3329).
- Fix `n-switch` some theme variables can't use non-px value, closes [#2938](https://github.com/tusen-ai/naive-ui/issues/2938).
- Fix `n-input` with `resize` & `type="textarea"` set can't be resized in some cases, closes [#3479](https://github.com/tusen-ai/naive-ui/issues/3479).
- Fix `n-countdown`'s `reset` method doesn't work in `onFinish` callback, closes [#3536](https://github.com/tusen-ai/naive-ui/issues/3536).

### Feats

- `n-menu`'s `MenuOption` add `show` prop to set whether the Menu option is displayed, closes [#3334](https://github.com/tusen-ai/naive-ui/issues/3334).
- `n-alert` adds `bordered` prop, closes [#3358](https://github.com/tusen-ai/naive-ui/issues/3358).
- `n-tag` add `trigger-click-on-close` prop, closes [#3343](https://github.com/tusen-ai/naive-ui/issues/3343).
- `n-cascader` adds `disabled-field` prop, closes [#3338](https://github.com/tusen-ai/naive-ui/issues/3338).
- `n-list` adds `clickable` prop.
- `n-list` adds `hoverable` prop.
- `n-list` adds `show-divider` prop.
- `n-thing` adds `content-style` prop.
- `n-thing` adds `description-style` prop.
- `n-data-table` adds `render-expand-icon` prop.
- `n-tree` adds `disabled-field` prop.
- `n-tree` adds `keyboard` prop, closes [#3438](https://github.com/tusen-ai/naive-ui/issues/3438).
- `n-tree-select` adds `disabled-field` prop.
- `n-collapse-item` adds `disabled` prop, closes [#3408](https://github.com/tusen-ai/naive-ui/issues/3408).
- `n-pagination` adds `simple` prop.
- `n-cascader` adds `arrow` slot, closes [#3459](https://github.com/tusen-ai/naive-ui/issues/3459).
- `n-transfer` adds `source-filterable` prop, closes [#3407](https://github.com/tusen-ai/naive-ui/issues/3407).
- `n-transfer` adds `target-filterable` prop, closes [#3407](https://github.com/tusen-ai/naive-ui/issues/3407).
- `n-transfer`'s `filter` prop adds `from` param.
- `n-list` supports RTL.
- `n-drawer` supports RTL.
- `n-input` adds `render-count` prop.
- `n-input` adds `countTextColorDisabled` theme variable, closes [#3481](https://github.com/tusen-ai/naive-ui/issues/3481).
- `n-statistic` adds `valueFontSize` theme variable, closes [#3510](https://github.com/tusen-ai/naive-ui/issues/3510).
- `n-data-table` adds `sticky-expanded-rows` to allow expanded content remains sticky, closes [#3485](https://github.com/tusen-ai/naive-ui/issues/3485).
- `n-tree` adds `scrollTo` method, closes [#3480](https://github.com/tusen-ai/naive-ui/issues/3480).
- `n-pagination` adds `display-order` prop, closes [#3466](https://github.com/tusen-ai/naive-ui/issues/3466).
- `n-grid` adds `layout-shift-disabled` prop, closes [#3301](https://github.com/tusen-ai/naive-ui/issues/3301).

## 2.32.1

`2022-07-30`

### Fixes

- Fix `n-drawer`'s warning when using `string` in `default-height` prop, closes [#3377](https://github.com/tusen-ai/naive-ui/issues/3377).
- Fix `n-transfer`'s `on-update:value` is not triggered when uncheck options, closes [#3393](https://github.com/tusen-ai/naive-ui/issues/3393).

### Feats

- `n-steps` supports RTL.

## 2.32.0

`2022-07-28`

### Breaking Changes

- `n-transfer`'s UI is totally refactored. The original transfer component is renamed as `n-legacy-transfer` and will be removed in next major version.

### Fixes

- Fix `n-date-picker` will cancel selecting in range mode if click at disabled confirm button, closes [#3254](https://github.com/tusen-ai/naive-ui/issues/3254).
- Fix `n-button`'s `focusable` prop doesn't work, closes [#3292](https://github.com/tusen-ai/naive-ui/issues/3292).
- Fix `n-upload`'s `on-error` & `on-finish` props don't allow `() => void` type, closes [#3290](https://github.com/tusen-ai/naive-ui/issues/3290).
- Fix `n-select`'s placeholder may overflow if it's long.
- Fix `n-input` has is no indent at the prefix if `type="textarea"` and `:autosize="true"`, closes [#3238](https://github.com/tusen-ai/naive-ui/issues/3238).
- Fix `n-select` focus loss when click `action` slot in `filterable` and `multiple`, closes [#3247](https://github.com/tusen-ai/naive-ui/issues/3247).
- Fix `n-carousel`'s `autoplay` prop be `true` `hover` can't stop the play, closes [#3304](https://github.com/tusen-ai/naive-ui/issues/3304).
- Fix `n-tree` may throw error on node selection `expanded-keys`, closes [#3319](https://github.com/tusen-ai/naive-ui/issues/3319).
- Fix `n-avatar` shows placeholder after load fails, closes [#3315](https://github.com/tusen-ai/naive-ui/issues/3315).
- Fix `n-input-number` register `mouseup` event multiple times when hold on button.
- Fix all components' exported props type's prop is `readonly`.
- Fix `n-tree`'s `check-on-click` prop sometimes doesn't work.
- Fix `n-progress`'s `offset-degree` prop behaves incorrectly.

### Feats

- `n-checkbox-group`'s `on-update:value` prop adds trigger checkbox's value to params, closes [#3277](https://github.com/tusen-ai/naive-ui/issues/3277).
- `n-tree` supports RTL.
- `n-input` adds `scrollTo` method, closes [#3280](https://github.com/tusen-ai/naive-ui/issues/3280).
- `n-legacy-grid` supports RTL.
- `n-statistic` supports RTL.
- `n-thing` supports RTL.
- `n-transfer` add `render-source-label` prop.
- `n-transfer` add `render-target-label` prop.
- `n-transfer` add `render-source-list` prop.
- `n-scrollbar` supports RTL.
- `useDialog` supports `onEsc` prop.
- `n-watermark` adds `global-rotate` prop.
- `n-notification` add `keepAliveOnHover` props to control whether the notification will be closed when mouse hover, closes [#3249](https://github.com/tusen-ai/naive-ui/issues/3249).

## 2.31.0

`2022-07-07`

### Breaking Changes

- `n-date-picker`'s `clearable` will control visibility of clear button if no `action` is set, closes [#1196](https://github.com/tusen-ai/naive-ui/issues/1196).
- `n-button`'s `native-focus-behavior` prop default value is changed to 'not on Safari'.

### Fixes

- Fix `n-data-table`'s column `render` prop's `index` param sequence exception when in expandable row, closes [#3153](https://github.com/tusen-ai/naive-ui/issues/3153).
- Fix `n-data-table` column's `colSpan` doesn't work correctly in virtual scroll mode, closes [#3052](https://github.com/tusen-ai/naive-ui/issues/3052).
- Fix `n-data-table` doesn't show `summary` row in virtual scroll mode, closes [#3202](https://github.com/tusen-ai/naive-ui/issues/3202).
- Fix `n-carousel` has wrong hierarchical relationship between when `effect` is `fade`, closes [#3227](https://github.com/tusen-ai/naive-ui/issues/3227).
- Fix `n-carousel` cannot slide under IOS, closes [#3106](https://github.com/tusen-ai/naive-ui/issues/3106).
- Fix `n-carousel` losing the size of content elements when rendering, closes [#3078](https://github.com/tusen-ai/naive-ui/issues/3078).
- Fix `n-cascader`'s filter menu doesn't show option path, closes [#3220](https://github.com/tusen-ai/naive-ui/issues/3220).
- Fix `n-cascader`'s `filter` prop may not get correct `path`.
- Fix `n-date-picker` menu's quarter text isn't same having `type="quarterrange"` and `type="quarter"`, closes [#3217](https://github.com/tusen-ai/naive-ui/issues/3217).
- Fix `n-notification`'s leave animation if content height overflows screen.
- Fix `n-dropdown`'s disabled option has hover style.
- Fix `n-dropdown`'s menu may shift when it's entering.
- Fix `n-dropdown`'s transform origin may not be correct in Chrome.
- Fix `n-radio-button` may not have correct cursor style, closes [#3243](https://github.com/tusen-ai/naive-ui/issues/3243).
- Fix `n-input`'s text color is too shallow with disabled state in Safari, closes [#3241](https://github.com/tusen-ai/naive-ui/issues/3241).
- Fix `n-input`'s separator may have line wrap.
- Fix all components' `user-select` style prop's effect on Safari.
- Fix `n-data-table` will prevent page scroll in virtual scroll mode.
- Fix `n-button` doesn't have pressed effect on Firefox.

### Feats

- `n-avatar` adds `lazy` prop.
- `n-avatar` adds `intersection-observer-options` prop.
- `n-number-animation` adds `on-finish` prop.
- `n-notification` supports RTL.
- Export all components' props object.
- `n-popover` adds `footer-style` prop.
- `n-popover` adds `footer` slot, closes [#3188](https://github.com/tusen-ai/naive-ui/issues/3188).
- `n-dropdown` adds `menu-props` prop, closes [#2885](https://github.com/tusen-ai/naive-ui/issues/2885).
- `n-data-table` adds `multiple` prop, closes [#3056](https://github.com/tusen-ai/naive-ui/issues/3056).
- `n-date-picker` would disable confirm button if end date is not selected, closes [#3226](https://github.com/tusen-ai/naive-ui/issues/3226).
- `n-tree` adds `check-on-click` prop to control `checked` status, closes [#2968](https://github.com/tusen-ai/naive-ui/issues/2968).
- `n-tree` adds `accrodion` prop, closes [#3129](https://github.com/tusen-ai/naive-ui/issues/3129).
- `n-countdown` adds `reset` method, closes [#3228](https://github.com/tusen-ai/naive-ui/issues/3228).
- `n-drawer` adds `resizable` prop.
- `n-drawer` adds `default-width` prop.
- `n-drawer` adds `default-height` prop.
- `n-drawer` adds `on-update:width` prop.
- `n-drawer` adds `on-update:height` prop.
- Update ukUA locale.
- `n-message` supports RTL.

## 2.30.8

`2022-06-29`

### Fixes

- Fix `n-select`'s menu transition style, closes [#3211](https://github.com/tusen-ai/naive-ui/issues/3211).

## 2.30.7

`2022-06-29`

### Fixes

- Fix `n-tabs`'s `bar-width` props invalid when `0` set, closes [#3171](https://github.com/tusen-ai/naive-ui/issues/3171).
- Fix `n-drawer` has log warnings of console when use `show-mask` prop, closes [#3172](https://github.com/tusen-ai/naive-ui/issues/3172).
- Fix `n-button` doesn't omit content if content is wrapped in ellipsis container, closes [#3178](https://github.com/tusen-ai/naive-ui/issues/3178).
- Fix `n-select` will remove select value in multiple mode in `form` if Enter key is pressed in input element. Closes [#3169](https://github.com/tusen-ai/naive-ui/issues/3169).
- Fix `n-select`'s filter prop not working, closes [#3175](https://github.com/tusen-ai/naive-ui/issues/3175).
- Fix `n-modal`'s mask may overlay over content if no preset is used, closes [#3204](https://github.com/tusen-ai/naive-ui/issues/3204).
- Fix `n-button`'s icon doesn't align correctly if it's too big or small.
- Fix `n-select`'s created options may repeat multiple times in menu, closes [#3206](https://github.com/tusen-ai/naive-ui/issues/3206).

### Feats

- `n-date-picker`'s `type` prop supports `'quarterrange'` and `'yearrange'`.
- `n-tree-select` adds `render-prefix` prop.
- `n-tree-select` adds `render-suffix` prop.
- `n-tree-select` adds `render-switcher-icon` prop.
- `n-tree-select` adds `node-props` prop.
- `n-tree-select` adds `render-label` prop, closes [#3197](https://github.com/tusen-ai/naive-ui/issues/3197).
- `n-tree-select` adds `render-tag` prop.
- `n-notification` adds `titleFontSize`, `metaFontSize`, `descriptionFontSize` theme variables.

## 2.30.6

`2022-06-22`

### Fixes

- Fix `n-color-picker` can't input alpha value correctly manually.
- Fix some components don't work correctly if `__VUE_OPTIONS_API__` is set to `false`, closes [#3146](https://github.com/tusen-ai/naive-ui/issues/3146).
- Fix `n-grid` doesn't adjust it's content to fit responsive config in SSR page, closes [#2462](https://github.com/tusen-ai/naive-ui/issues/2462).
- Fix `n-modal` when many instances are activated at same time, `on-mask-click` will be triggered on every modal even only one mask is clicked [#3147](https://github.com/tusen-ai/naive-ui/issues/3147).
- Fix `n-data-table`'s column `ellipsis` prop's type doesn't allow `style` prop.
- Fix `n-data-table`'s column will lose box shadow when set to `ellipsis` & `fixed` simultaneously, closes [#3145](https://github.com/tusen-ai/naive-ui/issues/3145).
- Fix `n-image`'s `lazy` prop doesn't work on Safari & Firefox.

## 2.30.5

`2022-06-20`

### Fixes

- Fix `n-input-group-label`'s content is abnormal in `n-drawer-content`, closes [#3115](https://github.com/tusen-ai/naive-ui/issues/3115).
- Fix `n-back-top` has log warnings of console when use `show` prop, closes [#3122](https://github.com/tusen-ai/naive-ui/issues/3122).
- Fix `volar.d.ts` components' type is `any`.
- Fix `n-grid-item` may not display correctly if `v-show` is used, closes [#3123](https://github.com/tusen-ai/naive-ui/issues/3123).
- Fix `n-select` clears input value on mouse enter when it's clearable and using IME.

### Feats

- 🌟 `n-image` adds `lazy` prop, closes [#3055](https://github.com/tusen-ai/naive-ui/issues/3055).
- `n-image` adds `intersection-observer-options` prop.
- `n-image` adds `placeholder` slot.
- Exports `NTooltipInst` type.
- `n-data-table` adds `render-cell` prop, closes [#3095](https://github.com/tusen-ai/naive-ui/issues/3095).
- `n-space` adds `wrap-item` prop.
- `n-data-table`'s `on-update:checked-row-keys` will pass row data, closes [#2215](https://github.com/tusen-ai/naive-ui/issues/2215), closes [#2265](https://github.com/tusen-ai/naive-ui/pull/2265)

## 2.30.4

`2022-06-15`

### Fixes

- Fix `n-button` is focused after click with `:focusable="false"`, closes [#3071](https://github.com/tusen-ai/naive-ui/issues/3071).
- Fix `n-data-table` fixed selection may overlap with other fixed columns if it's width is not default, closes [#3067](https://github.com/tusen-ai/naive-ui/issues/3067).
- Fix `n-popselect` doesn't trigger `on-update:show` when it select value then menu is closed.
- Fix `n-popselect`'s width can't be set via `style`.
- Fix `n-date-picker`'s year & month quick jump may be disabled after `is-date-disabled` is set, closes [#3068](https://github.com/tusen-ai/naive-ui/issues/3068).
- Fix `n-layout` won't keep scroll state in `keep-alive` component, closes [#3054](https://github.com/tusen-ai/naive-ui/issues/3054).
- Fix `n-layout-sider` won't keep scroll state in `keep-alive` component.
- Fix `n-tree` may trigger loading multiple times.
- Fix `n-tree` throws error on async expanding data with `:expand-on-click="true"`, closes [#3089](https://github.com/tusen-ai/naive-ui/issues/3089).
- Fix `n-slider`'s tooltip has no enter transition when it's triggered by keyboard.
- Fix `n-slider` mark text's line wrap isn't correct when it appears at right-most position.
- Fix `n-upload`'s inner anchor element may show focus-visible outline style.
- Fix `n-upload` shows slot warning when `list-type="image-card"`.
- Fix `n-upload` image's corner may overflow item when `list-type="image-card"`.
- Fix `n-dynamic-tags`'s `on-create` prop not working.
- Fix virtual scroll stucking issue introduced by Chrome 102, closes [#3048](https://github.com/tusen-ai/naive-ui/issues/3048).
- Fix `n-upload-dragger` is almost transparent if disabled.

### Feats

- 🌟 `n-pagination` adds dropdown menu for fast jump button.
- 🌟 `n-input` adds `allow-input` prop.
- 🌟 `n-data-table` adds `default-expand-all` prop, closes [#3073](https://github.com/tusen-ai/naive-ui/issues/3073).
- 🌟 `n-modal` with inner popup component like `n-select` can handle esc key pressing correctly, closes [#2973](https://github.com/tusen-ai/naive-ui/issues/2973).
- `n-tree-select` adds `arrow` slot, closes [#3084](https://github.com/tusen-ai/naive-ui/issues/3084).
- `n-cascader` will show corresponding submenu after checkbox is clicked, closes [#3079](https://github.com/tusen-ai/naive-ui/issues/3079).
- `n-upload` will disable dragger when maximum number of files was reached.
- `n-select` adds `node-props` prop.
- `n-popselect` adds `node-props` prop.
- `n-popselect` adds `virtual-scroll` prop.
- `n-data-table` adds `scrollTo` method, closes [#2570](https://github.com/tusen-ai/naive-ui/issues/2570).
- `n-slider` adds `thumb` slot.

## 2.30.3

`2022-06-09`

### Fixes

- Fix `n-cascader`'s overflow count tag's popover can't scroll after `filterable` is set, closes [#3061](https://github.com/tusen-ai/naive-ui/issues/3061).
- Fix `n-drawer`'s `show-mask` prop will warn if `'transparent'` is passed.
- Fix `n-calendar` doesn't call `on-panel-change` when date of other months is clicked, closes [#3063](https://github.com/tusen-ai/naive-ui/issues/3063).

### Feats

- 🌟 UMD usage is supported.
- `n-cascader` will expand menu to selected value, closes [#3058](https://github.com/tusen-ai/naive-ui/issues/3058).
- `n-space` will use `gap` CSS property if possible, closes [#3053](https://github.com/tusen-ai/naive-ui/issues/3053).

## 2.30.2

`2022-06-07`

### Fixes

- Fix `n-select` recomputed options on menu close, improves performance.

## 2.30.1

`2022-06-07`

### Feats

- `n-menu` adds `arrowColorChildActiveHover`, `itemIconColorChildActiveHoverHorizontal`, `itemIconColorChildActiveHover`,`itemTextColorChildActiveHoverHorizontal`, `itemTextColorChildActiveHover`, `arrowColorChildActiveHoverInverted`, `itemIconColorChildActiveHoverHorizontalInverted`, `itemIconColorChildActiveHoverInverted`,`itemTextColorChildActiveHoverHorizontalInverted`, `itemTextColorChildActiveHoverInverted` theme variables, closes [#2929](https://github.com/tusen-ai/naive-ui/issues/2929)

### Fixes

- Fix `n-menu` `node-props` is not applied to element with `role="menuitem"` but a inner element.
- Fix `n-menu` `node-props` doesn't work with `type="group"` option.

## 2.30.0

`2022-06-06`

### Breaking Changes

- Theme variable `closeColor`, `closeColorHover`, `closeColorPressed` are renamed to `closeIconColor`, `closeIconColorHover`,`closeIconColorPressed`. `closeColorHover`, `closeColorPressed` still exist, controlling background color of close button.
- `n-tag`'s `colorXxx` theme variables are renamed to `colorBorderedXxx`. `colorXxx` still exists, controlling background color of borderless tag.

### Fixes

- Fix `createDiscreteApi` not working with `'loadingBar'`.
- Fix `n-popover` background color shifts when closed on theme changing.
- Fix `n-select`'s menu position doesn't sync with select box when select box's size is changed.
- Fix `n-scrollbar` can't show horizontal scrollbar, closes [#3047](https://github.com/tusen-ai/naive-ui/issues/3047).
- Fix `n-tree` node's pressed style is prior to selected style when `:block-line="true"` and `:selectable="true"`.
- Fix `n-slider` may leak event handler on edga case.
- Fix `n-data-table` doesn't restore scroll state when it's reactivated inside `keep-alive` component, closes [#2522](https://github.com/tusen-ai/naive-ui/issues/2522).
- Fix `n-image` zoom level doesn't fit ultra large image.
- Fix `n-menu`'s dropdown option text style when some of it's descendants is activated.
- Fix `n-input`'s `input-props` prop's `class` & `style` not working.

### Feats

- 🌟 `n-time-picker` adds `time-zone` prop, closes [#293](https://github.com/tusen-ai/naive-ui/issues/293).
- 🌟 `n-input-number` adds `parse` prop.
- 🌟 `n-input-number` adds `format` prop.
- 🌟 `n-input-number` adds `precision` prop, closes [#2068](https://github.com/tusen-ai/naive-ui/issues/2068), [#1859](https://github.com/tusen-ai/naive-ui/issues/1859)
- 🌟 `n-image` adds a switch to display the original size of the picture, closes [#3023](https://github.com/tusen-ai/naive-ui/issues/3023).
- 🌟 All components' close buttons use new style and are focusable.
- All components' select menu & dropdown menu's options use new style.
- `n-tag` adds `icon` slot.
- `n-tag` adds `strong` prop.
- `n-tag` adds background color in dark theme when `:bordered="false"`, closes [#1699](https://github.com/tusen-ai/naive-ui/issues/1699).
- `n-time` adds `time-zone` prop.
- `n-breadcrumb-item` adds `clickable` prop.
- `n-breadcrumb-item` uses new style, adds `itemLineHeight`, `itemBorderRadius`, `itemColorHover`, `itemColorPressed` theme variables.
- `n-notification` optimizes title style when it's too long.
- `n-drawer` optimizes title style when it's too long.
- `n-dialog` optimizes title style when it's too long.
- `n-card` optimizes title style when it's too long.

## 2.29.1

`2022-06-03`

### Fixes

- Fix `n-tree` throw error when use `pattern` prop filter the tree node, closes [#2960](https://github.com/tusen-ai/naive-ui/issues/2960).
- Fix `n-watermark` not working when `cls-prefix` is set.
- Fix `n-dropdown`'s incorrect render arrow when `:show-arrow="true"` [#2977](https://github.com/tusen-ai/naive-ui/issues/2977)
- Fix `n-upload-dragger` doesn't take full width.
- Fix `n-global-style` doesn't clear body element's padding and margin.
- Fix `n-modal` won't clear document body's overflow style if it's unmounted when it is shown, closes [#3015](https://github.com/tusen-ai/naive-ui/issues/3015).
- Fix keyboard operation doesn't work in some specific old browsers.
- Fix `n-tabs` lacks tab padding when `justify-content` is `'start'`, `'end'` or `'center'`.
- Fix `n-tabs` doesn't update bar's position after `justify-content` or `size` is updated.
- Fix `n-switch` has no transition effect when toggle `disabled`.
- Fix `n-modal` & `n-drawer` will be closed on esc pressed during IME input, closes [#2989](https://github.com/tusen-ai/naive-ui/issues/2989).
- Fix `n-date-picker` can select time when is selecting date in date time range picker, closes [#3004](https://github.com/tusen-ai/naive-ui/issues/3004).
- Fix `n-pagination` has display issue when `:page-count="0"`, closes [#2970](https://github.com/tusen-ai/naive-ui/issues/2970).
- Fix `n-date-picker`'s `shortcuts` will be overrided by `default-time` when `type="datetimerange"`, closes [#3020](https://github.com/tusen-ai/naive-ui/issues/3020).
- Fix `n-image-group` switch pictures doesn't work in SSR mode.
- Fix `n-tabs`'s height transition sometimes not applied when `display-directive="show"` and `:animated="true"`, closes [#3035](https://github.com/tusen-ai/naive-ui/issues/3035).
- Fix `n-select`'s filter font size is a bit small in single select mode.
- Fix `n-select`'s count tag's popover is too high when overflow tag's count is small.
- Fix `n-date-picker`'s first time scroll state of items is not aligned when `type="monthrange"`.
- Fix `n-form-item`'s asterisk in required mode can be selected.
- Fix `n-list`'s color is incorrect inside `n-popover` in dark mode.

### Feats

- 🌟 `n-select` adds `label-field` prop, closes [#3018](https://github.com/tusen-ai/naive-ui/issues/3018).
- 🌟 `n-select` adds `value-field` prop, closes [#3018](https://github.com/tusen-ai/naive-ui/issues/3018).
- 🌟 `n-steps` adds `on-update:current` prop.
- 🌟 `n-date-picker` adds `panel` prop.
- 🌟 `n-data-table` adds `on-scroll` prop, closes [#3025](https://github.com/tusen-ai/naive-ui/issues/3025).
- 🌟 `FormItemRule` adds `renderMessage` prop, closes [#2525](https://github.com/tusen-ai/naive-ui/issues/2525).
- 🌟 Add `createDiscreteApi` to create message, notification, dialog, loading bar outside setup.
- `n-scrollbar` adds `trigger` prop.
- `n-input-number` adds `button-placement` prop.
- `n-select` adds `children-field` prop, closes [#3018](https://github.com/tusen-ai/naive-ui/issues/3018).
- `n-upload` adds `trigger-style` prop.
- `n-dropdown` adds `node-props` prop.
- `n-dropdown` adds `render-option` prop.
- `n-upload` adds `is-error-state` prop, closes [#2975](https://github.com/tusen-ai/naive-ui/issues/2975).
- `n-date-picker`'s `shortcuts` prop supports readonly tuple type.
- `n-step` adds `disabled` prop.
- `n-calendar` adds `header` slot, closes [#3036](https://github.com/tusen-ai/naive-ui/issues/3036).
- `n-tree` adds `expand-on-click` prop， [#2949](https://github.com/tusen-ai/naive-ui/issues/2949).

## 2.29.0

`2022-05-18`

### Breaking Changes

- Since `n-pagination` supports `size` prop, some theme variables of `n-pagination` are changed.

### Fixes

- Fix `n-menu` use `render-icon` function render incorrect when returns `true`.
- Fix `n-tabs`'s `tabFontWeightActive` theme varialbe applies to all tabs, closes [#2926](https://github.com/tusen-ai/naive-ui/issues/2926).
- Fix `n-tree-select`'s `default-expand-all` not working.
- Fix `n-upload`'s `accept` prop doesn't work in drag & drop mode, closes [#2919](https://github.com/tusen-ai/naive-ui/issues/2919)
- Fix `n-calendar`'s `on-panel-change` returning wrong month value when clicking Today.
- Fix `n-time` throws error caused by `getTimezoneOffset` in SSR mode, closes [#2545](https://github.com/tusen-ai/naive-ui/issues/2545).
- Fix `n-transfer`'s search box's box-shadow is truncated.
- Fix `n-time-picker`'s input box's invalid value won't be cleared after blur.

### Feats

- `n-notification-provider`'s `placement` prop supports `'top'` and `'bottom'`, closes [#2930](https://github.com/tusen-ai/naive-ui/issues/2930).
- `n-pagination` add `size` prop, closes [#2888](https://github.com/tusen-ai/naive-ui/issues/2888).
- `n-config-provider` adds `preflight-style-disabled` prop.
- `n-pagination`'s quick jumper only allow integer input, closes [#2928](https://github.com/tusen-ai/naive-ui/issues/2928).
- `n-pagination` will jump to the first / last page when its value is out of range, closes [#2928](https://github.com/tusen-ai/naive-ui/issues/2928).
- `n-color-picker` adds `on-confirm` prop.
- `n-input` adds `clear-icon` slot.
- `n-date-picker` adds `date-icon` slot, closes [#2668](https://github.com/tusen-ai/naive-ui/issues/2668).
- `n-date-picker` adds `separator` slot, closes [#2668](https://github.com/tusen-ai/naive-ui/issues/2668).

### i18n

- Add nlNL locale.

## 2.28.4

`2022-05-11`

### Fixes

- Fix `n-theme-editor`'s content can't be scrolled.

## 2.28.3

`2022-05-11`

### Fixes

- Fix `n-menu`'s `dropdown-props` prop can't override `n-dropdown`'s `size` prop, closes [#2868](https://github.com/tusen-ai/naive-ui/issues/2868).
- Fix `n-switch` abnormal loading animation when switching state, closes [#2870](https://github.com/tusen-ai/naive-ui/issues/2870)
- Fix `n-data-table` doesn't show content when page is more than data's page, closes [#2840](https://github.com/tusen-ai/naive-ui/issues/2840).
- Fix `n-data-table`'s `cellProps` doesn't has correct generic type.
- Fix `n-data-table`'s `work-break` isn't `break-word`.
- Fix `n-list`'s css variable `n-merged-color` is not correct.
- Fix `MessageReactive`'s `destroy` method throws error if message has disappeared.
- Fix `n-ellpisis` can't show tooltip if content width is very close to container width, closes [#1393](https://github.com/tusen-ai/naive-ui/issues/1393), [#2899](https://github.com/tusen-ai/naive-ui/issues/2899).
- Fix `n-tree` can't use `width: fit-content;` style, closes [#2875](https://github.com/tusen-ai/naive-ui/issues/2875).
- Fix `n-dropdown`'s `on-update:show` prop will be triggered twice, closes [#2905](https://github.com/tusen-ai/naive-ui/issues/2905).
- Fix `n-select` can select option by pressing enter after options are cleared.
- Fix `n-data-table`'s `selection` and `expand` column can't set width.
- Fix `n-checkbox` contains selectable whitespace.
- Fix `DescriptionsProps` is misspelled as `DescriptionProps`.
- Fix `n-icon` misses `IconProps`.
- Fix `n-icon-wrapper` misses `IconWrapperProps`.
- Fix `n-countdown`'s display value is 1s faster than actual left time when `precision=0`, closes [#2910](https://github.com/tusen-ai/naive-ui/issues/2910).

### Feats

- `n-menu` adds `node-props` prop.
- `n-switch` adds `rubber-band` prop.
- `n-space`'s `justify` prop supports `'space-evenly'`.
- `n-popover` adds `content-style` prop.
- `n-popover` adds `header-style` prop.
- `n-popover` adds `scrollable` prop.
- `n-select` & `n-cascader` & `n-tree-select`'s overflow count tag's popover is scrollable.
- `n-data-table` adds `pagination-behavior-on-filter` prop.
- `n-date-picker`'s `type` prop supports `monthrange` option.
- `n-date-picker` adds `on-clear` prop.
- `n-date-picker` adds `on-confirm` prop, closes [#2852](https://github.com/tusen-ai/naive-ui/issues/2852).
- `n-data-table`'s `columns`'s element supports `minWidth` prop.
- `n-tree` adds `checkbox-placement` prop.
- `n-tree-select` adds `loading` prop, closes [#2857](https://github.com/tusen-ai/naive-ui/issues/2857).
- `n-modal` adds `block-scroll` prop, closes [#2556](https://github.com/tusen-ai/naive-ui/issues/2556).
- `n-drawer` adds `block-scroll` prop, closes [#2556](https://github.com/tusen-ai/naive-ui/issues/2556).
- `n-drawer` adds `show-mask` prop, closes [#2556](https://github.com/tusen-ai/naive-ui/issues/2846).
- `useDialog().xxx` supports `blockScroll` option, closes [#2556](https://github.com/tusen-ai/naive-ui/issues/2556).
- `useDialog().xxx` supports `autoFocus` option.
- `n-button` adds `native-focus-behavior` prop, closes [#2882](https://github.com/tusen-ai/naive-ui/issues/2882).
- `n-time-picker` adds `on-confirm` prop.
- `n-time-picker` adds `on-clear` prop.
- `n-time-picker` adds `on-update:show` prop.
- `n-time-picker` adds `show` prop.
- `n-date-picker` adds `on-update:show` prop.
- `n-date-picker` adds `show` prop.
- `n-date-picker` adds `default-calendar-start-time` prop, closes [#2732](https://github.com/tusen-ai/naive-ui/issues/2732).
- `n-date-picker` adds `default-calendar-end-time` prop, closes [#2732](https://github.com/tusen-ai/naive-ui/issues/2732).
- `n-date-picker` adds `bind-calendar-months` prop, closes [#2751](https://github.com/tusen-ai/naive-ui/issues/2751).
- `n-upload` adds `directory` prop.
- `n-upload` adds `directory-dnd` prop.
- `UploadFileInfo` adds `fullPath` and `batchId` attrs.
- `DataTableBaseColumn` adds `tree` attr, closes [#2757](https://github.com/tusen-ai/naive-ui/issues/2757).

## 2.28.2

`2022-04-22`

### Fixes

- Fix `date-picker` `actions`'s type can't be `null`.
- Fix `time-picker` `actions`'s type can't be `null`.
- Fix `n-tree-select`'s meaningless warning.
- Fix `n-tree-select`'s `allow-checking-not-loaded` prop doesn't work.
- Fix `n-tree-select`'s menu position may not sync with trigger box if `:allow-checking-not-loaded="true"`.
- Fix `n-cascader`'s menu position may not sync with trigger box if `:allow-checking-not-loaded="true"`.

## 2.28.1

`2022-04-20`

### Fixes

- Fix `notification` icon won't show after first notification is emitted in SSR mode, closes [#2793](https://github.com/tusen-ai/naive-ui/issues/2793).
- Fix `dialog` icon won't show after first dialog is displayed in SSR mode.
- Fix `n-drawer` & `n-modal` may overflow screen on opening if `:autofocus="true"`.
- Fix `n-tree-select`'s filter not working correctly when `children-field` is not set, closed [#2789](https://github.com/tusen-ai/naive-ui/issues/2789).
- Fix `n-tree-select`'s matched style is not cleared after filter value is cleared.
- Fix `n-tree-select`'s parent items in tree are selectable when `check-strategy="child"` and `:cascade="false"`, closes [#2780](https://github.com/tusen-ai/naive-ui/issues/2780).
- Fix `n-select`'s `empty` slot can't let `n-input` focus inside, closes [#2812](https://github.com/tusen-ai/naive-ui/issues/2812).
- Fix `n-select`'s menu is invisible in fullscreen mode, closes [#2722](https://github.com/tusen-ai/naive-ui/issues/2722).
- Fix `n-color-picker`'s `value` prop can't be `null`.
- Fix `n-table`'s border color shifts when switch bewteen different props.

### Feats

- `n-input-number` adds `add-icon` and `minus-icon` slots, closes [#2668](https://github.com/tusen-ai/naive-ui/issues/2668).
- `n-dynamic-input` adds `RTL` support.
- `n-table` adds `RTL` support.
- `n-collapse-transition` adds `RTL` support.
- `n-tree` adds `show-irrelevant-nodes` prop, closes [#2764](https://github.com/tusen-ai/naive-ui/issues/2764).
- `n-tree-select` adds `allow-checking-not-loaded` prop.
- `n-cascader` adds `allow-checking-not-loaded` prop.
- `n-tree` adds `allow-checking-not-loaded` prop.
- `n-button-group` adds `RTL` support.

### i18n

- Add ptBR locale.
- Add koKR locale.

## 2.28.0

`2022-04-11`

### Breaking Changes

- `n-time` uses `formatDistanceStrict` rather than `formatDistance` in `date-fns`, closes [#2703](https://github.com/tusen-ai/naive-ui/issues/2703).

### Fixes

- Fix `n-tabs` has unexpected line animation when nested with `n-tabs`, closes [#2689](https://github.com/tusen-ai/naive-ui/issues/2689).
- Fix `n-popconfirm` with no body content has wrong margin top, closes [#2690](https://github.com/tusen-ai/naive-ui/issues/2690).
- Fix `n-tree-select` unexpected warning.
- Fix `n-calendar`'s disabled cells are clickable, closes [#2686](https://github.com/tusen-ai/naive-ui/issues/2686).
- Fix message icon won't show after first message is emitted in SSR mode, closes [#2721](https://github.com/tusen-ai/naive-ui/issues/2721).
- Fix `n-popconfirm`'s `positive-button-props` and `negative-button-props` props lack reactivity, closes [#2753](https://github.com/tusen-ai/naive-ui/issues/2753).
- Fix `n-step` has unexpected theme variable class.
- Fix `n-steps` displays uncorrectly when nested in vertical & horizontal mode.
- Fix `n-popconfirm`'s `positive-text` & `negetive-text` props don't allow `null` type.
- Fix `n-color-picker` can't be closed if mousedown.stop is set when click outside, closes [#2709](https://github.com/tusen-ai/naive-ui/issues/2709).
- Fix `n-tabs` switch animation is incorrect when `display-directive='show'`, closes [#2718](https://github.com/tusen-ai/naive-ui/issues/2718).

### Feats

- `n-radio` adds `label` prop, closes [#2707](https://github.com/tusen-ai/naive-ui/issues/2707).
- `n-drawer` adds `on-after-enter` and `on-after-leave` props, closes [#2698](https://github.com/tusen-ai/naive-ui/issues/2698).
- `n-data-table` adds `paginate-single-page` prop , closes [#2043](https://github.com/tusen-ai/naive-ui/issues/2043).
- `n-pagination` add `RTL` support.
- `n-alert` add `RTL` support.
- `n-data-table` adds `allow-checking-not-loaded` prop, closes [#2758](https://github.com/tusen-ai/naive-ui/issues/2758).

## 2.27.0

`2022-03-27`

### Breaking Changes

- `n-menu` has some style changes.

### Fixes

- Fix `n-data-table`‘s row disorder when using `expand` type, closes [#2631](https://github.com/tusen-ai/naive-ui/issues/2631).
- Fix `n-popconfirm` doesn't has `setShow` & `syncPosition` methods.
- Fix `n-popselect` doesn't has `setShow` & `syncPosition` methods.
- Fix `n-menu` theme's peers missing `Dropdown`.
- Fix `n-color-picker` can't input 0 as unit's value, closes [#2680](https://github.com/tusen-ai/naive-ui/issues/2680).
- Fix `n-tree`'s scrollbar overflows in virtual scroll mode, closes [#2673](https://github.com/tusen-ai/naive-ui/issues/2673).
- Fix `n-layout-sider`'s `content-style` can't override `overflow: auto` prop, closes [#2671](https://github.com/tusen-ai/naive-ui/issues/2671).
- Fix `n-date-picker` displays panel item abnormally with `month` and `quarter` type in dark mode.
- Fix `n-dropdown` `onUpdateShow` not working.
- Fix `n-auto-complete` `onSelect` is triggered after `onUpdate:value`.
- Fix `n-data-table` `initiatorColumn` in `onUpdate:filters`'s type is an optional parameter.

### Feats

- `n-tree-select` adds `on-load` prop, closes [#2550](https://github.com/tusen-ai/naive-ui/issues/2550).
- `n-data-table` adds `on-load` prop.
- `n-cascader` adds `menu-props` prop, closes [#2600](https://github.com/tusen-ai/naive-ui/issues/2600).
- `n-cascader` adds `filter-menu-props` prop, closes [#2600](https://github.com/tusen-ai/naive-ui/issues/2600).
- `n-badge` adds `value` slot.
- `n-form` adds `validate-messages` prop.
- `n-data-table`'s column supports `cellProps` prop, closes [#2625](https://github.com/tusen-ai/naive-ui/issues/2625).
- `n-step` adds class to distinguish status.
- `n-popconfirm` adds `negative-button-props` props, closes [#2642](https://github.com/tusen-ai/naive-ui/issues/2642).
- `n-popconfirm` adds `positive-button-props` props, closes [#2642](https://github.com/tusen-ai/naive-ui/issues/2642).
- `n-pagination` adds `goto` slot.
- `n-input` adds `password-visible-icon` slot.
- `n-input` adds `password-invisible-icon` slot.
- `n-select` adds `status` prop.
- `n-input-number` adds `status` prop.
- `n-auto-complete` adds `status` prop.
- `n-cascader` adds `status` prop.
- `n-date-picker` adds `status` prop.
- `n-time-picker` adds `status` prop.
- `n-mention` adds `status` prop.
- `n-tree-select` adds `status` prop.
- `n-menu` adds `showOption` method, closes [#2562](https://github.com/tusen-ai/naive-ui/issues/2562).
- `n-dynamic-tags`'s `value` support object typed option.
- `n-dynamic-tags` adds `render-tag` prop, closes [#2526](https://github.com/tusen-ai/naive-ui/issues/2526).
- `n-dynamic-tags` adds `on-create` prop, closes [#2576](https://github.com/tusen-ai/naive-ui/issues/2576).
- `n-date-picker` adds `time-picker-props` props, closes [#2660](https://github.com/tusen-ai/naive-ui/issues/2660).
- `n-tabs` adds `trigger` prop, closes [#2679](https://github.com/tusen-ai/naive-ui/issues/2679).
- `n-menu` adds `itemColorHover`, `itemColorActiveHover`, `itemTextColorActiveHover`, `itemTextColorHorizontal`, `itemTextColorHoverHorizontal`, `itemTextColorActiveHorizontal`, `itemTextColorActiveHoverHorizontal`, `itemTextColorChildActiveHorizontal`, `itemIconColorActiveHover`, `itemIconColorHorizontal`, `itemIconColorHoverHorizontal`, `itemIconColorActiveHorizontal`, `itemIconColorActiveHoverHorizontal`, `itemIconColorChildActiveHorizontal`, `arrowColorActiveHover`, `itemColorHoverInverted`, `itemColorActiveHoverInverted`, `itemTextColorActiveHoverInverted`, `itemTextColorHorizontalInverted`, `itemTextColorHoverHorizontalInverted`, `itemTextColorChildActiveHorizontalInverted`, `itemTextColorActiveHorizontalInverted`, `itemTextColorActiveHoverHorizontalInverted`, `itemIconColorActiveHoverInverted`, `itemIconColorHorizontalInverted`, `itemIconColorHoverHorizontalInverted`, `itemIconColorActiveHorizontalInverted`, `itemIconColorActiveHoverHorizontalInverted`, `itemIconColorChildActiveHorizontalInverted`, `arrowColorActiveHoverInverted` theme variables, closes [#2598](https://github.com/tusen-ai/naive-ui/issues/2598).
- `n-carousel` adds `next-slide-style` and `prev-slide-style` props, closes [#2340](https://github.com/tusen-ai/naive-ui/issues/2340).
- `n-dialog` adds `negative-button-props` prop.
- `n-dialog` adds `positive-button-props` prop.
- `n-tabs` adds `animated` prop.

### i18n

- Add thTH locale.

## 2.26.4

`2022-03-11`

### Fixes

- Fix `n-tree-select`s in `multiple` mode cannot delete options whose `default-value` attribute contains parent node, closes [#2605](https://github.com/tusen-ai/naive-ui/issues/2605).
- Fix `n-tree` may throw error when node is removed, closes [#2597](https://github.com/tusen-ai/naive-ui/issues/2597).
- Fix `useDialog` renders component with popup content with unexpected focus management behavior, closes [#2612](https://github.com/tusen-ai/naive-ui/issues/2612).
- Fix `n-tree-select`'s node sometimes can't be clicked when `check-strategy` is `'child'`.
- Fix `n-tree-select`'s emitted value can be not corresponding to `check-strategy` when delete option in select box with `check-strategy` is not `'all'`.

### Feats

- `useDialog` supports `closeOnEsc` prop.
- `n-data-table` exports `DataTableFilterState` type.
- `n-data-table` exports `DataTableSortState` type.

## 2.26.3

`2022-03-09`

### Fixes

- Fix `n-button`'s loading icon shifts.

## 2.26.2

`2022-03-09`

### Fixes

- Fix `n-cascader` arrow's loading animation last for too long time.
- Fix `n-select` menu doesn't follow theme.
- Fix `n-tabs` throws error without child, closes [#809](https://github.com/tusen-ai/naive-ui/issues/809).
- Fix `n-menu`'s font color is not changed after theme is changed in chrome 99, closes [#2563](https://github.com/tusen-ai/naive-ui/issues/2563). This is actual a bug of chrome, however we used a workaround and fixed it.
- Fix `n-date-picker`'s date item click trigger area is as large as cell size only in `'date'` mode.

### Feats

- `n-dynamic-tags` `input` slot add `deactivate` prop, closes [#2575](https://github.com/tusen-ai/naive-ui/issues/2575).
- `n-space` add `RTL` support.
- `n-avatar-group` add `RTL` support.
- `n-badge` add `RTL` support.
- `n-radio` add `RTL` support.
- `n-auto-complete` adds `focus` method.
- `n-auto-complete` adds `blur` method.

## 2.26.1

`2022-03-06`

### Fixes

- Fix `base-loading` use css transition rather than svg animateTrantion to prevent js blocking, close [#2506](https://github.com/tusen-ai/naive-ui/issues/2506).
- Fix `n-time` throws error caused by `getTimezoneOffset`, closes [#2545](https://github.com/tusen-ai/naive-ui/issues/2545).
- Fix `n-modal`'s mask doesn't have enter & leave transition.
- Fix `n-timeline` has style conflict when vertical & horizontal `n-timeline` are nested, closes [#2549](https://github.com/tusen-ai/naive-ui/issues/2549).
- Fix `n-tree`'s arrow & loading switch animation isn't complete.

### Feats

- `n-time-line-item` adds `line-type` prop, closes [#2548](https://github.com/tusen-ai/naive-ui/issues/2548).
- `n-step` adds `icon` slot, closes [#2547](https://github.com/tusen-ai/naive-ui/issues/2547).
- `n-input-number` adds `autofocus` prop, closes [#2551](https://github.com/tusen-ai/naive-ui/issues/2551).
- `n-date-picker`'s date item click trigger area is as large as cell size, closes [#2552](https://github.com/tusen-ai/naive-ui/issues/2552).

## 2.26.0

`2022-03-02`

### Breaking Changes

- Fix `n-tooltip`'s gap between arrow and body. `n-tooltip` can't be translucent anymore.

### Feats

- `n-popover` adds `arrow-point-to-center` prop.
- `n-config-provider` adds `inline-theme-disabled` prop.

## 2.25.8

`2022-03-01`

### Fixes

- Fix `useMessage` loses styles.

## 2.25.7

`2022-03-01`

### Fixes

- Fix `n-time-picker` still shows action bar when `:actions="null"`.
- Fix `n-input`'s content may overflow when `type="text"` and `autosize` is enabled, closes [#2505](https://github.com/tusen-ai/naive-ui/issues/2505).
- Fix `n-upload` put `file` field before other `FormData` fields, closes [#2504](https://github.com/tusen-ai/naive-ui/issues/2504)
- Fix `n-button` rtl support.
- Fix `n-form-item-row` can't call `n-form-item`'s methods.

### Feats

- `n-collapse` add `RTL` support.
- `useMessage` adds `create` methods.
- `useMessage` adds `showIcon` prop, closes [#2495](https://github.com/tusen-ai/naive-ui/issues/2495).
- `useMessage` supports `'default'` `type`.
- `n-checkbox` supports label line wrap, closes [#2419](https://github.com/tusen-ai/naive-ui/issues/2419).
- `n-radio` supports label line wrap, closes [#2419](https://github.com/tusen-ai/naive-ui/issues/2419).
- `n-checkbox` add `RTL` support.
- `n-input` add `RTL` support.
- `n-input-number` add `RTL` support.

## 2.25.5

`2022-02-24`

### Fixes

- Fix `n-col` can't be wrapped correctly when `span=6`, closes [#2497](https://github.com/tusen-ai/naive-ui/issues/2497).
- Fix `n-tabs` doesn't display border-bottom in scroll area on large number of tabs, closes [#2500](https://github.com/tusen-ai/naive-ui/issues/2500).

## 2.25.3

`2022-02-23`

### Fixes

- Fix `n-switch` can't use keyboard operation when checked value is customized.
- Fix `n-data-table`'s fixed column is covered by scroll content when placed inside popover.
- Fix `n-data-table` when the `filterOptions` value is 0, the filter will not take effect, closes [#2392](https://github.com/tusen-ai/naive-ui/issues/2392).
- Fix `n-data-table` cannot click selection checkbox if the selection column is a column's child.
- Fix `n-table`'s `border-color` abnormal style when this added dynamically, closes [#2403](https://github.com/tusen-ai/naive-ui/issues/2403).
- Fix `n-tree`'s `default-expand-all` prop doesn't work for dynamic data.
- Fix `n-form` when `model.xxx` is `undefined`, validator will use `null` as validation value, closes [#2486](https://github.com/tusen-ai/naive-ui/issues/2486).
- Fix `n-input` focus style's priority is lower than hover style, closes [#2480](https://github.com/tusen-ai/naive-ui/issues/2480).
- Fix `n-data-table` display issue when placed inside keep-alive component with virtual scroll, closes [#2183](https://github.com/tusen-ai/naive-ui/issues/2183).
- Fix `notification` enter & leave animation.

### Feats

- `n-tree-select` adds `clear-filter-after-select` prop.
- `n-cascader` adds `clear-filter-after-select` prop.
- `n-switch` adds `icon` slot.
- `n-switch` adds `checked-icon` slot.
- `n-switch` adds `unchecked-icon` slot.
- `n-tabs` uses `n` as CSS vars prefix.
- Add `n-watermark` component, closes [#1745](https://github.com/tusen-ai/naive-ui/issues/1745).
- `n-scrollbar` adds `scrollBy` method, closes [#2435](https://github.com/tusen-ai/naive-ui/issues/2435).
- `n-data-table`'s `summary`'s `value` supports `VNodeChild`, closes [#2339](https://github.com/tusen-ai/naive-ui/issues/2339).
- `n-input-number` adds hold click to increment, closes [#1293](https://github.com/tusen-ai/naive-ui/issues/1293).
- `n-description` adds `titleTextColor` theme variable.

### i18n

- Add skSK locale.
- Fix frFR locale.

## 2.25.2

`2022-02-11`

### Fixes

- Remove useless `console.log` in `resolveSlot`.
- Fix `n-tag` misses background color when `checkable=true`.
- Fix `n-tree` throws `Image` error in `happydom` testing environment.
- Fix `n-select` `max-tag-count` tag size doesn't follow select size.

### Feats

- `n-progress` props `type` add type `dashboard`.
- `n-progress` adds `gap-degree` prop.
- `n-progress` adds `gap-offset-degree` prop.
- `n-select` adds `clear-filter-after-select` prop, closes [#2352](https://github.com/tusen-ai/naive-ui/issues/2352).

### i18n

- Add plPL locale, closes [#2354](https://github.com/tusen-ai/naive-ui/issues/2354).
- Add eo locale.

## 2.25.1

`2022-02-06`

### i18n

- Add enGB locale.
- Fix deDE locale.

## 2.25.0

`2022-02-04`

### Breaking Changes

- Refactor `n-carousel`'s style when `show-arrow` is true.

### Fixes

- Fix `n-color-picker`'s hue & alpha slider handle are influenced by rail's box-shadow.
- Fix `n-form-item` prevent feedback padding when empty.
- Fix `n-button` has extra margin in safari.
- Fix `n-form`'s rules and `n-form-item`'s rule about `validator` and `asyncValidator`'s `rule` type is not `FormItemRule`, closes [#2299](https://github.com/tusen-ai/naive-ui/issues/2299).
- Fix `n-log` doesn't break line when line is too long, closes [#2298](https://github.com/tusen-ai/naive-ui/issues/2298).
- Fix `n-log` doesn't export `LogInst` type.
- Fix `n-popselect` action slot & empty slot now working.
- Fix `n-data-table` can't use percent as column width.
- Fix `n-select` trigger shows blank for a while when `filterable=true` and menu is closing.
- Fix `n-select`'s being created option is not cleared after menu is closed.
- Fix `n-select` can't input content when `show=false` and `filterable=true`, closes [#1723](https://github.com/tusen-ai/naive-ui/issues/1723).
- Fix `n-dropdown` has extra margin when `trigger="manual"`.
- Fix `web-types.json`'s `n-h1` ~ `n-h6` name.
- Fix `n-select` deletes option on backspace pressed while compisiting.
- Fix `n-select` uses disabled option as pending option after menu is opened.

### Feats

- `n-tabs` props `justify-content` add types `start` `center` `end`.
- `n-auto-complete` adds `placement` prop.
- `n-cascader` adds `placement` prop.
- `n-color-picker` adds `placement` prop.
- `n-date-picker` adds `placement` prop.
- `n-mention` adds `placement` prop.
- `n-select` adds `placement` prop.
- `n-slider` adds `placement` prop.
- `n-time-picker` adds `placement` prop.
- `n-tree-select` adds `placement` prop.
- `n-card` adds `header-extra-style` prop.
- `n-popover` adds `keep-alive-on-hover` prop, closes [#2326](https://github.com/tusen-ai/naive-ui/issues/2326).
- `n-input` adds `status` prop.
- Add `n-icon-wrapper` component.
- `n-popover` exports `PopoverPlacement` type.
- `n-drawer` exports `DrawerPlacement` type.
- `n-dynamic-tags` adds `input-props` prop.
- `n-notification-provider` adds `container-style` prop.
- `n-notification-provider` exports `NotificationPlacement` type.
- `n-notification-provider` exports `NotificationType` type.
- `n-tabs` add `bar-width` prop.
- `n-dynamic-input` adds `create-button-props` props.
- `n-dynamic-input` adds `create-button-default` slot.
- `n-dynamic-input` adds `create-button-icon` slot.
- `n-dynamic-input` adds `show-sort-button` prop, closes [#2121](https://github.com/tusen-ai/naive-ui/issues/2121).
- `n-select` can be used as tag input.
- `n-select` exports `SelectRenderLabel` type.
- `n-select` exports `SelectRenderOption` type.
- `n-select` exports `SelectRenderTag` type.
- `n-tree` adds `node-props` prop.

## 2.24.7

`2022-01-28`

### Fixes

- `n-popselect` doesn't work with `width="trigger"`.

### i18n

- Update jaJP locale.
- Update deDE locale.

## 2.24.6

`2022-01-26`

### Feats

- `n-icon` add `component` prop.

### Fixes

- Fix `n-dynamic-input` can add item when max is 0, closes [#2271](https://github.com/tusen-ai/naive-ui/issues/2271).
- Fix `n-dialog` useless `console.log`.

## 2.24.5

`2022-01-25`

### Fixes

- `n-input` placeholder has no line-wrap in `textarea` type.
- `n-date-picker` lacks space between panel year & month.

### Feats

- `n-color-picker` adds `disabled` prop.
- `n-date-picker` adds trigger area for year & month quick jump.

## 2.24.4

`2022-01-24`

### Fixes

- Update vueuc version.

## 2.24.3

`2022-01-24`

### Fixes

- Fix `n-layout-sider` has no border transition.

## 2.24.2

`2022-01-24`

### Fixes

- Fix `n-layout-sider` still occupies 1px after collapsed.
- Fix `n-code` doesn't break word when `word-wrap=true`.
- Fix `n-tab-pane`'s tab label area inherits `attrs`, closes [#2221](https://github.com/tusen-ai/naive-ui/issues/2221).
- Fix `n-image` preview popup background can still be scrolled, closes [#2241](https://github.com/tusen-ai/naive-ui/issues/2241).
- Fix `n-input` shows placeholder when browser auto completes it, closes [#2234](https://github.com/tusen-ai/naive-ui/issues/2234).
- Fix `n-input` placeholder word break issue with `type="textarea"`.
- Fix `n-avatar-group` extra count not correct after `max` is set, closes [#2244](https://github.com/tusen-ai/naive-ui/issues/2244).
- Fix `n-calendar` doesn't trigger `on-panel-change` on today button clicked.
- Fix `n-drawer` can't be closed by esc key when `mask-closable=false`, closes [#2233](https://github.com/tusen-ai/naive-ui/issues/2233).

### Feats

- `n-page-header` adds `back` slot, closes [#2176](https://github.com/tusen-ai/naive-ui/issues/2176).
- `n-select` adds `reset-menu-on-options-change` prop, closes [#2168](https://github.com/tusen-ai/naive-ui/issues/2168).
- `n-select` adds `arrow` slot, closes [#2201](https://github.com/tusen-ai/naive-ui/issues/2201).
- `n-carousel` effect supports `'card'`.
- `n-input` doesn't use native scrollbar when `type="textarea"`, closes [#2242](https://github.com/tusen-ai/naive-ui/issues/2242), [#1172](https://github.com/tusen-ai/naive-ui/issues/1172).
- `n-number-animation` add `locale` prop, closes [#2181](https://github.com/tusen-ai/naive-ui/issues/2181).
- `n-number-animation`'s locale follows config provider.
- Expose `lightTheme`.
- `n-time-picker` adds `icon` slot, closes [#2228](https://github.com/tusen-ai/naive-ui/issues/2228).
- `n-tab-pane` adds `tab-props` prop, closes [#2221](https://github.com/tusen-ai/naive-ui/issues/2221).
- Add `CustomThemeCommonVars` to customize `useThemeVars`.
- `n-slider` adds `show-tooltip` prop, closes [#2212](https://github.com/tusen-ai/naive-ui/issues/2212).
- `n-select` adds `on-update:show` prop.
- `n-select` adds `focus` method, closes [#2202](https://github.com/tusen-ai/naive-ui/issues/2202).
- `n-select` adds `blur` method, closes [#2202](https://github.com/tusen-ai/naive-ui/issues/2202).
- `n-date-picker` adds `focus` method, closes [#2202](https://github.com/tusen-ai/naive-ui/issues/2202).
- `n-date-picker` adds `blur` method, closes [#2202](https://github.com/tusen-ai/naive-ui/issues/2202).
- `n-time-picker` adds `focus` method, closes [#2202](https://github.com/tusen-ai/naive-ui/issues/2202).
- `n-time-picker` adds `blur` method, closes [#2202](https://github.com/tusen-ai/naive-ui/issues/2202).
- `n-checkbox` adds `focus` method, closes [#2202](https://github.com/tusen-ai/naive-ui/issues/2202).
- `n-checkbox` adds `blur` method, closes [#2202](https://github.com/tusen-ai/naive-ui/issues/2202).
- `n-cascader` adds `focus` method, closes [#2202](https://github.com/tusen-ai/naive-ui/issues/2202).
- `n-cascader` adds `blur` method, closes [#2202](https://github.com/tusen-ai/naive-ui/issues/2202).
- `n-upload` adds `input-props` prop, closes [#2204](https://github.com/tusen-ai/naive-ui/issues/2204).
- `n-data-table` col adds `render-sorter-icon` prop, closes [#1785](https://github.com/tusen-ai/naive-ui/issues/1785).
- `n-data-table` col adds `render-sorter` prop, closes [#1785](https://github.com/tusen-ai/naive-ui/issues/1785).
- `n-date-picker` easy navigation to specific month and year for `date` and `datetime` and `daterange` and `datetimerange` type.
- `n-modal` adds `close-on-esc` prop.
- `n-modal` adds `auto-focus` prop.
- `n-modal` adds `trap-focus` prop.
- `n-modal` adds `on-esc` prop.
- `n-drawer` adds `close-on-esc` prop.
- `n-drawer` adds `auto-focus` prop.
- `n-drawer` adds `trap-focus` prop.
- `n-drawer` adds `on-esc` prop.
- `n-upload` adds `clear` method, closes [#2247](https://github.com/tusen-ai/naive-ui/issues/2247).
- Add volar types.

### i18n

- Add esAR locale.
- Add itIT locale.

## 2.24.1

`2022-01-12`

### Fixes

- Fix install error.

## 2.24.0

`2022-01-12`

### Breaking Changes

- Fix `type PageHeaderProps` name. It was mispelled as `PageHeaderPorps` before.
- `n-image`'s `iconColor` theme variable is renamed as `toolbarIconColor`.

### Fixes

- Fix `n-carousel` when Carousel is a single picture dot still existence, closes [#1777](https://github.com/tusen-ai/naive-ui/issues/1777).
- Fix `n-upload` `on-finish` prop's `event` parameter type should be `ProgressEvent`.
- Fix `n-upload` doesn't allow 2xx status code except 200.
- Fix `n-form` when `validate` use `validateCallback`, cannot call Promise method.
- Fix `n-input-number` input integer end with 0 cannot update, closes [#2115](https://github.com/tusen-ai/naive-ui/issues/2115).
- Fix `n-back-top` allow document to be passed to `listen-to` prop.
- Fix `n-data-table`'s content can be clicked when loading, closes [#2134](https://github.com/tusen-ai/naive-ui/issues/2134).
- Fix `n-checkbox` doesn't show indeterminate icon in safari.
- Fix `n-progress`'s inner text of `line` type not aligned in center, closes[#2138](https://github.com/tusen-ai/naive-ui/issues/2138).
- Fix `n-message`'s `MessageReactive` type lacks `type` parameter.
- Fix `n-select` has different `padding` with `n-input`, closes [#2149](https://github.com/tusen-ai/naive-ui/issues/2149).
- Fix `n-tooltip` log errors in console when used in `n-select`'s `render-option`, closes [#1436](https://github.com/tusen-ai/naive-ui/issues/1436).
- Fix `n-select` log ResizeObserver errors when using `render-option` in safari, closes [#1671](https://github.com/tusen-ai/naive-ui/issues/1671).
- Fix `n-carousel` can't respond quickly and repeatedly on touch, closes [#1892](https://github.com/tusen-ai/naive-ui/issues/1892).
- Fix `n-carousel` style of boundary, closes [#1866](https://github.com/tusen-ai/naive-ui/issues/1866).
- Fix `n-carousel` cannot be clicked on the touchscreen, closes [#1882](https://github.com/tusen-ai/naive-ui/issues/1882).
- Fix `n-color-picker` default mode can only be rgb is default value is empty.

### Feats

- `n-code` adds `word-wrap` prop, closes [#2111](https://github.com/tusen-ai/naive-ui/issues/2111).
- `n-modal` adds `z-index` prop, closes [#2088](https://github.com/tusen-ai/naive-ui/issues/2088).
- `n-drawer` adds `z-index` closes.
- `n-drawer` adds wai-aria support.
- `useMessage`'s option support `render` prop.
- `n-data-table` `TableColumn` supports `string` typed `width`, closes [#2102](https://github.com/tusen-ai/naive-ui/issues/2102).
- `n-calendar` adds `on-panel-change` prop, closes [#2082](https://github.com/tusen-ai/naive-ui/issues/2082).
- `n-upload` adds `on-error` prop.
- `n-pagination` adds `label` slot.
- `n-tabs` adds `syncBarPosition` method, closes [#2120](https://github.com/tusen-ai/naive-ui/issues/2120).
- `n-form`, `n-form-item`'s `label-width` prop support `auto` option, closes [#2087](https://github.com/tusen-ai/naive-ui/issues/2087).
- `n-result` adds `icon` slot, closes [#2130](https://github.com/tusen-ai/naive-ui/issues/2130).
- `n-date-picker` adds `value-format` prop, closes [#2076](https://github.com/tusen-ai/naive-ui/issues/2076).
- `n-date-picker` adds `formatted-value` prop.
- `n-date-picker` adds `default-formatted-value` prop.
- `n-date-picker` adds `on-update:formatted-value` prop.
- `n-date-picker`'s `on-update:value` prop will pass formatted value out.
- `n-image` adds `show-toolbar-tooltip` prop.
- `n-image` adds more theme variables, closes [#1531](https://github.com/tusen-ai/naive-ui/issues/1531).
- `n-upload` adds `image-group-props` prop.
- `n-progress` adds `offset-degree` prop, closes [#2010](https://github.com/tusen-ai/naive-ui/issues/2010).
- `n-form-item` adds `feedback` slot, closes [#1142](https://github.com/tusen-ai/naive-ui/issues/1142).
- `n-form-item`'s `require-mark-placement` prop adds `'right-hanging'` option, closes [#2094](https://github.com/tusen-ai/naive-ui/issues/2094).
- `n-cascader` adds `render-label` prop, closes [#2048](https://github.com/tusen-ai/naive-ui/issues/2048).
- `n-auto-complete` adds `render-option` prop, closes [#1629](https://github.com/tusen-ai/naive-ui/issues/1629).
- `n-auto-complete` adds `render-label` prop, closes [#1629](https://github.com/tusen-ai/naive-ui/issues/1629).
- `n-tree` adds `render-switcher-icon` prop, closes [#1551](https://github.com/tusen-ai/naive-ui/issues/1551).
- `n-message` exports `MessageType` type.
- `n-time-picker` adds `value-format` prop.
- `n-time-picker` adds `formatted-value` prop.
- `n-time-picker` adds `on-update:formatted-value` prop.
- `n-time-picker` adds `default-formatted-value` prop.
- `n-carousel` adds `default-index` prop.
- `n-carousel` adds `current-index` prop.
- `n-carousel` adds `show-arrow` prop.
- `n-carousel` adds `dot-type` prop, closes [#1931](https://github.com/tusen-ai/naive-ui/issues/1931).
- `n-carousel` adds `dot-placement` prop, closes [#1462](https://github.com/tusen-ai/naive-ui/issues/1462).
- `n-carousel` adds `slides-per-view` prop.
- `n-carousel` adds `space-between` prop.
- `n-carousel` adds `centered-slides` prop.
- `n-carousel` adds `direction` prop, closes [#1931](https://github.com/tusen-ai/naive-ui/issues/1931).
- `n-carousel` adds `loop` prop.
- `n-carousel` adds `effect` prop, closes [#1159](https://github.com/tusen-ai/naive-ui/issues/1159).
- `n-carousel` adds `transition-props` prop, closes [#1159](https://github.com/tusen-ai/naive-ui/issues/1159).
- `n-carousel` adds `transition-style` prop, closes [#1159](https://github.com/tusen-ai/naive-ui/issues/1159).
- `n-carousel` adds `draggable` prop.
- `n-carousel` adds `touchable` prop.
- `n-carousel` adds `mousewheel` prop.
- `n-carousel` adds `keyboard` prop.
- `n-carousel` adds `show-dots` prop.
- `n-carousel` adds `on-update:current-index` prop.
- `n-carousel` adds `arrow` slot.
- `n-carousel` adds `dots` slot.
- `n-form-item` adds `for` prop.
- `n-color-picker` adds `label` slot.
- `n-color-picker` adds `render-label` prop.
- `n-form-item` adds `label-props` prop.

## 2.23.2

`2021-12-29`

### Feats

- `<meta name="naive-ui-style" />` can be used to controll the component style's position.
- `n-empty` adds `show-icon` prop.
- `n-modal` adds a11y support, closes [#1877](https://github.com/tusen-ai/naive-ui/issues/1877).
- Add `n-avatar-group` component.
- `n-input-number` supports `loading` state.
- Add `n-countdown` component.
- Add `n-number-animation` component, closes [#1465](https://github.com/tusen-ai/naive-ui/issues/1465).
- `n-statistic` adds `tabular-nums` prop.
- `n-pagination` will give `itemCount` a approximate value derived from `pageSize` and `pageCount` if it's not set, closes [#2044](https://github.com/tusen-ai/naive-ui/issues/2044).
- `n-cascader` adds `on-update:show` prop, closes [#2049](https://github.com/tusen-ai/naive-ui/issues/2049).
- `n-scrollbar` uses `n` as CSS vars prefix.
- `n-popconfirm` uses `n` as CSS vars prefix.
- `n-gradient-text` uses `n` as CSS vars prefix.
- `n-form` uses `n` as CSS vars prefix.
- `n-pagination` uses `n` as CSS vars prefix.
- `n-loading-bar` uses `n` as CSS vars prefix.
- `n-empty` uses `n` as CSS vars prefix.
- `n-list` uses `n` as CSS vars prefix.
- `n-layout` uses `n` as CSS vars prefix.
- `n-message` uses `n` as CSS vars prefix.
- `n-mention` uses `n` as CSS vars prefix.
- `n-menu` uses `n` as CSS vars prefix.
- `n-popover` uses `n` as CSS vars prefix.
- `n-transfer` uses `n` as CSS vars prefix.
- `n-table` uses `n` as CSS vars prefix.
- `n-statistic` uses `n` as CSS vars prefix.
- `n-code` uses `n` as CSS vars prefix.
- `n-breadcrumb` uses `n` as CSS vars prefix.
- `n-slider` uses `n` as CSS vars prefix.
- `n-spin` uses `n` as CSS vars prefix.
- `n-select` uses `n` as CSS vars prefix.
- `n-result` uses `n` as CSS vars prefix.
- `n-calendar` uses `n` as CSS vars prefix.
- `n-card` uses `n` as CSS vars prefix.
- `n-cascader` uses `n` as CSS vars prefix.
- `n-color-picker` uses `n` as CSS vars prefix.
- `n-checkbox` uses `n` as CSS vars prefix.
- `n-data-table` uses `n` as CSS vars prefix.
- `n-date-picker` uses `n` as CSS vars prefix.
- `n-descriptions` uses `n` as CSS vars prefix.
- `n-drawer` uses `n` as CSS vars prefix.
- `n-dropdown` uses `n` as CSS vars prefix.
- `n-rate` uses `n` as CSS vars prefix.
- `n-radio` uses `n` as CSS vars prefix.
- `n-progress` uses `n` as CSS vars prefix.
- `n-skeleton` uses `n` as CSS vars prefix.
- `n-collapse` uses `n` as CSS vars prefix.
- `n-collapse-transition` uses `n` as CSS vars prefix.
- `n-thing` uses `n` as CSS vars prefix.
- `n-carousel` uses `n` as CSS vars prefix.
- `n-page-header` uses `n` as CSS vars prefix.
- `n-image` uses `n` as CSS vars prefix.
- `n-input` uses `n` as CSS vars prefix.
- `n-icon` uses `n` as CSS vars prefix.
- `n-modal` uses `n` as CSS vars prefix.
- `n-notification` uses `n` as CSS vars prefix.

### Fixes

- Fix `n-form-item-gi` 's `validate` doesn't work, closes [#1901](https://github.com/tusen-ai/naive-ui/issues/1901).
- Fix `n-card` action's border-radius style.
- Fix `n-code`'s content is repeatly appended if language is not set, closes [#2034](https://github.com/tusen-ai/naive-ui/issues/2034).
- Fix `n-tabs`'s `tabTextColorActiveSegment` and `tabTextColorHoverSegment` theme variables not working, closes [#2038](https://github.com/tusen-ai/naive-ui/issues/2038).
- Fix `n-image` may keep keyboard handler after mounted.
- Fix `n-image` can't exit preview after esc is pressed when there's only 1 image, closes [#2042](https://github.com/tusen-ai/naive-ui/issues/2042).
- Fix `n-drawer-content`'s content doesn't scroll by default, ref [#2003](https://github.com/tusen-ai/naive-ui/issues/2003).
- Fix `n-popover` log warnings to console when manually set same zindex on multile instances and closes them, closes [#2050](https://github.com/tusen-ai/naive-ui/issues/2050).
- Fix `n-transfer` has no scrollbar in virtual scroll mode.
- Fix `n-input-number` cannot input decimals end with 0.

## 2.23.1

`2021-12-20`

### Fixes

- Fix `n-transfer` list doesn't follow container height when style.height is set, closes [#1879](https://github.com/tusen-ai/naive-ui/issues/1879).
- Fix `n-skeleton` & `n-gradient-text` cause runtime error in some old browsers, closes [#1867](https://github.com/tusen-ai/naive-ui/issues/1867).
- Fix `n-data-table` `ellipsis` prop in column doesn't support all `n-ellipsis`'s props, closes [#1891](https://github.com/tusen-ai/naive-ui/issues/1891).
- Fix `n-form`'s `blankHeightXxx` theme var doesn't follow `common.heightXxx`, closes [#1880](https://github.com/tusen-ai/naive-ui/issues/1880).
- Fix `n-date-picker`'s panel doesn't use `dateFormat` in locale, closes [#1793](https://github.com/tusen-ai/naive-ui/issues/1793).
- Fix `n-log` text color transition in theme switching.

### Feats

- `n-back-top` uses `n` as CSS vars prefix.
- `n-steps` uses `n` as CSS vars prefix.
- `n-switch` uses `n` as CSS vars prefix.
- `n-auto-complete` uses `n` as CSS vars prefix.
- `n-log` uses `n` as CSS vars prefix.
- `n-timeline` uses `n` as CSS vars prefix.
- `n-time-picker` uses `n` as CSS vars prefix.
- `n-avatar` uses `n` as CSS vars prefix.
- `n-dynamic-tags` uses `n` as CSS vars prefix.
- `n-tag` uses `n` as CSS vars prefix.
- `n-dialog` uses `n` as CSS vars prefix.
- `n-upload` uses `n` as CSS vars prefix.
- `n-tree` uses `n` as CSS vars prefix.
- `n-tree-select` uses `n` as CSS vars prefix.

## 2.23.0

`2021-12-17`

### Breaking Changes

- `n-switch` can no longer be clicked under `loading` status, closes [#1853](https://github.com/tusen-ai/naive-ui/issues/1853).

### Fixes

- Fix `n-data-table` 's horizontal scrollbar disappears when max-height is not set, closes [#1857](https://github.com/tusen-ai/naive-ui/issues/1857).
- Fix `n-input-number` cannot input negative decimals value, closes [#1858](https://github.com/tusen-ai/naive-ui/issues/1858).
- Fix `n-dialog` open new dialog again when pressing `enter` key, closes [#1559](https://github.com/tusen-ai/naive-ui/issues/1559).

### Feats

- `n-divider` uses `n` as CSS vars prefix.
- `typography` uses `n` as CSS vars prefix.
- `n-badge` uses `n` as CSS vars prefix.

## 2.22.0

`2021-12-15`

### Breaking Changes

- `n-button` can no longer be clicked under `loading` status, closes [#1628](https://github.com/tusen-ai/naive-ui/issues/1628).

### Fixes

- Fix `n-alert`'s `header` slot unable to display normally.
- Fix `n-data-table`'s pagination `onUpdatePageSize` prop does't trigger, closes [#1774](https://github.com/tusen-ai/naive-ui/issues/1774).
- Fix `n-data-table` can select rows when table is loading, closes [#1812](https://github.com/tusen-ai/naive-ui/issues/1812).
- Fix `n-tag` line-height is too low that clamps the content.
- Fix `n-select` displays with mistake in input if `filterable` is `true`, closes [#1823](https://github.com/tusen-ai/naive-ui/issues/1823).
- Fix `n-page-header`'s content has margin-top when header is not displayed, closes [#1795](https://github.com/tusen-ai/naive-ui/issues/1795).
- Fix `n-avatar` `color` prop not working.
- Fix `n-avatar`'s inner icon has wrong size.
- Fix `n-image` lacks scoped style's scope-id, closes [#1788](https://github.com/tusen-ai/naive-ui/issues/1788).
- Fix `n-radio` click event will be triggered twice, closes [#1680](https://github.com/tusen-ai/naive-ui/issues/1680).
- Fix `n-data-table` layout display incorrect when the table is empty and min-height set, closes [#1809](https://github.com/tusen-ai/naive-ui/issues/1809).
- Fix `n-data-table`'s summary has hover style.
- Fix `n-data-table` fixed group column box-shadow error and right fixed column order error, closes [#1832](https://github.com/tusen-ai/naive-ui/issues/1832).
- Fix `n-anchor`'s hover & active style.
- Fix `n-data-table`'s header fixed column style on data is empty.

### Feats

- `n-tree-select` adds `menu-props` prop.
- `n-tree-select` adds `action` slot, closes [#1765](https://github.com/tusen-ai/naive-ui/issues/1765).
- `n-tree-select` adds `empty` slot.
- `n-cascader` adds `empty` slot.
- `n-popselect` adds `action` slot.
- `n-popselect` adds `empty` slot.
- `n-data-table` will check all if indeterminate header checkbox is clicked, closes [#1827](https://github.com/tusen-ai/naive-ui/issues/1827).
- `n-button` uses `n` as CSS vars prefix, closes [#1808](https://github.com/tusen-ai/naive-ui/issues/1808).
- `n-date-picker` adds `default-time` prop.
- `n-alert` uses `n` as CSS vars prefix.
- `n-date-picker`'s `type` prop support `quarter` option.
- `n-anchor` uses `n` as CSS vars prefix.

### i18n

- Add zhTW locale.

## 2.21.5

`2021-12-07`

### Fixes

- Fix `n-input` click clear icon does't trigger `change` event, closes [#1754](https://github.com/tusen-ai/naive-ui/issues/1754).
- Fix `n-input-number` the cursor moves when press arrow keys to change value, closes [#1759](https://github.com/tusen-ai/naive-ui/issues/1759).

### Feats

- `n-date-picker`'s default format follows i18n.

### i18n

- Add frFR locale.

## 2.21.4

`2021-12-06`

### Fixes

- Fix `n-date-picker` has no placeholder when `type` is `year`.
- Fix `n-element` doesn't export `NEl` alias name.
- Fix `n-upload` still shows upload trigger when max limit is reached in `image-card` mode, closes [#1744](https://github.com/tusen-ai/naive-ui/issues/1744).
- Fix `n-form`'s `FormValidate` type lacks `shouldRuleBeApplied` parameter, closes [#1747](https://github.com/tusen-ai/naive-ui/issues/1747).
- Fix `n-upload` is displayed vertically in `n-form` in `image-card` mode, closes [#1746](https://github.com/tusen-ai/naive-ui/issues/1746).
- Fix `n-upload`'s file list's top margin if trigger is hidden.
- Fix `n-upload` shows normal file status when response has 4xx status, closes [#1741](https://github.com/tusen-ai/naive-ui/issues/1741).

### Feats

- `n-upload` adds `show-trigger` prop.
- `n-data-table` will ignore `children` with length 0 in tree data mode, closes [#1703](https://github.com/tusen-ai/naive-ui/issues/1703).

## 2.21.3

`2021-12-03`

### Fixes

- Fix `n-theme-editor` throw error when click button component, closes [#1708](https://github.com/tusen-ai/naive-ui/issues/1708).
- Fix `n-input`'s color is abnormal in Android WeChat, closes [#1705](https://github.com/tusen-ai/naive-ui/issues/1705).
- Fix `n-input` 's `borderHover` theme variable doesn't work, closes [#1704](https://github.com/tusen-ai/naive-ui/issues/1704).
- Fix `n-dialog`'s `content` word-break.
- Fix `n-input-number` cannot input decimals value.
- Fix `n-data-table`'s header & body may have wrong border radius, closes [#1712](https://github.com/tusen-ai/naive-ui/issues/1712).
- Fix `n-button`'s `colorOpacityXxx` theme vars are not string typed.

### Feats

- `n-switch` adds `rail-style` prop, closes [#1718](https://github.com/tusen-ai/naive-ui/issues/1718).
- `n-image` adds `preview-disabled` props, closes [#1647](https://github.com/tusen-ai/naive-ui/issues/1647).
- `n-image` adds `on-load` & `on-error` prop.
- `n-image` adds `fallback-src` prop.
- `n-data-table` adds `on-update:expanded-row-keys` prop.
- `n-tree` adds `watch-props` prop.

## 2.21.2

`2021-11-29`

### Fixes

- Fix `n-slider` disabled tooltip at the wrong time.
- Fix `n-slider` incorrect fill color style, closes [#1670](https://github.com/tusen-ai/naive-ui/issues/1670).
- Fix `n-data-table`'s pagination `onUpdatePage` prop trigger twice, closes [#1666](https://github.com/tusen-ai/naive-ui/issues/1666).
- Fix `n-log`'s `trim` prop not being independent when used.
- Fix `n-slider` processing of step value precision.
- Fix `n-date-picker` throw error when `time-picker` input is empty, closes [#1678](https://github.com/tusen-ai/naive-ui/issues/1678).
- Fix `n-popover` not working when `trigger` is `focus`.
- Fix `n-scrollbar`'s scrollbar will vanish if clicked.
- Fix `n-popover` has an invalid line in style.
- Fix `n-popover` `flip=false` doesn't work.
- Fix `n-input-number` can't accept indeterminate input value when `max` or `min` is set, closes [#1664](https://github.com/tusen-ai/naive-ui/issues/1664).
- Fix `n-input-number`'s input value is not changed to a valid value if it's input exceeds min or max multiple times.

### Feats

- `n-input-number` adds `keyboard` prop.
- Add `tableColorStriped` theme variable, closes [#1686](https://github.com/tusen-ai/naive-ui/issues/1686).
- `n-notification-provider` adds `max` & `placement` prop.
- `n-notification` adds `destroyAll` method, closes [#333](https://github.com/tusen-ai/naive-ui/issues/333).
- `n-layout-sider` adds `on-after-enter` and `on-after-leave` props, closes [#1241](https://github.com/tusen-ai/naive-ui/issues/1241).
- `n-upload` adds `custom-request` prop, closes [#1389](https://github.com/tusen-ai/naive-ui/issues/1389).
- `n-data-table` adds `expanded-row-keys` prop.
- `n-popover` provides better auto position adjustment, closes [#1520](https://github.com/tusen-ai/naive-ui/issues/1520), [#1643](https://github.com/tusen-ai/naive-ui/issues/1643).
- `n-input-number` adds `update-value-on-input` prop, closes [#1662](https://github.com/tusen-ai/naive-ui/issues/1662).
- `n-auto-complete` adds `prefix` & `suffix` slot.

## 2.21.1

`2021-11-23`

### Fixes

- Fix `n-image` drag the picture to move the position incorrectly when the zoom is large.
- Fix `n-data-table` style glitches after some rows are expanded.
- Fix `n-data-table` doesn't expand tree data correctly, closes [#1644](https://github.com/tusen-ai/naive-ui/issues/1644).

## 2.21.0

`2021-11-21`

### Breaking Changes

- `NButton.fontWeightText` & `NButton.fontWeightGhost` theme vars are removed. If you want to change font weight, you can use `strong` prop of `n-button` instead.

### Feats

- `n-tag` adds `avatar` slot.
- `n-data-table` adds `striped` prop, closes [#1552](https://github.com/tusen-ai/naive-ui/issues/1552).
- `n-table` adds `striped` prop, closes [#1552](https://github.com/tusen-ai/naive-ui/issues/1552).
- `n-slider` adds `vertical` prop, closes [#1468](https://github.com/tusen-ai/naive-ui/issues/1468).
- `n-slider` adds `reverse` prop.
- `n-slider`'s `step` prop support `mark` option.
- Bypass Vitejs bug on string extrapolation, ref [#636](https://github.com/tusen-ai/naive-ui/issues/636).
- `n-button` adds `strong` prop.
- `n-button` adds `secondary` prop.
- `n-button` adds `tertiary` prop.
- `n-button` adds `quaternary` prop.
- `n-auto-complete` adds `input-props` prop, closes [#1610](https://github.com/tusen-ai/naive-ui/issues/1610).
- `n-avatar` adds `fallback-src` prop, closes [#702](https://github.com/tusen-ai/naive-ui/issues/702).
- `n-avatar` adds `on-error` prop.
- `n-input` adds `select` methods, closes [#1328](https://github.com/tusen-ai/naive-ui/issues/1328).
- Add `n-tab` component, closes [#1630](https://github.com/tusen-ai/naive-ui/issues/1630).
- `n-switch` adds `round` prop, closes [#1469](https://github.com/tusen-ai/naive-ui/issues/1469).
- `n-step` adds `title` slot.
- `n-menu` support `divider` type option.

### Fixes

- Fix the default value of the `suffix` internal component's `loading` property.
- Fix `n-space` is shown when it has no children, closes [#1605](https://github.com/tusen-ai/naive-ui/issues/1605).
- Fix `n-radio` has no `onUpdateChecked` prop.
- Fix `n-dropdown` animation flicker problem, closes [#1600](https://github.com/tusen-ai/naive-ui/issues/1600).
- Fix `n-data-table`’s `clearSorter` method isn't exported properly.
- Fix `n-global-style` throws error in SSR.
- Fix `n-button` will trigger click event twice if pressed, closes [#1626](https://github.com/tusen-ai/naive-ui/issues/1626).

## 2.20.3

`2021-11-15`

### Fixes

- Fix `n-grid` suffix NGridItem does not set right span when collapsed, closes [#1530](https://github.com/tusen-ai/naive-ui/issues/1530).
- Fix `n-button` to shrink abnormally in certain scenarios when using the `circle` prop, closes [#1557](https://github.com/tusen-ai/naive-ui/issues/1557).
- Fix `input-props` does affect `type` prop, closes [#1553](https://github.com/tusen-ai/naive-ui/issues/1553)

### Feats

- `n-menu` adds a color distinction between selected and unselected arrow, closes [#1535](https://github.com/tusen-ai/naive-ui/issues/1535).
- `n-menu` adds `watch-props` prop, closes [#1536](https://github.com/tusen-ai/naive-ui/issues/1536).
- `n-date-picker`'s `type` prop support `year` option.

### i18n

- Add `createLocale` to make locale customizable, closes [#1525](https://github.com/tusen-ai/naive-ui/issues/1525).

## 2.20.2

`2021-11-05`

### Feats

- `n-modal` adds `transform-origin` prop, closes [#1498](https://github.com/tusen-ai/naive-ui/issues/1498).
- `n-tabs` adds `pane-class` prop, closes [#1500](https://github.com/tusen-ai/naive-ui/issues/1500).

### Fixes

- Fix `n-alert` `contentTextColor` and `titleTextColor` type theme variable not working, closes [#1495](https://github.com/tusen-ai/naive-ui/issues/1495).
- Fix `n-time-picker` not trigger blur event when the panel is closed by ok button, closes [#1499](https://github.com/tusen-ai/naive-ui/issues/1499).
- Fix `n-upload` `UploadFileInfo`'s `thumbnailUrl` field not working, closes [#1495](https://github.com/tusen-ai/naive-ui/issues/1245).
- Fix `n-button` `keyboard` prop does not work, closes [#1508](https://github.com/tusen-ai/naive-ui/issues/1508).
- Fix `n-upload` instance misses `openOpenFileDialog` method.

### i18n

- Add deDE locale.
- Add nbNO locale.

## 2.20.1

`2021-11-01`

### Fixes

- Fix `n-tabs` switch tab does not work when adding a new tab, closes [#1417](https://github.com/tusen-ai/naive-ui/issues/1417).
- Fix `n-tree`'s `filter` prop does not work when assigned `children-field` , closes [#1477](https://github.com/tusen-ai/naive-ui/issues/1477).
- Fix `n-cascader` can't remove options when using customized fields in multiple mode.
- Fix `n-select`'s option created by `on-create` doesn't show correct label in trigger, closes [#1482](https://github.com/tusen-ai/naive-ui/issues/1482)
- Fix `n-select` menu height shifts on close in `filterable` mode.

### Feats

- `n-select` adds `menu-props` prop, closes [#1475](https://github.com/tusen-ai/naive-ui/issues/1475).
- `n-image`'s `toolbar` adds close icon, closes [#1412](https://github.com/tusen-ai/naive-ui/issues/1412).
- `n-tree`'s `on-load` prop is triggered when the `expanded-keys` prop changes in `remote` mode, closes [#1339](https://github.com/tusen-ai/naive-ui/issues/1339).

## 2.20.0

`2021-10-28`

### Breaking Changes

- `n-collapsed-transition`'s `collapsed` prop is deprecated, please use `show` instead, closes [#1407](https://github.com/tusen-ai/naive-ui/issues/1407).

### Fixes

- Fix `n-log` `font-size` prop not working, closes [#1416](https://github.com/tusen-ai/naive-ui/issues/1416).
- Fix `n-loading-bar` will show once even if `start` is not called when `loading-bar-style` is set.
- Fix `n-date-picker` `separator` prop not working, closes [#1456](https://github.com/tusen-ai/naive-ui/issues/1456)

### Feats

- `n-data-table` optimize the logic of underlying rendering and improve component performance.
- `n-date-picker`'s `shortcuts` prop supports functional value.
- `n-tab-pane`'s `display-directive` props supports the `show:lazy` option, closes [#1374](https://github.com/tusen-ai/naive-ui/issues/1374).
- `n-input` of text type supports `count` slots, closes [#1440](https://github.com/tusen-ai/naive-ui/issues/1440).

### i18n

- Add idID locale.

## 2.19.11

`2021-10-21`

### Fixes

- Fix `n-upload`'s file can't be removed when file count limit is reached, closes [#1401](https://github.com/tusen-ai/naive-ui/issues/1401).

### Feats

- `n-tabs` adds `on-before-leave` prop, closes [#1337](https://github.com/tusen-ai/naive-ui/issues/1337).
- `n-color-picker` adds `show-preview` prop, closes [#1281](https://github.com/tusen-ai/naive-ui/issues/1281).
- `n-tab-pane`'s `display-directive` prop support `show:lazy` option, closes [#1374](https://github.com/tusen-ai/naive-ui/issues/1374).

## 2.19.9

`2021-10-18`

### Fixes

- Fix `n-collapse`'s expanded status is lost when using `v-if` with `n-collapse-item`, closes [#1387](https://github.com/tusen-ai/naive-ui/issues/1387).
- Fix `n-dialog`'s close button will be overlayed with content, closes [#1381](https://github.com/tusen-ai/naive-ui/issues/1381).
- Fix `n-upload` file is set to `null` after upload failure, closes [#1316](https://github.com/tusen-ai/naive-ui/issues/1316).
- Fix `n-cascader`'s `filter` prop not working.
- Fix `n-cascader`'s `label-field` prop breaks filter.
- Fix `n-cascader`'s `separator` prop isn't appiled to filter select menu.

### Feats

- `n-menu` adds `dropdown-props` prop, closes [#1345](https://github.com/tusen-ai/naive-ui/issues/1345).
- `n-input` adds `count` slot, closes [#1314](https://github.com/tusen-ai/naive-ui/issues/1314).
- `n-time-picker` adds `use-12-hours` prop, closes [#547](https://github.com/tusen-ai/naive-ui/issues/547).
- `n-input-number` adds `focus` & `blur` methods.

## 2.19.8

`2021-10-14`

### Fixes

- Fix `n-data-table` fixed style does not work in group header table, closes [#1341](https://github.com/tusen-ai/naive-ui/issues/1341).
- Fix `n-data-table` has duplicate right border when it has multiple level headers.
- Fix `n-scrollbar` doesn't support `scrollTo`, closes [#1346](https://github.com/tusen-ai/naive-ui/issues/1346).
- Fix `n-ellipsis`'s `expand-trigger` prop not show `pointer` cursor when content is short when `tooltip = false`, closes [#1299](https://github.com/tusen-ai/naive-ui/issues/1299).
- Fix `n-upload`'s `disabled` prop's style not working, closes [#1237](https://github.com/tusen-ai/naive-ui/issues/1237).
- `n-config-provider` adds `breakpoints` prop, closes [#1379](https://github.com/tusen-ai/naive-ui/issues/1379).

### Feats

- `n-auto-complete` adds `get-show` prop, closes [#1292](https://github.com/tusen-ai/naive-ui/issues/1292).
- `n-select` adds `input-props` prop, closes [#1351](https://github.com/tusen-ai/naive-ui/issues/1351).
- `n-color-picker` adds `swatches` prop, ref [#1281](https://github.com/tusen-ai/naive-ui/issues/1281).
- `n-upload` adds `max` prop.

### i18n

- Add jaJP locale.

## 2.19.7

`2021-10-12`

### Fixes

- Fix `n-ellipsis`'s `expand-trigger` prop not show `pointer` cursor when content is short, closes [#1299](https://github.com/tusen-ai/naive-ui/issues/1299).
- Fix `n-select`'s `fallback-option` prop's type, closes [#1327](https://github.com/tusen-ai/naive-ui/issues/1327).
- Fix `n-modal`'s `on-after-enter` prop not working.

## 2.19.6

`2021-10-10`

### Fixes

- Fix `n-menu`'s incorrect warning on `default-expanded-keys`.
- Fix `useThemeVars` is sometimes unusable, closes [#1309](https://github.com/tusen-ai/naive-ui/issues/1309).
- Fix the `list-style` style of the `<ul>` element.

### Feats

- `n-cascader` provide all options paths in `update:value` callback function, closes [#1235](https://github.com/tusen-ai/naive-ui/issues/1235).
- `n-layout` and `n-layout-sider` adds `on-scroll` prop, closes [#1232](https://github.com/tusen-ai/naive-ui/issues/1232).
- `n-config-provider` adds `preflight-style-disabled` prop.

## 2.19.5

`2021-10-07`

### Fixes

- Fix `n-form-item`'s content is too long and the width is incorrect
- Fix `n-layout-sider`'s `arrow-circle`'s icon style.
- Fix `n-upload`'s `show-preview-button` prop not working, closes [#1238](https://github.com/tusen-ai/naive-ui/issues/1238).
- Fix `n-date-picker`'s `date` type of `action` validate error.
- Fix `n-data-table` throws error when using `selection` and `summary` together, closes [#1276](https://github.com/tusen-ai/naive-ui/issues/1276).
- Fix `n-data-table` selection column's width is collapsed when it is set to fixed, closes [#1283](https://github.com/tusen-ai/naive-ui/issues/1283).
- Fix `n-popconfirm` can't be nested in `n-tooltip`, closes [#872](https://github.com/tusen-ai/naive-ui/issues/872).
- Fix `n-popselect` checkmark overlays on option text, closes [#1282](https://github.com/tusen-ai/naive-ui/issues/1282).
- Fix `n-pagination` `buttonColor` theme variable not working.

### Feats

- `n-breadcrumb-item` adds `href` prop.
- `n-descriptions` adds `separator` prop, closes [#1263](https://github.com/tusen-ai/naive-ui/issues/1263).
- `n-dropdown` adds `key-field` prop.
- `n-dropdown` adds `label-field` prop.
- `n-dropdown` adds `children-field` prop.
- `n-menu` adds `key-field` prop.
- `n-menu` adds `label-field` prop.
- `n-menu` adds `children-field` prop.
- `n-data-table` supports using path of the property to get as column key, closes [#1271](https://github.com/tusen-ai/naive-ui/issues/1271).
- `n-switch` adds `checked-value` prop, closes [#1234](https://github.com/tusen-ai/naive-ui/issues/1234).
- `n-switch` adds `unchecked-value` prop, closes [#1234](https://github.com/tusen-ai/naive-ui/issues/1234).
- `n-checkbox` adds `checked-value` prop, closes [#1234](https://github.com/tusen-ai/naive-ui/issues/1234).
- `n-checkbox` adds `unchecked-value` prop, closes [#1234](https://github.com/tusen-ai/naive-ui/issues/1234).
- Add `n-collapse-transition` component, closes [#829](https://github.com/tusen-ai/naive-ui/issues/829).
- Add `n-scrollbar` component.
- `n-dropdown` support options with `type='render'`.
- `n-data-table` supports multiple column sorting.
- `n-date-picker` adds `first-day-of-week` prop.
- `n-date-picker`'s `type` prop support `month` option.
- `n-popover` adds `to` prop.
- `n-tree`'s `on-update:indeterminateKeys` prop adds option info.
- `n-tree`'s `on-update:expandedKeys` prop adds option info.
- `n-tree`'s `on-update:checkedKeys` prop adds option info.
- `n-tree`'s `on-update:selectedKeys` prop adds option info.

## 2.19.3

`2021-09-28`

### Fixes

- Fix `n-data-table` ellipsis not show when last column not set ellipsis, closes [#934](https://github.com/tusen-ai/naive-ui/issues/934).
- Fix `n-grid-item` won't work with responsive config.
- Fix `n-tabs`'s scroll shadow is not updated when it's resized, closes [#1224](https://github.com/tusen-ai/naive-ui/issues/1224).

### Feats

- `n-grid-item` won't display when `span` is 0, closes [#1220](https://github.com/tusen-ai/naive-ui/issues/1220).
- `n-grid` adds `item-responsive` prop.

## 2.19.2

`2021-09-26`

### i18n

- Add ukUA locale.

### Fixes

- Fix `n-global-style` applies style transition on first mount.
- Fix `n-drawer` border transition, closes [#1211](https://github.com/tusen-ai/naive-ui/issues/1211).
- Fix `n-input-number`'s `value` prop can't be `null` type.
- Fix components with rtl support throws error in SSR.
- Fix components with popover throws error in SSR.
- Fix global theme overrides not working for `n-select` trigger, closes [#1229](https://github.com/tusen-ai/naive-ui/issues/1229).

### Feats

- `n-checkbox` adds aria support.
- `n-alert` aria support.

## 2.19.1

`2021-09-21`

### Fixes

- Fix `DialogReactive` props are readonly.
- Fix `n-tree-select` sets `check-strategy='child'` not working in single select mode.
- Fix `n-upload`'s trigger is compressed in `image-card` mode when it's the only item in the row.
- Fix `n-upload-dragger` has no border transition.
- Fix `n-upload` can't upload files.
- Fix `n-tree`'s `checkable` prop doesn't work when `cascade` is `false`.
- Fix `n-tree-select`'s `checkable` prop doesn't work when `cascade` or `multiple` is `false`.

## 2.19.0

`2021-09-19`

### Breaking Changes

- `n-layout-sider`'s `arrow-circle` trigger is changed into new style.

### Feats

- `n-layout-sider` adds `collapsed-trigger-style` prop.
- `n-menu` adds `accordion` prop , closes [#917](https://github.com/tusen-ai/naive-ui/issues/917).
- `n-input-number` adds `readonly` prop , closes [#1198](https://github.com/tusen-ai/naive-ui/issues/1198).
- `n-spin` adds `description` prop and slot.
- `n-anchor` adds `type` prop.
- `n-upload` adds `abstract` prop, adds `n-upload-trigger` 和 `n-upload-file-list` component, closes [#1102](https://github.com/tusen-ai/naive-ui/issues/1102).
- `n-tree` adds `indeterminate-keys` prop.
- `n-tree-select` adds `indeterminate-keys` prop.
- `n-tree` adds `on-update:indeterminate-keys` prop.
- `n-tree-select` adds `on-update:indeterminate-keys` prop.
- `n-tabs` `type` prop adds `'segment'` option, closes [#1133](https://github.com/tusen-ai/naive-ui/issues/1133).
- `n-popover` adds `z-index` prop, closes [#764](https://github.com/tusen-ai/naive-ui/issues/764).
- `n-modal` adds `on-after-enter` prop.
- `n-modal` adds `on-after-leave` prop.

### Fixes

- Fix `n-select` focus input when closing tag with `filterable` , closes [#1170](https://github.com/tusen-ai/naive-ui/issues/1170).
- Fix `n-button` border on hover conflicts with `n-badge`, closes [#1195](https://github.com/tusen-ai/naive-ui/issues/1195).
- Fix `n-upload` prop `v-model:file-list` dosen't work well when prop `multiple` is `true`, closes [#418](https://github.com/tusen-ai/naive-ui/issues/418).
- Fix `useThemeVars` doesn't apply theme overrides, closes [#1194](https://github.com/tusen-ai/naive-ui/issues/1194), [#1176](https://github.com/tusen-ai/naive-ui/issues/1176).
- Fix `n-tabs`'s left shadow isn't displayed in card type.

## 2.18.2

`2021-09-14`

### Feats

- `n-cascader` show `Empty` component when `options` prop is empty, closes [#1092](https://github.com/tusen-ai/naive-ui/issues/1092).
- `n-cascader`'s `on-update:value` prop adds option info.
- `n-tree` adds `check-strategy` prop.
- `n-date-picker` adds `input-readonly` prop, closes [#1120](https://github.com/tusen-ai/naive-ui/issues/1120).
- `n-time-picker` adds `input-readonly` prop, closes [#1120](https://github.com/tusen-ai/naive-ui/issues/1120).
- `n-config-provider` adds global config of the `Empty` component, closes [#1092](https://github.com/tusen-ai/naive-ui/issues/1092).
- `n-select` adds `on-update:show` prop.
- `n-auto-complete` exports `AutoCompleteOption` and `AutoCompleteGroupOption` types.
- `n-page-header` adds `RTL` support.
- `n-select` support variadic height option rendering.
- `n-tree-select`'s `on-update:value` prop adds option info.
- `n-select`'s `on-update:value` prop adds option info.
- `n-popselect`'s `on-update:value` prop adds option info.
- `n-card` adds `embedded` prop.

### Fixes

- Fix `n-p` warns when `depth` is number.
- Fix `n-date-picker`‘s type of `actions` prop.
- Fix `n-select` can't override `n-empty`'s theme variables.
- Fix `n-dynamic-tags` adds button is not disabled when it is disabled.
- Fix `n-select` closes menu when enter key is pressed in filterable mode without options data.
- Fix `n-auto-complete`'s `children` prop can't use `AutoCompleteOption` type.
- Fix `n-gi`'s `collapsed` does not work in `n-form-item-gi`, closes [#1160](https://github.com/tusen-ai/naive-ui/issues/1160).

## 2.18.1

`2021-09-08`

### Feats

- `useDialog` option adds `style` prop, closes [#1054](https://github.com/tusen-ai/naive-ui/issues/1054).
- `n-timeline` adds `icon` slot, closes [#1096](https://github.com/tusen-ai/naive-ui/issues/1096).
- `n-timeline` adds `icon-size` prop.

### Fixes

- Fix `n-step` doesn't work with `v-for` children.
- Fix `n-input-number` cannot enter decimals when `step` is not a decimal.

## 2.18.0

`2021-09-07`

### Breaking Changes

- `n-form` & `n-form-item` split `show-require-mark` into `show-require-mark` and `require-mark-placement`.

### Feats

- `n-drawer` adds `on-mask-click` prop.
- `n-for` adds `require-mark-placement` prop, closes [#1055](https://github.com/tusen-ai/naive-ui/issues/1055).
- `n-form-item` adds `require-mark-placement` prop, closes [#1055](https://github.com/tusen-ai/naive-ui/issues/1055).

### Fixes

- Fix `n-step` must be passed with `internal-index`.
- Fix `n-radio-group`'s `on-update:value` and `on-update-value` can't be array.
- Fix `n-cascader` `check-strategy="child"` doesn't behaves the same as previous `leaf-only`.

## 2.17.2

`2021-09-06`

### Fixes

- Fix `n-tree-select` shows key not label when `show-path=true`, closes [#1095](https://github.com/tusen-ai/naive-ui/issues/1095).

## 2.17.1

`2021-09-06`

### Fixes

- Fix `n-cascader` menu not showing correct checked keys.

## 2.17.0

`2021-09-05`

### Breaking Changes

- `n-tree-select`'s `leaf-only` prop is deprecated, please use `check-strategy="child"` instead.
- `n-cascader`'s `leaf-only` prop is deprecated, please use `check-strategy="child"` instead.
- `n-input`'s `show-password-toggle` is deprecated, please use `show-password-on="click"` instead.

### Fixes

- Fix `n-cascader` click tag to delete the sub option in multi selection mode, and the tree option is not updated.
- Fix `n-input` chinese input method not correct while mouse leave the input in `clearable` is true, closes [#905](https://github.com/tusen-ai/naive-ui/issues/905).
- Fix `n-description`'s warning caused by `v-if` that should not appear, closes [#1083](https://github.com/tusen-ai/naive-ui/issues/1083).
- Fix `n-layout`'s `sider-placement` doesn't work after build, closes [#978](https://github.com/tusen-ai/naive-ui/issues/978).
- Fix `n-input-number`'s `step` calculate error when the value is decimal, closes [#1007](https://github.com/tusen-ai/naive-ui/issues/1007).
- Fix `n-popselect`' s default placement and padding.
- Fix `n-calendar`'s text color of disabled date.

### Feats

- `n-cascader` adds `onUpdateValue` prop.
- `n-auto-complete` adds `onUpdateValue` prop.
- `n-data-table`'s column's `renderFilterMenu` adds `hide` param.
- `n-tree` adds `key-field` prop.
- `n-tree` adds `label-field` prop.
- `n-tree` adds `children-field` prop.
- `n-tree-select` adds `key-field` prop.
- `n-tree-select` adds `label-field` prop.
- `n-tree-select` adds `children-field` prop.
- `n-cascader` adds `key-field` prop.
- `n-cascader`adds `label-field` prop.
- `n-cascader` adds `children-field` prop.
- `n-dropdown` option adds `props` prop, closes [#813](https://github.com/tusen-ai/naive-ui/issues/813).
- `n-data-table` supports multi-selection by holding down `shift`, closes [#554](https://github.com/tusen-ai/naive-ui/issues/554).
- `n-tree-select` adds `check-strategy` prop, closes [#624](https://github.com/tusen-ai/naive-ui/issues/624).
- `n-cascader` adds `check-strategy` prop.
- `n-message` option adds `keepAliveOnHover`, closes [#1036](https://github.com/tusen-ai/naive-ui/issues/1036).
- `n-message-provider` adds `keep-alive-on-hover` prop, closes [#1036](https://github.com/tusen-ai/naive-ui/issues/1036).
- `n-upload` export `UploadFile` type.
- `n-cascader` export `CascaderOption` type.
- `n-mention` export `MentionOption` type.
- `n-transfer` export `TransferOption` type.
- `n-pagination` export `PaginationInfo` type.
- `n-data-table` export `DataTableCreateSummary` type.
- `n-code` adds `inline` prop, closes [#834](https://github.com/tusen-ai/naive-ui/issues/834)
- `n-collapse` adds `header-extra` slot, closes [#1046](https://github.com/tusen-ai/naive-ui/issues/1046).
- `n-input` adds `show-password-on` prop.
- `n-upload` adds `list-type`, `show-preview-button`, `on-preview` and `create-thumbnail-url` prop.

## 2.16.7

`2021-08-27`

### Feats

- `n-mention` adds `focus` and `blur` methods.

### Fixes

- Fix `n-mention`'s menu is too far from text in input mode.
- Fix `n-tree` node can not expanded.

## 2.16.6

`2021-08-26`

### Feats

- `n-timeline` adds `horizontal` prop, closes [#887](https://github.com/tusen-ai/naive-ui/issues/887).
- `n-image` adds `preview-src` prop, closes [#922](https://github.com/tusen-ai/naive-ui/issues/922)
- `n-dynamic-tags` adds `input` and `add` slot, closes [#499](https://github.com/tusen-ai/naive-ui/issues/499).
- `n-timeline-item` adds `color` prop.

### Fixes

- Fix `n-image` not initializing `rotate` after switching images, closes [#921](https://github.com/tusen-ai/naive-ui/issues/921).
- Fix `n-data-table`'s loading is not centered, closes [#929](https://github.com/tusen-ai/naive-ui/issues/929).
- Fix `n-tree` throws an exception when onLoad callback does not adds children, closes [#772](https://github.com/tusen-ai/naive-ui/issues/772).
- Fix `n-input` will show placeholder and 0 simultaneously while passing `value=ref(0)` in n-input, closes [#914](https://github.com/tusen-ai/naive-ui/issues/914).
- Fix `n-data-table` `flex-height` not working without `scroll-x`, closes [#952](https://github.com/tusen-ai/naive-ui/issues/952).

## 2.16.5

`2021-08-20`

### Feats

- `n-input-number` adds `clearable` prop.
- `n-form` adds `show-label` prop, closes [#858](https://github.com/tusen-ai/naive-ui/issues/858).

### Fixes

- Fix `n-notification`'s exported `NotificationReactive` type is not writable, closes [#876](https://github.com/tusen-ai/naive-ui/issues/876).
- Fix `n-tabs` style glitches when different types tabs are nested, closes [#850](https://github.com/tusen-ai/naive-ui/issues/850).
- Fix `n-dropdown`'s inner link click trigger area is not the entire option, closes [#823](https://github.com/tusen-ai/naive-ui/issues/823).
- Fix `n-popover` arrow's misplacement when placed in nested popovers with different placement, closes [#916](https://github.com/tusen-ai/naive-ui/issues/916).
- Fix `n-ellpisis` doesn't work after content is updated, closes [#776](https://github.com/tusen-ai/naive-ui/issues/776).

## 2.16.4

`2021-08-16`

### Fixes

- Fix ruRU locale exports.

## 2.16.3

`2021-08-16`

### i18n

- Add ruRU locale [#852](https://github.com/tusen-ai/naive-ui/pull/852).

### Feats

- `n-message-provider` adds `container-style` prop.
- `n-message-provider` adds `placement` prop.
- `n-message` adds class to distinguish type.
- `n-date-picker` adds `shortcuts` props, closes [#280](https://github.com/tusen-ai/naive-ui/issues/280).

### Fixes

- Fix `n-rate` half star overlays star background in dark mode.
- Fix `n-menu` renders unexpectly when `render-icon` returns `true`.
- Fix `n-space` render empty placeholder while use `v-if`, closes [#824](https://github.com/tusen-ai/naive-ui/issues/824).

## 2.16.2

`2021-08-09`

### Feats

- `n-message-provider` adds `closable` prop, closes [#795](https://github.com/tusen-ai/naive-ui/issues/795).
- `n-tree-select` adds `show-path` prop, closes[#625](https://github.com/tusen-ai/naive-ui/issues/623).
- `n-layout` adds `sider-placement` prop, closes [#566](https://github.com/tusen-ai/naive-ui/issues/566).

### Fixes

- Fix `n-avatar`'s scale value is incorrect while use v-show, closes [#779](https://github.com/tusen-ai/naive-ui/issues/779).
- Fix `n-menu` show a blue background when click the menu on mobile phone, closes [#799](https://github.com/tusen-ai/naive-ui/issues/799).
- Fix `n-select` filterable select breaks, closes [#510](https://github.com/tusen-ai/naive-ui/issues/510).
- Fix `n-data-table` When selectAll is selected, the state display of selectAll should not contain disabled rows, closes [#778](https://github.com/tusen-ai/naive-ui/issues/778).
- Fix `n-color-picker`'s `on-complete` callback's argument `value` is incorrect, closes [#748](https://github.com/tusen-ai/naive-ui/issues/748).

## 2.16.1

`2021-08-06`

### Feats

- `n-loading-bar-provider` adds `loading-bar-style` props, closes [#457](https://github.com/tusen-ai/naive-ui/issues/457).
- `n-button` adds `text-color` prop.
- `n-form` export `FormValidationError` type.
- `n-popconfirm` support not show action components, closes [#770](https://github.com/tusen-ai/naive-ui/issues/770).

### Fixes

- Fix `n-slider` loss floating point decimal precision, closes [#751](https://github.com/tusen-ai/naive-ui/issues/751).
- Fix `n-data-table` `onUpdatePage` and `onUpdatePageSize` not triggered while using jsx.
- Fix `n-progress`'s `percentage` prop default value doesn't work with different types.
- Fix `n-select` hide close icon when option is disabled.
- Fix `n-modal` can't be closed when using custom content, closes [#788](https://github.com/tusen-ai/naive-ui/issues/788).

## 2.16.0

`2021-08-02`

### Breaking Changes

- `useLoadingBar`'s `finish` method won't work if no `start` is called.
- `n-input`'s `type='input'` is renamed to `type='text'`.

### Feats

- `n-scrollbar` adds `scrollbarWidth`, `scrollbarHeight` and `scrollbarBorderRadius` common theme variables, closes [#649](https://github.com/tusen-ai/naive-ui/issues/649).
- `n-menu` doesn't should icon placeholder when `render-icon` returns falsy value, closes [#722](https://github.com/tusen-ai/naive-ui/issues/722).
- `n-menu` adds `render-extra` prop.
- `n-select` adds `on-clear` prop.
- `n-form` adds `disabled` prop, closes [#538](https://github.com/tusen-ai/naive-ui/issues/538).
- `n-dynamic-tags` adds `max` prop.

### Fixes

- Fix `n-dropdown` click exception when using v-for.
- Fix `n-modal` cannot customize classes when use preset, closes [#744](https://github.com/tusen-ai/naive-ui/issues/744).
- Fix `n-cascader` menu width shifts in virtual scroll mode, closes [#728](https://github.com/tusen-ai/naive-ui/issues/728).

## 2.15.11

`2021-07-29`

### Fixes

- Fix `n-data-table` pagination's error.

## 2.15.10

`2021-07-29`

### Feats

- `n-pagination` adds `prev` and `next` slots, ref [#648](https://github.com/tusen-ai/naive-ui/issues/648).
- `n-tag` adds `color` prop, closes [#693](https://github.com/tusen-ai/naive-ui/issues/693).
- `n-dynamic-tags` adds `color`, closes [#693](https://github.com/tusen-ai/naive-ui/issues/693).
- `n-time-picker` optimization the now button logic, closes [#401](https://github.com/tusen-ai/naive-ui/issues/401).
- `n-pagination` `PaginationInfo` adds `itemCount` prop, closes [#585](https://github.com/tusen-ai/naive-ui/issues/585).
- `n-select` adds `on-clear` prop.

### Fixes

- Fix `n-message`'s `destroyAll` method doesn't work.
- Fix `n-timeline`'s header slot is invalid when using alone.
- Fix `n-select` incorrect style when props has `disabled` and `filterable`, closes [#698](https://github.com/tusen-ai/naive-ui/issues/698).
- Fix `n-upload` operation buttons displayed when has `file-list` & `disabled` props, closes [#668](https://github.com/tusen-ai/naive-ui/issues/668).

## 2.15.9

`2021-07-28`

### Feats

- `n-message` adds `destroyAll` method.
- `n-input-number` adds `prefix`, `suffix` slots, closes [#609](https://github.com/tusen-ai/naive-ui/issues/609).

### Fixes

- Fix `n-message` options' `duration` prop doesn't work.

## 2.15.8

`2021-07-27`

### Feats

- `n-menu` adds `expand-icon` prop, closes [#414](https://github.com/tusen-ai/naive-ui/issues/414).
- `n-descriptions`, `n-descriptions-item` adds `label-style` and `content-style` props, closes [#536](https://github.com/tusen-ai/naive-ui/issues/536).

### Fixes

- Fix `n-data-table` the style penetration of the `n-spin`, closes [#663](https://github.com/tusen-ai/naive-ui/issues/663).

## 2.15.7

`2021-07-25`

### Feats

- `n-dropdown` adds `show-arrow` prop, closes [#647](https://github.com/tusen-ai/naive-ui/issues/647).
- `n-time-picker` adds `actions` prop, closes [#401](https://github.com/tusen-ai/naive-ui/issues/401).
- `n-mention` adds `render-label` prop.
- `n-switch` adds `checked`, `unchecked` slots.
- `n-switch` adds `loading` prop, closes [#301](https://github.com/tusen-ai/naive-ui/issues/301).
- `n-select` pressing arrow down can open menu, ref [#300](https://github.com/tusen-ai/naive-ui/issues/300).
- `n-tree-select` pressing arrow down can open menu, ref [#300](https://github.com/tusen-ai/naive-ui/issues/300).
- `n-cascader` pressing arrow down can open menu, ref [#300](https://github.com/tusen-ai/naive-ui/issues/300).
- `n-popover`'s `trigger` prop support `'focus'`, closes [#477](https://github.com/tusen-ai/naive-ui/issues/477).
- `n-message-provider` adds `duration` and `max` props.
- `n-data-table` adds `flex-height` prop, closes [#596](https://github.com/tusen-ai/naive-ui/issues/596).

### Fixes

- Fix `n-carousel` arrow buttons cannot be displayed in a specific browser, closes [#625](https://github.com/tusen-ai/naive-ui/issues/625).
- Fix `n-layout-sider`'s `width` prop can't be string, closes [#607](https://github.com/tusen-ai/naive-ui/issues/607).
- Fix `n-slider` prop `disabled` doesn't work, closes [#641](https://github.com/tusen-ai/naive-ui/issues/641).
- Fix `n-input` show clear button when readonly.
- Fix `n-data-table` doesn't show scrollbar when table-layout is auto, closes [#518](https://github.com/tusen-ai/naive-ui/issues/518).
- Fix `n-data-table`'s header checkbox always displays checked when data is empty.
- Fix `n-data-table` header and body's scrollings are not sync.

## 2.15.6

`2021-07-23`

### Feats

- `n-menu` adds `render-icon` prop.
- `n-upload` adds `show-file-list` prop.
- `n-dropdown` adds `render-icon` prop.
- `n-checkbox-group` adds `min` and `max` prop.
- `n-mention` adds `empty` slot.
- `useDialog` option adds `on-mask-click` prop, closes [#419](https://github.com/tusen-ai/naive-ui/issues/419).
- `n-space` `justify` prop supports `center`, `space-around` and `space-between`.
- `n-date-picker` adds `close-on-select` prop, closes [#541](https://github.com/tusen-ai/naive-ui/issues/541).
- `n-dialog` adds `action` prop, closes [#550](https://github.com/tusen-ai/naive-ui/issues/550).
- `n-mention`’s `option.label` support render function.
- `n-color-picker` adds `actions` prop, closes [#319](https://github.com/tusen-ai/naive-ui/issues/319).

### Fixes

- Fix `n-space`'s inner `display: grid` element breaks item height, closes `https://github.com/tusen-ai/naive-ui/issues/546`.
- Fix `n-dropdown`'s `render-label` prop is invalid for group type option.
- Fix `n-datatable`'s `scroll-x` prop is setted, the table content width is not full of the container width, closes [#518](https://github.com/tusen-ai/naive-ui/issues/518).
- Fix `n-descriptions` doesn't work with `v-for` children.
- Fix `n-dialog` display an empty button when `positive-text` is not set, closes [#549](https://github.com/tusen-ai/naive-ui/issues/549).
- Fix `n-pagination` `PaginationInfo`'s `endIndex` data error, closes [#584](https://github.com/tusen-ai/naive-ui/issues/584).
- Fix `n-data-table` `rowClassName` doesn't work when type is string, closes [#582](https://github.com/tusen-ai/naive-ui/issues/582).

## 2.15.5

`2021-07-16`

### Feats

- `n-tree` adds `render-label`, `render-prefix` and `render-suffix` props.
- `n-rate` adds `allow-half` prop.
- `n-carousel` adds `show-arrow` prop.
- `n-slider` adds `format-tooltip` prop.
- `n-upload` adds `event` in `on-finish` callback params.
- `n-rate` adds `readonly` prop.
- `n-time-picker` adds `seconds`, `minutes`, `hours` props.
- `n-notification` export `NotificationApi`, `NotificationOptions` and `NotificationReactive` type.
- `n-avatar` adds `on-error` prop, closes [#394](https://github.com/tusen-ai/naive-ui/issues/394).
- `n-image` adds `on-error` prop, closes [#394](https://github.com/tusen-ai/naive-ui/issues/394).
- `n-image` adds `object-fit` prop, closes [#394](https://github.com/tusen-ai/naive-ui/issues/394).
- `n-avatar` adds `object-fit` prop, closes [#394](https://github.com/tusen-ai/naive-ui/issues/394).
- `n-menu` expands all the ascendant of selected item by default, closes [#481](https://github.com/tusen-ai/naive-ui/issues/481).

### Fixes

- Fix `n-calendar`'s `default-value` prop cannot be used.
- Fix `n-pagination` page count is not correct when `item-count` is 0.
- Fix `n-scrollbar` `content-style` can not override the default width of style.
- Fix `n-select` placeholder transition.
- Fix `n-loading-bar` `useLoadingBar`'s return type can be undefined.
- Fix `n-tag`'s `type` prop adds `primary` type.
- Fix `n-dynamic-tags`'s `type` prop adds `primary` type.

## 2.15.4

`2021-07-09`

### Feats

- `n-steps` adds icon customization in `'finish'` and `'error'` status.
- `n-tree` exports `TreeDragInfo` & `TreeDropInfo` type.
- `n-empty` export `icon` slot.
- `useDialog` option adds `maskClosable` prop, closes [#420](https://github.com/tusen-ai/naive-ui/issues/420).

### Fixes

- Fix `n-data-table` fixed column box-shadow doesn't update when there is only on side fixed.
- Fix `n-data-table` fixed column box-shadow doesn't update when `props.scrollX` is not set but each column's width is set.
- Fix `n-result` image doesn't show on Safari and mobile phone.
- Fix `n-drawer-content`'s `header-style` style not applied to header.
- Fix `n-dialog` instance throws error when calling `destroy`.
- Fix `n-image-group` initialize zoom scale when switching a picture [#423](https://github.com/tusen-ai/naive-ui/issues/423).
- Fix `n-select` bug in using custom label, closes [#352](https://github.com/tusen-ai/naive-ui/issues/352).
- Fix `n-carousel` when `autoplay` dot active status isn't displayed correctly, closes [#434](https://github.com/tusen-ai/naive-ui/issues/434).
- Fix `n-input` fixed clearable position, closes [#428](https://github.com/tusen-ai/naive-ui/issues/428).
- Fix `n-image` doesn't accept attributes.
- Fix `n-image` set border-radius not working, closes [#427](https://github.com/tusen-ai/naive-ui/issues/427).
- Fix `n-tab-pane` throws error when there's no children.
- Fix `n-select` clear button is too big in `n-spin`, closes [#454](https://github.com/tusen-ai/naive-ui/issues/454).
- Fix `n-select` options are not updated properly, closes [#441](https://github.com/tusen-ai/naive-ui/issues/441).

## 2.15.3

`2021-07-05`

### Feats

- `n-loading-bar` export `LoadingBarApi` type.
- `n-image` adds `img-props` prop.
- Add native `title` attributes to some components to enhance the experience.
- `n-tree` adds `prefix` and `suffix` in TreeOption.
- `n-carousel` adds `dot-placement` prop.
- `n-auto-complete` adds `loading` prop, closes [#241](https://github.com/tusen-ai/naive-ui/issues/241).
- `n-slider` adds `tooltip` prop, closes [#362](https://github.com/tusen-ai/naive-ui/issues/362).
- `n-input` adds `loading` prop.

### Fixes

- Fix `n-upload` `multiple=false` doesn't work for drag & drop, closes [#363](https://github.com/tusen-ai/naive-ui/issues/363).
- Fix `n-dropdown`'s inner `<a />`'s style.
- Fix `n-menu` tooltip's inner `<a />`'s style, closes [#338](https://github.com/tusen-ai/naive-ui/issues/338).
- Fix `n-carousel` doesn't work with `v-for` children.
- Fix `n-form` `label-align` prop not working, closes [#213](https://github.com/tusen-ai/naive-ui/issues/213)
- Fix `n-data-table` fixed column shadow doesn't work when `max-height` is set, closes [#376](https://github.com/tusen-ai/naive-ui/issues/376).

## 2.15.2

`2021-07-02`

### Feats

- `n-carousel` adds `trigger` prop.
- `n-menu` adds `dropdown-placement` prop.
- `n-upload` adds `before-upload` prop.
- `n-image` adds `alt` prop.
- Support the enter key on the numeric keypad.
- `n-spin` support `icon` slot for icon customizing, closes[#260](https://github.com/tusen-ai/naive-ui/issues/260).
- `n-spin` adds `rotate` prop fro slot icon to rotate.
- `n-form` export `FormItemRule` & `FormRules` type.
- `n-select` adds `render-tag` prop.

### Fixes

- Fix `n-log` warn on highlight.js when no language is set, closes [#327](https://github.com/tusen-ai/naive-ui/issues/327).
- Remove `n-calendar`'s useless `console.log`.
- Fix loading-bar disappears unexpectl, closes [#343](https://github.com/tusen-ai/naive-ui/issues/343).
- Fix `n-select` doesn't scroll to selected item when menu is opened, closes [#346](https://github.com/tusen-ai/naive-ui/issues/346).
- Fix `n-tab-pane` throws error when using v-if.
- Fix `n-modal` still closes when `on-negative-click` returns `false`.
- Fix `n-collapse` `defaultExpandedNames` does not work in accordion mode, closes [#350](https://github.com/tusen-ai/naive-ui/issues/350).
- Fix `n-tag` lacks `on-update-checked` prop.
- Fix `n-menu` `render-label` not working for dropdown in collapsed mode.

## 2.15.1

`2021-06-30`

- Fix no `web-types.json`.

## 2.15.0

`2021-06-29`

### Breaking Changes

- `n-select`'s `SelectOption`'s `render` no longer render label but the entire option.

### Feats

- `n-carousel` supports touch operation, closes [#271](https://github.com/tusen-ai/naive-ui/issues/271).
- `n-input` adds `input-props` prop.
- `n-message` optimize the error message of `useMessage` when there is no `n-message-provider`, adds the related document link.
- Add `web-types.json` for webstorm, however I recommend using VSCode and Volar. `web-types.json` only provides limited information for coding.
- `n-tree-select` adds `leaf-only` prop.
- `n-tree` adds `leaf-only` prop.
- `n-select`'s `SelectOption`'s `label` supports render function.
- `n-select` adds `render-option` prop.
- `n-select` export `SelectOption` & `SelectGroupOption` type.
- `n-popover` adds `header` slot.
- `n-dropdown` adds `render-label` prop.

### Fixes

- Fix `n-date-picker` `n-provider` pass `date-locale` not work, closes [#250](https://github.com/tusen-ai/naive-ui/issues/250).
- Fix `n-input` clear button placeholder prevent clicking on actual component [#288](https://github.com/tusen-ai/naive-ui/issues/288)
- Fix `n-carousel` click the at current item button, the component behaves abnormally.
- Fix `n-menu` `render-label` not working for tooltip in collapsed mode.
- Fix `n-dropdown` can't render `n-popover` in option.

## 2.14.0

`2021-06-23`

### Breaking Changes

- `n-element` removes `abstract` prop.
- `n-element` doesn't return theme variables in default slot. Please use `useThemeVars` instead.

### Feats

- Add `n-carousel` component.
- Add `useThemeVars` composable to provide theme variables.
- `n-upload` adds `on-update:file-list` prop, closes [#135](https://github.com/tusen-ai/naive-ui/issues/135).
- `n-date-picker` adds `update-value-on-close` prop.

### Fixes

- Fix `n-select` can't input in filterable mode in single mode in iOS Safari, closes [#230](https://github.com/tusen-ai/naive-ui/issues/230)
- Fix `n-input-number` lacks `on-update-value` prop.
- Fix `n-input-number`'s value can't be null.
- Fix `n-input-number`'s button doesn't work after value is cleared, closes [#251](https://github.com/tusen-ai/naive-ui/issues/251).
- Fix `n-data-table` expand trigger's cursor is not pointer, closes [#261](https://github.com/tusen-ai/naive-ui/issues/261).

## Refactors

- `n-input-number` will focus directly, closes [#244](https://github.com/tusen-ai/naive-ui/issues/244).

## 2.13.0

`2021-06-21`

### Feats

- `n-dropdown` adds `on-clickoutside` prop, closes [#123](https://github.com/tusen-ai/naive-ui/issues/123).
- `n-menu` adds `render-label` prop, closes [#84](https://github.com/tusen-ai/naive-ui/issues/84)
- `n-tree` supports keyboard operations.
- Add `n-tree-select` component.

### Fixes

- Fix `n-tree` drag over leaf node causes error, closes [#200](https://github.com/tusen-ai/naive-ui/issues/200).
- Fix `n-tree` misses `on-update-expanded-keys`, `on-update-selected-keys`, `on-update-checked-keys` prop.
- Fix `n-tree`'s `selected-keys` prop influences original array.
- Fix `n-select`'s input has useless empty row in multiple filterable mode.
- Fix `n-button`'s loading icon doesn't show on iOS Safari, closes [#219](https://github.com/tusen-ai/naive-ui/issues/219).
- Fix `n-date-picker` doesn't show icon when clearable.
- Fix `n-time-picker` icon mis-aligned when clearable, closes [#222](https://github.com/tusen-ai/naive-ui/issues/222).

## 2.12.2

`2021-06-19`

### Fixes

- Fix `n-form-item` always show require mark.

## 2.12.1

`2021-06-19`

### Feats

- `n-form`, `n-form-item` enhance `show-require-mark` prop, closes [#171](https://github.com/tusen-ai/naive-ui/issues/171)
- `n-dropdown` support class attr, closes [#180](https://github.com/tusen-ai/naive-ui/issues/180).
- `n-input` adds `show-password-toggle` prop.
- `n-popselect` support class attr.
- `n-select` adds `render-label` prop.
- `n-popselect` adds `render-label` prop.

### Fixes

- Fix `n-input` baseline shifts when mix Chinese and English characters in input, closes [#174](https://github.com/tusen-ai/naive-ui/issues/174).
- Fix `n-icon` use setup script, `$parent` is an empty object by default, and access `$parent.$options` will be `undefined`.
- Fix `n-notification` position not correct.
- Fix `n-message` content & option type not correct.

## 2.12.0

`2021-06-16`

### Breaking Changes

- `n-a`'s `to` prop is removed. Now if you want to use `n-a` like a router link, you can follow the doc site.

### Feats

- `n-tree` support `disabled` & `checkboxDisabled` on option.
- `n-input-number` support keyboard events ArrowUp and ArrowDown operations.

### Fixes

- Fix `n-cascader` text blur in win10 Chrome.
- Fix `n-tree` click on indent won't trigger select in block line mode.

## 2.11.12

`2021-06-16`

### Feats

- `n-drawer-content` adds `closable` prop, closes [#139](https://github.com/tusen-ai/naive-ui/issues/139).
- `n-element` pass `themeVars` to default slot.
- `n-element` adds `abstract` prop.

### Fixes

- Fix `n-radio-group` doesn't trigger form item validation.
- Fix `n-auto-complete` customizing input not working.

## 2.11.11

`2021-06-15`

### Feats

- `n-tag` adds `RTL` support

### Fixes

- Move `vue` & `vue-router` to peer dependencies to avoid redundant bundle.

## 2.11.9

`2021-06-15`

### Feats

- `n-space` supports wai-aria.
- `n-button-group` supports wai-aria.
- `n-progress` supports wai-aria.
- `n-menu` supports use `<a />` and `<router-link />` as label, closes [#84](https://github.com/tusen-ai/naive-ui/issues/84).
- `n-input-number` adds `show-button` prop.
- `n-rate` support `default` slot for icon customizing.
- `n-rate` adds color prop.
- `n-rate` adds size prop.

### Fixes

- Fix `n-card`'s `header-style` it not applied to header. [#103](https://github.com/tusen-ai/naive-ui/issues/103)
- Fix `n-dialog` misses `destroyAll` method.
- Fix `n-data-table` misses `on-update-sorter`, `on-update-filters`, `on-update-page` and `on-update-page-size` props.

## 2.11.8

`2021-06-13`

### Feats

- `n-data-table` exports `DataTableCreateRowClassName`, `DataTableCreateRowKey` and `DataTableCreateRowProps` type.

### Fixes

- Fix `n-calendar`'s `on-update:value` prop type.
- Fix `n-form-item`'s style attribute `grid-template-columns` influence on the layout of child elements. [#93](https://github.com/tusen-ai/naive-ui/pull/93)
- Fix `n-data-table`'s prop types of `rowKey`, `rowClassName`, `rowProps`, `summary` aren't compatible with expected value.

## 2.11.7

`2021-06-12`

### Fixes

- Fix `n-slider` doesn't prevent scrolling when touchstart.
- Fix `n-color-picker`'s default value doesn't follow modes.
- Fix not `lodash` & `lodash-es` type.

## 2.11.6

`2021-06-11`

### Feats

- `n-spin`'s `size` prop support number.
- `n-date-picker` adds `footer` slot.

### Fixes

- Fix `n-slider` doesn't support touch events
- Fix `n-button` causes crash when it's imported in script inside head tag. [#68](https://github.com/tusen-ai/naive-ui/pull/68)
- Fix `n-spin` animation shifts.
- Fix `n-menu` lack `on-update-value` and `on-update-expanded-keys` props.
- Fix `n-popconfirm` icon slot not working.
- Fix `n-tabs` logs useless info.
- Fix `n-color-picker` set `modes` not working. [#77](https://github.com/tusen-ai/naive-ui/issues/77)

## 2.11.5

`2021-06-10`

### Feats

- `n-dropdown` adds `disabled` prop
- `n-card` adds `:target` style

### Fixes

- Fix `n-popover` sometimes won't sync position in manual mode.
- Fix `n-transfer`'s empty icon is no toggling transition.
- Fix `n-message` API option is not optional.
- Fix `n-calendar` date calculate incorrectly.
- Fix `n-input` misses the `password` type declaration.
- Fix `n-menu` the type definition of `extra` property of menu and submenu.
- Fix `n-dropdown` mouse cursor is not pointer.

## 2.11.4

`2021-06-07`

### Feats

- `n-button` supports wai-aria.
- `n-card` supports wai-aria.
- `n-switch` supports wai-aria.
- `n-menu` supports basic wai-aria.
- `n-divider` supports basic wai-aria.
- `n-data-table` adds `row-props` prop.
- `n-date-picker` adds `ranges` prop.

### Fixes

- Fix `n-tab-pane` `display-directive` not working.
- Fix `n-drawer` animation.
- Fix `n-scrollbar`'s track may be overlayed in chrome windows.

## 2.11.3

`2021-06-05`

- Fix `n-collapse` `default-expanded-names` not working.

## 2.11.2

`2021-06-05`

### Fixes

- Fix `n-dropdown` default placement is not `bottom`.
- Fix `n-date-picker`'s input theme is not set in `date` & `datetime` type.
- Fix `n-config-provider` doesn't merge inherited theme.

### Feats

- `n-collapse` adds `arrow` slot

## 2.11.1

`2021-06-05`

Update package.json & README.md.

## 2.11.0

`2021-06-05`

### Breaking Changes

- `n-affix`'s `listen-to` prop is `document` by default (first scrollable parent before).

### Feats

- `n-affix`'s `listen-to` prop support `Window | Document | HTMLElement`.
- `n-anchor` adds `offset-target` prop.
- `n-select` adds `virtual-scroll` prop.
- `n-select` adds `consistent-menu-width` prop.
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

`2021-05-26`

### Breaking Changes

- `n-popover`'s `placement` prop default value is set to `'top'`.

### Feats

- `n-tabs` adds `on-close` prop.
- `n-tabs` adds `on-add` prop.
- `n-tabs` adds `tab` slot.
- `n-tab-pane`'s `tab` prop support render function & VNode.
- `n-tabs`'s `type` prop support `'line'` option.
- `n-tabs` adds box shadow to indicate scroll status.
- `n-tabs` adds `pane-style` prop

### Fixes

- Fix `n-layout`'s `scrollTo` not working when using native scrollbar.

### Deprecated

- `n-tab-pane`'s `label` prop is deprecated. Please use `tab` prop instead.

## 2.9.0

`2021-05-25`

### Breaking Changes

- `n-layout-sider` removed `show-content` prop. Please use `show-collapsed-content` instead.

### Feats

- `n-data-table` support tree data.
- `n-data-table` adds `cascade` prop.
- `n-data-table` adds `children-key` prop.
- `n-data-table` adds `indent` prop.
- `n-button` adds `tag` prop.
- `n-data-table` adds `table-layout` prop.
- `n-tree` adds `block-line` prop.
- `n-tree` support drag & drop.
- `n-menu` adds `inverted` prop.
- `n-dropdown` adds `inverted` prop.
- `n-tabs` adds `addable` prop.
- `n-tabs` adds `tab-style` prop.
- `n-tabs` adds `tabs-padding` prop.
- `n-tabs` adds `default-value` prop.
- `n-layout-sider` & `n-layout-footer` & `n-layout-header` adds `inverted` prop.
- `n-data-table`'s `max-height` & `min-height` prop accept CSS value.
- `n-layout` & `n-layout-content` adds `embedded` prop.

### Fixes

- `n-layout` & `n-layout-sider`'s `scrollTo` not working with native scrollbar.
- `n-layout-sider`'s `collapse-mode` not working.
- Internal selection component's theme peers has wrong key for popover.

## 2.8.0

`2021-05-19`

### Perf

- Optimize `n-data-table` init render count.
- Optimize `n-select` open duration after first opening.
- Optimize `n-anchor` scroll performance.

### Feats

- `n-tree` adds `virtual-scroll` prop.
- `n-data-table` adds `virtual-scroll` prop.
- `n-cascader` adds `virtual-scroll` prop.
- `n-pagination` adds `item-count` prop.
- `n-pagination` adds `prefix` prop.
- `n-pagination` adds `prefix` slot.
- `n-pagination` adds `suffix` prop.
- `n-pagination` adds `suffix` slot.
- `n-input` adds `show-count` prop.

### Fixes

- Fix `n-layout-sider` doesn't show menu after collapsed.
- Fix `n-input-number` doesn't reset to origin value when blur with invalid value.
- Fix `n-pagination` doesn't update page in uncontrolled mode.

## 2.7.4

`2021-04-25`

### Feats

- `n-form-item` works without `n-form`.

### Fixes

- Fix `n-checkbox` check mark not displayed.
- Fix `n-date-picker` icon transition style in trigger.
- Fix `n-p`, `n-ol`, `n-ul` margin bottom is not 0 when they are last child.
- Fix `n-checkbox-group` not working in uncontrolled mode.
- Fix `n-data-table` clear check all in table now working.

## 2.7.3

`2021-04-22`

### Feats

- `n-data-table` highlight sorted col.
- `n-data-table` col adds `render-filter` prop.
- `n-data-table` col adds `render-filter-icon` prop.

### Fixes

- `n-data-table` fixed column box-shadow more clear in dark theme.
- Fix `n-color-picker` value has line wrap.
- Fix `n-form` FormRuleItem.trigger types.

## 2.7.2

`2021-04-21`

### Feats

- `n-data-table` adds `summary` prop.
- `n-data-table` adds `options` on `'type=selection'` column.

### Fixes

- Fix `n-layout` overflow on horizontal direction.

## 2.7.1

`2021-04-20`

### Feats

- `n-checkbox` adds `focusable` prop.
- `n-cascader` adds `action` slot.

### Fixes

- Fix `n-cascader` loading triggered when click checkbox.
- Fix `n-cascader` menu mask style.

## 2.7.0

`2021-04-19`

### Breaking Changes

- `n-drawer` doesn't have padding by default. `n-drawer-content` is provided to fill the drawer.

## 2.6.0

`2021-04-19`

### Feats

- `n-drawer` adds `content-style` prop.
- `n-layout` adds `content-style` prop.
- `n-layout-sider` adds `content-style` prop.

### Feats

- `n-config-provider` Add `cls-prefix` prop.

### Fixes

- Fix `n-popover` may influence other popover when static props is hoisted.

## 2.5.1

`2021-04-14`

### Feats

- `n-color-picker` adds `show-alpha` prop.

### Fixes

- Fix `n-select` default `fallback-option` breaks the component.

## 2.5.0

`2021-04-13`

### Feats

- Add `n-skeleton` component.
- Add `n-calendar` component.
- Add `n-color-picker` component.
- `n-date-picker` locale adds `firstDayOfWeek`.
- `n-select` adds `showArrow` prop.

### Fixes

- Fix `n-date-picker` trigger has no focus style in focus is in panel.
- Fix `n-button` loading's fade-in transtion drifts.
- Fix `n-time-picker` close animation drifts in `n-date-picker`.
- Fix detached components in popover should stay in popover.

## 2.4.2

`2021-04-08`

### Feats

- Add `n-form-item-gi` component.

### Fixes

- Fix `n-ellipsis` & `n-data-table` ellpisis cell mis-vertical-aligned.
- Fix `n-select` filterable doesn't work with composite events.

## 2.4.1

`2021-04-07`

### Fixes

- Fix `n-select` caret color in single filter mode.
- Fix `n-select` menu action part can't be focused.

## 2.4.0

`2021-04-07`

### Feats

- Add `n-image` component.
- Add `n-global-style` component.
- Add `n-theme-editor` component.
- Add `n-page-header` component.
- `n-statistic` adds `label` slot.
- `n-breadcrumb-item` adds `separator` slot & prop.
- `n-button` adds `bordered` prop.
- `n-card` adds `footer-style` prop.

### Refactors

- Refactor `n-statistic`'s style
- `n-menu` adds `options` prop to replace `items` prop, `items` prop is deprecated.

### Fixes

- Fix `n-anchor` `ignore-gap` not working
- Fix `n-collapse` content is truncated by `overflow: hidden`.
- Fix `n-select` tag text overflow.
- Fix `n-popover` doesn't hide as expected in mobile phone.

## 2.3.1

`2021-03-29`

### Fixes

- Fix `n-layout-sider` horizontal content overflows.

## 2.3.0

`2021-03-29`

### Breaking Changes

- Collapsing won't work for `n-layout-sider` with `position="absolute"`.
- For `n-layout` contains `n-layout-sider` as a direct child `has-sider` must be set.

## 2.2.0

`2021-03-29`

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

`2021-03-25`

### Fixes

- Fix `n-data-table` has no right border of non-last td.
- Fix `n-data-table` header has no enough width when table width is more than `scroll-x`

## 2.1.2

`2021-03-24`

### Feats

- `n-data-table`'s column adds `colSpan` and `rowSpan` prop.
- `n-data-table`'s column adds `titleColSpan` prop.

### Fixes

- Fix `n-dropdown` with `x` and `y` set logs errors when mouse move outside it.

## 2.1.1

`2021-03-22`

### Fixes

- Fix `n-select` selection overflow counter wrong popover trigger area

## 2.1.0

`2021-03-22`

### Breaking Changes

- `n-popover` default `duration` is set to `100`.
- `n-popover` default `delay` is set to `100`.
- `n-tooltip` default `showArrow` is set to `true`.

### Feats

- `n-config-provider` prop `theme-overrides` support inheritance.
- `n-card` adds `hoverable` prop.
- `n-select` adds `max-tag-count` prop.
- `n-cascader` adds `max-tag-count` prop.
- `n-popover` adds `get-disabled` prop.
- adds `n-ellipsis` component.
- `n-popover`'s `width` prop adds `'trigger'` option.
- `n-data-table`'s columns's `ellipsis` prop can be set as props of `n-ellipsis`. x

### Fixes

- Fix `n-cascader` menu appears after click clear button.
- Fix `n-card`'s action not placed at bottom after style height is set.
- Fix `n-popover`'s `duration` and `delay` prop works unexpectly.

## 2.0.1

`2021-03-17`

### Feats

- `n-layout-sider` adds `default-collapsed` prop.
- `n-modal` support custom position.

### Fixes

- Fix `n-menu` tooltip of `n-menu-item` won't show when vertical collapsed.
- Fix `n-menu` `collapsed-icon-size` not working.
- Fix `n-menu` callback props validate array with error.
- Fix `n-layout-sider` toggle button is covered.

## 2.0.0

`2021-03-15`

See vue3.md

## 1.6.0

`2020-10-23`

### Fixes

- Fix the problem that `n-auto-complete`'s menu can't be closed when use `textarea` as input.
- Fix the problem that nested `n-icon` is not flattened.
- Fix the problem that `n-date-picker` has no year in panel when type is `date` and `datetime`.

### Feats

- `n-button` adds `dashed` props
- Add `n-space` component.
- Make `n-drawer` content scrollable.

### i18n

- Add zhCN for `n-log`

## 1.5.5

`2020-08-15`

### Breaking Changes

- Fix all typos of `separator`. (Originally it was `seperator`.)

### Fixes

- Fix the problem that when theme is not set, style errors will be logged.
- Fix the text color of `n-select`'s placeholder when `single` `filterable`.

## 1.5.4

`2020-08-08`

### Fixes

- Fix the problem that Message, Notification, Confirm doesn't follow theme change.

## 1.5.3

`2020-07-23`

### Fixes

- Fix the problem that `n-select` display with mistakes when `placeholder` is empty.

## 1.5.2

`2020-07-22`

### Fixes

- Fix the problem that `n-radio` can not be focused.
- Fix the problem that `n-data-table`'s `max-height` style is broken. <https://bugs.chromium.org/p/chromium/issues/detail?id=1107223>

### Refactors

- Refactor `n-tag` styles.

## 1.5.1

`2020-07-20`

### Feats

- Add `disabled` for `n-time-picker`.

### Fixes

- Fix the child elements of `n-radio` cannot focus.

## 1.5.0

`2020-07-09`

### Breaking Changes

- Refactor experimental setting primary color feature.

### Fixes

- Fix some style glitches.

## 1.4.1

`2020-06-23`

### Feats

- Add `autofocus` for `n-select`.

## 1.4.0

`2020-06-19`

### Breaking Changes

- `n-menu` doesn't support slot API anymore.

### Feats

- Add experimental setting primary color feature.

## 1.3.5

`2020-06-06`

### Feats

- Add `attr-type` for `n-button`

### Fixes

- Fix the problem that if `n-input` is too width, its inner input elements' width won't expand.
- Fix style glitches of border of a `n-input-number` inside a `n-input-group`.

## 1.3.4

`2020-06-05`

### Fixes

- Fix the problem that `n-a`'s `to` prop can't be a object.

## 1.3.3

`2020-06-03`

### Feats

- Add `$NOs.theme` to get the current theme of the OS.

## 1.3.2

`2020-06-02`

### Fixes

- Fix the problem that `n-log`'s loading indicator uses monospace font.
- Fix the problem that icon-related class name isn't applied properly.

## 1.3.1

`2020-06-01`

### Fixes

- Fix the problem that checkbox in the selection column of `n-data-table` is not center aligned.
- Fix the problem that header of `n-data-table` has no border-color transition.
- Fix the problem that `show-icon` & `closable` & `bordered` props of `$NConfirm` don't work.

### Feats

- Add and adjust some colors in the style scheme of `n-config-consumer`.

## 1.3.0

`2020-06-01`

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

## 1.2.1

`2020-05-29`

### Fixes

- Fix the problem that `n-slider` tooltip has no z-index.

## 1.2.0

`2020-05-29`

### Feats

- Add `feedback` and `validation-status` props for `n-form-item`.

## 1.1.5

`2020-05-28`

### Feats

- Add `display-directive` prop for `n-collapse` and `n-collapse-item`.
- Add `class` and `style` prop for `n-select`'s `option`.
- Add `debug` prop for `n-select`.

### Fixes

- Fix the problem that `n-select` can still be cleared when disabled.

## 1.1.4

`2020-05-28`

### Fixes

- Fix the problem that the input value of `n-select` may be modified directly.

### Refactors

- An UI instance can be install to a Vue instance for no more than once.

## 1.1.3

`2020-05-20`

### Chores

- Update css-render dependencies.

### Fixes

- Fix the problem that `n-transfer`'s animation disorder when value changes.

## 1.1.2

`2020-05-19`

### Feats

- Add content slot for `n-step`.
- Add `label` prop for `n-checkbox`.

### Performance Improvements

- All placeable components register listeners on demand.
- Use cache when finding scrollable parent node.
- Imporve performance of `n-button`'s beforeDestroy.
- Reduce the useless re-rendering of `n-checkbox` when checked status isn't changed.
- Imporve performance of text typed `n-avatar`.

## 1.1.1

`2020-05-18`

### Fixes

- Update css-render dependencies.
- Color of default typed button icon.

### Performance Improvements

- Reduce useless re-renders of `n-menu-item`.
- Reduce useless re-renders of doc page.

### Refactors

- Refactor the codes of `n-nimbus-service-layout` for performance reason, may be there will be some bugs.

## 1.1.0

`2020-05-16`

### Feats

- `n-button` now accepts custom color.

### Refactors

- Replace all $slots by $scopedSlots for better robustness.
- Move some static button styles inside button component to create dynamically.

## 1.0.14

`2020-05-15`

### Fixes

- Fix the problem that `line` typed `n-tabs`'s line position stays still when `activeName` changes.
- Fix the problem that `n-tabs` scroll button is not triggered when tabs' width changes.
- Fix the problem that height change of `n-tabs` will unexpectly trigger some re-render callbacks.

## 1.0.13

`2020-05-14`

### Fixes

- Fix the problem that label slot of the `n-form-item-col` & `n-form-item-row` cannot display.

## 1.0.12

`2020-04-30`

### Fixes

- Fix the problem that some CSS length props are badly formated.

## 1.0.11

`2020-04-30`

### Feats

- Add `fallback-option` prop for `n-select` to deal with the value with no corresponding option.

### Fixes

- Fix the problem that `max-height` and `min-height` are ill displayed on `n-data-table`.

### Breaking Changes

- `n-data-table`'s `max-height` and `min-height` will be applied to the entire table part, not only body.
- `n-select` will display value with no corrensponding option.

## 1.0.10

`2020-04-28`

### Feats

- Add `arrow-placement` prop on `n-collapse`.
- Add `arrow` slot on `n-collapse-item`.

### Fixes

- Fix the problem that detachable components detached in wrong place when nested like `modal > drawer > component`.

## 1.0.9

`2020-04-23`

### Feats

- Add `autofocus` prop on `n-input`.
- Add `closable` option on `NMessage`.

### Fixes

- Fix the problem that the default value of `n-tag` `closable` is set to `true`.
- Fix the problem that `n-data-table` can't use all `pagination`'s props.
- Fix the problem that `n-pagination`'s `on-page-size-change` prop doesn't work.

## 1.0.8

`2020-04-22`

### Feats

- Add `n-dynamic-tags`.
- Add `tableHeaderOverlayBackgroundColor` & `inputOverlayBackgroundColor` to `styleScheme`

## 1.0.7

`2020-04-10`

### Feats

- Add `filter-option-value` prop for `n-data-table`'s `column` to better deal with single filter mode.

### Fixes

- Fix the problem that `n-collpase-item` don't support `number` typed `name`.

## 1.0.6

`2020-04-03`

### Fixes

- Fix the problem that all the `console` statements are striped in the bundle.

## 1.0.5

`2020-03-27`

### Feats

- Change the data type of `n-data-table`'s filters from Array to Object.

### Fixes

- `n-data-table` cannot be filtered correctly when there are multiple filtered columns.

## 1.0.4

`2020-03-26`

### Feats

- Filter menu in `n-data-table` is scrollable when there are too many items.

## 1.0.3

`2020-03-25`

### Feats

- `$NMessage`, `$NNotification`, `$NConfirm`'s theme will be applied on their children components.

### Fixes

- View measuring element will confict when multiple naive-ui exist.
- `validate` method of `n-form-item` won't be resolved for some validator.
- `$NConfirm`'s theme doesn't follow `n-config-provider`'s theme.

## 1.0.2

`2020-03-23`

### Fixes

- `n-transfer`'s options are not reinitialized after value changes.
- `n-nimbus-service-layout` (deprecated) doesn't deal with the compatibility of Vue Router(under 3.1)'s `push` method.

## 1.0.1

`2020-03-21`

### Feats

- Add `'bar'` & `'arrow-circle'` on `show-trigger` prop of `n-layout-sider`.

### Fixes

- Rails of `n-scrollbar` shadow mouse event.

### Feats

- `n-date-table` adds `empty` slot. [#86](https://github.com/tusen-ai/naive-ui/issues/86)
