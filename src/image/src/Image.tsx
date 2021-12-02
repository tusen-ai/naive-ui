import {
  defineComponent,
  h,
  inject,
  ref,
  PropType,
  toRef,
  renderSlot,
  mergeProps,
  computed,
  CSSProperties
} from 'vue'
import NImagePreview from './ImagePreview'
import type { ImagePreviewInst } from './ImagePreview'
import { imageGroupInjectionKey } from './ImageGroup'
import { call, ExtractPublicPropTypes } from '../../_utils'
import { useConfig, useTheme } from '../../_mixins'
import { NSpin } from '../../spin'
import { errorIcon } from './icons'
import { NIcon } from '../../icon'
import { imageLight } from '../styles'
import style from './styles/index.cssr'

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
  canPreview: { type: Boolean, default: true },
  loadDescription: String,
  onError: Function as PropType<(e: Event) => void>,
  onLoad: Function as PropType<(e: Event) => void>
}

export type ImageProps = ExtractPublicPropTypes<typeof imageProps>

export default defineComponent({
  name: 'Image',
  props: imageProps,
  inheritAttrs: false,
  setup (props) {
    const imageRef = ref<HTMLImageElement | null>(null)
    const showLoadIng = ref<boolean>(true)
    const showErrorBox = ref<boolean>(false)
    const themeRef = useTheme('Image', 'Image', style, imageLight, {})
    const imgPropsRef = toRef(props, 'imgProps')
    const previewInstRef = ref<ImagePreviewInst | null>(null)
    const imageGroupHandle = inject(imageGroupInjectionKey, null)
    const { mergedClsPrefixRef } = imageGroupHandle || useConfig(props)
    const exposedMethods = {
      click: () => {
        if (!props.canPreview) return
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
      },
      error: (e: Event) => {
        showLoadIng.value = false
        showErrorBox.value = true
        const { onError } = props
        if (onError) {
          call(onError, e)
        }
      },
      load: (e: Event) => {
        showLoadIng.value = false
        showErrorBox.value = false
        const { onLoad } = props
        if (onLoad) {
          call(onLoad, e)
        }
      }
    }
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      groupId: imageGroupHandle?.groupId,
      previewInstRef,
      imageRef,
      imgProps: imgPropsRef,
      showLoadIng,
      showErrorBox,
      ...exposedMethods,
      cssVars: computed(() => {
        const {
          self: {
            errorBackgroundColor,
            loadBackgroundColor,
            errorDefaultFilter
          }
        } = themeRef.value
        return {
          '--error-background-color': errorBackgroundColor,
          '--load-background-color': loadBackgroundColor,
          '--error-default-filter': errorDefaultFilter
        }
      })
    }
  },
  render () {
    const { $slots, mergedClsPrefix, imgProps = {} } = this

    const imgWrapperNode = h(
      'div',
      mergeProps(this.$attrs, {
        role: 'none',
        class: `${mergedClsPrefix}-image`,
        style: this.cssVars as CSSProperties
      }),
      [
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
          onError={this.error}
          onLoad={this.load}
          style={{ objectFit: this.objectFit }}
          data-preview-src={this.previewSrc || this.src}
        />,
        this.showLoadIng && (this.src || imgProps.src) && (
          <div class={`${mergedClsPrefix}-image-load-box`}>
            {$slots.loading ? (
              renderSlot($slots, 'loading')
            ) : (
              <NSpin size="medium"></NSpin>
            )}
          </div>
        ),
        this.showErrorBox && (
          <div class={`${mergedClsPrefix}-image-error-box`}>
            {$slots.errorbox ? (
              renderSlot($slots, 'errorbox')
            ) : (
              <NIcon
                size="80"
                class={`${mergedClsPrefix}-image-error-default-icon`}
              >
                {{ default: () => errorIcon }}
              </NIcon>
            )}
          </div>
        )
      ]
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
