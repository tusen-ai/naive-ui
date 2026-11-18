import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NUploadImpl from './src/Upload'
import NUploadDraggerImpl from './src/UploadDragger'
import NUploadFileListImpl from './src/UploadFileList'
import NUploadTriggerImpl from './src/UploadTrigger'

export { publicDownload as uploadDownload } from '../_utils/dom/download'
export type * from './src/public-types'
export { uploadProps } from './src/Upload'
export type { UploadTriggerSlots } from './src/UploadTrigger'

export const NUpload: WithNativeAttrs<typeof NUploadImpl, HTMLAttributes>
  = NUploadImpl
export const NUploadDragger: WithNativeAttrs<
  typeof NUploadDraggerImpl,
  HTMLAttributes
> = NUploadDraggerImpl
export const NUploadFileList: WithNativeAttrs<
  typeof NUploadFileListImpl,
  HTMLAttributes
> = NUploadFileListImpl
export const NUploadTrigger: WithNativeAttrs<
  typeof NUploadTriggerImpl,
  HTMLAttributes
> = NUploadTriggerImpl
