<markdown>
# 边框

如果有很多多行的信息，你可以把它设为 `bordered`。
</markdown>

<template>
  <n-space vertical :size="12">
    <n-descriptions bordered>
      <n-descriptions-item>
        <template #label>
          早餐
        </template>
        苹果
      </n-descriptions-item>
      <n-descriptions-item label="午餐">
        苹果
      </n-descriptions-item>
      <n-descriptions-item label="晚餐">
        苹果
      </n-descriptions-item>
      <n-descriptions-item label="为什么长">
        为什么<br>长<br>长<br>长<br>长<br>长
      </n-descriptions-item>
      <n-descriptions-item label="为什么长">
        为什么<br>长<br>长<br>长<br>长<br>长
      </n-descriptions-item>
      <n-descriptions-item label="为什么长">
        为什么<br>长<br>长<br>长<br>长<br>长
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions label-placement="left" bordered>
      <n-descriptions-item>
        <template #label>
          Breakfast
        </template>
        苹果
      </n-descriptions-item>
      <n-descriptions-item label="午餐">
        苹果
      </n-descriptions-item>
      <n-descriptions-item label="晚餐">
        苹果
      </n-descriptions-item>
      <n-descriptions-item label="为什么长">
        为什么<br>长<br>长<br>长<br>长<br>长
      </n-descriptions-item>
      <n-descriptions-item label="为什么长">
        为什么<br>长<br>长<br>长<br>长<br>长
      </n-descriptions-item>
      <n-descriptions-item label="为什么长">
        为什么<br>长<br>长<br>长<br>长<br>长
      </n-descriptions-item>
    </n-descriptions>
  </n-space>
</template>
