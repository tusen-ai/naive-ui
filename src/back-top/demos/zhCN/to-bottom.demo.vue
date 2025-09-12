<markdown>
# 滚动到底部

BackTop 通过设置 direction 决定滚动到顶部还是底部
</markdown>

<script setup lang="ts"></script>

<template>
  <n-back-top bottom="280" direction="bottom">
    <div
      style="
        width: 200px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
      "
    >
      回到底部
    </div>
  </n-back-top>
</template>
