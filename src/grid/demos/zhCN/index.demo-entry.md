# 栅格 Grid

<!--single-column-->

一个基本的栅格系统。

## 演示

```demo
basic
gutter
offset
push-pull
```

## Props

### Row Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| gutter | `number \| string \| [number, number] \| [string, string]` | `0` | `水平间隔` 或者 `[水平间隔, 垂直间隔]` |

### Col Props

| 名称   | 类型     | 默认值 | 说明 |
| ------ | -------- | ------ | ---- |
| span   | `number` | `1`    |      |
| offset | `number` | `0`    |      |
| push   | `number` | `0`    |      |
| pull   | `number` | `0`    |      |

## 备注

栅格不是响应式的，因为不太有时间写，额...
