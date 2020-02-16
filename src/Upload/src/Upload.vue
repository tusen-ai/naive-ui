<template>
  <div
    class="n-upload"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme
    }"
  >
    <input
      ref="input"
      type="file"
      class="n-upload__file-input"
      :accept="accept"
      :multiple="multiple"
      @change="handleFileInputChange"
    >
    <div class="n-upload__activator" @click="handleActivatorClick">
      <slot />
    </div>
    <div class="n-upload-file-list">
      <template v-for="(file, index) in fileList">
        <div
          v-if="!isFileRemoved(file)"
          :key="index"
          class="n-upload-file"
          :class="{
            [`n-upload-file--${getProgressStatus(file)}-status`]: true
          }"
        >
          <div class="n-upload-file-info">
            <div class="n-upload-file-info__name">
              {{ file.name }}
            </div>
            <div class="n-upload-file-info__action">
              <n-button circle size="tiny">
                <template v-slot:icon>
                  <close-outline />
                </template>
              </n-button>
              <n-button circle size="tiny">
                <template v-slot:icon>
                  <download-outline />
                </template>
              </n-button>
            </div>
          </div>
          <n-upload-progress
            :show="!isFileUploaded(file)"
            :percentage="file.percentage"
            :status="getProgressStatus(file)"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import NButton from '../../Button'
import closeOutline from '../../_icons/close-outline'
import downloadOutline from '../../_icons/download-outline'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import NUploadProgress from './UploadProgress'

function XHRHandlers (componentInstance, index) {
  return {
    handleXHRLoad (e) {
      const file = componentInstance.fileList[index]
      file.status = 'done'
      file.percentage = 100
      console.log('!!!done')
    },
    handleXHRAbort (e) {
      componentInstance.fileList[index].status = 'removed'
      console.log('!!!abort')
    },
    handleXHRError (e) {
      componentInstance.fileList[index].status = 'error'
      console.log('!!!error')
    },
    handleXHRProgress (e) {
      console.log('!!!progress')
      if (e.lengthComputable) {
        const file = componentInstance.fileList[index]
        const progress = Math.ceil((e.loaded / e.total) * 100)
        file.percentage = progress
      }
    }
  }
}

function registerHandler (request, componentInstance, index) {
  const handlers = XHRHandlers(componentInstance, index)
  request.onabort = handlers.handleXHRAbort
  request.onerror = handlers.handleXHRError
  request.onload = handlers.handleXHRLoad
  if (request.upload) {
    request.upload.onprogress = handlers.handleXHRProgress
  }
}

function submit (method = 'POST', action, formData, index, componentInstance) {
  const request = new XMLHttpRequest()
  registerHandler(request, componentInstance, index)
  request.open(method, action)
  request.send(formData)
}

export default {
  name: 'NUpload',
  components: {
    NButton,
    NUploadProgress,
    closeOutline,
    downloadOutline
  },
  mixins: [ withapp, themeable ],
  props: {
    name: {
      type: String,
      default: 'file'
    },
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
      formDataList: []
    }
  },
  methods: {
    handleActivatorClick () {
      if (this.disabled) return
      this.$refs.input.click()
    },
    isFileRemoved (file) {
      return file.status === 'removed'
    },
    isFileUploaded (file) {
      return file.status === 'done'
    },
    getProgressStatus (file) {
      if (file.status === 'done') return 'success'
      if (file.status === 'error') return 'error'
      return 'info'
    },
    handleFileInputChange (e) {
      const fileList = this.fileList
      const formDataList = this.formDataList
      const fieldName = this.name
      const memorizedFileListLength = fileList.length
      Array.from(e.target.files).forEach((file, index) => {
        fileList.push({
          name: file.name,
          status: 'pending',
          percentage: 0
        })
        const formData = new FormData()
        formData.append(fieldName, file)
        formDataList.push(formData)
        this.submit(formData, memorizedFileListLength + index)
      })
      e.target.value = null
    },
    submit (formData, index) {
      submit(this.method, this.action, formData, index, this)
    }
  }
}
</script>
