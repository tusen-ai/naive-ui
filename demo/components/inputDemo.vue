<template>
  <div
    class="doc"
  >
    <h1>输入 / n-input</h1>
    <hr>
    <h2>基本用法</h2>
    <n-input
      v-model="value"
      type="input"
      size="small"
      round
      icon="search"
    />
    <br>
    <n-input
      v-model="value"
      type="input"
    />
    <br>
    <n-input
      v-model="value"
      size="large"
      type="input"
      round
    />
    {{ value }}
    <br>
    <textarea ref="ta1"><n-input
  v-model="value"
  type="input"
  size="small"
  round
  icon="search"
/>
<br>
<n-input
  v-model="value"
  type="input"
/>
<br>
<n-input
  v-model="value"
  size="large"
  type="input"
  round
/></textarea>
    <hr>
    <h2>textarea</h2>
    <n-input
      v-model="value"
      type="textarea"
      size="small"
      :rows="1"
    />
    <n-input
      v-model="value"
      type="textarea"
      :rows="2"
    />
    <n-input
      v-model="value"
      type="textarea"
      size="large"
      :rows="3"
    />
    <br>
    <textarea ref="ta2"><n-input
  v-model="value"
  type="textarea"
  size="small"
  :rows="1"
/>
<n-input
  v-model="value"
  type="textarea"
  :rows="2"
/>
<n-input
  v-model="value"
  type="textarea"
  size="large"
  :rows="3"
/></textarea>
    <hr>
    <h2>placeholder & disabled</h2>
    <n-input
      v-model="value"
      size="large"
      placeholder="abcdd"
    />
    <n-input
      v-model="value"
      disabled
      size="large"
      placeholder="abcdd"
    />
    <br>
    <textarea ref="ta3"><n-input
  v-model="value"
  size="large"
  placeholder="abcdd"
/>
<n-input
  v-model="value"
  disabled
  size="large"
  placeholder="abcdd"
/></textarea>
    <hr>
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/mode/htmlmixed/htmlmixed'

export default {
  data () {
    return {
      value: '123'
    }
  },
  mounted () {
    Object.keys(this.$refs).forEach(k => {
      console.log(k)
      CodeMirror.fromTextArea(this.$refs[k], {
        lineNumbers: true,
        mode: 'htmlmixed'
      })
    })
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
