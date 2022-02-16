<markdown>
# 自动调整尺寸

自动调整尺寸。
</markdown>

<template>
  <n-space vertical>
    <n-input placeholder="自动调整尺寸" autosize style="min-width: 50%" />
    <n-input
      placeholder="自动调整尺寸"
      type="textarea"
      size="small"
      :autosize="{
        minRows: 3,
        maxRows: 5
      }"
    />
    <n-input
      type="textarea"
      placeholder="自动调整尺寸"
      :autosize="{
        minRows: 3
      }"
    />
  </n-space>
</template>
