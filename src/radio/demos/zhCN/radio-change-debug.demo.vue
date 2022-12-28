<markdown>
# radio-change-debug
</markdown>

<template>
  <n-radio-group
    :value="selectedValue"
    name="radiogroup"
    @update:value="onUpdate"
  >
    <n-space>
      <n-radio v-for="item in options" :key="item.value" :value="item.value">
        {{ item.label }}
      </n-radio>
    </n-space>
  </n-radio-group>
  <br>
  <br>
  <n-space>
    <n-radio
      v-for="item in options"
      :key="item.value"
      :value="item.value"
      :checked="selectedValue === item.value"
      @update:checked="onUpdate(item.value)"
    >
      {{ item.label }}
    </n-radio>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const selectedValue = ref<string>('')
    const onUpdate = (value: string) => {
      if (value === '李四') {
        alert('李四不能选择')
        selectedValue.value = ''
      } else {
        selectedValue.value = value
      }
    }
    return {
      selectedValue,
      options: [
        { value: '张三', label: '张三' },
        { value: '李四', label: '李四' },
        { value: '王五', label: '王五' }
      ],
      onUpdate
    }
  }
})
</script>
