# Countdown

A second is passed after a second has passed.

## Demos

```demo
basic.vue
precision.vue
render.vue
```

## API

### Countdown Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| active | `boolean` | `true` | Whether countdown is active. | NEXT_VERSION |
| duration | `string` | `0` | The duration of the countdown (unit is millisecond). Not reactive. | NEXT_VERSION |
| precision | `0 \| 1 \| 2 \| 3` | `0` | The precision of the second. | NEXT_VERSION |
| render | `(props: { hours: number, minutes: number, seconds: number, milliseconds: number }) => VNodeChild` | `undefined` | Time's render function | NEXT_VERSION |
| on-finish | `() => void` | `undefined` | The callback on countdown is finished. | NEXT_VERSION |
