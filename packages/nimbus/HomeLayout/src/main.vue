<template>
  <div class="home">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'NHomeLayout',
  props: {},
  data () {
    return {
      collapse: false,
      activeItemName: 'Service Management',
      items: [
        {
          name: 'Service Management'
        },
        {
          name: 'Service Type Management'
        },
        {
          name: 'User Management'
        }
      ]
    }
  },
  methods: {
    toggle () {
      this.collapse = !this.collapse
    },
    setActive (itemName) {
      this.activeItemName = itemName
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 1252px;
  margin: auto;
}
</style>
