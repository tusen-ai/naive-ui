<markdown>
# 垂直
</markdown>

<script lang="ts" setup>
import type { StepsProps } from 'naive-ui'
import { MdArrowRoundBack, MdArrowRoundForward } from '@vicons/ionicons4'
import { ref } from 'vue'

const currentRef = ref<number | null>(1)
const currentStatus = ref<StepsProps['status']>('process')
const current = currentRef

function next() {
  if (currentRef.value === null)
    currentRef.value = 1
  else if (currentRef.value >= 5)
    currentRef.value = null
  else currentRef.value++
}

function prev() {
  if (currentRef.value === 0)
    currentRef.value = null
  else if (currentRef.value === null)
    currentRef.value = 5
  else currentRef.value--
}
</script>

<template>
  <n-space vertical>
    <n-steps vertical :current="current as number" :status="currentStatus">
      <n-step
        title="I Me Mine"
        description="All through the day, I me mine I me mine, I me mine"
      />
      <n-step
        title="Let It Be"
        description="When I find myself in times of trouble Mother Mary comes to me"
      />
      <n-step title="Break" />
      <n-step
        title="Come Together"
        description="Here come old flat top He come grooving up slowly"
      />
      <n-step
        title="Something"
        description="Something in the way she moves Attracts me like no other lover"
      />
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
      <n-radio-group
        v-model:value="currentStatus"
        size="medium"
        name="vertical"
      >
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
