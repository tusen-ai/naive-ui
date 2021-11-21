import {
  h,
  defineComponent,
  PropType,
  computed,
  inject,
  ref,
  watchEffect,
  VNode
} from 'vue'
import {
  CancelIcon,
  TrashIcon,
  AttachIcon,
  RetryIcon,
  DownloadIcon,
  EyeIcon
} from '../../_internal/icons'
import { NButton } from '../../button'
import { NIconSwitchTransition, NBaseIcon } from '../../_internal'
import { warn } from '../../_utils'
import NUploadProgress from './UploadProgress'
import { FileInfo, listType, uploadInjectionKey } from './interface'
import { imageIcon, documentIcon } from './icons'
import { environmentSupportFile, isImageFile } from './utils'
import { NImage } from '../../image'
import { ImageInst } from '../../image/src/Image'

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
    },
    listType: {
      type: String as PropType<listType>,
      required: true
    }
  },
  setup (props) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NUpload = inject(uploadInjectionKey)!

    const imageRef = ref<ImageInst | null>(null)
    const thumbnailUrlRef = ref<string>('')

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
    const showPreviewButtonRef = computed(() => {
      if (!NUpload.showPreviewButtonRef.value) return false
      const {
        file: { status, url },
        listType
      } = props
      return (
        ['finished'].includes(status) &&
        (url || thumbnailUrlRef.value) &&
        listType === 'image-card'
      )
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
    function handlePreviewClick (): void {
      const {
        onPreviewRef: { value: onPreview }
      } = NUpload

      if (onPreview) {
        onPreview(props.file)
      } else if (props.listType === 'image-card') {
        const { value } = imageRef
        if (!value) return
        value.click()
      }
    }

    const deriveFileThumbnailUrl = async (): Promise<void> => {
      const { listType } = props
      if (listType !== 'image' && listType !== 'image-card') {
        return
      }
      if (!environmentSupportFile || !(props.file.file instanceof File)) {
        return
      }
      thumbnailUrlRef.value = await NUpload.getFileThumbnailUrl(props.file)
    }

    watchEffect(() => {
      void deriveFileThumbnailUrl()
    })

    return {
      mergedTheme: NUpload.mergedThemeRef,
      progressStatus: progressStatusRef,
      buttonType: buttonTypeRef,
      showProgress: showProgressRef,
      disabled: NUpload.mergedDisabledRef,
      showCancelButton: showCancelButtonRef,
      showRemoveButton: showRemoveButtonRef,
      showDownloadButton: showDownloadButtonRef,
      showRetryButton: showRetryButtonRef,
      showPreviewButton: showPreviewButtonRef,
      thumbnailUrl: thumbnailUrlRef,
      imageRef,
      handleRemoveOrCancelClick,
      handleDownloadClick,
      handleRetryClick,
      handlePreviewClick
    }
  },
  render () {
    const { clsPrefix, mergedTheme, listType, file } = this

    // if there is text list type, show file icon
    let icon: VNode

    const isImageType = listType === 'image'
    const isImageCardType = listType === 'image-card'

    if (isImageType || isImageCardType) {
      icon = !isImageFile(file) ? (
        <span class={`${clsPrefix}-upload-file-info__thumbnail`}>
          <NBaseIcon clsPrefix={clsPrefix}>
            {{ default: () => documentIcon }}
          </NBaseIcon>
        </span>
      ) : (file.url || this.thumbnailUrl) && file.status !== 'error' ? (
        <a
          rel="noopener noreferer"
          target="_blank"
          href={file.url || undefined}
          class={`${clsPrefix}-upload-file-info__thumbnail`}
          onClick={this.handlePreviewClick}
        >
          {listType === 'image-card' ? (
            <NImage
              src={this.thumbnailUrl || file.thumbnailUrl || file.url || undefined}
              previewSrc={file.url || undefined}
              alt={file.name}
              ref="imageRef"
            />
          ) : (
            <img
              src={this.thumbnailUrl || file.thumbnailUrl || file.url || undefined}
              alt={file.name}
            />
          )}
        </a>
      ) : (
        <span class={`${clsPrefix}-upload-file-info__thumbnail`}>
          <NBaseIcon clsPrefix={clsPrefix}>
            {{ default: () => imageIcon }}
          </NBaseIcon>
        </span>
      )
    } else {
      icon = (
        <span class={`${clsPrefix}-upload-file-info__thumbnail`}>
          <NBaseIcon clsPrefix={clsPrefix}>
            {{ default: () => <AttachIcon /> }}
          </NBaseIcon>
        </span>
      )
    }

    const progress = (
      <NUploadProgress
        show={this.showProgress}
        percentage={file.percentage || 0}
        status={this.progressStatus}
      />
    )

    const showName = listType === 'text' || listType === 'image'

    return (
      <div
        class={[
          `${clsPrefix}-upload-file`,
          `${clsPrefix}-upload-file--${this.progressStatus}-status`,
          file.url &&
            file.status !== 'error' &&
            listType !== 'image-card' &&
            `${clsPrefix}-upload-file--with-url`,
          `${clsPrefix}-upload-file--${listType}-type`
        ]}
      >
        <div class={`${clsPrefix}-upload-file-info`}>
          {icon}
          <div class={`${clsPrefix}-upload-file-info__name`}>
            {showName &&
              (file.url && file.status !== 'error' ? (
                <a
                  rel="noopener noreferer"
                  target="_blank"
                  href={file.url || undefined}
                  onClick={this.handlePreviewClick}
                >
                  {file.name}
                </a>
              ) : (
                <span onClick={this.handlePreviewClick}>{file.name}</span>
              ))}
            {isImageType && progress}
          </div>
          <div
            class={[
              `${clsPrefix}-upload-file-info__action`,
              `${clsPrefix}-upload-file-info__action--${listType}-type`
            ]}
          >
            {this.showPreviewButton ? (
              <NButton
                key="preview"
                text
                type={this.buttonType}
                onClick={this.handlePreviewClick}
                theme={mergedTheme.peers.Button}
                themeOverrides={mergedTheme.peerOverrides.Button}
              >
                {{
                  icon: () => (
                    <NBaseIcon clsPrefix={clsPrefix}>
                      {{ default: () => <EyeIcon /> }}
                    </NBaseIcon>
                  )
                }}
              </NButton>
            ) : null}
            {(this.showRemoveButton || this.showCancelButton) &&
              !this.disabled && (
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
            )}
            {this.showRetryButton && !this.disabled && (
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
            )}
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
        {!isImageType && progress}
      </div>
    )
  }
})
