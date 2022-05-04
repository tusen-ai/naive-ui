<markdown>
# 自定义输入或触发元素

你可以替换 `dynamic-tags` 的输入或触发元素。
</markdown>

<template>
  <n-dynamic-tags v-model:value="tags" :max="3">
    <template #input="{ submit, deactivate }">
      <n-auto-complete
        ref="autoCompleteInstRef"
        v-model:value="inputValue"
        size="small"
        :options="options"
        placeholder="邮箱"
        :clear-after-select="true"
        @select="submit($event)"
        @blur="deactivate"
      />
    </template>
    <template #trigger="{ activate, disabled }">
      <n-button
        size="small"
        type="primary"
        dashed
        :disabled="disabled"
        @click="activate()"
      >
        <template #icon>
          <n-icon>
            <Add />
          </n-icon>
        </template>
        添加
      </n-button>
    </template>
  </n-dynamic-tags>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, nextTick } from 'vue'
import { AutoCompleteInst } from 'naive-ui'
import Add from '@vicons/ionicons5/Add'

export default defineComponent({
  components: {
    Add
  },
  setup () {
    const autoCompleteInstRef = ref<AutoCompleteInst | null>(null)
    watch(autoCompleteInstRef, (value) => {
      if (value) nextTick(() => value.focus())
    })
    const inputValueRef = ref('')
    const options = computed(() => {
      if (inputValueRef.value === null) {
        return []
      }
      const prefix = inputValueRef.value.split('@')[0]
      const inputSuffix = inputValueRef.value.split('@')[1]
      if (inputSuffix) {
        return [
          {
            label: prefix + '@' + inputSuffix,
            value: prefix + '@' + inputSuffix
          }
        ]
      }
      return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
        return {
          label: prefix + suffix,
          value: prefix + suffix
        }
      })
    })
    return {
      autoCompleteInstRef,
      tags: ref(['教师', '程序员']),
      inputValue: inputValueRef,
      options
    }
  }
})
</script>
