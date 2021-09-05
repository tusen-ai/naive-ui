import {
  defineComponent,
  h,
  inject,
  ref,
  PropType,
  toRef,
  mergeProps
} from 'vue'
import NImagePreview from './ImagePreview'
import type { ImagePreviewInst } from './ImagePreview'
import { imageGroupInjectionKey } from './ImageGroup'
import { ExtractPublicPropTypes } from '../../_utils'
import { useConfig } from '../../_mixins'

interface imgProps {
  alt?: string
  crossorigin?: 'anonymous' | 'use-credentials' | ''
  decoding?: 'async' | 'auto' | 'sync'
  height?: number
  sizes?: string
  src?: string
  srcset?: string
  usemap?: string
  width?: number
}
export interface ImageInst {
  click: () => void
}

const imageProps = {
  alt: String,
  height: [String, Number] as PropType<string | number>,
  imgProps: Object as PropType<imgProps>,
  objectFit: {
    type: String as PropType<
    'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
    >,
    default: 'fill'
  },
  previewSrc: String,
  width: [String, Number] as PropType<string | number>,
  src: String,
  showToolbar: { type: Boolean, default: true },
  onError: Function as PropType<(e: Event) => void>
}

export type ImageProps = ExtractPublicPropTypes<typeof imageProps>

export default defineComponent({
  name: 'Image',
  props: imageProps,
  inheritAttrs: false,
  setup (props) {
    const imageRef = ref<HTMLImageElement | null>(null)
    const imgPropsRef = toRef(props, 'imgProps')
    const previewInstRef = ref<ImagePreviewInst | null>(null)
    const imageGroupHandle = inject(imageGroupInjectionKey, null)
    const { mergedClsPrefixRef } = imageGroupHandle || useConfig(props)
    const exposedMethods = {
      click: () => {
        const mergedPreviewSrc = props.previewSrc || props.src
        if (imageGroupHandle) {
          imageGroupHandle.setPreviewSrc(mergedPreviewSrc)
          imageGroupHandle.setThumbnailEl(imageRef.value)
          imageGroupHandle.toggleShow()
          return
        }
        const { value: previewInst } = previewInstRef
        if (!previewInst) return
        previewInst.setPreviewSrc(mergedPreviewSrc)
        previewInst.setThumbnailEl(imageRef.value)
        previewInst.toggleShow()
      }
    }
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      groupId: imageGroupHandle?.groupId,
      previewInstRef,
      imageRef,
      imgProps: imgPropsRef,
      ...exposedMethods
    }
  },
  render () {
    const { mergedClsPrefix, imgProps = {} } = this

    const imgWrapperNode = h(
      'div',
      mergeProps(this.$attrs, {
        role: 'none',
        class: `${mergedClsPrefix}-image`
      }),
      <img
        {...imgProps}
        class={this.groupId}
        ref="imageRef"
        width={this.width || imgProps.width}
        height={this.height || imgProps.height}
        src={this.src || imgProps.src}
        alt={this.alt || imgProps.alt}
        aria-label={this.alt || imgProps.alt}
        onClick={this.click}
        onError={this.onError}
        style={{ objectFit: this.objectFit }}
        data-preview-src={this.previewSrc || this.src}
      />
    )

    return this.groupId ? (
      imgWrapperNode
    ) : (
      <NImagePreview
        clsPrefix={mergedClsPrefix}
        ref="previewInstRef"
        showToolbar={this.showToolbar}
      >
        {{
          default: () => imgWrapperNode
        }}
      </NImagePreview>
    )
  }
})
