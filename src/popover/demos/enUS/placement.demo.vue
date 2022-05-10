<markdown>
# Placement
</markdown>

<template>
  <n-switch v-model:value="overlap" /> Overlap Trigger Element
  <n-divider />
  <div class="popover-grid">
    <n-popover :overlap="overlap" placement="top-start" trigger="click">
      <template #trigger>
        <n-button size="small" style="grid-area: 1 / 1 / 2 / 2">
          Top Start
        </n-button>
      </template>
      <div class="large-text">
        Oops!
      </div>
    </n-popover>
    <n-popover :overlap="overlap" placement="top" trigger="click">
      <template #trigger>
        <n-button size="small" style="grid-area: 1 / 2 / 2 / 3">
          Top
        </n-button>
      </template>
      <div class="large-text">
        Oops!
      </div>
    </n-popover>
    <n-popover :overlap="overlap" placement="top-end" trigger="click">
      <template #trigger>
        <n-button size="small" style="grid-area: 1 / 3 / 2 / 4">
          Top End
        </n-button>
      </template>
      <div class="large-text">
        Oops!
      </div>
    </n-popover>
    <n-popover :overlap="overlap" placement="left-start" trigger="click">
      <template #trigger>
        <n-button size="small" style="grid-area: 2 / 1 / 3 / 2">
          Left Start
        </n-button>
      </template>
      <div class="large-text">
        Oops!
      </div>
    </n-popover>
    <n-popover :overlap="overlap" placement="left" trigger="click">
      <template #trigger>
        <n-button size="small" style="grid-area: 3 / 1 / 4 / 2">
          Left
        </n-button>
      </template>
      <div class="large-text">
        Oops!
      </div>
    </n-popover>
    <n-popover :overlap="overlap" placement="left-end" trigger="click">
      <template #trigger>
        <n-button size="small" style="grid-area: 4 / 1 / 5 / 2">
          Left End
        </n-button>
      </template>
      <div class="large-text">
        Oops!
      </div>
    </n-popover>
    <n-popover :overlap="overlap" placement="right-start" trigger="click">
      <template #trigger>
        <n-button size="small" style="grid-area: 2 / 3 / 3 / 4">
          Right Start
        </n-button>
      </template>
      <div class="large-text">
        Oops!
      </div>
    </n-popover>
    <n-popover :overlap="overlap" placement="right" trigger="click">
      <template #trigger>
        <n-button size="small" style="grid-area: 3 / 3 / 4 / 4">
          Right
        </n-button>
      </template>
      <div class="large-text">
        Oops!
      </div>
    </n-popover>
    <n-popover :overlap="overlap" placement="right-end" trigger="click">
      <template #trigger>
        <n-button size="small" style="grid-area: 4 / 3 / 5 / 4">
          Right End
        </n-button>
      </template>
      <div class="large-text">
        Oops!
      </div>
    </n-popover>
    <n-popover :overlap="overlap" placement="bottom-start" trigger="click">
      <template #trigger>
        <n-button size="small" style="grid-area: 5 / 1 / 6 / 2">
          Bottom Start
        </n-button>
      </template>
      <div class="large-text">
        Oops!
      </div>
    </n-popover>
    <n-popover :overlap="overlap" placement="bottom" trigger="click">
      <template #trigger>
        <n-button size="small" style="grid-area: 5 / 2 / 6 / 3">
          Bottom
        </n-button>
      </template>
      <div class="large-text">
        Oops!
      </div>
    </n-popover>
    <n-popover :overlap="overlap" placement="bottom-end" trigger="click">
      <template #trigger>
        <n-button size="small" style="grid-area: 5 / 3 / 6 / 4">
          Bottom End
        </n-button>
      </template>
      <div class="large-text">
        Oops
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
</style>
