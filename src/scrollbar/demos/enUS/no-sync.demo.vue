<markdown>
# Mouse dragging cannot scroll to the bottom

When the last element has a `margin-bottom`, dragging the scrollbar with the mouse cannot scroll to the bottom. This is caused by the native scrolling behavior of the browser. `n-scrollbar` cannot automatically handle this issue. You can solve this problem by setting `content-style` to `overflow: hidden;`.
</markdown>

<template>
  <n-scrollbar style="max-height: 120px">
    Without content-style
    <p style="margin-bottom: 90px">
      margin-bottom: 90px
    </p>
    <p style="margin-bottom: 90px">
      margin-bottom: 90px
    </p>
  </n-scrollbar>
  <n-divider />
  <n-scrollbar style="max-height: 120px" content-style="overflow: hidden;">
    content-style="overflow: hidden;"
    <p style="margin-bottom: 90px">
      margin-bottom: 90px
    </p>
    <p style="margin-bottom: 90px">
      margin-bottom: 90px
    </p>
  </n-scrollbar>
</template>
