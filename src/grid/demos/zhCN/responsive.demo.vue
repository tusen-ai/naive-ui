<markdown>
# 响应式列数

你可以在 `n-config-provider` 定制 [breakpoints](config-provider#API)。
</markdown>

<template>
  <n-divider>Self 响应式</n-divider>
  <n-grid cols="2 400:4 600:6">
    <n-grid-item>
      <div class="light-green">
        1
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="green">
        2
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="light-green">
        3
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="green">
        4
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="light-green">
        5
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="green">
        6
      </div>
    </n-grid-item>
  </n-grid>
  <n-divider>Screen 响应式</n-divider>
  <n-grid cols="2 s:3 m:4 l:5 xl:6 2xl:7" responsive="screen">
    <n-grid-item>
      <div class="light-green">
        1
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="green">
        2
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="light-green">
        3
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="green">
        4
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="light-green">
        5
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="green">
        6
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="light-green">
        7
      </div>
    </n-grid-item>
  </n-grid>
</template>

<style>
.light-green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
}
.green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.24);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
