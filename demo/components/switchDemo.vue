<template>
  <div class="doc">
    <h1>开关 / n-switch</h1>
    <hr>
    <h2>基本用法</h2>
    <n-switch v-model="active" /><br>
    active: {{ active }}
    <br>
    <textarea rows="5"><n-switch v-model="active" /><br></textarea>
    <hr>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: false
    }
  }
}
</script>

<style scoped lang="scss">
.doc {
  width: 900px;
  margin: auto;
  textarea {
    width: 100%;
    min-height: 3em;
  }
}

</style>
