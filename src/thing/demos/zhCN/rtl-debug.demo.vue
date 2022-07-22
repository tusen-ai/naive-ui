<markdown>
# Rtl Debug
</markdown>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-row>
        <n-col :span="12">
          <n-checkbox v-model:checked="avatar">
            Avatar
          </n-checkbox>
        </n-col>
        <n-col :span="12">
          <n-checkbox v-model:checked="action">
            Action
          </n-checkbox>
        </n-col>
      </n-row>
      <n-row>
        <n-col :span="12">
          <n-checkbox v-model:checked="header">
            Header
          </n-checkbox>
        </n-col>
        <n-col :span="12">
          <n-checkbox v-model:checked="headerExtra">
            Header Extra
          </n-checkbox>
        </n-col>
      </n-row>
      <n-row>
        <n-col :span="12">
          <n-checkbox v-model:checked="description">
            Description
          </n-checkbox>
        </n-col>
        <n-col :span="12">
          <n-checkbox v-model:checked="footer">
            Footer
          </n-checkbox>
        </n-col>
      </n-row>
      <n-divider />
      <n-thing>
        <template v-if="avatar" #avatar>
          <n-avatar>
            <n-icon>
              <cash-icon />
            </n-icon>
          </n-avatar>
        </template>
        <template v-if="header" #header>
          货币
        </template>
        <template v-if="headerExtra" #header-extra>
          <n-button circle size="small">
            <template #icon>
              <cash-icon />
            </template>
          </n-button>
        </template>
        <template v-if="description" #description>
          描述
        </template>
        货币是为了提高交易效率而用于交换的中介商品。货币有多种形式，如贝壳粮食等自然物、金属纸张等加工品、银行卡信用卡等磁条卡、移动支付加密货币等APP。
        <template v-if="footer" #footer>
          尾部
        </template>
        <template v-if="action" #action>
          <n-space>
            <n-button size="small">
              <template #icon>
                <n-icon>
                  <cash-icon />
                </n-icon>
              </template>
              1 块钱
            </n-button>
            <n-button size="small">
              <template #icon>
                <n-icon>
                  <cash-icon />
                </n-icon>
              </template>
              10 块钱
            </n-button>
            <n-button size="small">
              <template #icon>
                <n-icon>
                  <cash-icon />
                </n-icon>
              </template>
              100 块钱
            </n-button>
          </n-space>
        </template>
      </n-thing>
    </n-config-provider>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { unstableThingRtl, unstableRowRtl } from 'naive-ui'

export default defineComponent({
  components: {
    CashIcon
  },
  setup () {
    return {
      rtlEnabled: ref(false),
      rtlStyles: [unstableThingRtl, unstableRowRtl],
      avatar: ref(true),
      header: ref(true),
      headerExtra: ref(true),
      description: ref(true),
      footer: ref(true),
      action: ref(true)
    }
  }
})
</script>
