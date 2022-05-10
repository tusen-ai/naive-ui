<markdown>
# debug

`Debug` 用的。
</markdown>

<template>
  <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
  <n-config-provider
    class="debug-zone"
    :rtl="rtlEnabled ? rtlStyles : undefined"
  >
    <n-button type="default" round>
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Default
    </n-button>
    <n-button type="primary" disabled>
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Primary
    </n-button>
    <n-button type="info" icon-placement="right">
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Info
    </n-button>
    <n-button type="warning">
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Warning
    </n-button>
    <n-button type="success">
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Success
    </n-button>
    <n-button type="error">
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Error
    </n-button>
    <n-button type="default" ghost>
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Default
    </n-button>
    <n-button type="primary" ghost round>
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Primary
    </n-button>
    <n-button type="info" ghost disabled>
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Info
    </n-button>
    <n-button type="warning" ghost icon-placement="right">
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Warning
    </n-button>
    <n-button type="success" ghost>
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Success
    </n-button>
    <n-button type="error" ghost>
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Error
    </n-button>
    <n-button type="default" loading>
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Default
    </n-button>
    <n-button type="primary" loading>
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Primary
    </n-button>
    <n-button type="info" loading round>
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Info
    </n-button>
    <n-button type="warning" loading disabled>
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Warning
    </n-button>
    <n-button type="success" loading icon-placement="right">
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Success
    </n-button>
    <n-button type="error" loading>
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Error
    </n-button>
    <n-button type="default" ghost loading>
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Default
    </n-button>
    <n-button type="primary" ghost loading>
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Primary
    </n-button>
    <n-button type="info" ghost loading>
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Info
    </n-button>
    <n-button type="warning" ghost loading round>
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Warning
    </n-button>
    <n-button type="success" ghost loading disabled>
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Success
    </n-button>
    <n-button type="error" ghost loading icon-placement="right">
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Error
    </n-button>
    <n-button type="default" round block>
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Default
    </n-button>
    <n-button type="primary" disabled block size="small">
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Primary
    </n-button>
    <n-button type="info" icon-placement="right" block size="large">
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Info
    </n-button>
    <n-button type="warning" block ghost>
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Warning
    </n-button>
    <n-button type="success" block loading>
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Success
    </n-button>
    <n-button type="error" block>
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Error
    </n-button>
    <n-button type="primary" disabled circle size="small">
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
    </n-button>
    <n-button type="info" icon-placement="right" circle size="large">
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
    </n-button>
    <n-button type="warning" circle ghost>
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
    </n-button>
    <n-button type="success" circle loading>
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
    </n-button>
    <n-button type="error" circle>
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
    </n-button>
    <n-button type="error">
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Error
    </n-button>
    <n-button type="error" size="large">
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
    </n-button>
    <n-button type="error" round size="large">
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
    </n-button>
    <n-button-group>
      <n-button type="default" round>
        <template #icon>
          <n-icon><cash-outline /></n-icon>
        </template>
        Default
      </n-button>
      <n-button type="primary" disabled>
        <template #icon>
          <n-icon><cash-outline /></n-icon>
        </template>
        Primary
      </n-button>
      <n-button type="info" icon-placement="right">
        <template #icon>
          <n-icon><cash-outline /></n-icon>
        </template>
        Info
      </n-button>
      <n-button type="warning">
        <template #icon>
          <n-icon><cash-outline /></n-icon>
        </template>
        Warning
      </n-button>
    </n-button-group>
    <n-button-group vertical>
      <n-button type="default" round>
        <template #icon>
          <n-icon><cash-outline /></n-icon>
        </template>
        Default
      </n-button>
      <n-button type="primary" disabled>
        <template #icon>
          <n-icon><cash-outline /></n-icon>
        </template>
        Primary
      </n-button>
      <n-button type="info" icon-placement="right">
        <template #icon>
          <n-icon><cash-outline /></n-icon>
        </template>
        Info
      </n-button>
      <n-button type="warning">
        <template #icon>
          <n-icon><cash-outline /></n-icon>
        </template>
        Warning
      </n-button>
    </n-button-group>
    <n-button text type="info" loading size="small" disabled>
      Info
    </n-button>
    <n-button text type="success">
      Success
    </n-button>
    <n-button text type="warning">
      Warning
    </n-button>
    <n-button text type="error" icon-placement="right">
      <template #icon>
        <n-icon><cash-outline /></n-icon>
      </template>
      Error
    </n-button>
    <n-button-group vertical>
      <n-button type="primary" round>
        <template #icon>
          <n-icon><log-in-outline /></n-icon>
        </template>
        活着
      </n-button>
      <n-button type="warning" ghost>
        <template #icon>
          <n-icon><log-in-outline /></n-icon>
        </template>
        不多
      </n-button>
      <n-button type="error">
        <template #icon>
          <n-icon><log-in-outline /></n-icon>
        </template>
        不少
      </n-button>
    </n-button-group>
    <n-button-group vertical size="large">
      <n-button type="success">
        <template #icon>
          <n-icon><log-in-outline /></n-icon>
        </template>
        幸福
      </n-button>
      <n-button type="info">
        <template #icon>
          <n-icon><log-in-outline /></n-icon>
        </template>
        刚好
      </n-button>
      <n-button type="error" ghost round>
        <template #icon>
          <n-icon><log-in-outline /></n-icon>
        </template>
        够用
      </n-button>
    </n-button-group>
    <n-button-group size="small">
      <n-button type="default" round>
        <template #icon>
          <n-icon><log-in-outline /></n-icon>
        </template>
        活着
      </n-button>
      <n-button type="default">
        <template #icon>
          <n-icon><log-in-outline /></n-icon>
        </template>
        其实
      </n-button>
      <n-button type="default">
        <template #icon>
          <n-icon><log-in-outline /></n-icon>
        </template>
        很好
      </n-button>
    </n-button-group>
    <n-button-group>
      <n-button type="primary" ghost>
        <template #icon>
          <n-icon><log-in-outline /></n-icon>
        </template>
        再吃
      </n-button>
      <n-button ghost type="primary">
        <template #icon>
          <n-icon><log-in-outline /></n-icon>
        </template>
        一颗
      </n-button>
      <n-button type="info" round>
        <template #icon>
          <n-icon><log-in-outline /></n-icon>
        </template>
        苹果
      </n-button>
    </n-button-group>
  </n-config-provider>
</template>
<script lang="ts">
import { LogInOutline, CashOutline } from '@vicons/ionicons5'
import { defineComponent, ref } from 'vue'
import { unstableButtonGroupRtl, unstableButtonRtl } from 'naive-ui'

export default defineComponent({
  components: {
    CashOutline,
    LogInOutline
  },
  setup () {
    return {
      rtlEnabled: ref(false),
      rtlStyles: [unstableButtonGroupRtl, unstableButtonRtl]
    }
  }
})
</script>

<style>
.n-button {
  margin-right: 12px;
  margin-bottom: 8px;
}
.debug-zone {
  border-radius: 4px;
  background-color: transparent;
  transition: background-color 0.3s ease-in-out;
}
.n-light-theme .debug-zone {
  border-radius: 4px;
  background-color: #ececec;
}
</style>
