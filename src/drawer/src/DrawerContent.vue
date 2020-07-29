<template>
  <div><slot /></div>
</template>

<script>
export default {
  name: 'NDrawerContent',
  provide () {
    return {
      NDrawer: this
    }
  },
  methods: {
    getDetachTarget () {
      return this.$el
    }
  }
}
</script>
