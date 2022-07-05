<markdown>
# 可调整宽高的抽屉

记得使用 `resizable` 的时候配合 `default-width` 或者 `default-height`。
</markdown>

<template>
  <n-button-group>
    <n-button @click="activate('top')">
      上
    </n-button>
    <n-button @click="activate('right')">
      右
    </n-button>
    <n-button @click="activate('bottom')">
      下
    </n-button>
    <n-button @click="activate('left')">
      左
    </n-button>
  </n-button-group>
  <n-drawer
    v-model:show="active"
    :default-width="502"
    :placement="placement"
    resizable
  >
    <n-drawer-content title="斯通纳">
      《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { DrawerPlacement } from 'naive-ui'

export default defineComponent({
  setup () {
    const activeRef = ref(false)
    const placementRef = ref<DrawerPlacement>('right')
    const activate = (place: DrawerPlacement) => {
      activeRef.value = true
      placementRef.value = place
    }
    return {
      active: activeRef,
      placement: placementRef,
      activate
    }
  }
})
</script>
