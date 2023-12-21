<markdown>
# Vertical layout

</markdown>

<template>
  <n-split direction="vertical" style="height: 200px">
    <template #1>
      <div :style="{ height: '100%' }">
        Pane 1
      </div>
    </template>
    <template #2>
      <div :style="{ height: '100%' }">
        Pane 2
      </div>
    </template>
  </n-split>
</template>
