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
  nextTick,
  InputHTMLAttributes
} from 'vue'
import { createId } from 'seemly'
import { useMergedState } from 'vooks'
import { useConfig, useTheme, useFormItem, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import { warn, call, throwError } from '../../_utils'
import type { ImageGroupProps } from '../../image'
import { uploadLight, UploadTheme } from '../styles'
import { uploadDraggerKey } from './UploadDragger'
import type {
  XhrHandlers,
  FileInfo,
  DoChange,
  UploadInst,
  UploadInternalInst,
  FuncOrRecordOrUndef,
  OnFinish,
  OnRemove,
  OnDownload,
  OnChange,
  OnUpdateFileList,
  OnBeforeUpload,
  ListType,
  OnPreview,
  CreateThumbnailUrl,
  CustomRequest,
  OnError,
  SettledFileInfo,
  FileAndEntry,
  ShouldUseThumbnailUrl,
  RenderIcon
} from './interface'
import { uploadInjectionKey } from './interface'
import {
  createImageDataUrl,
  createSettledFileInfo,
  environmentSupportFile,
  isImageFile,
  matchType
} from './utils'
import NUploadTrigger from './UploadTrigger'
import NUploadFileList from './UploadFileList'
import style from './styles/index.cssr'

/**
 * fils status ['pending', 'uploading', 'finished', 'removed', 'error']
 */
function createXhrHandlers (
  inst: UploadInternalInst,
  file: SettledFileInfo,
  xhr: XMLHttpRequest
): XhrHandlers {
  const { doChange, xhrMap } = inst
  let percentage = 0
  function handleXHRError (e: ProgressEvent<EventTarget>): void {
    let fileAfterChange: SettledFileInfo = Object.assign({}, file, {
      status: 'error',
      percentage
    })
    xhrMap.delete(file.id)
    fileAfterChange = createSettledFileInfo(
      inst.onError?.({ file: fileAfterChange, event: e }) || fileAfterChange
    )
    doChange(fileAfterChange, e)
  }
  function handleXHRLoad (e: ProgressEvent<EventTarget>): void {
    if (inst.isErrorState) {
      if (inst.isErrorState(xhr)) {
        handleXHRError(e)
        return
      }
    } else {
      if (xhr.status < 200 || xhr.status >= 300) {
        handleXHRError(e)
        return
      }
    }

    let fileAfterChange: SettledFileInfo = Object.assign({}, file, {
      status: 'finished',
      percentage,
      file: null
    })
    xhrMap.delete(file.id)
    fileAfterChange = createSettledFileInfo(
      inst.onFinish?.({ file: fileAfterChange, event: e }) || fileAfterChange
    )
    doChange(fileAfterChange, e)
  }
  return {
    handleXHRLoad,
    handleXHRError,
    handleXHRAbort (e) {
      const fileAfterChange: SettledFileInfo = Object.assign({}, file, {
        status: 'removed',
        file: null,
        percentage
      })

      xhrMap.delete(file.id)
      doChange(fileAfterChange, e)
    },
    handleXHRProgress (e) {
      const fileAfterChange: SettledFileInfo = Object.assign({}, file, {
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

function customSubmitImpl (options: {
  inst: Omit<UploadInternalInst, 'isErrorState'>
  data?: FuncOrRecordOrUndef
  headers?: FuncOrRecordOrUndef
  action?: string
  withCredentials?: boolean
  file: SettledFileInfo
  customRequest: CustomRequest
}): void {
  const { inst, file, data, headers, withCredentials, action, customRequest } =
    options
  const { doChange } = options.inst
  let percentage = 0
  customRequest({
    file,
    data,
    headers,
    withCredentials,
    action,
    onProgress (event) {
      const fileAfterChange: SettledFileInfo = Object.assign({}, file, {
        status: 'uploading'
      })
      const progress = event.percent
      fileAfterChange.percentage = progress
      percentage = progress
      doChange(fileAfterChange)
    },
    onFinish () {
      let fileAfterChange: SettledFileInfo = Object.assign({}, file, {
        status: 'finished',
        percentage,
        file: null
      })
      fileAfterChange = createSettledFileInfo(
        inst.onFinish?.({ file: fileAfterChange }) || fileAfterChange
      )
      doChange(fileAfterChange)
    },
    onError () {
      let fileAfterChange: SettledFileInfo = Object.assign({}, file, {
        status: 'error',
        percentage
      })
      fileAfterChange = createSettledFileInfo(
        inst.onError?.({ file: fileAfterChange }) || fileAfterChange
      )
      doChange(fileAfterChange)
    }
  })
}

function registerHandler (
  inst: UploadInternalInst,
  file: SettledFileInfo,
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
  file: SettledFileInfo
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
  file: SettledFileInfo
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
  file: SettledFileInfo
): void {
  const dataObject = unwrapFunctionValue(data, file)
  if (!dataObject) return
  Object.keys(dataObject).forEach((key) => {
    formData.append(key, dataObject[key])
  })
}

function submitImpl (
  inst: UploadInternalInst,
  fieldName: string,
  file: SettledFileInfo,
  {
    method,
    action,
    withCredentials,
    responseType,
    headers,
    data
  }: {
    method: string
    action?: string
    withCredentials: boolean
    responseType: XMLHttpRequestResponseType
    headers: FuncOrRecordOrUndef
    data: FuncOrRecordOrUndef
  }
): void {
  const request = new XMLHttpRequest()
  request.responseType = responseType
  inst.xhrMap.set(file.id, request)
  request.withCredentials = withCredentials
  const formData = new FormData()
  appendData(formData, data, file)
  formData.append(fieldName, file.file as File)
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

export const uploadProps = {
  ...(useTheme.props as ThemeProps<UploadTheme>),
  name: {
    type: String,
    default: 'file'
  },
  accept: String,
  action: String,
  customRequest: Function as PropType<CustomRequest>,
  directory: Boolean,
  directoryDnd: { type: Boolean, default: undefined },
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
  responseType: {
    type: String as PropType<XMLHttpRequestResponseType>,
    default: ''
  },
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  onChange: Function as PropType<OnChange>,
  onRemove: Function as PropType<OnRemove>,
  onFinish: Function as PropType<OnFinish>,
  onError: Function as PropType<OnError>,
  onBeforeUpload: Function as PropType<OnBeforeUpload>,
  isErrorState: Function as PropType<(xhr: XMLHttpRequest) => boolean>,
  /** currently not used */
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
  showDownloadButton: Boolean,
  showRetryButton: {
    type: Boolean,
    default: true
  },
  showPreviewButton: {
    type: Boolean,
    default: true
  },
  listType: {
    type: String as PropType<ListType>,
    default: 'text'
  },
  onPreview: Function as PropType<OnPreview>,
  shouldUseThumbnailUrl: {
    type: Function as PropType<ShouldUseThumbnailUrl>,
    default: (file: SettledFileInfo) => {
      if (!environmentSupportFile) return false
      return isImageFile(file)
    }
  },
  createThumbnailUrl: Function as PropType<CreateThumbnailUrl>,
  abstract: Boolean,
  max: Number,
  showTrigger: {
    type: Boolean,
    default: true
  },
  imageGroupProps: Object as PropType<ImageGroupProps>,
  inputProps: Object as PropType<InputHTMLAttributes>,
  triggerStyle: [String, Object] as PropType<CSSProperties | string>,
  renderIcon: Object as PropType<RenderIcon>
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
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Upload',
      '-upload',
      style,
      uploadLight,
      props,
      mergedClsPrefixRef
    )
    const formItem = useFormItem(props)
    const maxReachedRef = computed(() => {
      const { max } = props
      if (max !== undefined) {
        return mergedFileListRef.value.length >= max
      }
      return false
    })
    const uncontrolledFileListRef = ref(props.defaultFileList)
    const controlledFileListRef = toRef(props, 'fileList')
    const inputElRef = ref<HTMLInputElement | null>(null)
    const draggerInsideRef = {
      value: false
    }
    const dragOverRef = ref(false)
    const xhrMap = new Map<string, XMLHttpRequest>()
    const _mergedFileListRef = useMergedState(
      controlledFileListRef,
      uncontrolledFileListRef
    )
    const mergedFileListRef = computed(() =>
      _mergedFileListRef.value.map(createSettledFileInfo)
    )
    function openOpenFileDialog (): void {
      inputElRef.value?.click()
    }
    function handleFileInputChange (e: Event): void {
      const target = e.target as HTMLInputElement
      handleFileAddition(
        target.files
          ? Array.from(target.files).map((file) => ({
            file,
            entry: null,
            source: 'input'
          }))
          : null,
        e
      )
      // May have bug! set to null?
      target.value = ''
    }
    function doUpdateFileList (files: SettledFileInfo[]): void {
      const { 'onUpdate:fileList': _onUpdateFileList, onUpdateFileList } = props
      if (_onUpdateFileList) call(_onUpdateFileList, files)
      if (onUpdateFileList) call(onUpdateFileList, files)
      uncontrolledFileListRef.value = files
    }
    const mergedMultipleRef = computed(() => props.multiple || props.directory)
    function handleFileAddition (
      fileAndEntries: FileAndEntry[] | null,
      e?: Event
    ): void {
      if (!fileAndEntries || fileAndEntries.length === 0) return
      const { onBeforeUpload } = props
      fileAndEntries = mergedMultipleRef.value
        ? fileAndEntries
        : [fileAndEntries[0]]
      const { max, accept } = props
      fileAndEntries = fileAndEntries.filter(({ file, source }) => {
        if (source === 'dnd' && accept?.trim()) {
          return matchType(file.name, file.type, accept)
        } else {
          return true
        }
      })
      if (max) {
        fileAndEntries = fileAndEntries.slice(
          0,
          max - mergedFileListRef.value.length
        )
      }

      const batchId = createId()

      void Promise.all(
        fileAndEntries.map(async ({ file, entry }) => {
          const fileInfo: SettledFileInfo = {
            id: createId(),
            batchId,
            name: file.name,
            status: 'pending',
            percentage: 0,
            file,
            url: null,
            type: file.type,
            thumbnailUrl: null,
            fullPath:
              entry?.fullPath ?? `/${file.webkitRelativePath || file.name}`
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
          if (props.customRequest) {
            customSubmitImpl({
              inst: {
                doChange,
                xhrMap,
                onFinish: props.onFinish,
                onError: props.onError
              },
              file,
              action,
              withCredentials,
              headers,
              data,
              customRequest: props.customRequest
            })
          } else {
            submitImpl(
              {
                doChange,
                xhrMap,
                onFinish: props.onFinish,
                onError: props.onError,
                isErrorState: props.isErrorState
              },
              fieldName,
              file,
              {
                method,
                action,
                withCredentials,
                responseType: props.responseType,
                headers,
                data
              }
            )
          }
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
    function getFileThumbnailUrlResolver (
      file: SettledFileInfo
    ): Promise<string> | string {
      if (file.thumbnailUrl) return file.thumbnailUrl
      const { createThumbnailUrl } = props
      if (createThumbnailUrl) {
        return createThumbnailUrl(file.file, file) ?? (file.url || '')
      }
      if (file.url) {
        return file.url
      } else if (file.file) {
        return createImageDataUrl(file.file)
      }
      return ''
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
        '--n-bezier': cubicBezierEaseInOut,
        '--n-border-radius': borderRadius,
        '--n-dragger-border': draggerBorder,
        '--n-dragger-border-hover': draggerBorderHover,
        '--n-dragger-color': draggerColor,
        '--n-font-size': fontSize,
        '--n-item-color-hover': itemColorHover,
        '--n-item-color-hover-error': itemColorHoverError,
        '--n-item-disabled-opacity': itemDisabledOpacity,
        '--n-item-icon-color': itemIconColor,
        '--n-item-text-color': itemTextColor,
        '--n-item-text-color-error': itemTextColorError,
        '--n-item-text-color-success': itemTextColorSuccess,
        '--n-line-height': lineHeight,
        '--n-item-border-image-card-error': itemBorderImageCardError,
        '--n-item-border-image-card': itemBorderImageCard
      } as any
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('upload', undefined, cssVarsRef, props)
      : undefined
    provide(uploadInjectionKey, {
      mergedClsPrefixRef,
      mergedThemeRef: themeRef,
      showCancelButtonRef: toRef(props, 'showCancelButton'),
      showDownloadButtonRef: toRef(props, 'showDownloadButton'),
      showRemoveButtonRef: toRef(props, 'showRemoveButton'),
      showRetryButtonRef: toRef(props, 'showRetryButton'),
      onRemoveRef: toRef(props, 'onRemove'),
      onDownloadRef: toRef(props, 'onDownload'),
      mergedFileListRef,
      triggerStyleRef: toRef(props, 'triggerStyle'),
      shouldUseThumbnailUrlRef: toRef(props, 'shouldUseThumbnailUrl'),
      renderIconRef: toRef(props, 'renderIcon'),
      xhrMap,
      submit,
      doChange,
      showPreviewButtonRef: toRef(props, 'showPreviewButton'),
      onPreviewRef: toRef(props, 'onPreview'),
      getFileThumbnailUrlResolver,
      listTypeRef: toRef(props, 'listType'),
      dragOverRef,
      openOpenFileDialog,
      draggerInsideRef,
      handleFileAddition,
      mergedDisabledRef: formItem.mergedDisabledRef,
      maxReachedRef,
      fileListStyleRef: toRef(props, 'fileListStyle'),
      abstractRef: toRef(props, 'abstract'),
      acceptRef: toRef(props, 'accept'),
      cssVarsRef: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClassRef: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      showTriggerRef: toRef(props, 'showTrigger'),
      imageGroupPropsRef: toRef(props, 'imageGroupProps'),
      mergedDirectoryDndRef: computed(() => {
        return props.directoryDnd ?? props.directory
      })
    })

    const exposedMethods: UploadInst = {
      clear: () => {
        uncontrolledFileListRef.value = []
      },
      submit,
      openOpenFileDialog
    }

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      draggerInsideRef,
      inputElRef,
      mergedTheme: themeRef,
      dragOver: dragOverRef,
      mergedMultiple: mergedMultipleRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      handleFileInputChange,
      ...exposedMethods
    }
  },
  render () {
    const { draggerInsideRef, mergedClsPrefix, $slots, directory, onRender } =
      this
    if ($slots.default && !this.abstract) {
      const firstChild = $slots.default()[0]
      if ((firstChild as any)?.type?.[uploadDraggerKey]) {
        draggerInsideRef.value = true
      }
    }

    const inputNode = (
      <input
        {...this.inputProps}
        ref="inputElRef"
        type="file"
        class={`${mergedClsPrefix}-upload-file-input`}
        accept={this.accept}
        multiple={this.mergedMultiple}
        onChange={this.handleFileInputChange}
        // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
        // @ts-ignore // seems vue-tsc will add the prop, so we can't use expect-error
        webkitdirectory={directory || undefined}
        directory={directory || undefined}
      />
    )

    if (this.abstract) {
      return (
        <>
          {$slots.default?.()}
          <Teleport to="body">{inputNode}</Teleport>
        </>
      )
    }

    onRender?.()
    return (
      <div
        class={[
          `${mergedClsPrefix}-upload`,
          draggerInsideRef.value && `${mergedClsPrefix}-upload--dragger-inside`,
          this.dragOver && `${mergedClsPrefix}-upload--drag-over`,
          this.themeClass
        ]}
        style={this.cssVars as any}
      >
        {inputNode}
        {this.showTrigger && this.listType !== 'image-card' && (
          <NUploadTrigger>{$slots}</NUploadTrigger>
        )}
        {this.showFileList && <NUploadFileList>{$slots}</NUploadFileList>}
      </div>
    )
  }
})
