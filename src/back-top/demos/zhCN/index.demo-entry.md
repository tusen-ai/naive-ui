# 回到顶部 Back Top

<!--single-column-->

它可以帮你回到你曾经到过的地方。不过时间是回不去了。

## 演示

向下滚动页面查看效果。

```demo
basic.vue
visibility-height.vue
change-position.vue
target-container-selector.vue
```

## API

### BackTop Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| bottom | `number \| string` | `40` | BackTop 距离页面底部的高度 |
| listen-to | `string \| HTMLElement` | `undefined` | 监听滚动的元素，如果为 `undefined` 会监听距离最近的一个可滚动的祖先节点 |
| right | `number \| string` | `40` | BackTop 距离页面右侧的宽度 |
| show | `boolean` | `undefined` | 是否显示 BackTop（受控） |
| to | `string \| HTMLElement` | `'body'` | BackTop 渲染的容器节点 |
| visibility-height | `number` | `180` | 滚动时触发显示回到顶部的高度 |
| on-update:show | `(value: boolean) => void` | `undefined` | BackTop 的 show 改变时触发事件 |
