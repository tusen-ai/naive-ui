<markdown>
# 自定义操作
</markdown>

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
            <add-icon />
          </n-icon>
        </n-button>
        <n-button disabled @click="() => remove(index)">
          <n-icon>
            <remove-icon />
          </n-icon>
        </n-button>
        <n-button @click="() => move('up', index)">
          <n-icon>
            <up-icon />
          </n-icon>
        </n-button>
        <n-button @click="() => move('down', index)">
          <n-icon>
            <down-icon />
          </n-icon>
        </n-button>
      </n-space>
    </template>
  </n-dynamic-input>
  <pre>{{ JSON.stringify(value, null, 2) }}</pre>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  BagAddOutline as AddIcon,
  BagRemoveOutline as RemoveIcon,
  ChevronUpCircleOutline as UpIcon,
  ChevronDownCircleOutline as DownIcon
} from '@vicons/ionicons5'

export default defineComponent({
  components: {
    AddIcon,
    RemoveIcon,
    UpIcon,
    DownIcon
  },
  setup () {
    return {
      value: ref(['Vue', 'Vue3', 'React'])
    }
  }
})
</script>
