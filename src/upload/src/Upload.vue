<template>
  <div
    class="n-upload"
    :class="{
      'n-upload--dragger-inside': draggerInside,
      'n-upload--drag-over': dragOver,
      'n-upload--disabled': disabled
    }"
    :style="cssVars"
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
      <n-fade-in-expand-transition group>
        <n-upload-file
          v-for="file in mergedFileList"
          :key="file.id"
          :file="file"
        />
      </n-fade-in-expand-transition>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { createId } from 'seemly'
import { useTheme } from '../../_mixins'
import { warn } from '../../_utils'
import { NFadeInExpandTransition } from '../../_base'
import { uploadLight } from '../styles'
import NUploadFile from './UploadFile.vue'
import style from './styles/index.cssr.js'

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
      fileAfterChange =
        componentInstance.onFinish({ file: fileAfterChange }) || fileAfterChange
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
  Object.keys(headers).forEach((key) => {
    request.setRequestHeader(key, headers[key])
  })
}

function appendData (formData, data, file) {
  const dataObject = unwrapFunctionValue(data, file)
  if (!dataObject) return
  Object.keys(dataObject).forEach((key) => {
    formData.append(key, dataObject[key])
  })
}

function submit (
  componentInstance,
  file,
  formData,
  { method, action, withCredentials, headers, data }
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

export default defineComponent({
  name: 'Upload',
  components: {
    NUploadFile,
    NFadeInExpandTransition
  },
  provide () {
    return {
      NUpload: this
    }
  },
  props: {
    name: {
      type: String,
      default: 'file'
    },
    accept: {
      type: String,
      default: undefined
    },
    action: {
      type: String,
      default: undefined
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
      default: undefined
    },
    headers: {
      type: [Object, Function],
      default: undefined
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
      default: ({ file }) => file
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
      default: undefined
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
  setup (props) {
    const themeRef = useTheme('Upload', 'Upload', style, uploadLight, props)
    return {
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: {
            draggerColor,
            draggerBorder,
            draggerBorderHover,
            itemColorHover,
            itemColorHoverError,
            itemTextColorError,
            itemTextColorSuccess,
            itemTextColor,
            itemIconColor,
            itemDisabledOpacity,
            lineHeight,
            borderRadius,
            fontSize
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--border-radius': borderRadius,
          '--dragger-border': draggerBorder,
          '--dragger-border-hover': draggerBorderHover,
          '--dragger-color': draggerColor,
          '--font-size': fontSize,
          '--item-color-hover': itemColorHover,
          '--item-color-hover-error': itemColorHoverError,
          '--item-disabled-opacity': itemDisabledOpacity,
          '--item-icon-color': itemIconColor,
          '--item-text-color': itemTextColor,
          '--item-text-color-error': itemTextColorError,
          '--item-text-color-success': itemTextColorSuccess,
          '--line-height': lineHeight
        }
      })
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
    mergedFileList () {
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
      e.preventDefault()
      if (!this.draggerInside || this.disabled) return
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
      Array.from(files).forEach((file) => {
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
      const filesToUpload = fileId
        ? this.mergedFileList.filter((file) => file.id === fileId)
        : this.mergedFileList
      filesToUpload.forEach((file) => {
        if (file.status === 'pending') {
          const formData = new FormData()
          formData.append(fieldName, file.file)
          submit(this, file, formData, {
            method: method,
            action: action,
            withCredentials: withCredentials,
            headers: headers,
            data: data
          })
        }
      })
    },
    change (
      fileAfterChange,
      event,
      options = {
        append: false,
        remove: false
      }
    ) {
      const { append, remove } = options
      const fileListAfterChange = this.mergedFileList
      const fileIndex = fileListAfterChange.findIndex(
        (file) => file.id === fileAfterChange.id
      )
      if (append || remove || ~fileIndex) {
        if (append) {
          fileListAfterChange.push(fileAfterChange)
        } else if (remove) {
          fileListAfterChange.splice(fileIndex, 1)
        } else {
          fileListAfterChange.splice(fileIndex, 1, fileAfterChange)
        }
        this.onChange({
          file: fileAfterChange,
          fileList: fileListAfterChange,
          event
        })
        this.internalFileList = fileListAfterChange
      } else if (__DEV__) {
        warn('upload', 'File has no corresponding id in current file list.')
      }
    }
  }
})
</script>
