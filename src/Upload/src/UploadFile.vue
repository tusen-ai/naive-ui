<template>
  <n-fade-in-height-expand-transition>
    <div
      v-if="!isFileRemoved"
      class="n-upload-file"
      :class="{
        [`n-upload-file--${progressStatus}-status`]: true
      }"
    >
      <div class="n-upload-file-info">
        <div class="n-upload-file-info__name">
          <n-icon>
            <attach-outline />
          </n-icon> {{ file.name }}
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
        :show="!isFileUploaded"
        :percentage="file.percentage"
        :status="progressStatus"
      />
    </div>
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
  props: {
    file: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    progressStatus () {
      const file = this.file
      if (file.status === 'done') return 'success'
      if (file.status === 'error') return 'error'
      return 'info'
    },
    isFileRemoved () {
      const file = this.file
      return file.status === 'removed'
    },
    isFileUploaded () {
      const file = this.file
      return file.status === 'done'
    },
    showCancelButton () {
      const file = this.file
      return ['uploading', 'pending', 'error'].includes(file.status)
    },
    showRemoveButton () {
      const file = this.file
      return ['done'].includes(file.status)
    },
    showDownloadButton () {
      const file = this.file
      return ['done'].includes(file.status)
    }
  },
  methods: {
    handleRemoveOrCancelClick () {
      if (this.showRemoveButton) {
        this.$emit('remove-click', this.file, this.index)
      } else if (this.showCancelButton) {
        this.$emit('cancel-click', this.file, this.index)
      } else {
        console.error('[naive-ui/upload]: the button clicked type is unknown.')
      }
    },
    handleDownloadClick () {
      this.$emit('download-click', this.file, this.index)
    }
  }
}
</script>
