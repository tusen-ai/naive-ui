import { h, defineComponent, PropType, computed, inject } from 'vue'
import {
  CancelIcon,
  TrashIcon,
  AttachIcon,
  DownloadIcon
} from '../../_internal/icons'
import { NButton } from '../../button'
import { NIconSwitchTransition, NBaseIcon } from '../../_internal'
import { warn } from '../../_utils'
import NUploadProgress from './UploadProgress'
import type { FileInfo, UploadInjection } from './interface'

export default defineComponent({
  name: 'UploadFile',
  props: {
    file: {
      type: Object as PropType<FileInfo>,
      required: true
    }
  },
  setup (props) {
    const NUpload = inject<UploadInjection>('NUpload') as UploadInjection
    const progressStatusRef = computed(() => {
      const { file } = props
      if (file.status === 'finished') return 'success'
      if (file.status === 'error') return 'error'
      return 'info'
    })
    const buttonTypeRef = computed(() => {
      const { file } = props
      if (file.status === 'error') return 'error'
      return undefined
    })
    const showProgressRef = computed(() => {
      const { file } = props
      return file.status === 'uploading'
    })
    const showCancelButtonRef = computed(() => {
      if (!NUpload.showCancelButton) return false
      const { file } = props
      return ['uploading', 'pending', 'error'].includes(file.status)
    })
    const showRemoveButtonRef = computed(() => {
      if (!NUpload.showRemoveButton) return false
      const { file } = props
      return ['finished'].includes(file.status)
    })
    const showDownloadButtonRef = computed(() => {
      if (!NUpload.showDownloadButton) return false
      const { file } = props
      return ['finished'].includes(file.status)
    })
    function handleRemoveOrCancelClick (e: MouseEvent): void {
      e.preventDefault()
      const { file } = props
      if (['finished', 'pending', 'error'].includes(file.status)) {
        handleRemove(file)
      } else if (['uploading'].includes(file.status)) {
        handleAbort(file)
      } else {
        warn('upload', 'The button clicked type is unknown.')
      }
    }
    function handleDownloadClick (e: MouseEvent): void {
      e.preventDefault()
      handleDownload(props.file)
    }
    function handleRemove (file: FileInfo): void {
      const { XhrMap, doChange } = NUpload
      void Promise.resolve(
        NUpload.onRemove
          ? NUpload.onRemove({
            file: Object.assign({}, file),
            fileList: NUpload.mergedFileList
          })
          : true
      ).then((result) => {
        if (result === false) return
        const fileAfterChange = Object.assign({}, file, {
          status: 'removed'
        })
        XhrMap.delete(file.id)
        doChange(fileAfterChange, undefined, {
          remove: true
        })
      })
    }
    function handleDownload (file: FileInfo): void {
      void Promise.resolve(
        NUpload.onDownload ? NUpload.onDownload(Object.assign({}, file)) : true
      ).then((res) => {
        /** I haven't figure out its usage, so just leave it here */
      })
    }
    function handleAbort (file: FileInfo): void {
      const { XhrMap } = NUpload
      const XHR = XhrMap.get(file.id)
      XHR?.abort()
      handleRemove(Object.assign({}, file))
    }
    return {
      NUpload,
      progressStatus: progressStatusRef,
      buttonType: buttonTypeRef,
      showProgress: showProgressRef,
      showCancelButton: showCancelButtonRef,
      showRemoveButton: showRemoveButtonRef,
      showDownloadButton: showDownloadButtonRef,
      handleRemoveOrCancelClick,
      handleDownloadClick
    }
  },
  render () {
    return (
      <a
        ref="noopener noreferer"
        target="_blank"
        href={this.file.url || undefined}
        class={[
          'n-upload-file',
          `n-upload-file--${this.progressStatus}-status`,
          this.file.url && 'n-upload-file--with-url'
        ]}
      >
        <div class="n-upload-file-info">
          <div class="n-upload-file-info__name">
            <NBaseIcon>{{ default: () => <AttachIcon /> }}</NBaseIcon>
            {this.file.name}
          </div>
          <div class="n-upload-file-info__action">
            {this.showRemoveButton || this.showCancelButton ? (
              <NButton
                key="cancelOrTrash"
                theme={this.NUpload.mergedTheme.peers.Button}
                themeOverrides={this.NUpload.mergedTheme.peerOverrides.Button}
                circle
                text
                type={this.buttonType}
                onClick={this.handleRemoveOrCancelClick}
              >
                {{
                  icon: () => (
                    <NIconSwitchTransition>
                      {{
                        default: () =>
                          this.showRemoveButton ? (
                            <NBaseIcon key="trash">
                              {{ default: () => <TrashIcon /> }}
                            </NBaseIcon>
                          ) : (
                            <NBaseIcon key="cancel">
                              {{ default: () => <CancelIcon /> }}
                            </NBaseIcon>
                          )
                      }}
                    </NIconSwitchTransition>
                  )
                }}
              </NButton>
            ) : null}
            {this.showDownloadButton ? (
              <NButton
                key="download"
                circle
                text
                type={this.buttonType}
                onClick={this.handleDownloadClick}
              >
                {{
                  icon: () => (
                    <NBaseIcon>{{ default: () => <DownloadIcon /> }}</NBaseIcon>
                  )
                }}
              </NButton>
            ) : null}
          </div>
        </div>
        <NUploadProgress
          show={this.showProgress}
          percentage={this.file.percentage || 0}
          status={this.progressStatus}
        />
      </a>
    )
  }
})
