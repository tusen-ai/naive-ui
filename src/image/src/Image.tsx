import type { ImagePreviewInst, ImageSlots } from './public-types'
import type { IntersectionObserverOptions } from './utils'
import {
  defineComponent,
  h,
  type ImgHTMLAttributes,
  inject,
  onBeforeUnmount,
  onMounted,
  type PropType,
  provide,
  ref,
  type SlotsType,
  toRef,
  watchEffect
} from 'vue'
import { useConfig } from '../../_mixins'
import { type ExtractPublicPropTypes, resolveSlot } from '../../_utils'
import { isImageSupportNativeLazy } from '../../_utils/env/is-native-lazy-load'
import { imageGroupInjectionKey } from './ImageGroup'
import NImagePreview from './ImagePreview'
import { imageContextKey, imagePreviewSharedProps } from './interface'
import { observeIntersection } from './utils'

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

let uuid = 0

export default defineComponent({
  name: 'Image',
  props: imageProps,
  slots: Object as SlotsType<ImageSlots>,
  inheritAttrs: false,
  setup(props) {
    const imageRef = ref<HTMLImageElement | null>(null)
    const showErrorRef = ref(false)
    const previewInstRef = ref<ImagePreviewInst | null>(null)
    const imageGroupHandle = inject(imageGroupInjectionKey, null)
    const { mergedClsPrefixRef } = imageGroupHandle || useConfig(props)

    const mergedPreviewSrc = props.previewSrc || props.src

    const previewShowRef = ref(false)

    const imageId = uuid++

    const showPreview = () => {
      if (props.previewDisabled || showErrorRef.value)
        return
      if (imageGroupHandle) {
        imageGroupHandle.setThumbnailEl(imageRef.value)
        imageGroupHandle.toggleShow(imageId)
        return
      }
      const { value: previewInst } = previewInstRef
      if (!previewInst)
        return
      previewInst.setThumbnailEl(imageRef.value)
      previewShowRef.value = true
    }

    const exposedMethods = {
      click: () => {
        showPreview()
      },
      showPreview
    }

    const shouldStartLoadingRef = ref(!props.lazy)

    onMounted(() => {
      imageRef.value?.setAttribute(
        'data-group-id',
        imageGroupHandle?.groupId || ''
      )
    })

    onMounted(() => {
      // Use IntersectionObserver if lazy and intersectionObserverOptions is set
      if (props.lazy && props.intersectionObserverOptions) {
        let unobserve: (() => void) | undefined
        const stopWatchHandle = watchEffect(() => {
          unobserve?.()
          unobserve = undefined
          unobserve = observeIntersection(
            imageRef.value,
            props.intersectionObserverOptions,
            shouldStartLoadingRef
          )
        })
        onBeforeUnmount(() => {
          stopWatchHandle()
          unobserve?.()
        })
      }
    })

    watchEffect(() => {
      void (props.src || props.imgProps?.src)
      showErrorRef.value = false
    })

    watchEffect((onInvalidate) => {
      const unRegister = imageGroupHandle?.registerImageUrl?.(
        imageId,
        props.previewSrc || props.src || ''
      ) as (() => void) | undefined

      onInvalidate(() => {
        unRegister?.()
      })
    })

    function onImgClick(e: MouseEvent) {
      exposedMethods.click()
      props.imgProps?.onClick?.(e as PointerEvent)
    }

    function onPreviewClose() {
      previewShowRef.value = false
    }

    const loadedRef = ref(false)

    provide(imageContextKey, {
      previewedImgPropsRef: toRef(props, 'previewedImgProps')
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      groupId: imageGroupHandle?.groupId,
      previewInstRef,
      imageRef,
      mergedPreviewSrc,
      showError: showErrorRef,
      shouldStartLoading: shouldStartLoadingRef,
      loaded: loadedRef,
      mergedOnClick: (e: MouseEvent) => {
        onImgClick(e)
      },
      onPreviewClose,
      mergedOnError: (e: Event) => {
        if (!shouldStartLoadingRef.value)
          return
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
      previewShow: previewShowRef,
      ...exposedMethods
    }
  },
  render() {
    const { mergedClsPrefix, imgProps = {}, loaded, $attrs, lazy } = this
    const errorNode = resolveSlot(this.$slots.error, () => [])
    const placeholderNode = this.$slots.placeholder?.()
    const loadSrc = this.src || imgProps.src

    const imgNode
      = this.showError && errorNode.length
        ? errorNode
        : h('img', {
            ...imgProps,
            ref: 'imageRef',
            width: this.width || imgProps.width,
            height: this.height || imgProps.height,
            src: this.showError
              ? this.fallbackSrc
              : lazy && this.intersectionObserverOptions
                ? this.shouldStartLoading
                  ? loadSrc
                  : undefined
                : loadSrc,
            alt: this.alt || imgProps.alt,
            'aria-label': this.alt || imgProps.alt,
            onClick: this.mergedOnClick,
            onError: this.mergedOnError,
            onLoad: this.mergedOnLoad,
            // If interseciton observer options is set, do not use native lazy
            loading:
              isImageSupportNativeLazy
              && lazy
              && !this.intersectionObserverOptions
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
          (this.previewDisabled || this.showError)
          && `${mergedClsPrefix}-image--preview-disabled`
        ]}
      >
        {this.groupId ? (
          imgNode
        ) : (
          <NImagePreview
            theme={this.theme}
            themeOverrides={this.themeOverrides}
            ref="previewInstRef"
            showToolbar={this.showToolbar}
            showToolbarTooltip={this.showToolbarTooltip}
            renderToolbar={this.renderToolbar}
            src={this.mergedPreviewSrc}
            show={this.previewShow}
            onClose={this.onPreviewClose}
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
