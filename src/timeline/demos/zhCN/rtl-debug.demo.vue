<markdown>
# Rtl Debug
</markdown>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-timeline item-placement="right">
        <n-timeline-item color="grey" content="Oops">
          <template #icon>
            <n-icon>
              <cash-icon />
            </n-icon>
          </template>
        </n-timeline-item>
        <n-timeline-item
          type="success"
          title="Success"
          content="success content"
          time="2018-04-03 20:46"
        >
          <template #icon>
            <n-icon>
              <cash-icon />
            </n-icon>
          </template>
        </n-timeline-item>
        <n-timeline-item
          type="error"
          content="error content"
          time="2018-04-03 20:46"
        >
          <template #icon>
            <n-icon>
              <cash-icon />
            </n-icon>
          </template>
        </n-timeline-item>
      </n-timeline>
      <n-timeline item-placement="left">
        <n-timeline-item content="Oops" />
        <n-timeline-item
          type="success"
          title="Success"
          content="Success content"
          time="2018-04-03 20:46"
        />
        <n-timeline-item
          type="error"
          content="Error content"
          time="2018-04-03 20:46"
        />
      </n-timeline>
      <n-timeline horizontal style="margin-top: 50px">
        <n-timeline-item content="Oops" />
        <n-timeline-item
          type="success"
          title="Success"
          content="Success content"
          time="2018-04-03 20:46"
        />
        <n-timeline-item
          type="error"
          content="Error content"
          time="2018-04-03 20:46"
        />
      </n-timeline>
    </n-config-provider>
  </n-space>
</template>

<script lang="ts">
import { unstableTimelineRtl } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { CashOutline as CashIcon } from '@vicons/ionicons5'

export default defineComponent({
  components: {
    CashIcon
  },
  setup () {
    return {
      rtlEnabled: ref(false),
      rtlStyles: [unstableTimelineRtl]
    }
  }
})
</script>
