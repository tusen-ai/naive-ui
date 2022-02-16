<markdown>
# Use with form

It seems this example is useless, but it's a data input component so I just left it here.
</markdown>

<template>
  <n-form :model="model">
    <n-form-item label="Color(#18A058)" path="color" :rule="colorRule">
      <n-color-picker v-model:value="model.color" :show-alpha="false" />
    </n-form-item>
  </n-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup () {
    const model = reactive({
      color: '#18A058'
    })
    return {
      model,
      colorRule: {
        trigger: 'change',
        validator (_: unknown, value: string) {
          if (value !== '#18A058') return new Error("Don't change the color")
        }
      }
    }
  }
})
</script>
