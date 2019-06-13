<template>
  <div class="doc">
    <h1>n-icon</h1>
    <hr>
    <h2>基本用法</h2>
    <n-icon type="md-search" />
    <br>
    <textarea rows="5"><n-icon type="md-search" /></textarea>
    <hr>
    <h2>自定义属性</h2>
    <n-icon
      type="md-search"
      size="40"
      color="#ff0000"
    />
    <br>
    <textarea rows="5"><n-icon type="md-search" size="40" color="#ff0000"></n-icon></textarea>
    <hr>
    <h2>备注</h2>
    <p>type 都有啥可参考<a href="https://www.iviewui.com/components/icon">icon type</a></p>
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
