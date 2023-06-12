import {
  defineComponent,
  h,
  ref,
  provide,
  getCurrentInstance,
  type Ref
} from 'vue'
import { createId } from 'seemly'
import { createInjectionKey, type ExtractPublicPropTypes } from '../../_utils'
import { useConfig } from '../../_mixins'
import NImagePreview from './ImagePreview'
import type { ImagePreviewInst } from './ImagePreview'
import { imagePreviewSharedProps } from './interface'

export const imageGroupInjectionKey = createInjectionKey<
ImagePreviewInst & {
  groupId: string
  mergedClsPrefixRef: Ref<string>
}
>('n-image-group')

export const imageGroupProps = imagePreviewSharedProps

export type ImageGroupProps = ExtractPublicPropTypes<typeof imageGroupProps>

export default defineComponent({
  name: 'ImageGroup',
  props: imageGroupProps,
  setup (props) {
    let currentSrc: string | undefined
    const { mergedClsPrefixRef } = useConfig(props)
    const groupId = `c${createId()}`
    const vm = getCurrentInstance()
    const setPreviewSrc = (src: string | undefined): void => {
      currentSrc = src
      previewInstRef.value?.setPreviewSrc(src)
    }

    function go (step: 1 | -1): void {
      if (!vm?.proxy) return
      const container: HTMLElement = vm.proxy.$el.parentElement
      // use dom api since we can't get the correct order before all children are rendered
      const imgs: NodeListOf<HTMLImageElement> = container.querySelectorAll(
        `[data-group-id=${groupId}]:not([data-error=true])`
      )

      if (!imgs.length) return
      const index = Array.from(imgs).findIndex(
        (img) => img.dataset.previewSrc === currentSrc
      )
      if (~index) {
        setPreviewSrc(
          imgs[(index + step + imgs.length) % imgs.length].dataset.previewSrc
        )
      } else {
        setPreviewSrc(imgs[0].dataset.previewSrc)
      }
      step === 1 ? props.onPreviewNext?.() : props.onPreviewPrev?.()
    }
    provide(imageGroupInjectionKey, {
      mergedClsPrefixRef,
      setPreviewSrc,
      setThumbnailEl: (el) => {
        previewInstRef.value?.setThumbnailEl(el)
      },
      toggleShow: () => {
        previewInstRef.value?.toggleShow()
      },
      groupId
    })
    const previewInstRef = ref<ImagePreviewInst | null>(null)
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      previewInstRef,
      next: () => {
        go(1)
      },
      prev: () => {
        go(-1)
      }
    }
  },
  render () {
    return (
      <NImagePreview
        theme={this.theme}
        themeOverrides={this.themeOverrides}
        clsPrefix={this.mergedClsPrefix}
        ref="previewInstRef"
        onPrev={this.prev}
        onNext={this.next}
        showToolbar={this.showToolbar}
        showToolbarTooltip={this.showToolbarTooltip}
      >
        {this.$slots}
      </NImagePreview>
    )
  }
})
