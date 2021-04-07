import { defineComponent, h, inject, ref } from 'vue'
import NImagePreview from './ImagePreview'
import type { ImagePreviewInst } from './ImagePreview'
import { imageGroupInjectionKey } from './ImageGroup'

export default defineComponent({
  name: 'Image',
  props: {
    width: [String, Number],
    height: [String, Number],
    src: String
  },
  setup (props) {
    const imageRef = ref<HTMLImageElement | null>(null)
    const previewInstRef = ref<ImagePreviewInst | null>(null)
    const imageGroupHandle = inject(imageGroupInjectionKey, null)
    return {
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
    return this.groupId ? (
      <div class="n-image">
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
      <NImagePreview ref="previewInstRef">
        {{
          default: () => {
            return (
              <div class="n-image">
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
