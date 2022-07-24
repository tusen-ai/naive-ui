<markdown>
# Target to be listened to

You can specify target to listen scroll event of.
</markdown>

<template>
  <n-back-top
    :listen-to="target"
    :bottom="220"
    :visibility-height="10"
    :style="{
      transition: 'all .3s cubic-bezier(.4, 0, .2, 1)'
    }"
  >
    <div
      style="
        width: 200px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
      "
    >
      Specify Target
    </div>
  </n-back-top>
  <div
    ref="scrollContainer"
    style="overflow: auto; height: 72px; line-height: 1.5"
  >
    A funny joke is need to be wrote here.<br>
    A funny joke is need to be wrote here.<br>
    A funny joke is need to be wrote here.<br>
    A funny joke is need to be wrote here.<br>
    A funny joke is need to be wrote here.<br>
    A funny joke is need to be wrote here.<br>
    A funny joke is need to be wrote here.<br>
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
