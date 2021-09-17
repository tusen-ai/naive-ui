import { h, defineComponent, inject, computed, renderSlot } from 'vue'
import { ExtractPublicPropTypes, throwError } from '../../_utils'
import { uploadInjectionKey } from './interface'
import NUploadDragger from './UploadDragger'

const uploadTriggerProps = {
  abstract: {
    type: Boolean,
    default: false
  }
} as const
export type UploadTriggerProps = ExtractPublicPropTypes<
  typeof uploadTriggerProps
>

export default defineComponent({
  name: 'UploadTrigger',
  props: uploadTriggerProps,
  setup (props, { slots }) {
    const NUpload = inject(uploadInjectionKey, null)
    if (!NUpload) {
      throwError(
        'upload-trigger',
        '`n-upload-trigger` must be placed inside `n-upload`.'
      )
    }

    const {
      mergedClsPrefixRef,
      listTypeRef,
      disabledRef,
      dragOverRef,
      openFileDialog,
      draggerInsideRef,
      handleFileAddition,
      abstractRef: parentAbstract
    } = NUpload

    const isImageCardType = listTypeRef.value === 'image-card'
    const mergedAbstractRef = computed(
      () => parentAbstract.value && props.abstract
    )

    function handleTriggerClick (): void {
      if (disabledRef.value) return
      openFileDialog()
    }
    function handleTriggerDragOver (e: DragEvent): void {
      e.preventDefault()
      dragOverRef.value = true
    }
    function handleTriggerDragEnter (e: DragEvent): void {
      e.preventDefault()
      dragOverRef.value = true
    }
    function handleTriggerDragLeave (e: DragEvent): void {
      e.preventDefault()
      dragOverRef.value = false
    }
    function handleTriggerDrop (e: DragEvent): void {
      e.preventDefault()
      if (!draggerInsideRef.value || disabledRef.value) return
      const dataTransfer = e.dataTransfer
      const files = dataTransfer?.files
      if (files) {
        handleFileAddition(files)
      }
      dragOverRef.value = false
    }

    return () =>
      mergedAbstractRef.value ? (
        renderSlot(slots, 'default', {
          handleTriggerClick,
          handleTriggerDrop,
          handleTriggerDragOver,
          handleTriggerDragEnter,
          handleTriggerDragLeave
        })
      ) : (
        <div
          class={[
            `${mergedClsPrefixRef.value}-upload__trigger`,
            isImageCardType &&
              `${mergedClsPrefixRef.value}-upload__trigger--image-card`
          ]}
          onClick={handleTriggerClick}
          onDrop={handleTriggerDrop}
          onDragover={handleTriggerDragOver}
          onDragenter={handleTriggerDragEnter}
          onDragleave={handleTriggerDragLeave}
        >
          {isImageCardType ? <NUploadDragger>{slots}</NUploadDragger> : slots}
        </div>
      )
  }
})
