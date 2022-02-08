<markdown>
# Using popover in disabled state

The native disabled button won't trigger some mouse events so `n-popover` can't listen to it. If you need to use it, you can use `tag` prop to change button's behavior.
</markdown>

<template>
  <n-space>
    <n-tooltip>
      <template #trigger>
        <n-button disabled tag="div">
          Disabled button as div
        </n-button>
      </template>
      Lpsum
    </n-tooltip>
  </n-space>
</template>
