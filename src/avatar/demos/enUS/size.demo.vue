<markdown>
# Size

Avatar has `small`, `medium` and `large` sizes. You could also use a custom px number for size.
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
