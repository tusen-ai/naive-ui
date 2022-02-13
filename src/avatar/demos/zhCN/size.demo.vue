<markdown>
# 尺寸

头像有 `small`、`medium` 和 `large` 大小，也可以自己设定尺寸。
</markdown>

<template>
  <n-space align="flex-end">
    <n-avatar
      size="small"
      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    />
    <n-avatar
      size="medium"
      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    />
    <n-avatar
      size="large"
      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    />
    <n-avatar
      :size="48"
      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    />
  </n-space>
</template>
