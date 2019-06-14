<template>
  <div class="doc">
    <h1>输入 / n-input</h1>
    <hr>
    <h2>基本用法</h2>
    <n-input type="input" />
    <br>
    <textarea rows="5">scaffold</textarea>
    <hr>
    <h2>textarea</h2>
    <n-input type="textarea" />
    <br>
    <textarea rows="5">scaffold</textarea>
    <hr>
    <h2>placeholder</h2>
    <n-input placeholder="abcdd" />
    <br>
    <textarea rows="5">scaffold</textarea>
    <hr>
  </div>
</template>

<script>
export default {

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
