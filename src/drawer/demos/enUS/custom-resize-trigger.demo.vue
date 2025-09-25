<markdown>
# Custom Resize Trigger

Use the `resize-trigger` slot to customize the trigger.
  </markdown>

<script lang="ts" setup>
import type { DrawerPlacement } from 'naive-ui'
import { SwapHorizontal as SwapHorizontalIcon } from '@vicons/ionicons5'
import { ref } from 'vue'

const active = ref(false)
const placement = ref<DrawerPlacement>('right')

function activate(place: DrawerPlacement) {
  active.value = true
  placement.value = place
}
</script>

<template>
  <n-button-group>
    <n-button @click="activate('top')">
      Top
    </n-button>
    <n-button @click="activate('right')">
      Right
    </n-button>
    <n-button @click="activate('bottom')">
      Bottom
    </n-button>
    <n-button @click="activate('left')">
      Left
    </n-button>
  </n-button-group>
  <n-drawer
    v-model:show="active"
    :default-width="502"
    :placement="placement"
    resizable
  >
    <template #resize-trigger="{ triggerProps }">
      <div
        style="display: flex; align-items: center; justify-content: center"
        v-bind="triggerProps"
      >
        <div
          style="
            height: 30px;
            background-color: #18a058;
            padding: 4px;
            border-radius: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <n-icon color="white" :size="18">
            <SwapHorizontalIcon />
          </n-icon>
        </div>
      </div>
    </template>
    <n-drawer-content title="斯通纳">
      Stoner is a 1965 novel by the American writer John Williams.
    </n-drawer-content>
  </n-drawer>
</template>
