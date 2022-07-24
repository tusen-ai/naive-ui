<markdown>
# Large Data

If you have tons of data, you may need to speed the transfer up! Set `virtual-scroll` on transfer to use a blazing fast transfer (which turns the ridiculous animation off).
</markdown>

<template>
  <n-legacy-transfer
    ref="transfer"
    v-model:value="value"
    :options="options"
    virtual-scroll
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

function createOptions () {
  return Array.from({ length: 42000 }).map((v, i) => ({
    label: 'Option' + i,
    value: i,
    disabled: i % 5 === 0
  }))
}

function createValues () {
  return Array.from({ length: 50 }).map((v, i) => i)
}

export default defineComponent({
  setup () {
    return {
      options: createOptions(),
      value: ref(createValues())
    }
  }
})
</script>
