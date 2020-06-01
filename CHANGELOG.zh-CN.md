# CHANGELOG
## 1.1.6 (2020-06-01)
### Fixes
- 修正 `$NConfirm`　的　`show-icon` & `closable` & `bordered` 属性设置无效.

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
- `n-nimbus-service-layout` (deprecated) 没有兼容 Vue Router(3.1版本以下) `push` 方法的返回值

## 1.0.1 (2020-03-21)
### Features
- `n-layout-sider` 的 `show-trigger` 增加了 `'bar'` & `'arrow-circle'` 选项
### Fixes
- `n-scrollbar` 的轨道会挡住鼠标事件