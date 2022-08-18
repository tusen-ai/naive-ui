<markdown>
# 展示顺序

你可以通过 `display-order` 来调整展示顺序。
</markdown>

<template>
  <n-pagination
    :display-order="['quick-jumper', 'pages', 'size-picker']"
    :page-count="100"
    show-quick-jumper
    show-size-picker
  />
</template>
