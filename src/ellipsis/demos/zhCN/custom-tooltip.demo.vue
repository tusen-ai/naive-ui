<markdown>
# 定制 Tooltip 内容

使用 `tooltip` slot 定制 tooltip 内容。
</markdown>

<template>
  <n-ellipsis style="max-width: 240px">
    住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
    <template #tooltip>
      <div style="text-align: center">
        《秦皇岛》<br>住在我心里孤独的<br>孤独的海怪 痛苦之王<br>开始厌倦
        深海的光 停滞的海浪
      </div>
    </template>
  </n-ellipsis>
</template>
