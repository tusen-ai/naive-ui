<template>
  <div
    class="n-upload"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme,
      'n-upload--dragger-inside': draggerInside,
      'n-upload--drag-over': dragOver,
      'n-upload--disabled': disabled
    }"
  >
    <input
      ref="input"
      type="file"
      class="n-upload__file-input"
      :accept="accept"
      :multiple="multiple"
      :directory="directory"
      @change="handleFileInputChange"
    >
    <div
      class="n-upload__activator"
      @click="handleActivatorClick"
      @drop="handleActivatorDrop"
      @dragover="handleActivatorDragOver"
      @dragenter="handleActivatorDragEnter"
      @dragleave="handleActivatorDragLeave"
    >
      <slot />
    </div>
    <div class="n-upload-file-list" :style="fileListStyle">
      <n-upload-file
        v-for="file in syntheticFileList"
        :key="file.id"
        :file="file"
      />
    </div>
  </div>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import NUploadFile from './UploadFile'

function createId () {
  return Math.random()
    .toString(36)
    .slice(2)
}

/**
 * fils status ['pending', 'uploading', 'finished', 'removed', 'error']
 */
function XHRHandlers (componentInstance, file, XHR) {
  const change = componentInstance.change
  const XHRMap = componentInstance.XHRMap
  let percentage = 0
  return {
    handleXHRLoad (e) {
      let fileAfterChange = Object.assign({}, file, {
        status: 'finished',
        percentage,
        file: null
      })
      XHRMap.delete(file.id)
      fileAfterChange = componentInstance.onFinish({ file: fileAfterChange, response: XHR.response }) || fileAfterChange
      change(fileAfterChange, e)
    },
    handleXHRAbort (e) {
      const fileAfterChange = Object.assign({}, file, {
        status: 'removed',
        file: null,
        percentage
      })
      XHRMap.delete(file.id)
      change(fileAfterChange, e)
    },
    handleXHRError (e) {
      const fileAfterChange = Object.assign({}, file, {
        status: 'error',
        percentage,
        file: null
      })
      XHRMap.delete(file.id)
      change(fileAfterChange, e)
    },
    handleXHRProgress (e) {
      const fileAfterChange = Object.assign({}, file, {
        status: 'uploading'
      })
      if (e.lengthComputable) {
        const progress = Math.ceil((e.loaded / e.total) * 100)
        fileAfterChange.percentage = progress
        percentage = progress
      }
      change(fileAfterChange, e)
    }
  }
}

function registerHandler (componentInstance, file, request) {
  const handlers = XHRHandlers(componentInstance, file, request)
  request.onabort = handlers.handleXHRAbort
  request.onerror = handlers.handleXHRError
  request.onload = handlers.handleXHRLoad
  if (request.upload) {
    request.upload.onprogress = handlers.handleXHRProgress
  }
}

function unwrapFunctionValue (data, file) {
  if (typeof data === 'function') {
    return data({ file })
  }
  return data
}

function setHeaders (request, headers, file) {
  const headersObject = unwrapFunctionValue(headers, file)
  if (!headersObject) return
  Object.keys(headers).forEach(key => {
    request.setRequestHeader(key, headers[key])
  })
}

function appendData (formData, data, file) {
  const dataObject = unwrapFunctionValue(data, file)
  if (!dataObject) return
  Object.keys(dataObject).forEach(key => {
    formData.append(key, dataObject[key])
  })
}

function submit (
  componentInstance,
  file,
  formData,
  {
    method,
    action,
    withCredentials,
    headers,
    data
  }
) {
  const request = new XMLHttpRequest()
  componentInstance.XHRMap.set(file.id, request)
  request.withCredentials = withCredentials
  appendData(formData, data, file)
  registerHandler(componentInstance, file, request)
  request.open(method.toUpperCase(), action)
  setHeaders(request, headers, file)
  request.send(formData)
  const fileAfterChange = Object.assign({}, file, {
    status: 'uploading'
  })
  componentInstance.change(fileAfterChange)
}

export default {
  name: 'Upload',
  components: {
    NUploadFile
  },
  provide () {
    return {
      NUpload: this
    }
  },
  mixins: [ withapp, themeable ],
  props: {
    name: {
      type: String,
      default: 'file'
    },
    accept: {
      type: String,
      default: null
    },
    action: {
      type: String,
      default: null
    },
    directory: {
      type: Boolean,
      default: false
    },
    method: {
      type: String,
      default: 'POST'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    data: {
      type: [Object, Function],
      default: null
    },
    headers: {
      type: [Object, Function],
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
    onFinish: {
      type: Function,
      default: file => file
    },
    onDownload: {
      /** currently of no usage */
      type: Function,
      default: () => true
    },
    defaultUpload: {
      type: Boolean,
      default: true
    },
    fileList: {
      type: Array,
      default: undefined
    },
    fileListStyle: {
      type: Object,
      default: null
    },
    defaultFileList: {
      type: Array,
      default: () => []
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    showRemoveButton: {
      type: Boolean,
      default: true
    },
    showDownloadButton: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      internalFileList: [],
      formDataList: [],
      XHRs: [],
      draggerInside: false,
      dragOver: false,
      transitionDisabled: true,
      XHRMap: new Map()
    }
  },
  computed: {
    syntheticFileList () {
      if (this.fileList) {
        return this.fileList
      } else {
        return this.internalFileList
      }
    }
  },
  created () {
    this.internalFileList = this.defaultFileList
  },
  mounted () {
    this.transitionDisabled = false
  },
  methods: {
    openFileDialog () {
      this.$refs.input.click()
    },
    handleActivatorClick () {
      if (this.disabled) return
      this.openFileDialog()
    },
    handleActivatorDragOver (e) {
      e.preventDefault()
      this.dragOver = true
    },
    handleActivatorDragEnter (e) {
      e.preventDefault()
      this.dragOver = true
    },
    handleActivatorDragLeave (e) {
      e.preventDefault()
      this.dragOver = false
    },
    handleActivatorDrop (e) {
      if (!this.draggerInside || this.disabled) return
      e.preventDefault()
      const dataTransfer = e.dataTransfer
      const files = dataTransfer.files || []
      this.handleFileAddition(files)
      this.dragOver = false
    },
    handleFileInputChange (e) {
      this.handleFileAddition(e.target.files, e)
      e.target.value = null
    },
    handleFileAddition (files, e) {
      const change = this.change
      Array.from(files).forEach(file => {
        const fileInfo = {
          id: createId(),
          name: file.name,
          status: 'pending',
          percentage: 0,
          file: file
        }
        change(fileInfo, e, {
          append: true
        })
      })
      if (this.defaultUpload) {
        this.submit()
      }
    },
    submit (fileId) {
      const method = this.method
      const action = this.action
      const withCredentials = this.withCredentials
      const headers = this.headers
      const data = this.data
      const fieldName = this.name
      const filesToUpload = fileId ? this.syntheticFileList.filter(
        file => file.id === fileId
      ) : this.syntheticFileList
      filesToUpload.forEach(file => {
        if (file.status === 'pending') {
          const formData = new FormData()
          formData.append(fieldName, file.file)
          submit(
            this,
            file,
            formData,
            {
              method: method,
              action: action,
              withCredentials: withCredentials,
              headers: headers,
              data: data
            }
          )
        }
      })
    },
    change (fileAfterChange, event, options = {
      append: false,
      remove: false
    }) {
      const {
        append,
        remove
      } = options
      const fileListAfterChange = this.syntheticFileList
      const fileIndex = fileListAfterChange.findIndex(file => file.id === fileAfterChange.id)
      if (append || remove || ~fileIndex) {
        if (append) {
          fileListAfterChange.push(fileAfterChange)
        } else if (remove) {
          fileListAfterChange.splice(fileIndex, 1)
        } else {
          fileListAfterChange.splice(fileIndex, 1, fileAfterChange)
        }
        this.$emit('change', {
          file: fileAfterChange,
          fileList: fileListAfterChange,
          event
        })
        this.onChange({
          file: fileAfterChange,
          fileList: fileListAfterChange,
          event
        })
        this.internalFileList = fileListAfterChange
      } else {
        console.error('[naive-ui/upload]: file has no corresponding id in current file list.')
      }
    }
  }
}
</script>
