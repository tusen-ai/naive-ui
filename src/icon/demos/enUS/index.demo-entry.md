# Icon

It is recommend to use [xicons](https://www.xicons.org) as your icon library.

## Demos

```demo
basic.vue
custom-icon.vue
depth.vue
icon-wrapper.vue
```

## API

### Icon Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| color | `string` | `undefined` | Icon color. |  |
| depth | `1 \| 2 \| 3 \| 4 \| 5` | `undefined` | Icon depth. |  |
| size | `number \| string` | `undefined` | Icon size (when the unit is not specified the default unit is `px`). |  |
| component | `Component` | `undefined` | Icon component to display. | 2.24.6 |

### IconWrapper Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| border-radius | `number \| string` | `8` | Border radius. | NEXT_VERSOIN |
| color | `string` | `undefined` | Color. | NEXT_VERSOIN |
| icon-color | `string` | `undefined` | Icon color. | NEXT_VERSOIN |
| size | `number \| string` | `24` | Size. | NEXT_VERSOIN |

### Icon Slots

| Name    | Parameters | Description              |
| ------- | ---------- | ------------------------ |
| default | `()`       | The content of the icon. |
