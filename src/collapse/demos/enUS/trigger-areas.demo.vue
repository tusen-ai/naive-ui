<markdown>
# Trigger areas

If you want to customize expansion trigger areas of collapse, you can use `trigger-areas` property.
</markdown>

<script lang="ts" setup>
import { computed, ref } from 'vue'

const mainRef = ref(true)
const extraRef = ref(true)
const arrowRef = ref(true)
const triggerAreasRef = computed(() => {
  const areas: Array<'main' | 'extra' | 'arrow'> = []
  if (mainRef.value)
    areas.push('main')
  if (extraRef.value)
    areas.push('extra')
  if (arrowRef.value)
    areas.push('arrow')
  return areas
})

// Export variables for template
const main = mainRef
const extra = extraRef
const arrow = arrowRef
const triggerAreas = triggerAreasRef
</script>

<template>
  <n-flex vertical>
    <n-flex>
      <n-tag v-model:checked="main" checkable>
        main
      </n-tag>
      <n-tag v-model:checked="extra" checkable>
        extra
      </n-tag>
      <n-tag v-model:checked="arrow" checkable>
        arrow
      </n-tag>
    </n-flex>
    <n-collapse :trigger-areas="triggerAreas">
      <n-collapse-item title="right" name="1">
        <template #header-extra>
          Extra
        </template>
        <div>good</div>
      </n-collapse-item>
      <n-collapse-item title="right" name="2">
        <template #header-extra>
          Extra
        </template>
        <div>nice</div>
      </n-collapse-item>
      <n-collapse-item title="right" name="3">
        <template #header-extra>
          Extra
        </template>
        <div>very good</div>
      </n-collapse-item>
    </n-collapse>
  </n-flex>
</template>
