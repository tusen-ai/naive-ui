<markdown>
  # Badge

  You can put a hover button with the number of badges on any element.

</markdown>

<template>
  <div style="height: 200px; transform: translate(0)">
    <n-float-button :right="0" :bottom="0">
      <n-badge :value="9" :offset="[6, -8]">
        <n-icon :size="22" color="grey">
          <alarm-outline-icon />
        </n-icon>
      </n-badge>
    </n-float-button>
    <n-float-button :right="70" :bottom="0">
      <n-badge :value="9" :offset="[6, -8]">
        <n-icon :size="22" color="grey">
          <alarm-outline-icon />
        </n-icon>
      </n-badge>
    </n-float-button>
    <n-float-button :right="142" :bottom="0">
      <n-badge dot :offset="[4, -4]">
        <n-icon :size="22" color="grey">
          <alarm-outline-icon />
        </n-icon>
      </n-badge>
    </n-float-button>
    <n-float-button :right="142" :bottom="0">
      <n-badge dot :offset="[4, -4]">
        <n-icon :size="22" color="grey">
          <alarm-outline-icon />
        </n-icon>
      </n-badge>
    </n-float-button>
    <n-float-button :right="0" :bottom="60">
      <n-badge value="New" :offset="[10, -10]">
        <n-icon :size="22" color="grey">
          <alarm-outline-icon />
        </n-icon>
      </n-badge>
    </n-float-button>
    <n-float-button :right="70" :bottom="60">
      <n-badge :value="9" :offset="[6, -8]" color="grey">
        <n-icon :size="22" color="grey">
          <alarm-outline-icon />
        </n-icon>
      </n-badge>
    </n-float-button>
  </div>
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
