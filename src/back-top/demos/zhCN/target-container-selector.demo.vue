<markdown>
# 监听目标

你可以设定监听哪个元素来触发 Back Top。
</markdown>

<template>
  <n-back-top :listen-to="target" :bottom="220" :visibility-height="10">
    <div
      style="
        width: 200px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
      "
    >
      指定目标
    </div>
  </n-back-top>
  <div
    ref="scrollContainer"
    style="overflow: auto; height: 72px; line-height: 1.5"
  >
    这块应该写一个有意思的笑话。<br>
    这块应该写一个有意思的笑话。<br>
    这块应该写一个有意思的笑话。<br>
    这块应该写一个有意思的笑话。<br>
    这块应该写一个有意思的笑话。<br>
    这块应该写一个有意思的笑话。<br>
    这块应该写一个有意思的笑话。<br>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const scrollContainerRef = ref<HTMLElement | undefined>(undefined)
    return {
      scrollContainer: scrollContainerRef,
      target: () => scrollContainerRef.value
    }
  }
})
</script>
