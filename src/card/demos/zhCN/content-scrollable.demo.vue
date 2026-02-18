<markdown>
# 内容滚动

开启 `content-scrollable` 后，卡片会把滚动限制在内容区，头部和底部不会跟着滚动。通常配合固定高度使用。
</markdown>

<template>
  <n-card
    title="任务列表"
    content-scrollable
    style="max-height: 280px"
    segmented
  >
    <p v-for="i in 20" :key="i" style="margin: 0 0 8px 0;">
      第 {{ i }} 条任务：只滚动内容区域。
    </p>
    <template #footer>
      固定在底部的操作区
    </template>
  </n-card>
</template>
