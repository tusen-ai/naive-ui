# Countdown

A second is passed after a second has passed.

## Demos

```demo
basic.vue
precision.vue
render.vue
reset.vue
```

## API

### Countdown Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| active | `boolean` | `true` | Whether countdown is active. | 2.23.2 |
| duration | `number` | `0` | The duration of the countdown (unit is millisecond). Not reactive. | 2.23.2 |
| precision | `0 \| 1 \| 2 \| 3` | `0` | The precision of the second. | 2.23.2 |
| render | `(props: { hours: number, minutes: number, seconds: number, milliseconds: number }) => VNodeChild` | `undefined` | Time's render function | 2.23.2 |
| on-finish | `() => void` | `undefined` | The callback on countdown is finished. | 2.23.2 |

### Countdown Methods

| Name  | Type         | Description      | Version |
| ----- | ------------ | ---------------- | ------- |
| reset | `() => void` | Reset countdown. | 2.31.0  |
