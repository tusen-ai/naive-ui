<markdown>
# 列数

可以通过列数来控制每行显示的内容数量。
</markdown>

<template>
  <n-descriptions label-placement="top" :column="4">
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
    <n-descriptions-item label="夜宵">
      苹果
    </n-descriptions-item>
  </n-descriptions>
</template>
