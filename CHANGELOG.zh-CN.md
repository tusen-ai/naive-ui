# CHANGELOG

## Pending

### Feats

- `n-dropdown` 支持 class 属性，关闭 [#180](https://github.com/TuSimple/naive-ui/issues/180)

## 2.12.0 (2020-06-16)

### Feats

- `n-input` 的 password 属性支持查看隐藏特性

### Breaking Changes

- 移除了 `n-a` 的 `to` 属性。现在如果你需要把 `n-a` 用作 router-link，你可以参考文档网站

### Feats

- `n-tree` 选项支持 `disabled` & `checkboxDisabled` 属性
- `n-input-number` 支持键盘的上键和下键操作

### Fixes

- 修复 `n-cascader` 在 win10 Chrome 环境下文字模糊的问题
- 修复 `n-tree` 在 block line 模式下点击缩进空白无法触发选择

## 2.11.12 (2020-06-16)

### Feats

- `n-drawer-content` 新增 `closable` 属性，关闭 [#139](https://github.com/TuSimple/naive-ui/issues/139)
- `n-element` 向 default slot 传递 `themeVars`
- `n-element` 新增 `abstract` 属性

### Fixes

- 修复 `n-radio-group` 不触发 form-item 验证
- 修复 `n-auto-complete` 无法自定义元素

## 2.11.11 (2021-06-15)

### Feats

- `n-tag` 添加 `RTL` 支持

### Fixes

- 将 `vue` 和 `vue-router` 移至 peer dependencies 避免重复打包

## 2.11.9 (2021-06-15)

### Feats

- `n-space` 支持 wai-aria
- `n-button-group` 支持 wai-aria
- `n-progress` 支持 wai-aria
- `n-menu` 支持使用 `<a />` 和 `<router-link />` 作为 label，关闭 [#84](https://github.com/TuSimple/naive-ui/issues/84)
- `n-input-number` 新增 `show-button` 属性
- `n-rate` 支持使用 default slot 自定义图标
- `n-rate` 新增 color 属性
- `n-rate` 新增 size 属性

### Fixes

- 修复 `n-card` 的 `header-style` 没有应用于 header 上 [#103](https://github.com/TuSimple/naive-ui/issues/103)
- 修复 `n-dialog` 的 `destroyAll` 方法缺失
- 修复 `n-data-table` 缺少 `on-update-sorter`、`on-update-filters`、`on-update-page`、`on-update-page-size` 属性

## 2.11.8 (2021-06-13)

### Feats

- `n-data-table` 导出 `DataTableCreateRowClassName`、`DataTableCreateRowKey`、`DataTableCreateRowProps` 类型

### Fixes

- 修复 `n-calendar` 的 `on-update:value` 属性类型
- 修复 `n-form-item` 的 `grid-template-columns` 样式属性对子元素布局的影响 [#93](https://github.com/TuSimple/naive-ui/pull/93)
- 修复 `n-data-table` 的 `rowKey`, `rowClassName`, `rowProps`, `summary` 属性类型和期望值不兼容

## 2.11.7 (2021-06-12)

### Fixes

- 修复 `n-slider` 在 touchstart 发生时没有阻止滚动
- 修复 `n-color-picker` 默认值不跟随模式设定
- 修复缺少 `lodash` & `lodash-es` 类型

## 2.11.6 (2021-06-11)

### Feats

- `n-spin` 的 `size` 属性支持 number 类型
- `n-date-picker` 支持 `footer` 插槽

### Fixes

- 修正 `n-slider` 不支持触摸事件
- 修正 `n-button` 在 head 内部的 script 被引入造成崩溃 [#68](https://github.com/TuSimple/naive-ui/pull/68)
- 修正 `n-spin` 动画闪烁
- 修正 `n-menu` 缺少 `on-update-value` 和 `on-update-expanded-keys` 属性
- 修正 `n-popconfirm` icon slot 不生效
- 修正 `n-tabs` 在控制台输出无用信息
- 修正 `n-color-picker` 设定 `modes` 无效 [#77](https://github.com/TuSimple/naive-ui/issues/77)

## 2.11.5 (2021-06-10)

### Feats

- `n-dropdown` 新增 `disabled` 属性
- `n-card` 增加 `:target` 的样式

### Fixes

- 修复 `n-popover` 有时在手动模式不会同步位置
- 修复 `n-transfer` 的无数据 Icon 没有开关动画
- 修复 `n-message` API 的 option 不是可选的
- 修复 `n-calendar` 展示日期计算错误
- 修复 `n-input` 缺失 `password` 的声明
- 修复 `n-menu` 的菜单和子菜单的 `extra` 属性的类型定义
- 修复 `n-dropdown` 选项鼠标形状不是 pointer

## 2.11.4

### Feats

- `n-button` 支持 wai-aria
- `n-card` 支持 wai-aria
- `n-switch` 支持 wai-aria
- `n-menu` 部分支持 wai-aria
- `n-divider` 部分支持 wai-aria
- `n-data-table` 新增 `row-props` 属性
- `n-date-picker` 新增 `ranges` 属性

### Fixes

- 修正 `n-tab-pane` `display-directive` 不生效
- 修正 `n-drawer` 动画
- 修正 `n-scrollbar` 在 windows chrome 有重叠轨道

## 2.11.3

### Fixes

- 修复 `n-collapse` `default-expanded-names` 不生效

## 2.11.2

### Fixes

- 修复 `n-dropdown` 默认位置不是 `bottom`
- 修复 `n-date-picker` 输入组件在 `date` & `datetime` 类型下未设定主题
- 修复 `n-config-provider` 没有合并继承的主题

### Feats

- `n-collapse` 新增 `arrow` slot

## 2.11.1

更新 package.json & README.md

## 2.11.0

### Breaking Changes

- `n-affix` 的 `listen-to` 属性默认为 `document` (曾为首个可滚动的父节点)

### Feats

- `n-affix` 的 `listen-to` 属性支持 `Window | Document | HTMLElement`
- `n-anchor` 新增 `offset-target` 属性
- `n-select` 新增 `virtual-scroll` 属性
- `n-select` 新增 `consistent-menu-width` 属性
- `n-date-picker` 在确认后再更新值

### Fixes

- 修正 `n-date-picker` 在没有值的状态下起始日期 disabled 状态不正确
- 修正 `n-input-number` 在 blur 后不会恢复有效的值
- 修正 `n-date-picker` 在值为 null 的时候仍然显示选中日期

### Deprecated

- 废弃了 `n-affix` 的 `offset-top` 属性，请使用 `trigger-top` 代替
- 废弃了 `n-affix` 的 `offset-bottom` 属性，请使用 `trigger-bottom` 代替
- 移除了 `n-anchor` 的 `listen-to` 属性

## 2.10.0

### Breaking Changes

- `n-popover` 的 `placement` 属性默认值设为 `'top'`

### Feats

- `n-tabs` 新增 `on-close` 属性
- `n-tabs` 新增 `on-add` 属性
- `n-tab-pane` 新增 `tab` slot
- `n-tab-pane` 的 `tab` 属性支持渲染函数和 VNode
- `n-tabs` 的 `type` 新增 `'line'` 选项
- `n-tabs` 添加阴影来展示滚动状态
- `n-tabs` 新增 `pane-style` 属性

### Fixes

- 修正 `n-layout` `scrollTo` 方法在原生滚动时不生效

### Deprecated

- `n-tab-pane` 的 `label` 属性被废弃，请使用 `tab` 属性代替

## 2.9.0

### Breaking Changes

- `n-layout-sider` 移除了 `show-content`，使用 `show-collapsed-content` 代替

### Feats

- `n-data-table` 支持树形数据
- `n-data-table` 新增 `cascade` 属性
- `n-data-table` 新增 `children-key` 属性
- `n-data-table` 新增 `indent` 属性
- `n-button` 新增 `tag` 属性
- `n-data-table` 新增 `table-layout` 属性
- `n-tree` 新增 `block-line` 属性
- `n-tree` 支持拖放
- `n-menu` 新增 `inverted` 属性
- `n-dropdown` 新增 `inverted` 属性
- `n-tabs` 新增 `addable` 属性
- `n-tabs` 新增 `tab-style` 属性
- `n-tabs` 新增 `tabs-padding` 属性
- `n-tabs` 新增 `default-value` 属性
- `n-layout-sider` & `n-layout-footer` & `n-layout-header` 新增 `inverted` 属性
- `n-data-table` 的 `max-height` & `min-height` 属性接受 CSS 属性
- `n-layout` & `n-layout-content` 新增 `embedded` 属性

### Fixes

- `n-layout` & `n-layout-sider` 的 `scrollTo` 在使用原生滚动条时不生效
- `n-layout-sider` 的 `collapse-mode` 属性不生效
- 内部 selection 组件的主题 peers 中 popover 的 key 不正确

## 2.8.0

### Perf

- 优化 `n-data-table` 初始渲染次数
- 优化 `n-select` 首次打开后打开用时
- 优化 `n-anchor` 滚动性能

### Feats

- `n-tree` 新增 `virtual-scroll` 属性
- `n-data-table` 新增 `virtual-scroll` 属性
- `n-cascader` 新增 `virtual-scroll` 属性
- `n-pagination` 新增 `item-count` 属性
- `n-pagination` 新增 `prefix` 属性
- `n-pagination` 新增 `prefix` slot
- `n-pagination` 新增 `suffix` 属性
- `n-pagination` 新增 `suffix` slot
- `n-input` 新增 `show-count` 属性

### Fixes

- 修正 `n-layout-sider` 折叠后不显示菜单
- 修正 `n-input-number` 在输入不合法 blur 时没有重设回原始值
- 修正 `n-pagination` 在非受控模式下不更新页数

## 2.7.4

### Feats

- `n-form-item` 可以在 `n-form` 外使用

### Fixes

- 修正 `n-checkbox` 勾选图标不显示
- 修正 `n-date-picker` 触发器的图标 transition 效果
- 修正 `n-p`、`n-ol`、`n-ul` 作为最后一个子元素 margin bottom 不是 0
- 修正 `n-checkbox-group` 在非受控模式不工作
- 修正 `n-data-table` 取消全部选择不工作

## 2.7.3

### Feats

- `n-data-table` 高亮排序列
- `n-data-table` 列增加 `render-filter` 属性
- `n-data-table` 列增加 `render-filter-icon` 属性

### Fixes

- `n-data-table` 固定列 box-shadow 在暗色模式更明显
- 修正 `n-color-picker` 值折行
- 修正 `n-form` FormRuleItem.trigger 类型

## 2.7.2

### Feats

- `n-data-table` 增加 `summary` 属性
- `n-data-table` 在 `'type=selection'` 的列增加 `options` 选项

### Fixes

- Fix `n-layout` 横向溢出的问题

## 2.7.1

### Feats

- `n-checkbox` 增加 `focusable` 属性
- `n-cascader` 增加 `action` slot

### Fixes

- 修正 `n-cascader` 点击 checkbox 会触发 loading
- 修正 `n-cascader` 菜单遮罩样式

## 2.7.0

### Breaking Changes

- `n-drawer` 默认不再包含 padding，填充 drawer 的内容可以使用 `n-drawer-content`

### Feats

- `n-drawer` 增加 `content-style` 属性
- `n-layout` 增加 `content-style` 属性
- `n-layout-sider` 增加 `content-style` 属性

## 2.6.0

### Feats

- `n-config-provider` 增加 `cls-prefix` 属性

### Fixes

- 修正 `n-popover` 在静态提升时可能影响别的 popover 的问题

## 2.5.1

### Feats

- `n-color-picker` 增加 `show-alpha` 属性

### Fixes

- 修正 `n-select` 默认 `fallback-option` 属性使组件崩溃

## 2.5.0

### Feats

- 添加 `n-skeleton` 组件
- 添加 `n-calendar` 组件
- 添加 `n-color-picker` 组件
- `n-date-picker` locale 增加 `firstDayOfWeek`
- `n-select` 增加 `showArrow` 属性

### Fixes

- 修正 `n-date-picker` 触发器在焦点在面板内的时候没有 focus 样式
- 修正 `n-button` 加载状态宽度闪烁的问题
- 修正 `n-time-picker` 在 `n-date-picker` 内部关闭动画闪烁的问题
- 修正 popover 内部的卸载组件应卸载于 popover 内部

## 2.4.2

### Feats

- 添加 `n-form-item-gi` 组件

### Fixes

- 修正 `n-ellipsis` & `n-data-table` ellpisis 单元格文本垂直排列错位
- 修正 `n-select` 在输入法输入过程中就进行过滤

## 2.4.1

### Fixes

- 修正 `n-select` 单选过滤模式的光标颜色
- 修正 `n-select` 菜单的 action 部分不能 focus

## 2.4.0

### Feats

- 添加 `n-image` 组件
- 添加 `n-global-style` 组件
- 添加 `n-theme-editor` 组件
- 添加 `n-page-header` 组件
- `n-statistic` 增加 `label` slot
- `n-breadcrumb-item` 增加 `separator` slot & prop
- `n-button` 增加 `bordered` prop
- `n-card` 增加 `footer-style` prop

### Refactors

- 重构 `n-statistic` 样式
- `n-menu` 增加 `options` prop 去替代 `items` prop，`items` prop 被废弃

### Fixes

- 修正 `n-anchor` `ignore-gap` 不生效的问题
- 修正 `n-collapse` 内容被 `overflow: hidden` 截断
- 修正 `n-select` tag 文本溢出
- 修正 `n-popover` 在移动端无法正常关闭的问题

## 2.3.1

### Fixes

- 修正 `n-layout-sider` 横向宽度溢出

## 2.3.0

### Breaking Changes

- 折叠对于 `position="absolute"` 的 `n-layout-sider` 不再生效
- 对于包含 `n-layout-sider` 的 `n-layout` 必须设定 `has-sider`

## 2.2.0

### Feats

- 新增 `n-mention` 组件
- `n-data-table` 支持行展开

### Fixes

- 修正 `n-input` 在暗色主题 focus 状态下的背景颜色在 warning 和 error 的状态不正确
- 修正 `n-input` 在 warning 和 error 状态下光标颜色不正确
- 修正 `n-select` 的 namespace 不正确
- 修正 `n-cascader` 的 namespace 不正确
- 修正 `n-input` 在 textarea 模式无法选中
- 修正 `n-input` 在 textarea 模式没有 box-shadow
- 修正 `n-input` 在 textarea 模式 `autosize` 由于字体不一致导致行数有误
- 修正 `n-input` 在 textarea 模式 `autosize` 在外部使 props.value 改变的时候行数不会变化

### Refactors

- 替换了 `n-empty` 的图标 & 增大了它的尺寸

## 2.1.3

### Fixes

- 修正 `n-data-table` 对于不是最后一个的 td 没有右侧边框
- 修正 `n-data-table` 头部在表格宽度大于 `scroll-x` 的时候不够宽

## 2.1.2

### Feats

- `n-data-table` column 新增 `colSpan` 和 `rowSpan` 属性
- `n-data-table` column 新增 `titleColSpan` 属性

### Fixes

- 修正 `n-dropdown` 在设定 `x` 和 `y` 之后鼠标在外面移动会报错

## 2.1.1

### Fixes

- 修正 `n-select` 选择器溢出计数器 popover 触发区域有误

## 2.1.0

### Breaking Changes

- `n-popover` 默认 `duration` 设为 `100`
- `n-popover` 默认 `delay` 设为 `100`
- `n-tooltip` 默认 `showArrow` 设为 `true`

### Feats

- `n-config-provider` 的 `theme-overrides` 支持继承
- `n-card` 新增 `hoverable` 属性
- `n-select` 新增 `max-tag-count` 属性
- `n-cascader` 新增 `max-tag-count` 属性
- `n-popover` 新增 `get-disabled` 属性
- 新增 `n-ellipsis` 文本省略组件
- `n-popover` `width` prop 新增 `'trigger'` 的值
- `n-data-table` 的列的 `ellipsis` 属性可设为 `n-ellipsis` 的 props

### Fixes

- 修正 `n-cascader` 再点击清除按钮后菜单出现
- 修正 `n-card` 设定高度后 action 不在底部的问题
- 修正 `n-popover` 的 `duration` 和 `delay` 属性执行有问题

## 2.0.1

### Feats

- `n-layout-sider` 新增 `default-collapsed` 属性
- `n-modal` 支持自定义位置

### Fixes

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

### Features

- `n-data-table` 增加了 empty 插槽 [#86](https://github.com/TuSimple/naive-ui/issues/86)
