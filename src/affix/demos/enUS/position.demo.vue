<markdown>
# Position

Affix can be `absolute` or `fixed` positioned. You may need some css tricks to make it works as following. By default position is set to `fixed`, because in most cases scrolled element is `document`.
</markdown>

<template>
  <div class="absolute-anchor-container">
    <div ref="containerRef" class="container">
      <div class="padding" />
      <div class="content">
        <div style="display: inline-block; width: 50%">
          <n-affix
            :trigger-top="50"
            position="absolute"
            :listen-to="() => containerRef"
          >
            <n-tag>Affix Trigger Top 50px</n-tag>
          </n-affix>
        </div>
        <div style="display: inline-block; width: 50%">
          <n-affix
            :trigger-bottom="60"
            position="absolute"
            :listen-to="() => containerRef"
          >
            <n-tag>Affix Trigger Bottom 60px</n-tag>
          </n-affix>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const containerRef = ref<HTMLElement | undefined>(undefined)
    return {
      containerRef
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
