# Collapse Transition

A collapse item without any form of encapsulation.

## Demos

```demo
basic.vue
```

## API

### CollapseTransition Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| appear | `boolean` | `false` | Whether to play animation on first mounted. |
| display-directive | `'if' \| 'show'` | `'if'` | The directive to use for element rendering. `if` uses `v-if`, `show` uses `v-show`. |
| show | `boolean` | `true` | Whether to show content. |

### CollapseTransition Slots

| Name    | Parameters | Description                        |
| ------- | ---------- | ---------------------------------- |
| default | `()`       | The content inside the transition. |
