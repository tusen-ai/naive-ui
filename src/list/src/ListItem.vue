<template>
  <li class="n-list-item">
    <div v-if="$slots.prefix" class="n-list-item__prefix">
      <slot name="prefix" />
    </div>
    <div v-if="$slots.default" class="n-list-item__main">
      <slot />
    </div>
    <div v-if="$slots.suffix" class="n-list-item__suffix">
      <slot name="suffix" />
    </div>
  </li>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ListItem'
})
</script>
