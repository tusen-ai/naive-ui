import {
  defineComponent,
  h,
  inject,
  ref,
  PropType,
  toRef,
  watchEffect,
  ImgHTMLAttributes,
  onMounted,
  onBeforeUnmount,
  watchPostEffect
} from 'vue'
import NImagePreview from './ImagePreview'
import type { ImagePreviewInst } from './ImagePreview'
import { imageGroupInjectionKey } from './ImageGroup'
import type { ExtractPublicPropTypes } from '../../_utils'
import { useConfig } from '../../_mixins'
import { imagePreviewSharedProps } from './interface'
import { imgObserverHandler, imgUnobserverHandler } from './utils'

export interface ImageInst {
  click: () => void
}

const imageProps = {
  alt: String,
  height: [String, Number] as PropType<string | number>,
  imgProps: Object as PropType<ImgHTMLAttributes>,
  lazy: Boolean,
  lazyOptions: Object as PropType<{
    root: string
  }>,
  objectFit: {
    type: String as PropType<
    'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
    >,
    default: 'fill'
  },
  previewSrc: String,
  fallbackSrc: String,
  width: [String, Number] as PropType<string | number>,
  src: String,
  previewDisabled: Boolean,
  loadDescription: String,
  onError: Function as PropType<(e: Event) => void>,
  onLoad: Function as PropType<(e: Event) => void>,
  ...imagePreviewSharedProps
}

export type ImageProps = ExtractPublicPropTypes<typeof imageProps>

export default defineComponent({
  name: 'Image',
  props: imageProps,
  inheritAttrs: false,
  setup (props) {
    const imageRef = ref<HTMLImageElement | null>(null)
    const showErrorRef = ref(false)
    const imgPropsRef = toRef(props, 'imgProps')
    const previewInstRef = ref<ImagePreviewInst | null>(null)
    const imageGroupHandle = inject(imageGroupInjectionKey, null)
    const { mergedClsPrefixRef } = imageGroupHandle || useConfig(props)
    const exposedMethods = {
      click: () => {
        if (props.previewDisabled || showErrorRef.value) return
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
    onMounted(() => {
      imageRef.value?.setAttribute(
        'data-group-id',
        imageGroupHandle?.groupId || ''
      )
    })

    watchPostEffect(() => {
      if (props.lazy) {
        imgObserverHandler(imageRef.value, props.lazyOptions?.root)
      } else {
        imgUnobserverHandler(imageRef.value)
      }
    })

    onBeforeUnmount(() => {
      if (props.lazy) {
        imgUnobserverHandler(imageRef.value)
      }
    })

    watchEffect(() => {
      void props.src
      void props.imgProps?.src
      showErrorRef.value = false
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      groupId: imageGroupHandle?.groupId,
      previewInstRef,
      imageRef,
      imgProps: imgPropsRef,
      showError: showErrorRef,
      mergedOnError: (e: Event) => {
        showErrorRef.value = true
        const { onError, imgProps: { onError: imgPropsOnError } = {} } = props
        onError?.(e)
        imgPropsOnError?.(e)
      },
      mergedOnLoad: (e: Event) => {
        const { onLoad, imgProps: { onLoad: imgPropsOnLoad } = {} } = props
        onLoad?.(e)
        imgPropsOnLoad?.(e)
      },
      ...exposedMethods
    }
  },
  render () {
    const { mergedClsPrefix, imgProps = {}, $attrs } = this
    const imgNode = (
      <img
        {...imgProps}
        class={imgProps.class}
        ref="imageRef"
        width={this.width || imgProps.width}
        height={this.height || imgProps.height}
        src={
          this.showError
            ? this.fallbackSrc
            : this.lazy
              ? undefined
              : this.src || imgProps.src
        }
        alt={this.alt || imgProps.alt}
        aria-label={this.alt || imgProps.alt}
        onClick={this.click}
        onError={this.mergedOnError}
        onLoad={this.mergedOnLoad}
        style={[imgProps.style || '', { objectFit: this.objectFit }]}
        data-error={this.showError}
        data-preview-src={this.previewSrc || this.src}
        data-src={this.src || imgProps.src}
      />
    )

    return (
      <div
        {...$attrs}
        role="none"
        class={[
          $attrs.class,
          `${mergedClsPrefix}-image`,
          (this.previewDisabled || this.showError) &&
            `${mergedClsPrefix}-image--preview-disabled`
        ]}
      >
        {this.groupId ? (
          imgNode
        ) : (
          <NImagePreview
            theme={this.theme}
            themeOverrides={this.themeOverrides}
            clsPrefix={mergedClsPrefix}
            ref="previewInstRef"
            showToolbar={this.showToolbar}
            showToolbarTooltip={this.showToolbarTooltip}
          >
            {{
              default: () => imgNode
            }}
          </NImagePreview>
        )}
      </div>
    )
  }
})
