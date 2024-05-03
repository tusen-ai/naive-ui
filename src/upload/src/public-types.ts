import type { FuncOrRecordOrUndef } from './interface'

export type { UploadProps } from './Upload'

export interface UploadInst {
  openOpenFileDialog: () => void
  submit: () => void
  clear: () => void
}

export interface UploadFileInfo {
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

export interface UploadCustomRequestOptions {
  file: UploadSettledFileInfo
  action?: string
  withCredentials?: boolean
  data?: FuncOrRecordOrUndef<string | Blob>
  headers?: FuncOrRecordOrUndef
  onProgress: (e: { percent: number }) => void
  onFinish: () => void
  onError: () => void
}

export type UploadSettledFileInfo = Required<UploadFileInfo>

export type UploadOnChange = (data: {
  file: UploadSettledFileInfo
  fileList: UploadSettledFileInfo[]
  event: ProgressEvent | Event | undefined
}) => void

export type UploadOnFinish = ({
  file,
  event
}: {
  file: UploadSettledFileInfo
  event?: ProgressEvent
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
}) => UploadFileInfo | undefined | void

export type UploadOnRemove = (data: {
  file: UploadSettledFileInfo
  fileList: UploadSettledFileInfo[]
  index: number
}) => Promise<boolean> | boolean | any

export type UploadOnDownload = (
  file: UploadSettledFileInfo
) => Promise<boolean> | boolean | any
