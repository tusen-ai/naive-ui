import { Ref, InjectionKey } from 'vue'
import type { MergedTheme } from '../../_mixins'
import type { UploadTheme } from '../styles'

export interface FileInfo {
  id: string
  name: string
  url: string | null
  percentage: number
  status: 'pending' | 'uploading' | 'finished' | 'removed' | 'error'
  file: File | null
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
export type OnFinish = ({ file }: { file: FileInfo }) => FileInfo | undefined
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

export interface UploadInjection {
  mergedClsPrefixRef: Ref<string>
  mergedThemeRef: Ref<MergedTheme<UploadTheme>>
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
