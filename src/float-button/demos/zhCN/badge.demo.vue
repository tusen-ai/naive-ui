<markdown>
  # 徽章

  带有徽章数的悬浮按钮
</markdown>

<script lang="ts" setup>
import { AlarmOutline as AlarmOutlineIcon } from '@vicons/ionicons5'
</script>

<template>
  <n-flex>
    <n-float-button position="relative">
      <n-badge :value="9" :offset="[6, -8]">
        <n-icon>
          <AlarmOutlineIcon />
        </n-icon>
      </n-badge>
    </n-float-button>
    <n-float-button position="relative">
      <n-badge :value="100" :max="99" :offset="[6, -8]">
        <n-icon>
          <AlarmOutlineIcon />
        </n-icon>
      </n-badge>
    </n-float-button>
    <n-float-button position="relative">
      <n-badge dot :offset="[4, -4]">
        <n-icon>
          <AlarmOutlineIcon />
        </n-icon>
      </n-badge>
    </n-float-button>
    <n-float-button position="relative">
      <n-badge dot :offset="[4, -4]">
        <n-icon>
          <AlarmOutlineIcon />
        </n-icon>
      </n-badge>
    </n-float-button>
    <n-float-button position="relative">
      <n-badge value="新" :offset="[6, -6]">
        <n-icon>
          <AlarmOutlineIcon />
        </n-icon>
      </n-badge>
    </n-float-button>
    <n-float-button position="relative">
      <n-badge :value="9" :offset="[6, -8]">
        <n-icon>
          <AlarmOutlineIcon />
        </n-icon>
      </n-badge>
    </n-float-button>
  </n-flex>
</template>
