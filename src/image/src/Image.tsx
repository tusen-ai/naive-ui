import {
  defineComponent,
  h,
  inject,
  ref,
  PropType,
  watchEffect,
  ImgHTMLAttributes,
  onMounted,
  onBeforeUnmount,
  provide,
  toRef
} from 'vue'
import { isImageSupportNativeLazy } from '../../_utils/env/is-native-lazy-load'
import type { ExtractPublicPropTypes } from '../../_utils'
import { useConfig } from '../../_mixins'
import { imageContextKey, imagePreviewSharedProps } from './interface'
import { observeIntersection } from './utils'
import type { IntersectionObserverOptions } from './utils'
import type { ImagePreviewInst } from './ImagePreview'
import { imageGroupInjectionKey } from './ImageGroup'
import NImagePreview from './ImagePreview'

export interface ImageInst {
  click: () => void
}

export const imageProps = {
  alt: String,
  height: [String, Number] as PropType<string | number>,
  imgProps: Object as PropType<ImgHTMLAttributes>,
  previewedImgProps: Object as PropType<ImgHTMLAttributes>,
  lazy: Boolean,
  intersectionObserverOptions: Object as PropType<IntersectionObserverOptions>,
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

    const shouldStartLoadingRef = ref(!props.lazy)

    onMounted(() => {
      imageRef.value?.setAttribute(
        'data-group-id',
        imageGroupHandle?.groupId || ''
      )
    })

    onMounted(() => {
      if (isImageSupportNativeLazy) {
        return
      }
      let unobserve: (() => void) | undefined
      const stopWatchHandle = watchEffect(() => {
        unobserve?.()
        unobserve = undefined
        if (props.lazy) {
          unobserve = observeIntersection(
            imageRef.value,
            props.intersectionObserverOptions,
            shouldStartLoadingRef
          )
        }
      })
      onBeforeUnmount(() => {
        stopWatchHandle()
        unobserve?.()
      })
    })

    watchEffect(() => {
      void props.src
      void props.imgProps?.src
      showErrorRef.value = false
    })

    const loadedRef = ref(false)

    provide(imageContextKey, {
      previewedImgPropsRef: toRef(props, 'previewedImgProps')
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      groupId: imageGroupHandle?.groupId,
      previewInstRef,
      imageRef,

      showError: showErrorRef,
      shouldStartLoading: shouldStartLoadingRef,
      loaded: loadedRef,
      mergedOnClick: (e: MouseEvent) => {
        exposedMethods.click()
        props.imgProps?.onClick?.(e)
      },
      mergedOnError: (e: Event) => {
        if (!shouldStartLoadingRef.value) return
        showErrorRef.value = true
        const { onError, imgProps: { onError: imgPropsOnError } = {} } = props
        onError?.(e)
        imgPropsOnError?.(e)
      },
      mergedOnLoad: (e: Event) => {
        const { onLoad, imgProps: { onLoad: imgPropsOnLoad } = {} } = props
        onLoad?.(e)
        imgPropsOnLoad?.(e)
        loadedRef.value = true
      },
      ...exposedMethods
    }
  },
  render () {
    const { mergedClsPrefix, imgProps = {}, loaded, $attrs, lazy } = this

    const placeholderNode = this.$slots.placeholder?.()
    const loadSrc: string = this.src || imgProps.src || ''
    const imgNode = h('img', {
      ...imgProps,
      ref: 'imageRef',
      width: this.width || imgProps.width,
      height: this.height || imgProps.height,
      src: isImageSupportNativeLazy
        ? loadSrc
        : this.showError
          ? this.fallbackSrc
          : this.shouldStartLoading
            ? loadSrc
            : undefined,
      alt: this.alt || imgProps.alt,
      'aria-label': this.alt || imgProps.alt,
      onClick: this.mergedOnClick,
      onError: this.mergedOnError,
      onLoad: this.mergedOnLoad,
      // If interseciton observer options is set, do not use native lazy
      loading:
        isImageSupportNativeLazy && lazy && !this.intersectionObserverOptions
          ? 'lazy'
          : 'eager',
      style: [
        imgProps.style || '',
        placeholderNode && !loaded
          ? { height: '0', width: '0', visibility: 'hidden' }
          : '',
        { objectFit: this.objectFit }
      ],
      'data-error': this.showError,
      'data-preview-src': this.previewSrc || this.src
    })
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
        {!loaded && placeholderNode}
      </div>
    )
  }
})
