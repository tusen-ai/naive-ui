# 加载 Spin

按理说它叫做 Loading 也可以，但是为啥叫 Spin 呢？因为还有一个属性更少的内部组件叫 Loading。

## 演示

```demo
basic
wrap
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` |  |
| show | `boolean` | `true` | Spin 在填入内容的状态是否激活 |
| stroke-width | `number` | `undefined` | Spin 边缘的相对宽度，假定 Spin 的外侧半径是 100 |
| stroke | `string` | `undefined` | Spin 的颜色 |
| theme | `'light' \| 'dark' \| string` | `undefined` |  |

## Slots

| 名称    | 参数 | 说明                            |
| ------- | ---- | ------------------------------- |
| default | `()` | 如果填入，Spin 会包裹填入的内容 |
