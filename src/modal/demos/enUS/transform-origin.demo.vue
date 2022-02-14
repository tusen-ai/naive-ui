<markdown>
# Transform origin

Although the emerging animation from your click position is cool, sometimes we need a plain animation which occurs from the center of the screen. You can set `transfrom-origin` to `'center'` to achieve it.
</markdown>

<template>
  <n-button @click="showModal = true">
    Nothing
  </n-button>
  <n-modal v-model:show="showModal" transform-origin="center">
    <n-card
      style="width: 600px"
      title="Okay"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        Great
      </template>
      Fine
      <template #footer>
        Nice
      </template>
    </n-card>
  </n-modal>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      showModal: ref(false)
    }
  }
})
</script>
