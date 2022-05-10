<markdown>
# 高度 & 圆角

如果你对高度和圆角不满意。
</markdown>

<template>
  <n-space vertical>
    <n-progress
      type="line"
      :percentage="50"
      :height="24"
      :border-radius="4"
      :fill-border-radius="0"
    />
    <n-progress
      type="line"
      status="error"
      :percentage="50"
      :height="24"
      border-radius="12px 12px 0 0"
      fill-border-radius="12px 0 12px 12px"
    >
      一种艺术
    </n-progress>
  </n-space>
</template>
