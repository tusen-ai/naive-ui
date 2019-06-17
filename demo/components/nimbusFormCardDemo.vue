<template>
  <div class="doc">
    <h1>Modal</h1>
    <hr>
    <h2>基本用法</h2>
    <n-modal v-model="isActive">
      <template v-slot:activator>
        <button @click="isActive = true">
          打开它！
        </button>
      </template>
      <n-nimbus-form-card width="1032" />
    </n-modal>
    <br>
    <textarea rows="20" />
    <hr>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isActive: false,
      inputValue: '666'
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
