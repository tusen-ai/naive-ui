<markdown>
# 封面

卡片可以有封面。
</markdown>

<template>
  <n-card title="带封面的卡片">
    <template #cover>
      <img src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg">
    </template>
    卡片内容
  </n-card>
</template>

<style>
.n-card {
  max-width: 300px;
}
</style>
