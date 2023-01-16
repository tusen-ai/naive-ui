import { Ref, CSSProperties, VNodeChild } from 'vue'
import { ImageGroupProps } from '../../image'
import type { MergedTheme } from '../../_mixins'
import { createInjectionKey } from '../../_utils'
import type { UploadTheme } from '../styles'

export interface FileInfo {
  id: string
  name: string
  batchId?: string | null
  percentage?: number | null
  status: 'pending' | 'uploading' | 'finished' | 'removed' | 'error'
  url?: string | null
  file?: File | null
  thumbnailUrl?: string | null
  type?: string | null
  fullPath?: string | null
}

export type SettledFileInfo = Required<FileInfo>

export type ShouldUseThumbnailUrl = (file: SettledFileInfo) => boolean

export type FuncOrRecordOrUndef =
  | Record<string, string>
  | (({ file }: { file: SettledFileInfo }) => Record<string, string>)
  | undefined

export type OnChange = (data: {
  file: SettledFileInfo
  fileList: SettledFileInfo[]
  event: ProgressEvent | Event | undefined
}) => void

export type OnFinish = ({
  file,
  event
}: {
  file: SettledFileInfo
  event?: ProgressEvent
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
}) => FileInfo | undefined | void

export type OnRemove = (data: {
  file: SettledFileInfo
  fileList: SettledFileInfo[]
}) => Promise<boolean> | boolean | any

export type OnDownload = (
  file: SettledFileInfo
) => Promise<boolean> | boolean | any

export interface UploadInternalInst {
  doChange: DoChange
  xhrMap: Map<string, XMLHttpRequest>
  isErrorState: ((xhr: XMLHttpRequest) => boolean) | undefined
  onError: OnError | undefined
  onFinish: OnFinish | undefined
}

export type DoChange = (
  fileAfterChange: SettledFileInfo,
  event?: ProgressEvent | Event,
  options?: {
    append?: boolean
    remove?: boolean
  }
) => void

export type OnUpdateFileList = (fileList: SettledFileInfo[]) => void

export type RenderIcon = (file: SettledFileInfo) => VNodeChild

export interface UploadInjection {
  mergedClsPrefixRef: Ref<string>
  mergedThemeRef: Ref<MergedTheme<UploadTheme>>
  showCancelButtonRef: Ref<boolean>
  showRemoveButtonRef: Ref<boolean>
  showDownloadButtonRef: Ref<boolean>
  showRetryButtonRef: Ref<boolean>
  showTriggerRef: Ref<boolean>
  mergedFileListRef: Ref<SettledFileInfo[]>
  onRemoveRef: Ref<OnRemove | undefined>
  onDownloadRef: Ref<OnDownload | undefined>
  xhrMap: Map<string, XMLHttpRequest>
  showPreviewButtonRef: Ref<boolean>
  onPreviewRef: Ref<OnPreview | undefined>
  listTypeRef: Ref<ListType>
  dragOverRef: Ref<boolean>
  draggerInsideRef: { value: boolean }
  fileListStyleRef: Ref<string | CSSProperties | undefined>
  mergedDisabledRef: Ref<boolean>
  maxReachedRef: Ref<boolean>
  abstractRef: Ref<boolean>
  imageGroupPropsRef: Ref<ImageGroupProps | undefined>
  cssVarsRef: undefined | Ref<CSSProperties>
  themeClassRef: undefined | Ref<string>
  mergedDirectoryDndRef: Ref<boolean>
  acceptRef: Ref<string | undefined>
  triggerStyleRef: Ref<CSSProperties | string | undefined>
  doChange: DoChange
  onRender: undefined | (() => void)
  submit: (fileId?: string) => void
  shouldUseThumbnailUrlRef: Ref<ShouldUseThumbnailUrl>
  getFileThumbnailUrlResolver: (
    file: SettledFileInfo
  ) => Promise<string> | string
  renderIconRef: Ref<RenderIcon | undefined>
  handleFileAddition: (files: FileAndEntry[] | null, e?: Event) => void
  openOpenFileDialog: () => void
}

export const uploadInjectionKey =
  createInjectionKey<UploadInjection>('n-upload')

export interface XhrHandlers {
  handleXHRLoad: (e: ProgressEvent) => void
  handleXHRAbort: (e: ProgressEvent) => void
  handleXHRProgress: (e: ProgressEvent) => void
  handleXHRError: (e: ProgressEvent) => void
}

export interface UploadInst {
  openOpenFileDialog: () => void
  submit: () => void
  clear: () => void
}

export type OnBeforeUpload = (data: {
  file: SettledFileInfo
  fileList: SettledFileInfo[]
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
}) => Promise<boolean | void> | boolean | void

export type ListType = 'text' | 'image' | 'image-card'

export type OnPreview = (file: SettledFileInfo) => void

export type CreateThumbnailUrl = (
  file: File | null,
  fileInfo: SettledFileInfo
) => Promise<string> | string | undefined

export interface CustomRequestOptions {
  file: SettledFileInfo
  action?: string
  withCredentials?: boolean
  data?: FuncOrRecordOrUndef
  headers?: FuncOrRecordOrUndef
  onProgress: (e: { percent: number }) => void
  onFinish: () => void
  onError: () => void
}

export type CustomRequest = (options: CustomRequestOptions) => void

export type OnError = ({
  file,
  event
}: {
  file: SettledFileInfo
  event?: ProgressEvent
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
}) => FileInfo | undefined | void

export interface FileAndEntry {
  file: File
  entry: FileSystemFileEntry | null
  source: 'dnd' | 'input'
}
