<markdown>
# Basic

</markdown>

<template>
  <n-split direction="horizontal" style="height: 200px" :max="0.75" :min="0.25">
    <template #1>
      <div :style="{ height: '200px' }">
        Pane 1
      </div>
    </template>
    <template #2>
      <div :style="{ height: '200px' }">
        Pane 2
      </div>
    </template>
  </n-split>
</template>
