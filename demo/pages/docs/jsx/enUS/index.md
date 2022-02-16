<!--anchor:on-->

# JSX & TSX

## Enable JSX & TSX

For how to enable JSX & TSX, please look at your toolchain's docs.

## Use Component

We recommend importing components directly when using JSX.

```js
import { defineComponent } from 'vue'
import { NButton } from 'naive-ui'

export default defineComponent({
  render () {
    return <NButton>{{ default: () => 'Star Kirby' }}</NButton>
  }
})
```

## Props look like @update:\*

In naive-ui, all props look like `on-update:*` has a corresponding `onUpdate*` prop (since in JSX `on-update:*` and `onUpdate:*` are not valid prop names).

If you find it doesn't exist, I must have forgotten to make it. Please create an issue or PR.

For example, `<n-select @update:value="..." />` in template can be written in `<NSelect onUpdateValue={...} />`.
