<markdown>
# Icon

I like using an icon in an avatar.
</markdown>

<template>
  <n-avatar>
    <n-icon>
      <md-cash />
    </n-icon>
  </n-avatar>
</template>

<script lang="ts">
import { MdCash } from '@vicons/ionicons4'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    MdCash
  }
})
</script>
