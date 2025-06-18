<markdown>
# 事件
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

const checkedRef = ref(false)
const citiesRef = ref<(string | number)[] | null>(null)
const message = useMessage()

function handleCheckedChange(checked: boolean) {
  checkedRef.value = checked
  message.info(JSON.stringify(checked))
}

function handleUpdateValue(value: (string | number)[]) {
  citiesRef.value = value
  message.info(JSON.stringify(value))
}
</script>

<template>
  <n-space item-style="display: flex;" vertical>
    <n-checkbox
      :checked="checkedRef"
      label="事件"
      @update:checked="handleCheckedChange"
    />
    <n-checkbox-group :value="citiesRef" @update:value="handleUpdateValue">
      <n-space item-style="display: flex;" align="center">
        <n-checkbox value="Beijing" label="北京" />
        <n-checkbox value="Shanghai" label="上海" />
        <n-checkbox value="Guangzhou" label="广州" />
        <n-checkbox value="Shenzhen" label="深圳" />
      </n-space>
    </n-checkbox-group>
  </n-space>
</template>
