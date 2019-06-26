<template>
  <span class="ts-funnel-container">
    <n-icon
      style="vertical-align: middle;color: #63e2b7;"
      type="ios-funnel"
      size="12"
    ></n-icon>
  </span>
</template>

<style scoped>
.ts-funnel-container {
  display: inline-block;
  width: 14px;
  cursor: pointer;
  position: relative;
  height: 16px;
  line-height: 16px;
}
.ts-funnel-container i {
  opacity: 0.3;
}
.ts-funnel-container:hover i {
  opacity: 1;
}
</style>

