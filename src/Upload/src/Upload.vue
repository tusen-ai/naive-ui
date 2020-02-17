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
        <n-upload-file
          :key="index"
          :file="file"
          :index="index"
          @download-click="handleDownloadClick"
          @cancel-click="handleCancelClick"
          @remove-click="handleRemoveClick"
        />
      </template>
    </div>
  </div>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import NUploadFile from './UploadFile'

function XHRHandlers (componentInstance, fileIndex) {
  const file = componentInstance.fileList[fileIndex]
  const formDataList = componentInstance.formDataList
  const XHRs = componentInstance.XHRs
  return {
    handleXHRLoad (e) {
      file.status = 'done'
      file.percentage = 100
      XHRs[fileIndex] = null
      formDataList[fileIndex] = null
    },
    handleXHRAbort (e) {
      file.status = 'removed'
      XHRs[fileIndex] = null
      formDataList[fileIndex] = null
    },
    handleXHRError (e) {
      file.status = 'error'
    },
    handleXHRProgress (e) {
      if (e.lengthComputable) {
        const progress = Math.ceil((e.loaded / e.total) * 100)
        file.percentage = progress
      }
    }
  }
}

function registerHandler (componentInstance, fileIndex, request) {
  const handlers = XHRHandlers(componentInstance, fileIndex)
  request.onabort = handlers.handleXHRAbort
  request.onerror = handlers.handleXHRError
  request.onload = handlers.handleXHRLoad
  if (request.upload) {
    request.upload.onprogress = handlers.handleXHRProgress
  }
}

function setHeaders (request, headers) {
  if (!headers) return
  Object.keys(headers).forEach(key => {
    request.setRequestHeader(request, headers[key])
  })
}

function unwrapData (data) {
  if (typeof data === 'function') {
    return data()
  }
  return data
}

function appendData (formData, data) {
  const dataObject = unwrapData(data)
  if (!dataObject) return
  Object.keys(dataObject).forEach(key => {
    formData.append(key, dataObject[key])
  })
}

function submit (
  componentInstance,
  fileIndex,
  {
    method,
    action,
    withCredentials,
    headers,
    data,
    formData
  }
) {
  const request = new XMLHttpRequest()
  componentInstance.XHRs[fileIndex] = request
  request.withCredentials = withCredentials
  setHeaders(request, headers)
  appendData(formData, data)
  registerHandler(componentInstance, fileIndex, request)
  request.open(method, action)
  request.send(formData)
  const file = componentInstance.fileList[fileIndex]
  file.status = 'uploading'
}

/**
 * fils status ['pending', 'uploading', 'done', 'removed', 'error']
 */
export default {
  name: 'NUpload',
  components: {
    NUploadFile
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
    data: {
      type: [Boolean, Function],
      default: null
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
    },
    onRemove: {
      type: Function,
      default: () => true
    },
    onDownload: {
      type: Function,
      default: () => true
    },
    defaultUpload: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      fileList: [],
      formDataList: [],
      XHRs: []
    }
  },
  methods: {
    handleActivatorClick () {
      if (this.disabled) return
      this.$refs.input.click()
    },
    handleFileInputChange (e) {
      const fileList = this.fileList
      const formDataList = this.formDataList
      const fieldName = this.name
      Array.from(e.target.files).forEach((file, index) => {
        fileList.push({
          name: file.name,
          status: 'pending',
          percentage: 0
        })
        const formData = new FormData()
        formData.append(fieldName, file)
        formDataList.push(formData)
      })
      if (this.defaultUpload) {
        this.submit()
      }
      e.target.value = null
    },
    submit () {
      this.fileList.forEach((file, fileIndex) => {
        const formData = this.formDataList[fileIndex]
        if (file.status === 'pending') {
          submit(
            this,
            fileIndex,
            {
              method: this.method,
              action: this.action,
              withCredentials: this.withCredentials,
              headers: this.headers,
              data: this.data,
              formData
            }
          )
        }
      })
    },
    handleRemoveClick (file, fileIndex) {
      Promise.resolve(
        this.onRemove(file)
      ).then(
        res => {
          if (res === true) {
            this.fileList[fileIndex].status = 'removed'
            this.XHRs[fileIndex] = null
            this.formDataList[fileIndex] = null
          }
        }
      )
    },
    handleDownloadClick (file, fileIndex) {
      Promise.resolve(
        this.onDownload(file)
      ).then(
        res => {
          if (res === true) {} // do something
        }
      )
    },
    handleCancelClick (file, fileIndex) {
      const XHR = this.XHRs[fileIndex]
      XHR.abort()
    }
  }
}
</script>
