<template>
  <div class="doc">
    <h1>渐变文字 n-gradient-text</h1>
    <hr>
    <h2>基本用法</h2>
    <n-gradient-text>轻轻闭上眼睛，此刻我觉得清醒。</n-gradient-text>
    <br>
    <textarea rows="5"><n-gradient-text>轻轻闭上眼睛，此刻我觉得清醒。</n-gradient-text></textarea>
    <hr>
    <h2>调整字号</h2>
    <n-gradient-text font-size="24">
      轻轻闭上眼睛，此刻我觉得清醒。
    </n-gradient-text>
    <br>
    <textarea rows="5"><n-gradient-text font-size="24">轻轻闭上眼睛，此刻我觉得清醒。</n-gradient-text></textarea>
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
