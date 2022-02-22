<markdown>
# Style Debug
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
    :placement="placement"
    style="border: 2px solid red"
    content-style="border: 2px solid green;"
  >
    <n-drawer-content title="斯通纳">
      《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { DrawerPlacement } from 'naive-ui'

export default defineComponent({
  data () {
    return {
      active: false,
      placement: 'right' as DrawerPlacement
    }
  },
  methods: {
    activate (placement: DrawerPlacement) {
      this.active = true
      this.placement = placement
    }
  }
})
</script>
