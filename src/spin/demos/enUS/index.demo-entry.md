# Spin

It could've been called `loading`, but why is it called `spin`? Because there is another internal component with less props already named `loading`.

## Demos

```demo
basic.vue
wrap.vue
description.vue
customize-icon.vue
delay.vue
blocking-debug.vue
```

## API

### Spin Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| content-class | `string` | `undefined` | Content Class of the spin. | 2.36.0 |
| content-style | `string \| Object` | `undefined` | Content style of the spin. | 2.36.0 |
| description | `string` | `undefined` | Description of the spin. |
| rotate | `boolean` | `true` | Specify whether icon rotates, only working for custom icon. |
| size | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | Size of the spin. |
| show | `boolean` | `true` | Specify whether spin is active when spin has content inside. It won't work if you just use spin itself. |
| stroke-width | `number` | `undefined` | Relative width of spin's stroke, assuming the outer radius of spin is 100. |
| stroke | `string` | `undefined` | Color of the spin. |
| delay | `number` | `undefined` | Specifies a delay in milliseconds for loading state (prevent flush). |

### Spin Slots

| Name        | Parameters | Description                         |
| ----------- | ---------- | ----------------------------------- |
| default     | `()`       | If set, spin will wrap the content. |
| description | `()`       | Description of the spin.            |
| icon        | `()`       | Customize the spin icon.            |
