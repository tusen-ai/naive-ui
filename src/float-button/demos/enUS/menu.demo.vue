<markdown>
# Show menu

After `menu-trigger` is set, more `n-float-button` can be folded into one `n-float-button`.
</markdown>

<script lang="ts">
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    CashIcon
  }
})
</script>

<template>
  <n-flex>
    <n-float-button position="relative" type="primary" menu-trigger="hover">
      <n-icon>
        <CashIcon />
      </n-icon>
      <template #menu>
        <n-float-button shape="square" type="primary">
          <n-icon>
            <CashIcon />
          </n-icon>
        </n-float-button>
        <n-float-button>
          <n-icon>
            <CashIcon />
          </n-icon>
        </n-float-button>
        <n-float-button>
          <n-icon>
            <CashIcon />
          </n-icon>
        </n-float-button>
      </template>
    </n-float-button>
    <n-float-button position="relative" type="primary" menu-trigger="click">
      <n-icon>
        <CashIcon />
      </n-icon>
      <template #menu>
        <n-float-button shape="square" type="primary">
          <n-icon>
            <CashIcon />
          </n-icon>
        </n-float-button>
        <n-float-button>
          <n-icon>
            <CashIcon />
          </n-icon>
        </n-float-button>
        <n-float-button>
          <n-icon>
            <CashIcon />
          </n-icon>
        </n-float-button>
      </template>
    </n-float-button>
  </n-flex>
</template>
