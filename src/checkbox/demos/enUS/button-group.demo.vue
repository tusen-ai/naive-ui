<markdown>
# Button group

Sometimes a radio button group can look more elegant.

</markdown>

<template>
  <n-checkbox-group v-model:value="cities" is-button-group>
    <n-checkbox-button value="Beijing" label="Beijing" />
    <n-checkbox-button value="Shanghai" label="Shanghai" />
    <n-checkbox-button value="Guangzhou" label="Guangzhou" />
    <n-checkbox-button value="Shenzen" label="Shenzen" />
  </n-checkbox-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      cities: ref(null)
    }
  }
})
</script>
