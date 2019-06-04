<template>
  <div>{{ title }}</div>
</template>

<script>
export default {
  name: 'Amazing',
  props: {
    title: {
      type: String,
      default: 'Amazing'
    }
  },
  methods: {
    hello () {
      console.log('amazing')
    }
  }
}
</script>

<style>

</style>
