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
      <div style="background: red;">
        <div>这是Modal内容！</div>
        <n-input v-model="inputValue" />
        {{ inputValue }}
        <button @click="isActive = false">
          关掉它
        </button>
      </div>
    </n-modal>
    <br>
    <textarea rows="20"><n-modal v-model="isActive">
  <template v-slot:activator>
    <button @click="isActive = true">
      打开它！
    </button>
  </template>
  <div style="background: red;">
    <div>这是Modal内容！</div>
    <n-input v-model="inputValue" />
    {\{ inputValue }}
    <button @click="isActive = false">
      关掉它
    </button>
  </div>
</n-modal></textarea>
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
