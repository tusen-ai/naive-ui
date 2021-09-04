import { Ref, InjectionKey } from 'vue'
import type { MergedTheme } from '../../_mixins'
import type { UploadTheme } from '../styles'

export interface FileInfo {
  id: string
  name: string
  url: string | null
  percentage: number
  status: 'pending' | 'uploading' | 'finished' | 'removed' | 'error'
  file: File | null | Blob
  thumbnailUrl?: string
  type?: string
}

export type UploadFile = Pick<
FileInfo,
'id' | 'name' | 'status' | 'percentage' | 'file'
>

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
  event: Event
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
  disabledRef: Ref<boolean>
  showCancelButtonRef: Ref<boolean>
  showRemoveButtonRef: Ref<boolean>
  showDownloadButtonRef: Ref<boolean>
  showRetryButtonRef: Ref<boolean>
  mergedFileListRef: Ref<FileInfo[]>
  onRemoveRef: Ref<OnRemove | undefined>
  onDownloadRef: Ref<OnDownload | undefined>
  XhrMap: Map<string, XMLHttpRequest>
  submit: (fileId?: string) => void
  doChange: DoChange
  isImageUrl: (file: FileInfo) => boolean
  showPreivewButtonRef: Ref<boolean>
  onPreviewRef: Ref<OnPreview | undefined>
  getFileThumbnail: (file: FileInfo) => Promise<string>
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
  submit: () => void
}

export type OnBeforeUpload = (data: {
  file: FileInfo
  fileList: FileInfo[]
}) => Promise<unknown>

export type listType = 'text' | 'picture' | 'picture-card'

export type OnPreview = (file: FileInfo) => void

export type CreateThumbnailUrl = (file: File) => Promise<string>
