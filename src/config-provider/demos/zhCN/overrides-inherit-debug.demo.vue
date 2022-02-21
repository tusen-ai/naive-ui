<markdown>
# Theme Overrides Debug
</markdown>

<template>
  <n-config-provider :theme-overrides="overrides1">
    <n-config-provider :theme-overrides="overrides2">
      <n-button type="info">
        Red(Parent)
      </n-button>
      <n-button type="error">
        Green(Child Override)
      </n-button>
      <n-button type="warning">
        Blue(Child)
      </n-button>
    </n-config-provider>
  </n-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const overrides1 = {
  Button: {
    colorInfo: 'red',
    colorError: 'yellow'
  }
}

const overrides2 = {
  Button: {
    colorWarning: 'blue',
    colorError: 'green'
  }
}

export default defineComponent({
  setup () {
    return {
      overrides1,
      overrides2
    }
  }
})
</script>
