<markdown>
# Customizing icon

`'finish'` and `'error'` states icon or index icon can be customized.
</markdown>

<script lang="ts">
import type { StepsProps } from 'naive-ui'
import {
  MdArrowRoundBack,
  MdArrowRoundForward,
  MdCafe,
  MdHappy,
  MdSad
} from '@vicons/ionicons4'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    MdArrowRoundBack,
    MdArrowRoundForward,
    MdHappy,
    MdSad,
    MdCafe
  },
  setup() {
    const currentRef = ref<number | null>(1)
    return {
      currentStatus: ref<StepsProps['status']>('finish'),
      current: currentRef,
      next() {
        if (currentRef.value === null)
          currentRef.value = 1
        else if (currentRef.value >= 4)
          currentRef.value = null
        else currentRef.value++
      },
      prev() {
        if (currentRef.value === 0)
          currentRef.value = null
        else if (currentRef.value === null)
          currentRef.value = 4
        else currentRef.value--
      }
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-steps :current="current as number" :status="currentStatus">
      <template #finish-icon>
        <n-icon>
          <MdHappy />
        </n-icon>
      </template>
      <template #error-icon>
        <n-icon>
          <MdSad />
        </n-icon>
      </template>
      <n-step
        title="I Me Mine"
        description="All through the day, I me mine I me mine, I me mine"
      />
      <n-step
        title="Let It Be"
        description="When I find myself in times of trouble Mother Mary comes to me"
      />
      <n-step
        title="Come Together"
        description="Here come old flat top He come grooving up slowly"
      />
      <n-step
        title="Something"
        description="Something in the way she moves Attracts me like no other lover"
      >
        <template #icon>
          <n-icon>
            <MdCafe />
          </n-icon>
        </template>
      </n-step>
    </n-steps>
    <n-space>
      <n-button-group>
        <n-button @click="prev">
          <template #icon>
            <n-icon>
              <MdArrowRoundBack />
            </n-icon>
          </template>
        </n-button>
        <n-button @click="next">
          <template #icon>
            <n-icon>
              <MdArrowRoundForward />
            </n-icon>
          </template>
        </n-button>
      </n-button-group>
      <n-radio-group v-model:value="currentStatus" size="medium" name="basic">
        <n-radio-button value="error">
          Error
        </n-radio-button>
        <n-radio-button value="process">
          Process
        </n-radio-button>
        <n-radio-button value="wait">
          Wait
        </n-radio-button>
        <n-radio-button value="finish">
          Finish
        </n-radio-button>
      </n-radio-group>
    </n-space>
  </n-space>
</template>
