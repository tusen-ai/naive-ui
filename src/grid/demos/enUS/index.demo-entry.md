# Grid

<!--single-column-->

Based on CSS Grid. Responsive. Keep away from IE.

If you do need IE, try [Legacy Grid](legacy-grid).

```demo
basic
gap
offset
responsive
collapse
```

## Props

### Grid Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| cols | `number \| ResponsiveDescription` | `24` |  |
| collapsed | `boolean` | `false` |  |
| collapsed-rows | `number` | `1` |  |
| responsive | `'self' \| 'screen'` | `'screen'` | `'self'` triggers responsive layout by its own width. `'screen'` triggers responsive layout by viewport's witdh. |
| x-gap | `number \| ResponsiveDescription` | `0` |  |
| y-gap | `number \| ResponsiveDescription` | `0` |  |

### GridItem Props

| Name   | Type      | Default | Description |
| ------ | --------- | ------- | ----------- |
| offset | `number`  | `0`     |             |
| span   | `number`  | `1`     |             |
| suffix | `boolean` | `false` |             |

## Slots

### Grid Slots

| Name    | Parameters | Description |
| ------- | ---------- | ----------- |
| default | `()`       |             |

### GridItem Slots

| Name    | Parameters                | Description |
| ------- | ------------------------- | ----------- |
| default | `({ overflow: boolean })` |             |
