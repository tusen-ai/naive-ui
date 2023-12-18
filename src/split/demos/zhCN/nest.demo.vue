<markdown>
# 嵌套布局
</markdown>

<template>
  <n-split direction="horizontal" style="height: 200px">
    <template #1>
      Pane 1
    </template>
    <template #2>
      <n-split direction="vertical" style="height: 200px">
        <template #1>
          Pane 2
        </template>
        <template #2>
          <n-split direction="horizontal" style="height: 100%">
            <template #1>
              Pane 3
            </template>
            <template #2>
              Pane 4
            </template>
          </n-split>
        </template>
      </n-split>
    </template>
  </n-split>
</template>
