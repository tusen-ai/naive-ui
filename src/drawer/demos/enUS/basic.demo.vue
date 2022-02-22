<markdown>
# Basic
</markdown>

<template>
  <n-button-group>
    <n-button @click="activate('top')">
      Top
    </n-button>
    <n-button @click="activate('right')">
      Right
    </n-button>
    <n-button @click="activate('bottom')">
      Bottom
    </n-button>
    <n-button @click="activate('left')">
      Left
    </n-button>
  </n-button-group>
  <n-drawer v-model:show="active" :width="502" :placement="placement">
    <n-drawer-content title="Stoner">
      Stoner is a 1965 novel by the American writer John Williams.
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
