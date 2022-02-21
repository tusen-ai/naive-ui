<!--single-column-->

# PageHeader

I hope this component has all the slots you need!

## Demos

```demo
basic.vue
```

## API

### PageHeader Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| extra | `string` | `undefined` | Extra text information. Is overwritten by the `extra` slot so only use one. |
| subtitle | `string` | `undefined` | Subtitle. |
| title | `string` | `undefined` | Title. |
| on-back | `() => void` | `undefined` | Callback for when the back button is pressed. |

### PageHeader Slots

| Name     | Parameters | Description           | Version |
| -------- | ---------- | --------------------- | ------- |
| avatar   | `()`       | Image information.    |         |
| header   | `()`       | Header information.   |         |
| default  | `()`       | Content.              |         |
| extra    | `()`       | Extra information.    |         |
| footer   | `()`       | Footer information.   |         |
| subtitle | `()`       | Subtitle information. |         |
| title    | `()`       | Title information.    |         |
| back     | `()`       | Back icon.            | 2.24.2  |
