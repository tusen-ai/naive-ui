<markdown>
# Event

Use `on-change` to listen to whether Affix is triggered or unfixed
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
          <n-tag>Affix Trigger Top 50px</n-tag>
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
        message.success('Successfully fixed, feeling good')
      } else {
        message.warning("Stop fixing, that's it")
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
