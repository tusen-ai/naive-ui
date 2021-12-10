import { Ref, InjectionKey, CSSProperties } from 'vue'
import type { MergedTheme } from '../../_mixins'
import type { UploadTheme } from '../styles'

export interface FileInfo {
  id: string
  name: string
  percentage: number
  status: 'pending' | 'uploading' | 'finished' | 'removed' | 'error'
  url?: string | null
  file?: File | null
  thumbnailUrl?: string | null
  type?: string | null
}

export type FuncOrRecordOrUndef =
  | Record<string, string>
  | (({ file }: { file: FileInfo }) => Record<string, string>)
  | undefined

export type OnChange = (data: {
  file: FileInfo
  fileList: FileInfo[]
  event: ProgressEvent | Event | undefined
}) => void
export type OnFinish = ({
  file,
  event
}: {
  file: FileInfo
  event?: Event
}) => FileInfo | undefined
export type OnRemove = (data: {
  file: FileInfo
  fileList: FileInfo[]
}) => Promise<boolean> | boolean | any
export type OnDownload = (file: FileInfo) => Promise<boolean> | boolean | any

export interface UploadInternalInst {
  doChange: DoChange
  XhrMap: Map<string, XMLHttpRequest>
  onFinish?: OnFinish
}

export type DoChange = (
  fileAfterChange: FileInfo,
  event?: ProgressEvent | Event,
  options?: {
    append?: boolean
    remove?: boolean
  }
) => void

export type OnUpdateFileList = (fileList: FileInfo[]) => void

export interface UploadInjection {
  mergedClsPrefixRef: Ref<string>
  mergedThemeRef: Ref<MergedTheme<UploadTheme>>
  showCancelButtonRef: Ref<boolean>
  showRemoveButtonRef: Ref<boolean>
  showDownloadButtonRef: Ref<boolean>
  showRetryButtonRef: Ref<boolean>
  showTriggerRef: Ref<boolean>
  mergedFileListRef: Ref<FileInfo[]>
  onRemoveRef: Ref<OnRemove | undefined>
  onDownloadRef: Ref<OnDownload | undefined>
  XhrMap: Map<string, XMLHttpRequest>
  doChange: DoChange
  showPreviewButtonRef: Ref<boolean>
  onPreviewRef: Ref<OnPreview | undefined>
  listTypeRef: Ref<listType>
  dragOverRef: Ref<boolean>
  draggerInsideRef: { value: boolean }
  fileListStyleRef: Ref<string | CSSProperties | undefined>
  mergedDisabledRef: Ref<boolean>
  maxReachedRef: Ref<boolean>
  abstractRef: Ref<boolean>
  cssVarsRef: Ref<CSSProperties>
  submit: (fileId?: string) => void
  getFileThumbnailUrl: (file: FileInfo) => Promise<string>
  handleFileAddition: (files: FileList | null, e?: Event) => void
  openOpenFileDialog: () => void
}

export const uploadInjectionKey: InjectionKey<UploadInjection> =
  Symbol('upload')

export interface XhrHandlers {
  handleXHRLoad: (e: ProgressEvent) => void
  handleXHRAbort: (e: ProgressEvent) => void
  handleXHRProgress: (e: ProgressEvent) => void
  handleXHRError: (e: ProgressEvent) => void
}

export interface UploadInst {
  openOpenFileDialog: () => void
  submit: () => void
}

export type OnBeforeUpload = (data: {
  file: FileInfo
  fileList: FileInfo[]
}) => Promise<unknown>

export type listType = 'text' | 'image' | 'image-card'

export type OnPreview = (file: FileInfo) => void

export type CreateThumbnailUrl = (file: File) => Promise<string>

export interface CustomRequestOptions {
  file: FileInfo
  action?: string
  withCredentials?: boolean
  data?: FuncOrRecordOrUndef
  headers?: FuncOrRecordOrUndef
  onProgress: (e: { percent: number }) => void
  onFinish: () => void
  onError: () => void
}

export type CustomRequest = (options: CustomRequestOptions) => void
