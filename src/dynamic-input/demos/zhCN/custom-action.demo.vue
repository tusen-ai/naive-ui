<markdown>
# 自定义操作
</markdown>

<script lang="ts">
import {
  BagAddOutline as AddIcon,
  ChevronDownCircleOutline as DownIcon,
  BagRemoveOutline as RemoveIcon,
  ChevronUpCircleOutline as UpIcon
} from '@vicons/ionicons5'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    AddIcon,
    RemoveIcon,
    UpIcon,
    DownIcon
  },
  setup() {
    return {
      value: ref(['Vue', 'Vue3', 'React'])
    }
  }
})
</script>

<template>
  <n-dynamic-input
    v-model:value="value"
    placeholder="让知识来的更猛烈些"
    :min="3"
    :max="6"
  >
    <template #action="{ index, create, remove, move }">
      <n-space style="margin-left: 20px">
        <n-button @click="() => create(index)">
          <n-icon>
            <AddIcon />
          </n-icon>
        </n-button>
        <n-button disabled @click="() => remove(index)">
          <n-icon>
            <RemoveIcon />
          </n-icon>
        </n-button>
        <n-button @click="() => move('up', index)">
          <n-icon>
            <UpIcon />
          </n-icon>
        </n-button>
        <n-button @click="() => move('down', index)">
          <n-icon>
            <DownIcon />
          </n-icon>
        </n-button>
      </n-space>
    </template>
  </n-dynamic-input>
  <pre>{{ JSON.stringify(value, null, 2) }}</pre>
</template>
