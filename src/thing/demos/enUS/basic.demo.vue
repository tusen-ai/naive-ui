<markdown>
# Basic

Thing provides many slots to custom.
</markdown>

<template>
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
      Money
    </template>
    <template v-if="headerExtra" #header-extra>
      <n-button circle size="small">
        <template #icon>
          <cash-icon />
        </template>
      </n-button>
    </template>
    <template v-if="description" #description>
      Description
    </template>
    Money is any item or verifiable record that is generally accepted as payment
    for goods and services and repayment of debts, such as taxes, in a
    particular country or socio-economic context.
    <template v-if="footer" #footer>
      Footer
    </template>
    <template v-if="action" #action>
      <n-space>
        <n-button size="small">
          <template #icon>
            <n-icon>
              <cash-icon />
            </n-icon>
          </template>
          1$
        </n-button>
        <n-button size="small">
          <template #icon>
            <n-icon>
              <cash-icon />
            </n-icon>
          </template>
          10$
        </n-button>
        <n-button size="small">
          <template #icon>
            <n-icon>
              <cash-icon />
            </n-icon>
          </template>
          100$
        </n-button>
      </n-space>
    </template>
  </n-thing>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CashOutline as CashIcon } from '@vicons/ionicons5'

export default defineComponent({
  components: {
    CashIcon
  },
  setup () {
    return {
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
