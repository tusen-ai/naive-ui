# 旧版栅格 Legacy Grid

<!--single-column-->

<n-alert title="警告" type="warning" style="margin-bottom: 16px">
  此版栅格不会增加新功能。如果你一定需要栅格运行在不支持 CSS Grid 的浏览器中，再来使用它。<br />绝大多数情况下你应该使用<n-a to="grid">栅格</n-a>。
</n-alert>

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
