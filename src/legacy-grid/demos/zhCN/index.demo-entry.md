# 旧版栅格 Legacy Grid

<!--single-column-->

<n-alert title="警告" type="warning" style="margin-bottom: 16px" :bordered="false">
绝大多数情况下你应该使用<router-link to="grid" #="{ navigate, href }" custom><n-a :href="href" @click="navigate">栅格</n-a></router-link>。
</n-alert>

一个基本的栅格系统。

## 演示

```demo
basic.vue
gutter.vue
offset.vue
push-pull.vue
wrap-debug.vue
rtl-debug.vue
```

## API

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
