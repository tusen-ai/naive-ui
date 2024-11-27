<markdown>
# Multiple Panels Nest
</markdown>

<template>
  <n-split direction="horizontal" style="height: 200px">
    <template #1>
      Pane 1
    </template>
    <template #2>
      <n-split direction="vertical" style="height: 200px">
        <template #1>
          Pane 1
        </template>
        <template #2>
          Pane 2
        </template>
        <template #3>
          Pane 3
        </template>
        <template #4>
          Pane 4
        </template>
      </n-split>
    </template>
    <template #3>
      Pane 3
    </template>
  </n-split>
</template>
