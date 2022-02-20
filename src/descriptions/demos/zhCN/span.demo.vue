<markdown>
# 跨度

每个描述项都可以设定跨度。
</markdown>

<template>
  <n-descriptions label-placement="top" bordered :column="6">
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
    <n-descriptions-item label="晚餐">
      苹果
    </n-descriptions-item>
    <n-descriptions-item label="正餐">
      苹果
    </n-descriptions-item>
    <n-descriptions-item label="夜宵">
      苹果
    </n-descriptions-item>
    <n-descriptions-item label="苹果">
      苹果
    </n-descriptions-item>
    <n-descriptions-item label="苹果" :span="2">
      苹果
    </n-descriptions-item>
    <n-descriptions-item label="苹果" :span="3">
      苹果
    </n-descriptions-item>
  </n-descriptions>
</template>
