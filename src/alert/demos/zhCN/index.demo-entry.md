# 警示信息 Alert

根据我的经验，这东西使用最频繁的场景是让你关掉 AdBlocks。

<!-- there is a bug of chrome rendering svg, if translateZ is not set -->

## 演示

```demo
basic
closable
icon
no-icon
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| closable | `boolean` | `false` | alert信息是否可以关掉 |
| show-icon | `boolean` | `true` | alert是否展示icon |
| title | `string` | `undefined` | alert的title信息 |
| type | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` | alert的类型 |
| on-after-leave | `Function` | `undefined` | alert消失时执行的回调函数 |
| on-close | `() => boolean \| Promise<boolean> \| any` | `() => true` | 点击close icon时执行的回调函数 |

## Slots

| 名称    | 参数 | 说明 |
| ------- | ---- | ---- |
| default | `()` | alert默认填充的内容 |
| header  | `()` | alert的header部分填充的内容 |
| icon    | `()` | alert的icon部分填充的内容 |
