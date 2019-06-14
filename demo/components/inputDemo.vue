<template>
  <div class="doc">
    <h1>输入 / n-input</h1>
    <hr>
    <h2>基本用法</h2>
    <n-input
      v-model="value"
      type="input"
    />
    {{ value }}
    <br>
    <textarea rows="5"><n-input
      v-model="value"
      type="input"
    /></textarea>
    <hr>
    <h2>textarea</h2>
    <n-input
      v-model="value"
      type="textarea"
    />
    <br>
    <textarea rows="5"><n-input
      v-model="value"
      type="textarea"
    /></textarea>
    <hr>
    <h2>placeholder</h2>
    <n-input
      v-model="value"
      placeholder="abcdd"
    />
    <br>
    <textarea rows="5"><n-input
      v-model="value"
      placeholder="abcdd"
    /></textarea>
    <hr>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '123'
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
