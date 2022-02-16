<markdown>
# Event
</markdown>

<template>
  <n-space item-style="display: flex;" vertical>
    <n-checkbox
      v-model:checked="checked"
      label="Event"
      @update:checked="handleCheckedChange"
    />
    <n-checkbox-group v-model:value="cities" @update:value="handleUpdateValue">
      <n-space item-style="display: flex;" align="center">
        <n-checkbox value="Beijing" label="Beijing" />
        <n-checkbox value="Shanghai" label="Shanghai" />
        <n-checkbox value="Guangzhou" label="Guangzhou" />
        <n-checkbox value="Shenzen" label="Shenzhen" />
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
