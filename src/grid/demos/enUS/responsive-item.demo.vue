<markdown>
# Responsive grid item

When `span` is 0, `n-grid-item` won't be displayed.
</markdown>

<template>
  <n-divider>Self Responsive</n-divider>
  <n-grid cols="4" item-responsive>
    <n-grid-item span="0 400:1 600:2 800:3">
      <div class="light-green">
        0 ~ 400px: hidden<br>
        400 ~ 600px: span 1<br>
        600 ~ 800px: span 2<br>
        800px +: span 3
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="green">
        2
      </div>
    </n-grid-item>
  </n-grid>
  <n-divider>Screen Responsive</n-divider>
  <n-grid cols="4" item-responsive responsive="screen">
    <n-grid-item span="0 m:1 l:2">
      <div class="light-green">
        m-: hidden<br>
        m ~ l: span 1<br>
        l+: span 2
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
