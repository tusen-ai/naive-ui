# Number Animation

Tween the number.

## Demos

```demo
basic.vue
precision.vue
separator.vue
intl.vue
finish.vue
```

## API

### NumberAnimation Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| active | `boolean` | `true` | Whether to play the animation. | 2.23.2 |
| duration | `number` | `3000` | The duration of | 2.23.2 |
| from | `number` | `0` | Start value of the animation | 2.23.2 |
| locale | `string` | Follows config provider. | Language of the number. | 2.24.2 |
| precision | `number` | `0` | Decimal precision of the displayed value. | 2.23.2 |
| show-separator | `boolean` | `false` | Whether to show separator. | 2.23.2 |
| to | `number` | `undefined` | Target value. | 2.23.2 |
| on-finish | `() => void` | `undefined` | The callback on animation is finished. | 2.31.0 |

### NumberAnimation Methods

| Name | Parameters | Description         | Version |
| ---- | ---------- | ------------------- | ------- |
| play | `()`       | Play the animation. | 2.23.2  |
