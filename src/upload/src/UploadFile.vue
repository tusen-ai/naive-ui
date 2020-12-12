<template>
  <a
    ref="noopener noreferer"
    target="_blank"
    class="n-upload-file"
    :href="file.url"
    :class="{
      [`n-upload-file--${progressStatus}-status`]: true,
      [`n-upload-file--with-url`]: file.url
    }"
  >
    <div class="n-upload-file-info">
      <div class="n-upload-file-info__name">
        <n-icon>
          <attach-icon /> </n-icon>{{ file.name }}
      </div>
      <div class="n-upload-file-info__action">
        <n-button
          v-if="showRemoveButton || showCancelButton"
          key="cancelOrTrash"
          circle
          size="tiny"
          ghost
          :type="buttonType"
          @click="handleRemoveOrCancelClick"
        >
          <template #icon>
            <n-icon-switch-transition>
              <delete-icon v-if="showRemoveButton" key="trash" />
              <cancel-icon v-else key="cancel" />
            </n-icon-switch-transition>
          </template>
        </n-button>
        <n-button
          v-if="showDownloadButton"
          key="download"
          circle
          size="tiny"
          ghost
          :type="buttonType"
          @click="handleDownloadClick"
        >
          <template #icon>
            <download-icon />
          </template>
        </n-button>
      </div>
    </div>
    <n-upload-progress
      :show="showProgress"
      :percentage="file.percentage || 0"
      :status="progressStatus"
    />
  </a>
</template>

<script>
import { NButton } from '../../button'
import NUploadProgress from './UploadProgress.vue'
import {
  CancelIcon,
  DeleteIcon,
  AttachIcon,
  DownloadIcon
} from '../../_base/icons'
import { NIcon } from '../../icon'
import { NIconSwitchTransition } from '../../_base'
import { warn } from '../../_utils'

export default {
  name: 'UploadFile',
  components: {
    NButton,
    NUploadProgress,
    AttachIcon,
    CancelIcon,
    NIcon,
    DownloadIcon,
    DeleteIcon,
    NIconSwitchTransition
  },
  inject: {
    NUpload: {
      default: null
    }
  },
  props: {
    file: {
      type: Object,
      required: true
    }
  },
  computed: {
    progressStatus () {
      const { file } = this
      if (file.status === 'finished') return 'success'
      if (file.status === 'error') return 'error'
      return 'info'
    },
    buttonType () {
      if (this.file.status === 'error') return 'error'
      return undefined
    },
    showProgress () {
      const { file } = this
      return file.status === 'uploading'
    },
    showCancelButton () {
      if (!this.NUpload.showCancelButton) return false
      const { file } = this
      return ['uploading', 'pending', 'error'].includes(file.status)
    },
    showRemoveButton () {
      if (!this.NUpload.showRemoveButton) return false
      const { file } = this
      return ['finished'].includes(file.status)
    },
    showDownloadButton () {
      if (!this.NUpload.showDownloadButton) return false
      const { file } = this
      return ['finished'].includes(file.status)
    }
  },
  methods: {
    handleRemoveOrCancelClick (e) {
      e.preventDefault()
      const { file } = this
      if (['finished', 'pending', 'error'].includes(file.status)) {
        this.handleRemove(file)
      } else if (['uploading'].includes(file.status)) {
        this.handleAbort(file)
      } else {
        warn('upload', 'The button clicked type is unknown.')
      }
    },
    handleDownloadClick (e) {
      e.preventDefault()
      this.onDownload(this.file)
    },
    handleRemove (file) {
      const NUpload = this.NUpload
      const XHRMap = NUpload.XHRMap
      const change = NUpload.change
      Promise.resolve(
        NUpload.onRemove({
          file: Object.assign({}, file),
          fileList: NUpload.mergedFileList
        })
      ).then((result) => {
        if (result === false) return
        const fileAfterChange = Object.assign({}, file, {
          status: 'removed'
        })
        XHRMap.delete(file.id)
        change(fileAfterChange, undefined, {
          remove: true
        })
      })
    },
    handleDownload (file) {
      const NUpload = this.NUpload
      Promise.resolve(NUpload.onDownload(Object.assign({}, file))).then(
        (res) => {
          /** I haven't figure out its usage, so just leave it here */
        }
      )
    },
    handleAbort (file) {
      const NUpload = this.NUpload
      const XHRMap = NUpload.XHRMap
      const XHR = XHRMap.get(file.id)
      XHR.abort()
      this.handleRemove(Object.assign({}, file))
    }
  }
}
</script>
