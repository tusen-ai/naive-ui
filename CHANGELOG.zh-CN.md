# CHANGELOG

## Pending

### Feat

- `n-config-provider` 的 `theme-overrides` 支持继承
- `card` 新增 `hoverable` 属性

## 2.0.1

### Feat

- `n-layout-sider` 新增 `default-collapsed` 属性
- `n-modal` 支持自定义位置

### Fixed

- 修正 `n-menu` 垂直折叠时 `n-menu-item` tooltip 不显示的问题
- 修正 `n-menu` `collapsed-icon-size` 不生效的问题
- 修正 `n-menu` 回调类 prop 不接受数组
- 修正 `n-layout-sider` 按钮被遮挡的问题

## 2.0.0

参考 vue3.md

## 1.6.0

### Fixes

- 修正了 `n-auto-complete` 使用 `textarea` 作为输入元素时菜单无法关闭的问题
- 修正了嵌套 `n-icon` 没有被打平的问题
- 修正了 `n-date-picker` 在类型为 `date` 和 `datetime` 时面板不显示年的问题

### Features

- `n-button` 增加 `dashed` 属性
- 增加 `n-space` 组件
- `n-drawer` 内容可滚动

### Localization

- `n-log` 添加 zhCN 本地化

## 1.5.5 (2020-08-15)

### Breaking Changes

- 修正了所有 `separator` 的拼写（原来错拼为 `seperator`）

### Fixes

- 修正了未设定主题时样式报错的问题
- 修正了 `n-select` `single` `filterable` 时 placeholder 的样式问题

## 1.5.4 (2020-08-08)

### Fixes

- 修正了 Message、Notification、Confirm 不随主题切换的问题

## 1.5.3 (2020-07-23)

### Fixes

- 修正了 `n-select` 在 `placeholder` 为空的时候显示出错的问题

## 1.5.2 (2020-07-22)

### Fixes

- 修正了 `n-radio` 无法聚焦的问题
- 修正了 `n-data-table` 的 `max-height` 样式失效的问题 https://bugs.chromium.org/p/chromium/issues/detail?id=1107223

### Refactors

- 重构了 `n-tag` 的样式

## 1.5.1 (2020-07-20)

### Features

- 为 `n-time-picker` 增加了 `disabled` 属性

### Fixes

- 修正了 `n-radio` 下的子元素无法获取焦点的问题

## 1.5.0 (2020-07-09)

### Breaking Changes

- 重构了试验性的设定主色功能

### Fixes

- 修正了一些零碎的样式错误

## 1.4.1 (2020-06-23)

### Features

- 为 `n-select` 增加了 `autofocus` 属性

## 1.4.0 (2020-06-19)

### Breaking Changes

- `n-menu` 不再支持 slot API

### Features

- 增加了试验性的设定主色功能

## 1.3.5 (2020-06-06)

### Features

- 为 `n-button` 增加了 `attr-type` 属性

### Fixes

- 修正了 `n-input` 如果太宽里面的 input 元素宽度不会展开的问题
- 修正了 `n-input-group` 中 `n-input-number` 边框的样式瑕疵

## 1.3.4 (2020-06-05)

### Fixes

- 修正了 `n-a` 的 `to` 属性不能为对象的问题

## 1.3.3 (2020-06-03)

### Features

- 增加了 `$NOs.theme` 来获取当前操作系统的主题

## 1.3.2 (2020-06-02)

### Fixes

- 修正了 `n-log` 的加载器显示等宽字体的问题
- 修正了 `n-button` icon 有关的类名没有被正确应用的问题

## 1.3.1 (2020-06-01)

### Fixes

- 修正了 `n-data-table` 选框列的选框没有垂直居中的问题
- 修正了 `n-data-table` 表头没 border-color transition 的问题
- 修正了 `$NConfirm` 的 `show-icon` & `closable` & `bordered` 属性设置无效的问题

### Features

- 增加并调整了一些 `n-config-consumer` 样式方案中的颜色

## 1.3.0 (2020-06-01)

### Breaking Changes

- UI 默认样式不再包含外部字体文件，如果需要使用 UI 提供的字体需要明确引入

### Features

- 为 `n-layout` 增加了 `themed-style` 属性

### Fixes

- 修正了 `n-layout-sider` 圆形按钮没有随着折叠状态滚动的问题
- 修正了 `n-form-item` feedback 如果在一开始被设定则消失没有动画的问题
- 修正了 `n-data-table` max-height 相关属性在所有情况下都会被应用的问题
- 修正了一些组件的样式瑕疵

### Refactors

- 调整了一些组件亮色主题下的样式

## 1.2.1 (2020-05-29)

### Fixes

- 修正了 `n-slider` 弹框没有 z-index 的问题

## 1.2.0 (2020-05-29)

### Features

- 为 `n-form-item` 增加了 `feedback` 和 `validation-status` 属性

## 1.1.5 (2020-05-28)

### Features

- 为 `n-collapse` 和 `n-collapse-item` 增加了 `display-directive` 属性
- 为 `n-select` 的 `option` 增加了 `class` 和 `style` 属性
- 为 `n-select` 增加 `debug` 模式

### Fixes

- 修正了 `n-select` 在 disabled 状态下能被清除的问题

## 1.1.4 (2020-05-28)

### Fixes

- 修正了 `n-select` 在多选情况下传入值被直接修改的问题

### Refactors

- 一个 UI 实例最多在一个 Vue 上安装一次

## 1.1.3 (2020-05-20)

### Chores

- 更新 css-render 的依赖

### Fixes

- 修正了 `n-transfer` 在值改变时动画出错的问题

## 1.1.2 (2020-05-19)

### Features

- 为 `n-step` 增加内容的 slot
- 为 `n-checkbox` 增加了 `label` prop

### Performance Improvements

- 所有定位组件按需注册监听器
- 在寻找可滚动节点的过程中使用缓存
- 提升了 `n-button` beforeDestroy 的性能
- 减少了 `n-checkbox` 在值未改变时的重复渲染
- 提升了文字内容的 `n-avatar` 的性能

## 1.1.1 (2020-05-18)

### Fixes

- 更新 css-render 的依赖
- 默认类型的按钮的 icon 的颜色

### Performance Improvements

- 减少了 `n-menu-item` 没用的重复渲染
- 减少了文档页面没用的重复渲染

### Refactors

- 为了性能重构了 `n-nimbus-service-layout` 的部分代码

## 1.1.0 (2020-05-16)

### Features

- `n-button` 接受自定义颜色

### Refactors

- 将内部所有使用 $slots 的地方换为 $scopedSlots 来获得更好的鲁棒性
- 将部分按钮样式生成转移到组件内动态进行

## 1.0.14 (2020-05-15)

### Fixes

- 修正了 `line` 型 `n-tabs` 线不随 `activeName` 属性改变的问题
- 修正了 `n-tabs` 滚动按钮没有随着宽度改变触发的问题
- 修正了 `n-tabs` 高度变化会导致一些不期望的调用的问题

## 1.0.13 (2020-05-14)

### Fixes

- 修正 `n-form-item-col` & `n-form-item-row` 的 label slot 不显示的问题

## 1.0.12 (2020-04-30)

### Fixes

- 修正了一些 CSS 长度属性格式化错误的问题

## 1.0.11 (2020-04-30)

### Features

- 为 `n-select` 增加了 `fallback-option` 属性用于控制无对应选项时的回退选项

### Fixes

- 解决了 `n-data-table` 在没有数据时 `max-height` 和 `min-height` 错误显示的问题

### Breaking Changes

- `n-data-table` 的 `max-height` 和 `min-height` 会对表格部分的整体生效，不只是表格的内容部分
- `n-select` 在默认情况下会显示选项中不存在的值

## 1.0.10 (2020-04-28)

### Features

- 为 `n-collapse` 增加了 `arrow-placement` 属性
- 为 `n-collapse-item` 增加了`arrow` slot

### Fixes

- 解决了可卸载组件在嵌套成 `modal > drawer > component` 样子的时候会被卸载到错误位置的问题

## 1.0.9 (2020-04-23)

### Features

- 为 `n-input` 增加了 `autofocus` 选项
- 为 `NMessage` 增加了 `closable` 选项

### Fixes

- 解决了 `n-tag` `closable` 默认值被设为 `true` 的问题
- 解决了 `n-data-table` 不能使用全部 `pagination` prop 的问题
- 解决了 `n-pagination` `on-page-size-change` 不生效的问题

## 1.0.8 (2020-04-22)

### Features

- 增加 `n-dynamic-tags` 组件
- `styleScheme` 新增暴露颜色 `tableHeaderOverlayBackgroundColor` & `inputOverlayBackgroundColor`

## 1.0.7 (2020-04-10)

### Features

- 为 `n-data-table` 的 `column` 增加了 `filter-option-value` 的属性来应对单选的情况

### Fixes

- 解决了 `n-collpase-item` 不支持 `number` 的问题

## 1.0.6 (2020-04-03)

### Fixes

- 解决了所有的 `console` 语句都在打包中被删除了的问题

## 1.0.5 (2020-03-27)

### Features

- 改变 `n-data-table` 的 filters 的数据类型从数组改变成对象

### Fixes

- `n-data-table` 在有多列筛选的情况下数据不能被正确筛选

## 1.0.4 (2020-03-26)

### Features

- 当选项过多时，`n-data-table` 过滤菜单的内容可以滚动

## 1.0.3 (2020-03-25)

### Features

- `$NMessage`, `$NNotification`, `$NConfirm` 的获取到的主题会应用到他们的内部组件

### Fixes

- 多个 naive-ui 共存时定位元素会产生冲突
- `n-form-item` 的 validate 方法在某些 validator 的返回值下不会 resolve
- `$NConfirm` 主题未随 `n-config-provider` 切换

## 1.0.2 (2020-03-23)

### Fixes

- `n-transfer` 的选项在值变化之后没有重置
- `n-nimbus-service-layout` (deprecated) 没有兼容 Vue Router(3.1 版本以下) `push` 方法的返回值

## 1.0.1 (2020-03-21)

### Features

- `n-layout-sider` 的 `show-trigger` 增加了 `'bar'` & `'arrow-circle'` 选项

### Fixes

- `n-scrollbar` 的轨道会挡住鼠标事件
