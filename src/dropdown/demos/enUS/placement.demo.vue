<markdown>
# Placement

Dropdown options can be aligned using the `placement` property.
</markdown>

<script lang="ts">
import { useMessage } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const message = useMessage()
    return {
      options: [
        {
          label: 'Marina Bay Sands',
          key: 'Marina Bay Sands'
        },
        {
          label: 'Brown\'s Hotel, London',
          key: 'Brown\'s Hotel, London'
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
      handleSelect(key: string | number) {
        message.info(String(key))
      }
    }
  }
})
</script>

<template>
  <n-dropdown
    trigger="hover"
    placement="bottom-start"
    :options="options"
    @select="handleSelect"
  >
    <n-button>Go For a Trip</n-button>
  </n-dropdown>
</template>
