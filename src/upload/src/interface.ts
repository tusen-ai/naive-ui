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

export interface UploadInst {
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
  readonly mergedTheme: MergedTheme<UploadTheme>
  draggerInside: boolean
  showCancelButton: boolean
  showRemoveButton: boolean
  showDownloadButton: boolean
  mergedFileList: FileInfo[]
  XhrMap: Map<string, XMLHttpRequest>
  doChange: DoChange
  onRemove?: OnRemove
  onDownload?: OnDownload
}

export interface XhrHandlers {
  handleXHRLoad: (e: ProgressEvent) => void
  handleXHRAbort: (e: ProgressEvent) => void
  handleXHRProgress: (e: ProgressEvent) => void
  handleXHRError: (e: ProgressEvent) => void
}

export interface UploadRef {
  submit: () => void
}
