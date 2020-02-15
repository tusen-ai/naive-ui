<template>
  <div
    class="n-upload"
    @click="handleClick"
  >
    <input
      ref="input"
      type="file"
      class="~n-upload__file-input"
      :accept="accept"
      :multiple="multiple"
      @change="handleFileInputChange"
    >
    <div>
      <div v-for="(file, index) in fileList" :key="index">
        {{ file.name }} <n-progress type="line" :show-indicator="false" :percentage="50" style="width: 50%;" /></n-progress>
      </div>
    </div>
  </div>
</template>

<script>
import NProgress from '../../Progress'

export default {
  name: 'NUpload',
  components: {
    NProgress
  },
  props: {
    accept: {
      type: [String, Array],
      default: null
    },
    action: {
      type: String,
      default: null
    },
    method: {
      type: String,
      default: 'POST'
    },
    onUpload: {
      type: Function,
      default: next => next
    },
    multiple: {
      type: Boolean,
      default: false
    },
    headers: {
      type: Object,
      default: null
    },
    withCredentials: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    onChange: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      fileList: [],
      formData: new FormData()
    }
  },
  methods: {
    handleClick () {
      // this.$refs.input.click()
    },
    handleFileInputChange (e) {
      const currentFileList = this.fileList
      this.fileList = currentFileList.concat(e.target.files)
    },
    submit () {
      // clear the queue of current form data
    }
  }
}
</script>
