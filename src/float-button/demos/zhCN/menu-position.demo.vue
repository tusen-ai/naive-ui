<markdown>
# 菜单显示位置

通过 `menu-position` 属性可以设置在不同的位置显示
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
    <n-float-button
      menu-position="bottom"
      position="relative"
      type="primary"
      menu-trigger="hover"
    >
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
    <n-float-button
      menu-position="left"
      position="relative"
      type="primary"
      menu-trigger="hover"
    >
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
    <n-float-button
      menu-position="right"
      position="relative"
      type="primary"
      menu-trigger="hover"
    >
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
