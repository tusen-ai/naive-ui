<markdown>
# Size

Use `size` to make its height the same as other components.
</markdown>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="loading" />Loading</n-space>
    <n-space>
      <n-skeleton v-if="loading" :width="146" :sharp="false" size="medium" />
      <n-button v-else>
        Won't you fly high
      </n-button>
      <n-skeleton v-if="loading" :width="132" round size="medium" />
      <n-button v-else round>
        free bird, yeah
      </n-button>
      <n-skeleton v-if="loading" circle size="medium" />
      <n-button v-else circle>
        ?
      </n-button>
    </n-space>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      loading: ref(true)
    }
  }
})
</script>
