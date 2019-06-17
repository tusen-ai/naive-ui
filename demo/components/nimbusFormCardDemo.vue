<template>
  <div class="doc">
    <h1>Nimbus 弹出式表单 / n-nimbus-form-card</h1>
    <hr>
    <h2>基本用法</h2>
    <n-modal v-model="isActive">
      <template v-slot:activator>
        <button @click="isActive = true">
          打开它！
        </button>
      </template>
      <n-nimbus-form-card
        width="1032"
        title="Create Pod"
        :deactivate="() => isActive = false"
      >
        <template v-slot:header>
          v-slot:header
        </template>
        <template v-slot:footer>
          v-slot:footer
        </template>
        <template v-slot:content>
          Here is content
        </template>
      </n-nimbus-form-card>
    </n-modal>
    <br>
    <textarea rows="30">
<n-modal v-model="isActive">
  <template v-slot:activator>
    <button @click="isActive = true">
      打开它！
    </button>
  </template>
  <n-nimbus-form-card
    width="1032"
    title="Create Pod"
    :deactivate="() => isActive = false"
  >
    <template v-slot:header>
      v-slot:header
    </template>
    <template v-slot:footer>
      v-slot:footer
    </template>
    <template v-slot:content>
      Here is content
    </template>
  </n-nimbus-form-card>
</n-modal>
    </textarea>
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
