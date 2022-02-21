<markdown>
# 基础用法
</markdown>

<template>
  <n-descriptions label-placement="top" title="描述">
    <n-descriptions-item>
      <template #label>
        早餐
      </template>
      苹果
    </n-descriptions-item>
    <n-descriptions-item label="早午餐">
      苹果
    </n-descriptions-item>
    <n-descriptions-item label="午餐">
      苹果
    </n-descriptions-item>
    <n-descriptions-item label="晚餐" :span="2">
      两个<br>
      苹果
    </n-descriptions-item>
    <n-descriptions-item label="夜宵">
      苹果
    </n-descriptions-item>
  </n-descriptions>
</template>
