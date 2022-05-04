<markdown>
# Center arrow debug
</markdown>

<template>
  <n-switch v-model:value="overlap" /> 覆盖触发元素
  <n-divider />
  <div class="popover-grid center-arrow-debug">
    <n-popover
      :overlap="overlap"
      arrow-point-to-center
      placement="top-start"
      trigger="click"
    >
      <template #trigger>
        <n-button size="small" style="grid-area: 1 / 1 / 2 / 2">
          Top Start
        </n-button>
      </template>
      <div class="large-text">
        啊！
      </div>
    </n-popover>
    <n-popover
      :overlap="overlap"
      arrow-point-to-center
      placement="top"
      trigger="click"
    >
      <template #trigger>
        <n-button size="small" style="grid-area: 1 / 2 / 2 / 3">
          Top
        </n-button>
      </template>
      <div class="large-text">
        啊！
      </div>
    </n-popover>
    <n-popover
      :overlap="overlap"
      arrow-point-to-center
      placement="top-end"
      trigger="click"
    >
      <template #trigger>
        <n-button size="small" style="grid-area: 1 / 3 / 2 / 4">
          Top End
        </n-button>
      </template>
      <div class="large-text">
        啊！
      </div>
    </n-popover>
    <n-popover
      :overlap="overlap"
      arrow-point-to-center
      placement="left-start"
      trigger="click"
      style="--v-target-height: 40px"
    >
      <template #trigger>
        <n-button size="small" style="grid-area: 2 / 1 / 3 / 2">
          Left Start
        </n-button>
      </template>
      <div class="large-text">
        啊！
      </div>
    </n-popover>
    <n-popover
      :overlap="overlap"
      arrow-point-to-center
      placement="left"
      trigger="click"
    >
      <template #trigger>
        <n-button size="small" style="grid-area: 3 / 1 / 4 / 2">
          Left
        </n-button>
      </template>
      <div class="large-text">
        啊！
      </div>
    </n-popover>
    <n-popover
      :overlap="overlap"
      arrow-point-to-center
      placement="left-end"
      trigger="click"
      style="--v-target-height: 40px"
    >
      <template #trigger>
        <n-button size="small" style="grid-area: 4 / 1 / 5 / 2">
          Left End
        </n-button>
      </template>
      <div class="large-text">
        啊！
      </div>
    </n-popover>
    <n-popover
      :overlap="overlap"
      arrow-point-to-center
      placement="right-start"
      trigger="click"
      style="--v-target-height: 40px"
    >
      <template #trigger>
        <n-button size="small" style="grid-area: 2 / 3 / 3 / 4">
          Right Start
        </n-button>
      </template>
      <div class="large-text">
        啊！
      </div>
    </n-popover>
    <n-popover
      :overlap="overlap"
      arrow-point-to-center
      placement="right"
      trigger="click"
    >
      <template #trigger>
        <n-button size="small" style="grid-area: 3 / 3 / 4 / 4">
          Right
        </n-button>
      </template>
      <div class="large-text">
        啊！
      </div>
    </n-popover>
    <n-popover
      :overlap="overlap"
      arrow-point-to-center
      placement="right-end"
      trigger="click"
      style="--v-target-height: 40px"
    >
      <template #trigger>
        <n-button size="small" style="grid-area: 4 / 3 / 5 / 4">
          Right End
        </n-button>
      </template>
      <div class="large-text">
        啊！
      </div>
    </n-popover>
    <n-popover
      :overlap="overlap"
      arrow-point-to-center
      placement="bottom-start"
      trigger="click"
    >
      <template #trigger>
        <n-button size="small" style="grid-area: 5 / 1 / 6 / 2">
          Bottom Start
        </n-button>
      </template>
      <div class="large-text">
        啊！
      </div>
    </n-popover>
    <n-popover
      :overlap="overlap"
      arrow-point-to-center
      placement="bottom"
      trigger="click"
    >
      <template #trigger>
        <n-button size="small" style="grid-area: 5 / 2 / 6 / 3">
          Bottom
        </n-button>
      </template>
      <div class="large-text">
        啊！
      </div>
    </n-popover>
    <n-popover
      :overlap="overlap"
      arrow-point-to-center
      placement="bottom-end"
      trigger="click"
    >
      <template #trigger>
        <n-button size="small" style="grid-area: 5 / 3 / 6 / 4">
          Bottom End
        </n-button>
      </template>
      <div class="large-text">
        啊！
      </div>
    </n-popover>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      overlap: ref(false)
    }
  }
})
</script>

<style>
.popover-grid {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-gap: 12px;
  justify-content: center;
  align-items: center;
}

.large-text {
  font-size: 48px;
}

.center-arrow-debug .n-button {
  height: 40px;
}
</style>
