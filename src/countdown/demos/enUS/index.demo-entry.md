# Countdown

As simple as it looks.

## Demos

```demo
basic
```

## API

### CountDown Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| label | `string` | `undefined` | Label of the countdown. |
| value | `number` | `() => Date.now() + 300000` | Value of countdown. |
| start | `boolean` | `true` | Start countdown. |
| now | `number` | `() => Date.now()` | Current time timestamp. |
| format | `string` | `'HH:mm:ss'` | The way to format time. |
| on-finish | `(value: number) => void` | `undefined` | Callback when countdown finish. |

### CountDown Slots

| 名称   | 参数 | 说明        |
| ------ | ---- | ----------- |
| label  | `()` | Lable slot  |
| prefix | `()` | Prefix slot |
