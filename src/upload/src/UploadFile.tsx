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
  FileIcon,
  PhotoIcon,
  EyeIcon
} from '../../_internal/icons'
import { NButton } from '../../button'
import { NIconSwitchTransition, NBaseIcon, NBaseLoading } from '../../_internal'
import { warn } from '../../_utils'
import NUploadProgress from './UploadProgress'
import { FileInfo, listType, uploadInjectionKey } from './interface'
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
      default: 'text'
    }
  },
  setup (props) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NUpload = inject(uploadInjectionKey)!

    const imageRef = ref<ImageInst | null>(null)
    const thumbnailUrl = ref<string>('')

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
    const showPreivewButtonRef = computed(() => {
      if (!NUpload.showPreivewButtonRef.value) return false
      const {
        file: { status, url },
        listType
      } = props
      return (
        ['finished'].includes(status) &&
        (url || thumbnailUrl.value) &&
        listType === 'picture-card'
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
    function isImageUrl (file: FileInfo): boolean {
      return NUpload.isImageUrl(file)
    }
    function handlePreviewClick (e: MouseEvent): void {
      const {
        onPreviewRef: { value: onPreview }
      } = NUpload

      if (onPreview) {
        e.preventDefault()
        onPreview(props.file)
      } else if (props.listType === 'picture-card') {
        const { value } = imageRef
        if (!value) return
        value.handleClick()
      }
    }

    const getFileThumbnail = async (): Promise<void> => {
      if (props.listType !== 'picture' && props.listType !== 'picture-card') {
        return
      }

      if (
        typeof document === 'undefined' ||
        typeof window === 'undefined' ||
        !window.FileReader ||
        !window.File ||
        !(props.file.file instanceof File)
      ) {
        return
      }

      thumbnailUrl.value = await NUpload.getFileThumbnail(props.file)
    }

    watchEffect(() => {
      void getFileThumbnail()
    })

    return {
      mergedTheme: NUpload.mergedThemeRef,
      progressStatus: progressStatusRef,
      buttonType: buttonTypeRef,
      showProgress: showProgressRef,
      disabled: NUpload.disabledRef,
      showCancelButton: showCancelButtonRef,
      showRemoveButton: showRemoveButtonRef,
      showDownloadButton: showDownloadButtonRef,
      showRetryButton: showRetryButtonRef,
      handleRemoveOrCancelClick,
      handleDownloadClick,
      handleRetryClick,
      isImageUrl,
      showPreivewButton: showPreivewButtonRef,
      handlePreviewClick,
      thumbnailUrl,
      imageRef
    }
  },
  render () {
    const { clsPrefix, mergedTheme } = this

    const thumbnailNameClass = [`${clsPrefix}-upload-file-info-thumbnail__name`]
    const fileIcon = (icon: VNode): VNode => (
      <span class={`${clsPrefix}-upload-file-info-thumbnail__image`}>
        <NBaseIcon clsPrefix={clsPrefix}>{{ default: () => icon }}</NBaseIcon>
      </span>
    )
    // if there is text list type, show file icon
    let icon = (
      <NBaseIcon clsPrefix={clsPrefix}>
        {{ default: () => <AttachIcon /> }}
      </NBaseIcon>
    )

    if (this.listType === 'picture' || this.listType === 'picture-card') {
      if (this.file.status === 'uploading') {
        icon =
          this.listType === 'picture-card' ? (
            <span>Upload..</span>
          ) : (
            <NBaseLoading
              key="loading"
              clsPrefix={clsPrefix}
              class={`${clsPrefix}-upload-file-info-thumbnail__spin`}
              strokeWidth={20}
            />
          )
      } else {
        icon = !this.isImageUrl(this.file) ? (
          fileIcon(<FileIcon />)
        ) : (this.file.url || this.thumbnailUrl) &&
          this.file.status !== 'error' ? (
          <a
            rel="noopener noreferer"
            target="_blank"
            href={this.file.url || undefined}
            class={`${clsPrefix}-upload-file-info-thumbnail__image`}
            onClick={(e) => this.handlePreviewClick(e)}
          >
            {this.listType === 'picture-card' ? (
              <NImage
                src={this.thumbnailUrl || this.file.url || undefined}
                alt={this.file.name}
                ref="imageRef"
              ></NImage>
            ) : (
              <img
                src={this.thumbnailUrl || this.file.url || undefined}
                alt={this.file.name}
              />
            )}
          </a>
            ) : (
              fileIcon(<PhotoIcon />)
            )
      }
    }

    return (
      <div
        class={[
          `${clsPrefix}-upload-file`,
          `${clsPrefix}-upload-file--${this.progressStatus}-status`,
          this.file.url &&
            this.file.status !== 'error' &&
            this.listType !== 'picture-card' &&
            `${clsPrefix}-upload-file--with-url`,
          `${clsPrefix}-upload-file--${this.listType}-type`
        ]}
      >
        <div class={`${clsPrefix}-upload-file-info`}>
          <div
            class={
              this.listType === 'picture' || this.listType === 'picture-card'
                ? `${clsPrefix}-upload-file-info-thumbnail`
                : `${clsPrefix}-upload-file-info__name`
            }
          >
            {icon}
            {(this.listType !== 'picture' &&
              this.listType !== 'picture-card') ||
            (this.file.url && this.file.status !== 'error') ? (
              <a
                rel="noopener noreferer"
                target="_blank"
                href={this.file.url || undefined}
                class={[
                  ...thumbnailNameClass,
                  `${clsPrefix}-upload-file-info-thumbnail__hide`
                ]}
                onClick={(e) => this.handlePreviewClick(e)}
              >
                {this.file.name}
              </a>
                ) : (
              <span
                class={[
                  ...thumbnailNameClass,
                  (this.file.url ||
                    this.thumbnailUrl ||
                    this.file.status === 'uploading') &&
                    `${clsPrefix}-upload-file-info-thumbnail__hide`
                ]}
                onClick={(e) => this.handlePreviewClick(e)}
              >
                {this.file.name}
              </span>
                )}
          </div>
          <div
            class={[
              `${clsPrefix}-upload-file-info__action`,
              `${clsPrefix}-upload-file-info__action--${this.listType}-type`
            ]}
          >
            {this.showPreivewButton ? (
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
        <NUploadProgress
          show={this.showProgress}
          percentage={this.file.percentage || 0}
          status={this.progressStatus}
        />
      </div>
    )
  }
})
