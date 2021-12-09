# Statistic

As simple as it looks.

## Demos

```demo
basic
animation
countdown
```

## API

### Statistic Props

| Name               | Type      | Default     | Description                   |
| ------------------ | --------- | ----------- | ----------------------------- |
| label              | `string`  | `undefined` | Label of the statistics.      |
| value              | `string`  | `undefined` | Statistics value.             |
| precision          | `number`  | `undefined` | Keep how many decimal places. |
| format             | `string`  | `HH:mm:ss`  | Format style.                 |
| show-separator     | `boolean` | `false`     | Show separator or not.        |
| value-from         | `number`  | `0`         | Start value.                  |
| start              | `boolean` | `false`     | Start the animation.          |
| animation          | `boolean` | `false`     | Use animation.                |
| animation-duration | `number`  | `3000`      | Duration time of animation.   |

### Statistic Slots

| Name    | Parameters | Description   |
| ------- | ---------- | ------------- |
| default | `()`       | Value slot.   |
| label   | `()`       | Label slot.   |
| prefix  | `()`       | Value prefix. |
| suffix  | `()`       | Value suffix. |

### CountDown Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| label | `string` | `undefined` | Label of the statistics. |
| value | `number` | `() => Date.now() + 300000` | Value of countdown. |
| start | `boolean` | `true` | Start countdown. |
| now | `number` | `() => Date.now()` | Current time timestamp. |
| format | `string` | `'HH:mm:ss'` | The way to format time. |
| on-finish | `(value: number) => void` | `undefined` | Callback when countdown finish. |
| on-start | `() => void` | `undefined` | Callback when countdown start. |

### CountDown Slots

| 名称  | 参数 | 说明       |
| ----- | ---- | ---------- |
| label | `()` | Lable slot |
