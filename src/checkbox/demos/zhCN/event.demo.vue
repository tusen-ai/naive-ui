<markdown>
# 事件
</markdown>

<template>
  <n-space item-style="display: flex;" vertical>
    <n-checkbox
      :checked="checked"
      label="事件"
      @update:checked="handleCheckedChange"
    />
    <n-checkbox-group :value="cities" @update:value="handleUpdateValue">
      <n-space item-style="display: flex;" align="center">
        <n-checkbox value="Beijing" label="北京" />
        <n-checkbox value="Shanghai" label="上海" />
        <n-checkbox value="Guangzhou" label="广州" />
        <n-checkbox value="Shenzen" label="深圳" />
      </n-space>
    </n-checkbox-group>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const checkedRef = ref(false)
    const citiesRef = ref<(string | number)[] | null>(null)
    const message = useMessage()
    return {
      checked: checkedRef,
      cities: citiesRef,
      handleCheckedChange (checked: boolean) {
        checkedRef.value = checked
        message.info(JSON.stringify(checked))
      },
      handleUpdateValue (value: (string | number)[]) {
        citiesRef.value = value
        message.info(JSON.stringify(value))
      }
    }
  }
})
</script>
