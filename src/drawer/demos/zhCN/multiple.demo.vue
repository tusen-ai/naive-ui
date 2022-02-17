<markdown>
# 多个抽屉
</markdown>

<template>
  <n-button @click="doShowOuter">
    来一个！
  </n-button>
  <n-drawer v-model:show="showOuter" :width="502">
    <n-drawer-content title="斯通纳">
      《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。
      <template #footer>
        <n-button @click="doShowInner">
          再来一个！
        </n-button>
      </template>
    </n-drawer-content>
    <n-drawer v-model:show="showInner" :width="251">
      <n-drawer-content title="斯通纳">
        《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。
      </n-drawer-content>
    </n-drawer>
  </n-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const showOuterRef = ref(false)
    const showInnerRef = ref(false)
    return {
      showOuter: showOuterRef,
      showInner: showInnerRef,
      doShowOuter () {
        showOuterRef.value = true
      },
      doShowInner () {
        showInnerRef.value = true
      }
    }
  }
})
</script>
