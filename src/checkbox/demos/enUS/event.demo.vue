<markdown>
# Event
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
      v-model:checked="checkedRef"
      label="Event"
      @update:checked="handleCheckedChange"
    />
    <n-checkbox-group
      v-model:value="citiesRef"
      @update:value="handleUpdateValue"
    >
      <n-space item-style="display: flex;" align="center">
        <n-checkbox value="Beijing" label="Beijing" />
        <n-checkbox value="Shanghai" label="Shanghai" />
        <n-checkbox value="Guangzhou" label="Guangzhou" />
        <n-checkbox value="Shenzhen" label="Shenzhen" />
      </n-space>
    </n-checkbox-group>
  </n-space>
</template>
