# 配置消费者 Config Consumer

配置消费者的作用是获取全局化配置的（通常是全局的）配置。

## 演示

```demo
basic
theme-environment-debug
color-debug
```

## Props

| 名称                | 参数                         | 默认值      | 说明 |
| ------------------- | ---------------------------- | ----------- | ---- |
| on-namespace-change | `(namespace: string) => any` | `undefined` |      |

## Slots

| 名称    | 参数                               | 说明 |
| ------- | ---------------------------------- | ---- |
| default | `(options: { namespace: string })` |      |
