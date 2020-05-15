<template>
  <li class="n-list-item">
    <div v-if="$scopedSlots.prefix" class="n-list-item__prefix">
      <slot name="prefix" />
    </div>
    <div v-if="$scopedSlots.default" class="n-list-item__main">
      <slot />
    </div>
    <div v-if="$scopedSlots.suffix" class="n-list-item__suffix">
      <slot name="suffix" />
    </div>
  </li>
</template>

<script>
export default {
  name: 'NListItem'
}
</script>
