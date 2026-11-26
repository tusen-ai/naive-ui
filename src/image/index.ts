import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NImageImpl from './src/Image'

export { imageProps } from './src/Image'
export type { ImageProps } from './src/Image'
export { imageGroupProps, default as NImageGroup } from './src/ImageGroup'
export type { ImageGroupProps } from './src/ImageGroup'
export { imagePreviewProps, default as NImagePreview } from './src/ImagePreview'
export type { ImagePreviewProps } from './src/ImagePreview'
export type * from './src/public-types'

export const NImage: WithNativeAttrs<
  typeof NImageImpl,
  Omit<HTMLAttributes, 'role'>
> = NImageImpl
