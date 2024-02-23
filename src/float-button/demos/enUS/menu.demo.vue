<markdown>
# Show menu

After `menu-trigger` is set, more `n-float-button` can be folded into one `n-float-button`.
</markdown>

<template>
  <n-flex>
    <n-float-button position="relative" type="primary" menu-trigger="hover">
      <n-icon>
        <cash-icon />
      </n-icon>
      <template #menu>
        <n-float-button shape="square" type="primary">
          <n-icon>
            <cash-icon />
          </n-icon>
        </n-float-button>
        <n-float-button>
          <n-icon>
            <cash-icon />
          </n-icon>
        </n-float-button>
        <n-float-button>
          <n-icon>
            <cash-icon />
          </n-icon>
        </n-float-button>
      </template>
    </n-float-button>
    <n-float-button position="relative" type="primary" menu-trigger="click">
      <n-icon>
        <cash-icon />
      </n-icon>
      <template #menu>
        <n-float-button shape="square" type="primary">
          <n-icon>
            <cash-icon />
          </n-icon>
        </n-float-button>
        <n-float-button>
          <n-icon>
            <cash-icon />
          </n-icon>
        </n-float-button>
        <n-float-button>
          <n-icon>
            <cash-icon />
          </n-icon>
        </n-float-button>
      </template>
    </n-float-button>
  </n-flex>
</template>

<script lang="ts">
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    CashIcon
  }
})
</script>
