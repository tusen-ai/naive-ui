# Numeric Animation

number can have animation.

## Demos

```demo
basic
```

## API

### Numeric Animation Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| label | `string` | `undefined` | Label of the numeric animation. |
| value | `string` | `undefined` | Numeric animation value. |
| precision | `number` | `undefined` | Keep how many decimal places. |
| format | `string` | `HH:mm:ss` | Format style. |
| show-separator | `boolean` | `false` | Show separator or not. |
| value-from | `number` | `0` | Start value. |
| start | `boolean` | `false` | Start the animation. |
| animation | `boolean` | `false` | Use animation. |
| animation-duration | `number` | `3000` | Duration time of animation. |

### Numeric Animation Slots

| Name   | Parameters | Description   |
| ------ | ---------- | ------------- |
| label  | `()`       | Label slot.   |
| prefix | `()`       | Value prefix. |
| suffix | `()`       | Value suffix. |
