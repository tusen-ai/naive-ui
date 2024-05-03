import { type Ref, type CSSProperties, type VNodeChild } from 'vue'
import { type ImageGroupProps } from '../../image'
import type { MergedTheme } from '../../_mixins'
import { createInjectionKey } from '../../_utils'
import type { UploadTheme } from '../styles'
import type {
  UploadCustomRequestOptions,
  UploadFileInfo,
  UploadOnDownload,
  UploadOnFinish,
  UploadOnRemove,
  UploadSettledFileInfo
} from './public-types'

export type ShouldUseThumbnailUrl = (file: UploadSettledFileInfo) => boolean

export type FuncOrRecordOrUndef<T = string> =
  | Record<string, T>
  | (({ file }: { file: UploadSettledFileInfo }) => Record<string, T>)
  | undefined

export interface UploadInternalInst {
  doChange: DoChange
  xhrMap: Map<string, XMLHttpRequest>
  isErrorState: ((xhr: XMLHttpRequest) => boolean) | undefined
  onError: OnError | undefined
  onFinish: UploadOnFinish | undefined
}

export type DoChange = (
  fileAfterChange: UploadSettledFileInfo,
  event?: ProgressEvent | Event,
  options?: {
    append?: boolean
    remove?: boolean
  }
) => void

export type OnUpdateFileList = (fileList: UploadSettledFileInfo[]) => void

export type RenderIcon = (file: UploadSettledFileInfo) => VNodeChild

export interface UploadInjection {
  mergedClsPrefixRef: Ref<string>
  mergedThemeRef: Ref<MergedTheme<UploadTheme>>
  showCancelButtonRef: Ref<boolean>
  showRemoveButtonRef: Ref<boolean>
  showDownloadButtonRef: Ref<boolean>
  showRetryButtonRef: Ref<boolean>
  showTriggerRef: Ref<boolean>
  mergedFileListRef: Ref<UploadSettledFileInfo[]>
  onRemoveRef: Ref<UploadOnRemove | undefined>
  onDownloadRef: Ref<UploadOnDownload | undefined>
  xhrMap: Map<string, XMLHttpRequest>
  showPreviewButtonRef: Ref<boolean>
  onPreviewRef: Ref<OnPreview | undefined>
  listTypeRef: Ref<ListType>
  dragOverRef: Ref<boolean>
  draggerInsideRef: { value: boolean }
  fileListClassRef: Ref<string | undefined>
  fileListStyleRef: Ref<string | CSSProperties | undefined>
  mergedDisabledRef: Ref<boolean>
  maxReachedRef: Ref<boolean>
  abstractRef: Ref<boolean>
  imageGroupPropsRef: Ref<ImageGroupProps | undefined>
  cssVarsRef: undefined | Ref<CSSProperties>
  themeClassRef: undefined | Ref<string>
  mergedDirectoryDndRef: Ref<boolean>
  acceptRef: Ref<string | undefined>
  triggerClassRef: Ref<string | undefined>
  triggerStyleRef: Ref<CSSProperties | string | undefined>
  doChange: DoChange
  onRender: undefined | (() => void)
  submit: (fileId?: string) => void
  shouldUseThumbnailUrlRef: Ref<ShouldUseThumbnailUrl>
  getFileThumbnailUrlResolver: (
    file: UploadSettledFileInfo
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

export type OnBeforeUpload = (data: {
  file: UploadSettledFileInfo
  fileList: UploadSettledFileInfo[]
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
}) => Promise<boolean | void> | boolean | void

export type ListType = 'text' | 'image' | 'image-card'

export type OnPreview = (file: UploadSettledFileInfo) => void

export type CreateThumbnailUrl = (
  file: File | null,
  fileInfo: UploadSettledFileInfo
) => Promise<string> | string | undefined

export type CustomRequest = (options: UploadCustomRequestOptions) => void

export type OnError = ({
  file,
  event
}: {
  file: UploadSettledFileInfo
  event?: ProgressEvent
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
}) => UploadFileInfo | undefined | void

export interface FileAndEntry {
  file: File
  entry: FileSystemFileEntry | null
  source: 'dnd' | 'input'
}
