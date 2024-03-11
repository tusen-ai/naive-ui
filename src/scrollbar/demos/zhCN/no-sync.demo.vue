<markdown>
# 鼠标拖动滚不到最下面

在最后一个元素含有 `margin-bottom` 的情况下，通过鼠标拖动滚动条，滚动不到最下面。这是浏览器的原生滚动行为导致的，`n-scrollbar` 无法自动的处理这种问题，你可以通过设定 `content-style` 为 `'overflow: hidden;'` 来解决这个问题。
</markdown>

<template>
  <n-scrollbar style="max-height: 120px">
    不设定 content-style
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
