<markdown>
# Use Pixel Value to Control Size

Since `2.38.2`, the `min`, `max`, `size` and `default-size` properties can accept pixel values.
</markdown>

<template>
  <n-split
    direction="horizontal"
    style="height: 200px"
    max="600px"
    min="100px"
    default-size="200px"
  >
    <template #1>
      Pane 1:<br>
      Min 100px<br>
      Default 200px<br>
      Max 300px
    </template>
    <template #2>
      Pane 2
    </template>
  </n-split>
</template>
