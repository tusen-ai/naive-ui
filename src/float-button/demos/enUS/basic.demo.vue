<markdown>
  # 基础用法

  </markdown>

<template>
  <n-split direction="horizontal" style="height: 200px">
    <template #first>
      <div :style="{ height: '100%' }">
        Pane 1
      </div>
    </template>

    <template #second>
      <div :style="{ height: '100%' }">
        Pane 2
      </div>
    </template>
  </n-split>
</template>
