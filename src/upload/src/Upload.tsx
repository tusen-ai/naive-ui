import {
  h,
  defineComponent,
  computed,
  provide,
  toRef,
  ref,
  PropType,
  CSSProperties,
  Fragment,
  Teleport,
  nextTick
} from 'vue'
import { createId } from 'seemly'
import { useMergedState } from 'vooks'
import { useConfig, useTheme, useFormItem } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import {
  ExtractPublicPropTypes,
  warn,
  MaybeArray,
  call,
  throwError
} from '../../_utils'
import { uploadLight, UploadTheme } from '../styles'
import { uploadDraggerKey } from './UploadDragger'
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
import { createImageDataUrl } from './utils'
import NUploadTrigger from './UploadTrigger'
import NUploadFileList from './UploadFileList'
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
  showPreviewButton: {
    type: Boolean,
    default: true
  },
  listType: {
    type: String as PropType<listType>,
    default: 'text'
  },
  onPreview: Function as PropType<OnPreview>,
  createThumbnailUrl: Function as PropType<CreateThumbnailUrl>,
  abstract: Boolean
} as const

export type UploadProps = ExtractPublicPropTypes<typeof uploadProps>

export default defineComponent({
  name: 'Upload',
  props: uploadProps,
  setup (props) {
    if (props.abstract && props.listType === 'image-card') {
      throwError(
        'upload',
        'when the list-type is image-card, abstract is not supported.'
      )
    }
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
            type: file.type,
            thumbnailUrl: null
          }
          if (
            !onBeforeUpload ||
            (await onBeforeUpload({
              file: fileInfo,
              fileList: mergedFileListRef.value
            })) !== false
          ) {
            return fileInfo
          }
          return null
        })
      )
        .then(async (fileInfos) => {
          let nextTickChain = Promise.resolve()

          fileInfos.forEach((fileInfo) => {
            nextTickChain = nextTickChain.then(nextTick as any).then(() => {
              fileInfo &&
                doChange(fileInfo, e, {
                  append: true
                })
            })
          })
          return await nextTickChain
        })
        .then(() => {
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
      const shouldReupload = fileId !== undefined
      filesToUpload.forEach((file) => {
        const { status } = file
        if (status === 'pending' || (status === 'error' && shouldReupload)) {
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
    async function getFileThumbnailUrl (file: FileInfo): Promise<string> {
      const { createThumbnailUrl } = props

      return createThumbnailUrl
        ? await createThumbnailUrl(file.file as File)
        : await createImageDataUrl(file.file as File)
    }
    const cssVarsRef = computed(() => {
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
          itemBorderImageCardError,
          itemBorderImageCard
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
        '--item-border-image-card-error': itemBorderImageCardError,
        '--item-border-image-card': itemBorderImageCard
      } as any
    })

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
      showPreviewButtonRef: toRef(props, 'showPreviewButton'),
      onPreviewRef: toRef(props, 'onPreview'),
      getFileThumbnailUrl,
      listTypeRef: toRef(props, 'listType'),
      dragOverRef,
      openFileDialog,
      draggerInsideRef,
      handleFileAddition,
      mergedDisabledRef,
      fileListStyleRef: toRef(props, 'fileListStyle'),
      abstractRef: toRef(props, 'abstract'),
      cssVarsRef
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      draggerInsideRef,
      inputElRef,
      mergedTheme: themeRef,
      dragOver: dragOverRef,
      handleFileInputChange,
      submit,
      cssVars: cssVarsRef
    }
  },
  render () {
    const { draggerInsideRef, mergedClsPrefix, $slots } = this

    if ($slots.default && !this.abstract) {
      const firstChild = $slots.default()[0]
      if ((firstChild as any)?.type?.[uploadDraggerKey]) {
        draggerInsideRef.value = true
      }
    }

    const inputNode = (
      <input
        ref="inputElRef"
        type="file"
        class={`${mergedClsPrefix}-upload-file-input`}
        accept={this.accept}
        multiple={this.multiple}
        onChange={this.handleFileInputChange}
      />
    )

    return this.abstract ? (
      <>
        {$slots.default?.()}
        <Teleport to="body">{inputNode}</Teleport>
      </>
    ) : (
      <div
        class={[
          `${mergedClsPrefix}-upload`,
          draggerInsideRef.value && `${mergedClsPrefix}-upload--dragger-inside`,
          this.dragOver && `${mergedClsPrefix}-upload--drag-over`
        ]}
        style={this.cssVars as CSSProperties}
      >
        {inputNode}
        {this.listType !== 'image-card' && (
          <NUploadTrigger>{$slots}</NUploadTrigger>
        )}
        {this.showFileList && <NUploadFileList>{$slots}</NUploadFileList>}
      </div>
    )
  }
})
