import { defineComponent, h, inject, ref, PropType } from 'vue'
import NImagePreview from './ImagePreview'
import type { ImagePreviewInst } from './ImagePreview'
import { imageGroupInjectionKey } from './ImageGroup'
import { ExtractPublicPropTypes } from '../../_utils'
import { useConfig } from '../../_mixins'

const imageProps = {
  width: [String, Number] as PropType<string | number>,
  height: [String, Number] as PropType<string | number>,
  src: String,
  showToolbar: { type: Boolean, default: true }
}

export type ImageProps = ExtractPublicPropTypes<typeof imageProps>

export default defineComponent({
  name: 'Image',
  props: imageProps,
  setup (props) {
    const imageRef = ref<HTMLImageElement | null>(null)
    const previewInstRef = ref<ImagePreviewInst | null>(null)
    const imageGroupHandle = inject(imageGroupInjectionKey, null)
    const { mergedClsPrefix } = imageGroupHandle || useConfig(props)
    return {
      mergedClsPrefix,
      groupId: imageGroupHandle?.groupId,
      previewInstRef,
      imageRef,
      handleClick: () => {
        if (imageGroupHandle) {
          imageGroupHandle.setPreviewSrc(props.src)
          imageGroupHandle.setThumbnailEl(imageRef.value)
          imageGroupHandle.toggleShow()
          return
        }
        const { value: previewInst } = previewInstRef
        if (!previewInst) return
        previewInst.setPreviewSrc(props.src)
        previewInst.setThumbnailEl(imageRef.value)
        previewInst.toggleShow()
      }
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return this.groupId ? (
      <div class={`${mergedClsPrefix}-image`}>
        <img
          class={this.groupId}
          ref="imageRef"
          width={this.width}
          height={this.height}
          src={this.src}
          onClick={this.handleClick}
        />
      </div>
    ) : (
      <NImagePreview
        clsPrefix={mergedClsPrefix}
        ref="previewInstRef"
        showToolbar={this.showToolbar}
      >
        {{
          default: () => {
            return (
              <div class={`${mergedClsPrefix}-image`}>
                <img
                  ref="imageRef"
                  width={this.width}
                  height={this.height}
                  src={this.src}
                  onClick={this.handleClick}
                />
              </div>
            )
          }
        }}
      </NImagePreview>
    )
  }
})
