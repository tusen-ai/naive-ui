<markdown>
# Trigger

Different ways to `trigger`/`show` a dropdown.
</markdown>

<template>
  <n-space>
    <n-dropdown trigger="hover" :options="options" @select="handleSelect">
      <n-button>Hover!</n-button>
    </n-dropdown>
    <n-dropdown trigger="click" :options="options" @select="handleSelect">
      <n-button>Click!</n-button>
    </n-dropdown>
    <n-dropdown :show="showDropdown" :options="options" @select="handleSelect">
      <n-button @click="handleClick">
        Oh! Manually By Myself!
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
          label: 'Marina Bay Sands',
          key: 'Marina Bay Sands',
          disabled: true
        },
        {
          label: "Brown's Hotel, London",
          key: "Brown's Hotel, London"
        },
        {
          label: 'Atlantis Bahamas, Nassau',
          key: 'Atlantis Bahamas, Nassau'
        },
        {
          label: 'The Beverly Hills Hotel, Los Angeles',
          key: 'The Beverly Hills Hotel, Los Angeles'
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
