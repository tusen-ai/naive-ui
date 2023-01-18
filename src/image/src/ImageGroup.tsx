import { defineComponent, h, ref, provide, getCurrentInstance, Ref } from 'vue'
import { createId } from 'seemly'
import { isUndefined } from 'lodash-es'
import { createInjectionKey, ExtractPublicPropTypes } from '../../_utils'
import { useConfig } from '../../_mixins'
import NImagePreview from './ImagePreview'
import type { ImagePreviewInst } from './ImagePreview'
import { imagePreviewSharedProps } from './interface'

export const imageGroupInjectionKey = createInjectionKey<
Omit<ImagePreviewInst, 'setPreviewSrc'> & {
  groupId: string
  mergedClsPrefixRef: Ref<string>
  imageIndex: Ref<number>
  setImageIndex: (index: number) => void
  setPreviewImg: (img: HTMLImageElement) => void
}
>('n-image-group')

export const imageGroupProps = imagePreviewSharedProps

export type ImageGroupProps = ExtractPublicPropTypes<typeof imageGroupProps>

export default defineComponent({
  name: 'ImageGroup',
  props: imageGroupProps,
  setup (props) {
    let currentIndex: number | undefined
    const { mergedClsPrefixRef } = useConfig(props)
    const groupId = `c${createId()}`
    const vm = getCurrentInstance()

    const imageIndex = ref(0)
    const setImageIndex = (count: number): void => {
      imageIndex.value = count
    }

    const setPreviewImg = (img: HTMLImageElement): void => {
      currentIndex = Number(img.dataset.index)
      const currentSrc = img.dataset.previewSrc
      previewInstRef.value?.setPreviewSrc(currentSrc)
    }

    function go (step: 1 | -1): void {
      if (!vm?.proxy) return
      const container: HTMLElement = vm.proxy.$el.parentElement
      // use dom api since we can't get the correct order before all children are rendered
      const imgs: NodeListOf<HTMLImageElement> = container.querySelectorAll(
        `[data-group-id=${groupId}]:not([data-error=true])`
      )

      if (!imgs.length) return
      if (isUndefined(currentIndex)) {
        setPreviewImg(imgs[0])
      } else {
        const current = imgs[(currentIndex + step + imgs.length) % imgs.length]
        if (!current) return
        setPreviewImg(current)
      }
    }
    provide(imageGroupInjectionKey, {
      mergedClsPrefixRef,
      imageIndex,
      setPreviewImg,
      setImageIndex,
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
      next: () => go(1),
      prev: () => go(-1)
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
