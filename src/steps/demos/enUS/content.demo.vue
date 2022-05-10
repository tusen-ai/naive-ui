<markdown>
# Use slot in step
</markdown>

<template>
  <n-space vertical>
    <n-steps :current="current" :status="currentStatus">
      <n-step title="I Me Mine">
        <div class="n-step-description">
          <p>Al through the day, I me mine I me mine, I me mine</p>
          <n-button
            v-if="current === 1"
            :type="buttonType"
            size="small"
            @click="handleButtonClick"
          >
            Next
          </n-button>
        </div>
      </n-step>
      <n-step title="Let It Be">
        <div class="n-step-description">
          <p>When I find myself in times of trouble Mother Mary comes to me</p>
          <n-button
            v-if="current === 2"
            :type="buttonType"
            size="small"
            @click="handleButtonClick"
          >
            Next
          </n-button>
        </div>
      </n-step>
      <n-step title="Come Together">
        <div class="n-step-description">
          <p>Here come old flat top He come grooving up slowly</p>
          <n-button
            v-if="current === 3"
            :type="buttonType"
            size="small"
            @click="handleButtonClick"
          >
            Next
          </n-button>
        </div>
      </n-step>
      <n-step title="Something">
        <div class="n-step-description">
          <p>Something in the way she moves Attracts me like no other lover</p>
          <n-button
            v-if="current === 4"
            :type="buttonType"
            size="small"
            @click="handleButtonClick"
          >
            Next
          </n-button>
        </div>
      </n-step>
    </n-steps>
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
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { StepsProps } from 'naive-ui'

export default defineComponent({
  setup () {
    const currentRef = ref(1)
    const currentStatusRef = ref<StepsProps['status']>('process')

    const buttonTypeRef = computed(() => {
      switch (currentStatusRef.value) {
        case 'error':
          return 'error'
        case 'finish':
          return 'success'
        default:
          return 'default'
      }
    })

    return {
      current: currentRef,
      currentStatus: currentStatusRef,
      handleButtonClick () {
        currentRef.value = (currentRef.value % 4) + 1
      },
      buttonType: buttonTypeRef
    }
  }
})
</script>
