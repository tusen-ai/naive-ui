<markdown>
# Nested layout

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
        <n-split direction="vertical" style="height: 200px">
          <template #first>
            <div :style="{ height: '100%' }">
              Pane 2
            </div>
          </template>

          <template #second>
            <div :style="{ height: '100%' }">
              Pane 3
            </div>
          </template>
        </n-split>
      </div>
    </template>
  </n-split>
</template>
