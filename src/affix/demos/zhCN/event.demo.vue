<markdown>
# 状态变化事件

使用 `on-change` 属性可以监听固定状态的变化。
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

const containerRef = ref<HTMLElement | undefined>(undefined)
const message = useMessage()

function handleChange(affixed: boolean) {
  message.info(affixed ? '已固定' : '未固定')
}
</script>

<template>
  <div ref="containerRef" class="container">
    <div class="padding" />
    <div class="content">
      <n-grid :cols="1">
        <n-gi :span="1">
          <n-affix
            :top="120"
            :trigger-top="60"
            :listen-to="() => containerRef as HTMLElement"
            :on-change="handleChange"
          />
        </n-gi>
      </n-grid>
    </div>
  </div>
</template>

<style>
.container {
  width: 100%;
  height: 200px;
  background-color: rgba(128, 128, 128, 0.3);
  border-radius: 3px;
  overflow: auto;
}

.padding {
  height: 150px;
  width: 100%;
  background-color: rgba(128, 128, 128, 0.15);
}

.content {
  height: 600px;
}
</style>
