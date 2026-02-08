<markdown>
# Custom Trigger

Use the `trigger` slot to customize the trigger.
</markdown>

<script lang="ts">
import { ColorWand as PaletteIcon } from '@vicons/ionicons5'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    PaletteIcon
  },
  setup() {
    return {
      color1: ref('#18a058'),
      color2: ref('#5136C9'),
      color3: ref('#722ed1')
    }
  }
})
</script>

<template>
  <n-flex :wrap="false" align="center">
    <n-color-picker v-model:value="color1">
      <template #trigger="{ value, onClick, ref: triggerRef }">
        <n-button :ref="triggerRef" circle quaternary @click="onClick">
          <template #icon>
            <n-icon :color="value || '#000'">
              <PaletteIcon />
            </n-icon>
          </template>
        </n-button>
      </template>
    </n-color-picker>

    <n-color-picker v-model:value="color2">
      <template #trigger="{ value, onClick, ref: triggerRef }">
        <div
          :ref="triggerRef"
          :style="{
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            backgroundColor: value || '#000',
            cursor: 'pointer',
            border: '2px solid #fff',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          }"
          @click="onClick"
        />
      </template>
    </n-color-picker>

    <n-color-picker v-model:value="color3">
      <template #trigger="{ value, onClick, ref: triggerRef }">
        <n-text
          :ref="triggerRef"
          :style="{ color: value }"
          style="cursor: pointer"
          @click="onClick"
        >
          {{ value }}
        </n-text>
      </template>
    </n-color-picker>
  </n-flex>
</template>
