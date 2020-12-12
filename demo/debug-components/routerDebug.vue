<template>
  <div style="padding: 100px">
    <button @click="f">
      router debug
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    f () {
      this.$router.push('/n-popover?999')
    }
  }
}
</script>
