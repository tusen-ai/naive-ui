import {
  h,
  defineComponent,
  Fragment,
  ref,
  withDirectives,
  Transition,
  vShow,
  renderSlot,
  watch
} from 'vue'
import { zindexable } from 'vdirs'
import { useIsMounted } from 'vooks'
import { LazyTeleport } from 'vueuc'
import { on, off } from 'evtd'
import { beforeNextFrameOnce } from 'seemly'
import { useTheme } from '../../_mixins'
import { imageLight } from '../styles'
import style from './styles/index.cssr'

export interface ImagePreviewInst {
  setThumbnailEl: (e: HTMLImageElement | null) => void
  setPreviewSrc: (src?: string) => void
  toggleShow: () => void
}

export default defineComponent({
  name: 'Image',
  props: {
    onNext: Function,
    onPrev: Function
  },
  setup (props) {
    useTheme('Image', 'Image', style, imageLight, {})
    let thumbnailEl: HTMLImageElement | null = null
    const previewRef = ref<HTMLImageElement | null>(null)
    const previewSrcRef = ref<string | undefined>(undefined)
    const showRef = ref(false)
    const displayedRef = ref(false)
    function syncTransformOrigin (): void {
      const { value: preview } = previewRef
      if (!thumbnailEl || !preview) return
      const tbox = thumbnailEl.getBoundingClientRect()
      const tx = tbox.left + tbox.width / 2
      const ty = tbox.top + tbox.height / 2
      preview.style.transform = 'none'
      const pbox = preview.getBoundingClientRect()
      const px = pbox.left
      const py = pbox.top
      preview.style.transform = ''
      preview.style.transformOrigin = `${tx - px}px ${ty - py}px`
    }

    function handleKeyup (e: KeyboardEvent): void {
      switch (e.code) {
        case 'ArrowLeft':
          props.onPrev?.()
          break
        case 'ArrowRight':
          props.onNext?.()
          break
      }
    }

    if (props.onPrev) {
      watch(showRef, (value) => {
        if (value) on('keyup', document, handleKeyup)
        else off('keyup', document, handleKeyup)
      })
    }

    let startX = 0
    let startY = 0
    let offsetX = 0
    let offsetY = 0
    let dragging = false
    function handleMouseMove (e: MouseEvent): void {
      const { clientX, clientY } = e
      offsetX = clientX - startX
      offsetY = clientY - startY
      beforeNextFrameOnce(derivePreviewStyle)
    }
    function handleMouseUp (): void {
      off('mousemove', document, handleMouseMove)
      off('mouseup', document, handleMouseUp)
      dragging = false
      beforeNextFrameOnce(derivePreviewStyle)
    }
    function handlePreviewMousedown (e: MouseEvent): void {
      const { clientX, clientY } = e
      dragging = true
      offsetX = 0
      offsetY = 0
      startX = clientX
      startY = clientY
      beforeNextFrameOnce(derivePreviewStyle)
      on('mousemove', document, handleMouseMove)
      on('mouseup', document, handleMouseUp)
    }
    function derivePreviewStyle (): void {
      const { value: preview } = previewRef
      if (!preview) return
      const { style } = preview
      if (dragging) {
        style.cssText = `cursor: grabbing; transition: none; transform: translateX(${offsetX}px) translateY(${offsetY}px);`
      } else {
        style.cssText = 'cursor: grab;'
      }
    }
    function toggleShow (): void {
      showRef.value = !showRef.value
      displayedRef.value = true
    }
    const exposedMethods: ImagePreviewInst = {
      setPreviewSrc: (src) => {
        previewSrcRef.value = src
      },
      setThumbnailEl: (el) => {
        thumbnailEl = el
      },
      toggleShow
    }

    return {
      previewRef,
      previewSrc: previewSrcRef,
      show: showRef,
      appear: useIsMounted(),
      displayed: displayedRef,
      handlePreviewMousedown,
      syncTransformOrigin,
      handleAfterLeave: () => {
        displayedRef.value = false
      },
      ...exposedMethods
    }
  },
  render () {
    return (
      <>
        {renderSlot(this.$slots, 'default')}
        <LazyTeleport show={this.show}>
          {{
            default: () =>
              this.show || this.displayed
                ? withDirectives(
                  <div class="n-image-preview-container">
                    <Transition
                      name="n-fade-in-transition"
                      appear={this.appear}
                    >
                      {{
                        default: () =>
                          this.show ? (
                            <div
                              class="n-image-preview-overlay"
                              onClick={this.toggleShow}
                            />
                          ) : null
                      }}
                    </Transition>
                    <Transition
                      name="n-fade-in-scale-up-transition"
                      onAfterLeave={this.handleAfterLeave}
                      appear={this.appear}
                      onEnter={this.syncTransformOrigin}
                      onBeforeLeave={this.syncTransformOrigin}
                    >
                      {{
                        default: () =>
                          withDirectives(
                            <img
                              draggable={false}
                              onMousedown={this.handlePreviewMousedown}
                              class="n-image-preview"
                              src={this.previewSrc}
                              ref="previewRef"
                            />,
                            [[vShow, this.show]]
                          )
                      }}
                    </Transition>
                  </div>,
                  [[zindexable, { enabled: this.show }]]
                )
                : null
          }}
        </LazyTeleport>
      </>
    )
  }
})
