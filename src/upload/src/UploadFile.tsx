import { h, defineComponent, PropType, computed, inject } from 'vue'
import {
  CancelIcon,
  TrashIcon,
  AttachIcon,
  RetryIcon,
  DownloadIcon
} from '../../_internal/icons'
import { NButton } from '../../button'
import { NIconSwitchTransition, NBaseIcon } from '../../_internal'
import { warn } from '../../_utils'
import NUploadProgress from './UploadProgress'
import { FileInfo, uploadInjectionKey } from './interface'

export default defineComponent({
  name: 'UploadFile',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    file: {
      type: Object as PropType<FileInfo>,
      required: true
    }
  },
  setup (props) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NUpload = inject(uploadInjectionKey)!
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
      if (!NUpload.showCancelButtonRef.value) return false
      const { file } = props
      return ['uploading', 'pending', 'error'].includes(file.status)
    })
    const showRemoveButtonRef = computed(() => {
      if (!NUpload.showRemoveButtonRef.value) return false
      const { file } = props
      return ['finished'].includes(file.status)
    })
    const showDownloadButtonRef = computed(() => {
      if (!NUpload.showDownloadButtonRef.value) return false
      const { file } = props
      return ['finished'].includes(file.status)
    })
    const showRetryButtonRef = computed(() => {
      if (!NUpload.showRetryButtonRef.value) return false
      const { file } = props
      return ['error'].includes(file.status)
    })
    function handleRetryClick (): void {
      NUpload.submit(props.file.id)
    }
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
      const {
        XhrMap,
        doChange,
        onRemoveRef: { value: onRemove },
        mergedFileListRef: { value: mergedFileList }
      } = NUpload
      void Promise.resolve(
        onRemove
          ? onRemove({
            file: Object.assign({}, file),
            fileList: mergedFileList
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
      const {
        onDownloadRef: { value: onDownload }
      } = NUpload
      void Promise.resolve(
        onDownload ? onDownload(Object.assign({}, file)) : true
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
      mergedTheme: NUpload.mergedThemeRef,
      progressStatus: progressStatusRef,
      buttonType: buttonTypeRef,
      showProgress: showProgressRef,
      showCancelButton: showCancelButtonRef,
      showRemoveButton: showRemoveButtonRef,
      showDownloadButton: showDownloadButtonRef,
      showRetryButton: showRetryButtonRef,
      handleRemoveOrCancelClick,
      handleDownloadClick,
      handleRetryClick
    }
  },
  render () {
    const { clsPrefix, mergedTheme } = this
    return (
      <a
        ref="noopener noreferer"
        target="_blank"
        href={this.file.url || undefined}
        class={[
          `${clsPrefix}-upload-file`,
          `${clsPrefix}-upload-file--${this.progressStatus}-status`,
          this.file.url && `${clsPrefix}-upload-file--with-url`
        ]}
      >
        <div class={`${clsPrefix}-upload-file-info`}>
          <div class={`${clsPrefix}-upload-file-info__name`}>
            <NBaseIcon clsPrefix={clsPrefix}>
              {{ default: () => <AttachIcon /> }}
            </NBaseIcon>
            {this.file.name}
          </div>
          <div class={`${clsPrefix}-upload-file-info__action`}>
            {this.showRemoveButton || this.showCancelButton ? (
              <NButton
                key="cancelOrTrash"
                theme={mergedTheme.peers.Button}
                themeOverrides={mergedTheme.peerOverrides.Button}
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
                            <NBaseIcon clsPrefix={clsPrefix} key="trash">
                              {{ default: () => <TrashIcon /> }}
                            </NBaseIcon>
                          ) : (
                            <NBaseIcon clsPrefix={clsPrefix} key="cancel">
                              {{ default: () => <CancelIcon /> }}
                            </NBaseIcon>
                          )
                      }}
                    </NIconSwitchTransition>
                  )
                }}
              </NButton>
            ) : null}
            {this.showRetryButton ? (
              <NButton
                key="retry"
                text
                type={this.buttonType}
                onClick={this.handleRetryClick}
                theme={mergedTheme.peers.Button}
                themeOverrides={mergedTheme.peerOverrides.Button}
              >
                {{
                  icon: () => (
                    <NBaseIcon clsPrefix={clsPrefix}>
                      {{ default: () => <RetryIcon /> }}
                    </NBaseIcon>
                  )
                }}
              </NButton>
            ) : null}
            {this.showDownloadButton ? (
              <NButton
                key="download"
                text
                type={this.buttonType}
                onClick={this.handleDownloadClick}
                theme={mergedTheme.peers.Button}
                themeOverrides={mergedTheme.peerOverrides.Button}
              >
                {{
                  icon: () => (
                    <NBaseIcon clsPrefix={clsPrefix}>
                      {{ default: () => <DownloadIcon /> }}
                    </NBaseIcon>
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
