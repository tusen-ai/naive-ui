<markdown>
 # Modal debug
</markdown>

<template>
  <div>
    <n-button @click="showModal = true">
      Display
    </n-button>
  </div>

  <n-modal v-model:show="showModal">
    <div>
      <div>{{ name }}</div>
      <n-input v-model:value="value" show-count :render-count="renderCount" />
    </div>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      name: '',
      value: '',
      showModal: false
    }
  },
  mounted () {
    setInterval(() => {
      this.name = Math.random().toString()
    }, 100)
  },
  methods: {
    renderCount () {
      return `${this.value.length} / Max`
    }
  }
})
</script>
