<markdown>
# 事件

通过 `on-change` 来监听 Affix 是否触发或取消了固定
</markdown>

<template>
  <div class="absolute-anchor-container">
    <div ref="containerRef" class="container">
      <div class="padding" />
      <div class="content">
        <n-affix
          :top="50"
          position="absolute"
          :listen-to="() => containerRef"
          :on-change="changeAffixed"
        >
          <n-tag>顶部触发距离 50px</n-tag>
        </n-affix>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    const containerRef = ref<HTMLElement | undefined>(undefined)
    const changeAffixed = (affixed: boolean) => {
      if (affixed) {
        message.success('成功固定，感觉良好')
      } else {
        message.warning('停止固定，就这样吧')
      }
    }
    return {
      containerRef,
      changeAffixed
    }
  }
})
</script>

<style>
.absolute-anchor-container {
  width: 100%;
  height: 200px;
  position: relative;
}

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
