# Number Animation

Tween the number.

## Demos

```demo
basic.vue
precision.vue
separator.vue
intl.vue
```

## API

<n-alert title="Caveat" type="warning" style="margin-bottom: 16px;">
  To support Internationalization we use Intl API. Check the compatibility
  <n-a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/format" target="_blank">format()</n-a>
  <n-a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts" target="_blank">formatToParts()</n-a>
</n-alert>

### NumberAnimation Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| active | `boolean` | `true` | Whether to play the animation. | 2.23.2 |
| duration | `number` | `3000` | The duration of | 2.23.2 |
| from | `number` | `0` | Start value of the animation | 2.23.2 |
| precision | `number` | `0` | Decimal precision of the displayed value. | 2.23.2 |
| show-separator | `boolean` | `false` | Whether to show separator. | 2.23.2 |
| to | `number` | `undefined` | Target value. | 2.23.2 |
| locale | `string` | `en-US` | Language of the number. | NEXT_VERSION |

### NumberAnimation Methods

| Name | Parameters | Description         | Version |
| ---- | ---------- | ------------------- | ------- |
| play | `()`       | Play the animation. | 2.23.2  |
