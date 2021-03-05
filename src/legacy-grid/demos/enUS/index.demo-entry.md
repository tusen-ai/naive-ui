# Legacy Grid

<!--single-column-->

<n-alert title="Caveat" type="warning" style="margin-bottom: 16px">
  The legacy grid won't add any new features. Only use it when you really need to work with a browser not supporting CSS Grid. <br /> Most of time you should use <n-a to="n-grid">Grid</n-a>.
</n-alert>

A basic grid system.

## Demos

```demo
basic
gutter
offset
push-pull
```

## Props

### Row Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| gutter | `number \| string \| [number, number] \| [string, string]` | `0` | `horizontal gutter` or `[horizontal gutter, vertical gutter]` |

### Col Props

| Name   | Type     | Default | Description |
| ------ | -------- | ------- | ----------- |
| span   | `number` | `1`     |             |
| offset | `number` | `0`     |             |
| push   | `number` | `0`     |             |
| pull   | `number` | `0`     |             |
