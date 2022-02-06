<markdown>
# Placehoder Debug

</markdown>

<template>
  <n-space vertical>
    <n-select
      v-model:value="value2"
      placeholder=""
      :options="options"
      style="width: 200px"
    />
    <n-select
      v-model:value="value3"
      multiple
      placeholder=""
      :options="options"
      style="width: 200px"
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      options: [
        {
          value: '1',
          label: '1'
        }
      ],
      value1: null,
      value2: null,
      value3: null
    }
  }
})
</script>
