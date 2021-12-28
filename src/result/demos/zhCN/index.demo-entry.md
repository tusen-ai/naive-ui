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

## API

### Result Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| description | `string` | `undefined` | 描述信息 |
| size | `'small' \| 'medium' \| 'large' \| 'huge'` | `'medium'` | 大小 |
| status | `'info' \| 'success' \| 'warning' \| 'error' \| '404' \| '403' \| '500' \| '418'` | `'info'`| 状态 |
| title | `string` | `undefined` | 标题 |

### Result Slots

| 名称    | 参数 | 说明           |
| ------- | ---- | -------------- |
| default | `()` | 结果页内容信息 |
| footer  | `()` | 结果页底部信息 |
