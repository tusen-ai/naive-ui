<template>
  <n-functional-popover>
    <template v-slot:activator>
      <slot name="activator" />
    </template>
    <slot />
  </n-functional-popover>
</template>

<script>
import NFunctionalPopover from './NFunctionalPopover'

export default {
  name: 'NPopover',
  components: {
    NFunctionalPopover
  },
  mounted () {
    console.log('NPopover mounted')
    console.log(this.$el)
  }
}

</script>
