<markdown>
# Vshow debug
</markdown>

<template>
  <n-form :model="formValue" label-placement="left" :style="{ margin: '30px' }">
    <n-grid :col="24" x-gap="24">
      <n-form-item-gi :span="8" label="选择框">
        <n-select
          v-model:value="formValue.select"
          :style="{ width: '100%' }"
          :options="selectOptions"
          clearable
        />
      </n-form-item-gi>
      <!-- 当选择框的值为2时显示，通过v-show控制是否显示 -->
      <n-form-item-gi v-show="formValue.select === 2" :span="8" label="输入框1">
        <n-input value="我只有在选择框的值为2时才应该显示！" />
      </n-form-item-gi>
      <!-- 当v-show作用在input中就无此问题 -->
      <!-- <n-form-item-gi :span="8" label="输入框2">
        <n-input value="我只有在选择框的值为2时才应该显示！" v-show="formValue.select === 2"/>
      </n-form-item-gi> -->
    </n-grid>
  </n-form>
  <!-- 问题总结 -->
  <n-h2
    prefix="bar"
    align-text
    type="info"
    :style="{ margin: '30px' }"
  >期望：当选择框值为2时，显示输入框</n-h2>
  <n-h2
    prefix="bar"
    align-text
    type="error"
    :style="{ margin: '30px' }"
  >问题：当选择框值从null变为1时，依然显示了输入框，不符合预期</n-h2>
  <n-h2
    prefix="bar"
    align-text
    type="error"
    :style="{ margin: '30px' }"
  >问题：当选择框值从1变为null时，依然显示了输入框，不符合预期</n-h2>
</template>

<script lang="ts">
import { reactive } from 'vue'

export default {
  setup () {
    // 表单值，默认选择框的值为null
    const formValue = reactive({ select: null })
    // 选择框选项
    const selectOptions = [
      {
        label: '值为1',
        value: 1
      },
      {
        label: '值为2',
        value: 2
      }
    ]
    return {
      formValue,
      selectOptions
    }
  }
}
</script>
