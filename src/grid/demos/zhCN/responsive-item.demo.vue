<markdown>
# 响应式栅格项

当 `span` 为 0 的时候，`n-grid-item` 不会被显示。
</markdown>

<template>
  <n-divider>Self 响应式</n-divider>
  <n-grid cols="4" item-responsive>
    <n-grid-item span="0 400:1 600:2 800:3">
      <div class="light-green">
        0～400px：不显示<br>
        400～600px：占据空间 1<br>
        600～800px：占据空间 2<br>
        800px 以上：占据空间 3
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="green">
        2
      </div>
    </n-grid-item>
  </n-grid>
  <n-divider>Screen 响应式</n-divider>
  <n-grid cols="4" item-responsive responsive="screen">
    <n-grid-item span="0 m:1 l:2">
      <div class="light-green">
        m 以下：不显示<br>
        m 到 l：占据空间 1<br>
        l 以上：占据空间 2
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="green">
        2
      </div>
    </n-grid-item>
  </n-grid>
</template>

<style>
.light-green {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: rgba(0, 128, 0, 0.12);
}
.green {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: rgba(0, 128, 0, 0.24);
}
</style>
