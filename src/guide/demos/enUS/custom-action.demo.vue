<markdown>
# Custom Action

Customize guide actions with the actions slot.
</markdown>

<script lang="ts">
import type { GuideInst } from '../../index'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      show: ref(false),
      guideRef: ref<GuideInst | null>(null),
      steps: [
        {
          title: 'Custom action',
          content: 'Actions can be fully customized with the actions slot.',
          target: '#guide-custom-action'
        }
      ]
    }
  }
})
</script>

<template>
  <n-space>
    <n-button id="guide-custom-action">
      Target
    </n-button>
    <n-button @click="show = true">
      Start guide
    </n-button>
  </n-space>
  <n-guide ref="guideRef" v-model:show="show" :steps="steps">
    <template #actions="{ current, total }">
      <n-space>
        <n-button size="small" text @click="show = false">
          Not now
        </n-button>
        <n-button
          size="small"
          type="primary"
          @click="current === total ? guideRef?.finish() : guideRef?.next()"
        >
          {{ current === total ? 'All set' : 'Continue' }}
        </n-button>
      </n-space>
    </template>
  </n-guide>
</template>
