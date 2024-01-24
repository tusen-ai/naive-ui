<markdown>
  # 徽章
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
      <n-badge value="新" :offset="[6, -6]">
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
