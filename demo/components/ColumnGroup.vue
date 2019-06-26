<template>
  <div class="doc">
    <h1>一堆列 / n-column-group</h1>
    <hr>
    <h2>基本用法</h2>
    <n-n-column-group cols="4">
      <template v-slot:col(1)>
        666
      </template>
      <template v-slot:col(2)>
        666
      </template>
      <template v-slot:col(3)>
        666
      </template>
      <template v-slot:col(4)>
        666
      </template>
    </n-n-column-group>
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
