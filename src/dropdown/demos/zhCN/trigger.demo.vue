<markdown>
# 触发

下拉菜单不同的触发方式。
</markdown>

<template>
  <n-space>
    <n-dropdown trigger="hover" :options="options" @select="handleSelect">
      <n-button>悬浮！</n-button>
    </n-dropdown>
    <n-dropdown trigger="click" :options="options" @select="handleSelect">
      <n-button>点击！</n-button>
    </n-dropdown>
    <n-dropdown :show="showDropdown" :options="options" @select="handleSelect">
      <n-button @click="handleClick">
        噢！我要自己手动！
      </n-button>
    </n-dropdown>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    const showDropdownRef = ref(false)
    return {
      options: [
        {
          label: '滨海湾金沙，新加坡',
          key: 'marina bay sands',
          disabled: true
        },
        {
          label: '布朗酒店，伦敦',
          key: "brown's hotel, london"
        },
        {
          label: '亚特兰蒂斯巴哈马，拿骚',
          key: 'atlantis nahamas, nassau'
        },
        {
          label: '比佛利山庄酒店，洛杉矶',
          key: 'the beverly hills hotel, los angeles'
        }
      ],
      showDropdown: showDropdownRef,
      handleSelect (key: string | number) {
        message.info(String(key))
      },
      handleClick () {
        showDropdownRef.value = !showDropdownRef.value
      }
    }
  }
})
</script>
