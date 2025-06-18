<markdown>
# Trigger

Different trigger methods for dropdown.
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

const message = useMessage()
const showDropdown = ref(false)

const options = [
  {
    label: 'Marina Bay Sands',
    key: 'marina bay sands',
    disabled: true
  },
  {
    label: 'Brown\'s Hotel, London',
    key: 'brown\'s hotel, london'
  },
  {
    label: 'Atlantis Bahamas, Nassau',
    key: 'atlantis nahamas, nassau'
  },
  {
    label: 'The Beverly Hills Hotel, Los Angeles',
    key: 'the beverly hills hotel, los angeles'
  }
]

function handleSelect(key: string | number) {
  message.info(String(key))
}

function handleClick() {
  showDropdown.value = !showDropdown.value
}
</script>

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
        Oh! I'll Handle it Manually!
      </n-button>
    </n-dropdown>
  </n-space>
</template>
