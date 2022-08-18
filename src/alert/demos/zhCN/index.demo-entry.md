# 警示信息 Alert

根据我的经验，这东西使用最频繁的场景是让你关掉 AdBlocks。

<!-- there is a bug of chrome rendering svg, if translateZ is not set -->

## 演示

```demo
basic.vue
bordered.vue
closable.vue
icon.vue
no-icon.vue
rtl-debug.vue
empty-debug.vue
```

## API

### Alert Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| bordered | `boolean` | `true` | alert 是否显示边框 | 2.32.2 |
| closable | `boolean` | `false` | alert 信息是否可以关掉 |  |
| show-icon | `boolean` | `true` | alert 是否展示 icon |  |
| title | `string` | `undefined` | alert 的 title 信息 |  |
| type | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` | alert 的类型 |  |
| on-after-leave | `Function` | `undefined` | alert 消失时执行的回调函数 |  |
| on-close | `() => boolean \| Promise<boolean> \| any` | `() => true` | 点击 close icon 时执行的回调函数 |  |

### Alert Slots

| 名称    | 参数 | 说明                           |
| ------- | ---- | ------------------------------ |
| default | `()` | alert 的内容                   |
| header  | `()` | alert 的 header 部分填充的内容 |
| icon    | `()` | alert 的 icon 部分填充的内容   |
