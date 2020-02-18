<template>
  <n-fade-in-height-expand-transition :appear="!transitionDisabled">
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
            <attach-outline />
          </n-icon>{{ file.name }}
        </div>
        <div class="n-upload-file-info__action">
          <n-button
            v-if="showRemoveButton || showCancelButton"
            key="closeOrTrash"
            circle
            size="tiny"
            @click="handleRemoveOrCancelClick"
          >
            <template v-slot:icon>
              <n-icon-switch-transition>
                <trash-outline v-if="showRemoveButton" key="trash" />
                <close-outline v-else key="close" />
              </n-icon-switch-transition>
            </template>
          </n-button>
          <n-button
            v-if="showDownloadButton"
            key="download"
            circle
            size="tiny"
            @click="handleDownloadClick"
          >
            <template v-slot:icon>
              <download-outline />
            </template>
          </n-button>
        </div>
      </div>
      <n-upload-progress
        :show="showProgress"
        :percentage="file.percentage"
        :status="progressStatus"
      />
    </a>
  </n-fade-in-height-expand-transition>
</template>

<script>
import NButton from '../../Button'
import closeOutline from '../../_icons/close-outline'
import downloadOutline from '../../_icons/download-outline'
import trashOutline from '../../_icons/trash-outline'
import NUploadProgress from './UploadProgress'
import NFadeInHeightExpandTransition from '../../_transition/FadeInHeightExpandTransition'
import attachOutline from '../../_icons/attach-outline'
import NIcon from '../../Icon'
import NIconSwitchTransition from '../../_transition/IconSwitchTransition'

export default {
  name: 'NUploadFile',
  components: {
    NButton,
    NUploadProgress,
    attachOutline,
    closeOutline,
    NIcon,
    downloadOutline,
    trashOutline,
    NFadeInHeightExpandTransition,
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
    transitionDisabled () {
      return this.NUpload.transitionDisabled
    },
    progressStatus () {
      const file = this.file
      if (file.status === 'done') return 'success'
      if (file.status === 'error') return 'error'
      return 'info'
    },
    showProgress () {
      const file = this.file
      return file.status === 'uploading'
    },
    showCancelButton () {
      if (!this.NUpload.showCancelButton) return false
      const file = this.file
      return ['uploading', 'pending', 'error'].includes(file.status)
    },
    showRemoveButton () {
      if (!this.NUpload.showRemoveButton) return false
      const file = this.file
      return ['done'].includes(file.status)
    },
    showDownloadButton () {
      if (!this.NUpload.showDownloadButton) return false
      const file = this.file
      return ['done'].includes(file.status)
    }
  },
  methods: {
    handleRemoveOrCancelClick () {
      const file = this.file
      if (['done', 'pending', 'error'].includes(file.status)) {
        this.handleRemove(file)
      } else if (['uploading'].includes(file.status)) {
        this.handleAbort(file)
      } else {
        console.error('[naive-ui/upload]: the button clicked type is unknown.')
      }
    },
    handleDownloadClick () {
      this.onDownload(this.file)
    },
    handleRemove (file) {
      const NUpload = this.NUpload
      const XHRMap = NUpload.XHRMap
      const change = NUpload.change
      Promise.resolve(
        NUpload.onRemove(file)
      ).then(
        res => {
          if (res === true) {
            const fileAfterChange = Object.assign({}, file, {
              status: 'removed'
            })
            XHRMap.delete(file.id)
            change(fileAfterChange, undefined, {
              remove: true
            })
          }
        }
      )
    },
    handleDownload (file) {
      const NUpload = this.NUpload
      Promise.resolve(
        NUpload.onDownload(file)
      ).then(
        res => {
          if (res === true) {} // do something
        }
      )
    },
    handleAbort (file) {
      const NUpload = this.NUpload
      const XHRMap = NUpload.XHRMap
      const XHR = XHRMap.get(file.id)
      XHR.abort()
      this.handleRemove(file)
    }
  }
}
</script>
