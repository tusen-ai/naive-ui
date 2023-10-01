<markdown>
# 嵌套布局

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
            <n-split direction="horizontal" style="height: 100px">
              <template #first>
                <div :style="{ height: '100%' }">
                  Pane 3
                </div>
              </template>

              <template #second>
                <div :style="{ height: '100%' }">
                  Pane 4
                </div>
              </template>
            </n-split>
          </template>
        </n-split>
      </div>
    </template>
  </n-split>
</template>
