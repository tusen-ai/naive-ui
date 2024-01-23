<markdown>
# 触发展开的区域

当你需要自定义展开区域时，可以使用 `trigger-areas` 属性来指定触发展开的区域。
</markdown>

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
      <n-collapse-item title="青铜" name="1">
        <template #header-extra>
          Extra
        </template>
        <div>可以</div>
      </n-collapse-item>
      <n-collapse-item title="白银" name="2">
        <template #header-extra>
          Extra
        </template>
        <div>很好</div>
      </n-collapse-item>
      <n-collapse-item title="黄金" name="3">
        <template #header-extra>
          Extra
        </template>
        <div>真棒</div>
      </n-collapse-item>
    </n-collapse>
  </n-flex>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup () {
    const mainRef = ref(true)
    const extraRef = ref(true)
    const arrowRef = ref(true)
    const triggerAreasRef = computed(() => {
      const areas: Array<'main' | 'extra' | 'arrow'> = []
      if (mainRef.value) areas.push('main')
      if (extraRef.value) areas.push('extra')
      if (arrowRef.value) areas.push('arrow')
      return areas
    })
    return {
      main: mainRef,
      extra: extraRef,
      arrow: arrowRef,
      triggerAreas: triggerAreasRef
    }
  }
})
</script>
