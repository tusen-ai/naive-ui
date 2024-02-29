<markdown>
# Badge

You can put a hover button with the number of badges on any element.
</markdown>

<template>
  <n-flex>
    <n-float-button position="relative">
      <n-badge :value="9" :offset="[6, -8]">
        <n-icon>
          <alarm-outline-icon />
        </n-icon>
      </n-badge>
    </n-float-button>
    <n-float-button position="relative">
      <n-badge :value="100" :max="99" :offset="[6, -8]">
        <n-icon>
          <alarm-outline-icon />
        </n-icon>
      </n-badge>
    </n-float-button>
    <n-float-button position="relative">
      <n-badge dot :offset="[4, -4]">
        <n-icon>
          <alarm-outline-icon />
        </n-icon>
      </n-badge>
    </n-float-button>
    <n-float-button position="relative">
      <n-badge dot :offset="[4, -4]">
        <n-icon>
          <alarm-outline-icon />
        </n-icon>
      </n-badge>
    </n-float-button>
    <n-float-button position="relative">
      <n-badge value="新" :offset="[6, -6]">
        <n-icon>
          <alarm-outline-icon />
        </n-icon>
      </n-badge>
    </n-float-button>
    <n-float-button position="relative">
      <n-badge :value="9" :offset="[6, -8]">
        <n-icon>
          <alarm-outline-icon />
        </n-icon>
      </n-badge>
    </n-float-button>
  </n-flex>
</template>

<script lang="ts">
import { AlarmOutline as AlarmOutlineIcon } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    AlarmOutlineIcon
  }
})
</script>
