<markdown>
# 基础用法
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
  <n-drawer v-model:show="active" :width="502" :placement="placement">
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
    const active = ref(false)
    const placement = ref<DrawerPlacement>('right')
    const activate = (place: DrawerPlacement) => {
      active.value = true
      placement.value = place
    }
    return {
      active,
      placement,
      activate
    }
  }
})
</script>
