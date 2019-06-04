<template>
  <div>{{ title }}</div>
</template>

<script>
export default {
  name: 'Amazing',
  props: ['title'],
  methods: {
    hello () {
      console.log('amazing')
    }
  }
}
</script>

<style>

</style>
