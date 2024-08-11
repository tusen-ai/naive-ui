<markdown>
# Icon

I like using an icon in an avatar.
</markdown>

<script lang="ts">
import { MdCash } from '@vicons/ionicons4'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    MdCash
  }
})
</script>

<template>
  <n-avatar>
    <n-icon>
      <MdCash />
    </n-icon>
  </n-avatar>
</template>
