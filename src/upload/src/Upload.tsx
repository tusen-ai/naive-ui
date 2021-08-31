import {
  h,
  defineComponent,
  computed,
  provide,
  toRef,
  ref,
  PropType,
  CSSProperties
} from 'vue'
import { createId } from 'seemly'
import { useConfig, useTheme, useFormItem } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import {
  ExtractPublicPropTypes,
  getFirstSlotVNode,
  warn,
  MaybeArray,
  call
} from '../../_utils'
import { NFadeInExpandTransition } from '../../_internal'
import { uploadLight, UploadTheme } from '../styles'
import NUploadFile from './UploadFile'
import style from './styles/index.cssr'
import {
  XhrHandlers,
  FileInfo,
  DoChange,
  UploadInternalInst,
  FuncOrRecordOrUndef,
  OnFinish,
  OnRemove,
  OnDownload,
  OnChange,
  uploadInjectionKey,
  OnUpdateFileList,
  OnBeforeUpload,
  listType,
  OnPreview,
  CreateThumbnailUrl
} from './interface'
import { useMergedState } from 'vooks'
import { uploadDraggerKey } from './UploadDragger'
import { NImageGroup } from '../../image'

/**
 * fils status ['pending', 'uploading', 'finished', 'removed', 'error']
 */
function createXhrHandlers (
  inst: UploadInternalInst,
  file: FileInfo,
  XHR: XMLHttpRequest
): XhrHandlers {
  const { doChange, XhrMap } = inst
  let percentage = 0
  return {
    handleXHRLoad (e) {
      let fileAfterChange: FileInfo = Object.assign({}, file, {
        status: 'finished',
        percentage,
        file: null
      })
      XhrMap.delete(file.id)
      fileAfterChange =
        inst.onFinish?.({ file: fileAfterChange, event: e }) || fileAfterChange
      doChange(fileAfterChange, e)
    },
    handleXHRAbort (e) {
      const fileAfterChange: FileInfo = Object.assign({}, file, {
        status: 'removed',
        file: null,
        percentage
      })
      XhrMap.delete(file.id)
      doChange(fileAfterChange, e)
    },
    handleXHRError (e) {
      const fileAfterChange: FileInfo = Object.assign({}, file, {
        status: 'error',
        percentage,
        file: null
      })
      XhrMap.delete(file.id)
      doChange(fileAfterChange, e)
    },
    handleXHRProgress (e) {
      const fileAfterChange: FileInfo = Object.assign({}, file, {
        status: 'uploading'
      })
      if (e.lengthComputable) {
        const progress = Math.ceil((e.loaded / e.total) * 100)
        fileAfterChange.percentage = progress
        percentage = progress
      }
      doChange(fileAfterChange, e)
    }
  }
}

function registerHandler (
  inst: UploadInternalInst,
  file: FileInfo,
  request: XMLHttpRequest
): void {
  const handlers = createXhrHandlers(inst, file, request)
  request.onabort = handlers.handleXHRAbort
  request.onerror = handlers.handleXHRError
  request.onload = handlers.handleXHRLoad
  if (request.upload) {
    request.upload.onprogress = handlers.handleXHRProgress
  }
}

function unwrapFunctionValue (
  data: FuncOrRecordOrUndef,
  file: FileInfo
): Record<string, string> {
  if (typeof data === 'function') {
    return data({ file })
  }
  if (data) return data
  return {}
}

function setHeaders (
  request: XMLHttpRequest,
  headers: FuncOrRecordOrUndef,
  file: FileInfo
): void {
  const headersObject = unwrapFunctionValue(headers, file)
  if (!headersObject) return
  Object.keys(headersObject).forEach((key) => {
    request.setRequestHeader(key, headersObject[key])
  })
}

function appendData (
  formData: FormData,
  data: FuncOrRecordOrUndef,
  file: FileInfo
): void {
  const dataObject = unwrapFunctionValue(data, file)
  if (!dataObject) return
  Object.keys(dataObject).forEach((key) => {
    formData.append(key, dataObject[key])
  })
}

function submitImpl (
  inst: UploadInternalInst,
  file: FileInfo,
  formData: FormData,
  {
    method,
    action,
    withCredentials,
    headers,
    data
  }: {
    method: string
    action?: string
    withCredentials: boolean
    headers: FuncOrRecordOrUndef
    data: FuncOrRecordOrUndef
  }
): void {
  const request = new XMLHttpRequest()
  inst.XhrMap.set(file.id, request)
  request.withCredentials = withCredentials
  appendData(formData, data, file)
  registerHandler(inst, file, request)
  if (action !== undefined) {
    request.open(method.toUpperCase(), action)
    setHeaders(request, headers, file)
    request.send(formData)
    const fileAfterChange = Object.assign({}, file, {
      status: 'uploading'
    })
    inst.doChange(fileAfterChange)
  }
}

const uploadProps = {
  ...(useTheme.props as ThemeProps<UploadTheme>),
  name: {
    type: String,
    default: 'file'
  },
  accept: String,
  action: String,
  // to be impl
  // directory: {
  //   type: Boolean,
  //   default: false
  // },
  method: {
    type: String,
    default: 'POST'
  },
  multiple: Boolean,
  showFileList: {
    type: Boolean,
    default: true
  },
  data: [Object, Function] as PropType<FuncOrRecordOrUndef>,
  headers: [Object, Function] as PropType<FuncOrRecordOrUndef>,
  withCredentials: Boolean,
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  onChange: Function as PropType<OnChange>,
  onRemove: Function as PropType<OnRemove>,
  onFinish: Function as PropType<OnFinish>,
  onBeforeUpload: Function as PropType<OnBeforeUpload>,
  /** currently of no usage */
  onDownload: Function as PropType<OnDownload>,
  defaultUpload: {
    type: Boolean,
    default: true
  },
  fileList: Array as PropType<FileInfo[]>,
  'onUpdate:fileList': [Function, Array] as PropType<
  MaybeArray<OnUpdateFileList>
  >,
  onUpdateFileList: [Function, Array] as PropType<MaybeArray<OnUpdateFileList>>,
  fileListStyle: [String, Object] as PropType<string | CSSProperties>,
  defaultFileList: {
    type: Array as PropType<FileInfo[]>,
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
  },
  showRetryButton: {
    type: Boolean,
    default: true
  },
  showPreivewButton: {
    type: Boolean,
    default: true
  },
  listType: {
    type: String as PropType<listType>,
    default: 'text'
  },
  onPreview: Function as PropType<OnPreview>,
  createThumbnailUrl: Function as PropType<CreateThumbnailUrl>
} as const

const isImageFileType = (type: string): boolean => type.includes('image/')

const extname = (url: string = ''): string => {
  const temp = url.split('/')
  const filename = temp[temp.length - 1]
  const filenameWithoutSuffix = filename.split(/#|\?/)[0]
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0]
}

const isImageUrl = (file: FileInfo): boolean => {
  if (file.type && !file.thumbnailUrl) {
    return isImageFileType(file.type)
  }
  const url: string = file.thumbnailUrl || file.url || ''
  const extension = extname(url)
  if (
    /^data:image\//.test(url) ||
    /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico)$/i.test(extension)
  ) {
    return true
  }
  if (/^data:/.test(url)) {
    return false
  }
  if (extension) {
    return false
  }

  return true
}

export type UploadProps = ExtractPublicPropTypes<typeof uploadProps>

export default defineComponent({
  name: 'Upload',
  props: uploadProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Upload',
      'Upload',
      style,
      uploadLight,
      props,
      mergedClsPrefixRef
    )
    const formItem = useFormItem(props)
    const { mergedDisabledRef } = formItem
    const uncontrolledFileListRef = ref(props.defaultFileList)
    const controlledFileListRef = toRef(props, 'fileList')
    const inputElRef = ref<HTMLInputElement | null>(null)
    const draggerInsideRef = {
      value: false
    }
    const dragOverRef = ref(false)
    const XhrMap = new Map<string, XMLHttpRequest>()
    const mergedFileListRef = useMergedState(
      controlledFileListRef,
      uncontrolledFileListRef
    )
    function openFileDialog (): void {
      inputElRef.value?.click()
    }
    function handleTriggerClick (): void {
      if (mergedDisabledRef.value) return
      openFileDialog()
    }
    function handleTriggerDragOver (e: DragEvent): void {
      e.preventDefault()
      dragOverRef.value = true
    }
    function handleTriggerDragEnter (e: DragEvent): void {
      e.preventDefault()
      dragOverRef.value = true
    }
    function handleTriggerDragLeave (e: DragEvent): void {
      e.preventDefault()
      dragOverRef.value = false
    }
    function handleTriggerDrop (e: DragEvent): void {
      e.preventDefault()
      if (!draggerInsideRef.value || mergedDisabledRef.value) return
      const dataTransfer = e.dataTransfer
      const files = dataTransfer?.files
      if (files) {
        handleFileAddition(files)
      }
      dragOverRef.value = false
    }
    function handleFileInputChange (e: Event): void {
      const target = e.target as HTMLInputElement
      handleFileAddition(target.files, e)
      // May have bug! set to null?
      target.value = ''
    }
    function doUpdateFileList (files: FileInfo[]): void {
      const { 'onUpdate:fileList': _onUpdateFileList, onUpdateFileList } = props
      if (_onUpdateFileList) call(_onUpdateFileList, files)
      if (onUpdateFileList) call(onUpdateFileList, files)
      uncontrolledFileListRef.value = files
    }
    function handleFileAddition (files: FileList | null, e?: Event): void {
      if (!files || files.length === 0) return
      const { onBeforeUpload } = props
      const filesAsArray = props.multiple ? Array.from(files) : [files[0]]
      void Promise.all(
        filesAsArray.map(async (file) => {
          const fileInfo: FileInfo = {
            id: createId(),
            name: file.name,
            status: 'pending',
            percentage: 0,
            file: file,
            url: null,
            type: file.type
          }
          if (
            !onBeforeUpload ||
            (await onBeforeUpload({
              file: fileInfo,
              fileList: mergedFileListRef.value
            })) !== false
          ) {
            doChange(fileInfo, e, {
              append: true
            })
          }
        })
      ).then(() => {
        if (props.defaultUpload) {
          submit()
        }
      })
    }
    function submit (fileId?: string): void {
      const {
        method,
        action,
        withCredentials,
        headers,
        data,
        name: fieldName
      } = props
      const filesToUpload =
        fileId !== undefined
          ? mergedFileListRef.value.filter((file) => file.id === fileId)
          : mergedFileListRef.value
      filesToUpload.forEach((file) => {
        const { status } = file
        if (status === 'pending' || status === 'error') {
          const formData = new FormData()
          formData.append(fieldName, file.file as File)
          submitImpl(
            {
              doChange,
              XhrMap,
              onFinish: props.onFinish
            },
            file,
            formData,
            {
              method,
              action,
              withCredentials,
              headers,
              data
            }
          )
        }
      })
    }
    const doChange: DoChange = (
      fileAfterChange,
      event,
      options = {
        append: false,
        remove: false
      }
    ) => {
      const { append, remove } = options
      const fileListAfterChange = Array.from(mergedFileListRef.value)
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
        const { onChange } = props
        if (onChange) {
          onChange({
            file: fileAfterChange,
            fileList: fileListAfterChange,
            event
          })
        }
        doUpdateFileList(fileListAfterChange)
      } else if (__DEV__) {
        warn('upload', 'File has no corresponding id in current file list.')
      }
    }
    async function getFileThumbnail (file: FileInfo): Promise<string> {
      const { createThumbnailUrl } = props

      return createThumbnailUrl
        ? await createThumbnailUrl(file.file as File)
        : await previewImage(file.file as File)
    }

    async function previewImage (file: File): Promise<string> {
      return await new Promise((resolve) => {
        if (!file.type || !isImageFileType(file.type)) {
          resolve('')
          return
        }

        const img = new Image()
        img.onload = () => {
          const { width, height } = img
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          canvas.width = width
          canvas.height = height
          canvas.style.cssText = `position: fixed; left: 0; top: 0; width: ${width}px; height: ${height}px; z-index: 9999; display: none;`
          document.body.appendChild(canvas)

          ctx?.drawImage(img, 0, 0, width, height)
          const dataURL = canvas.toDataURL()
          document.body.removeChild(canvas)

          resolve(dataURL)
        }
        img.src = window.URL.createObjectURL(file)
      })
    }

    provide(uploadInjectionKey, {
      mergedClsPrefixRef,
      mergedThemeRef: themeRef,
      disabledRef: mergedDisabledRef,
      showCancelButtonRef: toRef(props, 'showCancelButton'),
      showDownloadButtonRef: toRef(props, 'showDownloadButton'),
      showRemoveButtonRef: toRef(props, 'showRemoveButton'),
      showRetryButtonRef: toRef(props, 'showRetryButton'),
      onRemoveRef: toRef(props, 'onRemove'),
      onDownloadRef: toRef(props, 'onDownload'),
      mergedFileListRef: mergedFileListRef,
      XhrMap,
      submit,
      doChange,
      isImageUrl,
      showPreivewButtonRef: toRef(props, 'showPreivewButton'),
      onPreviewRef: toRef(props, 'onPreview'),
      getFileThumbnail
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      draggerInsideRef,
      inputElRef,
      mergedFileList: mergedFileListRef,
      mergedDisabled: mergedDisabledRef,
      mergedTheme: themeRef,
      dragOver: dragOverRef,
      handleTriggerDrop,
      handleTriggerDragLeave,
      handleTriggerDragEnter,
      handleTriggerDragOver,
      handleTriggerClick,
      handleFileInputChange,
      submit,
      openFileDialog,
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
            fontSize,
            itemIconErrorColor
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
          '--line-height': lineHeight,
          '--item-icon-error-color': itemIconErrorColor
        }
      })
    }
  },
  render () {
    const { draggerInsideRef, mergedClsPrefix, $slots } = this
    if ($slots.default) {
      const firstChild = getFirstSlotVNode($slots, 'default')
      // @ts-expect-error
      if (firstChild?.type?.[uploadDraggerKey]) {
        draggerInsideRef.value = true
      }
    }
    const uploadTrigger = (
      <div
        class={[
          `${mergedClsPrefix}-upload__trigger`,
          this.listType === 'picture-card' &&
            `${mergedClsPrefix}-upload__trigger--picture-card`
        ]}
        onClick={this.handleTriggerClick}
        onDrop={this.handleTriggerDrop}
        onDragover={this.handleTriggerDragOver}
        onDragenter={this.handleTriggerDragEnter}
        onDragleave={this.handleTriggerDragLeave}
      >
        {this.$slots}
      </div>
    )
    const uploadFileList = (
      <NFadeInExpandTransition group>
        {{
          default: () =>
            this.mergedFileList.map((file) => (
              <NUploadFile
                clsPrefix={mergedClsPrefix}
                key={file.id}
                file={file}
                listType={this.listType}
              />
            ))
        }}
      </NFadeInExpandTransition>
    )

    return (
      <div
        class={[
          `${mergedClsPrefix}-upload`,
          {
            [`${mergedClsPrefix}-upload--dragger-inside`]:
              draggerInsideRef.value,
            [`${mergedClsPrefix}-upload--drag-over`]: this.dragOver,
            [`${mergedClsPrefix}-upload--disabled`]: this.mergedDisabled
          }
        ]}
        style={this.cssVars as CSSProperties}
      >
        <input
          ref="inputElRef"
          type="file"
          class={`${mergedClsPrefix}-upload__file-input`}
          accept={this.accept}
          multiple={this.multiple}
          onChange={this.handleFileInputChange}
        />
        {this.listType !== 'picture-card' && uploadTrigger}
        {this.showFileList && (
          <div
            class={`${mergedClsPrefix}-upload-file-list`}
            style={this.fileListStyle}
          >
            {this.listType === 'picture-card' ? (
              <NImageGroup>
                {{
                  default: () => uploadFileList
                }}
              </NImageGroup>          
            ) : (
              uploadFileList
            )}
            {this.listType === 'picture-card' && uploadTrigger}
          </div>
        )}
      </div>
    )
  }
})
