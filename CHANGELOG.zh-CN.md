# CHANGELOG
## 1.0.9 (2020-04-23)
### Features
- 为 `n-input` 增加了 `autofocus` 选项
- 为 `NMessage` 增加了 `closable` 选项
### Fixes
- 解决了 `n-tag` `closable` 默认值被设为 `true` 的问题
- 解决了 `n-data-table` 不能使用全部 `pagination` prop 的问题
- 解决了 `n-pagination` `on-page-size-change` 不生效的问题

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