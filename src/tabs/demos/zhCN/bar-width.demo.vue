<markdown>
# 设置 Tab 条的长度

想怎么搞就怎么搞。
</markdown>

<template>
  <n-tabs :bar-width="28" type="line" class="custom-tabs">
    <n-tab-pane name="oasis" tab="Oasis">
      Wonderwall
    </n-tab-pane>
    <n-tab-pane name="the beatles" tab="the Beatles">
      Hey Jude
    </n-tab-pane>
    <n-tab-pane name="jay chou" tab="周杰伦">
      七里香
    </n-tab-pane>
  </n-tabs>
</template>

<style>
.custom-tabs .n-tabs-bar {
  background-color: transparent !important;
}

.custom-tabs .n-tabs-bar::after {
  position: absolute;
  content: '';
  left: 0;
  right: 0;
  top: 0;
  bottom: -2px;
  border-radius: 2px;
  background-color: var(--bar-color);
}
</style>
