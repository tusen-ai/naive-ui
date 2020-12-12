# 结果页 Result

结果页是展示结果的。

感谢 [twemoji](https://github.com/twitter/twemoji) 创造了这么多好看的图标。

## 演示

```demo
s-404
s-403
s-500
s-418
info
success
warning
error
size
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| description | `string` | `undefined` |  |
| size | `'small' \| 'medium' \| 'large' \| 'huge'` | `'medium'` |  |
| status | `'info' \| 'success' \| 'error' \| 'warning' \| 404 \| '404' \| 500 \| '500' \| 400 \| '400' \| 418 \| '418'` | `'info'` |  |
| theme | `'light' \| 'dark' \| string` | `undefined` |  |
| title | `string` | `undefined` |  |

## Slots

| 名称    | 参数 | 说明 |
| ------- | ---- | ---- |
| default | `()` |      |
| footer  | `()` |      |
