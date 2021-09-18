import { h, defineComponent, inject, renderSlot, computed } from 'vue'
import { throwError } from '../../_utils'
import { uploadInjectionKey } from './interface'
import NUploadDragger from './UploadDragger'

export default defineComponent({
  name: 'UploadTrigger',
  setup (_, { slots }) {
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
      abstractRef
    } = NUpload

    const isImageCardTypeRef = computed(
      () => listTypeRef.value === 'image-card'
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
      abstractRef.value ? (
        renderSlot(slots, 'default', {
          handleClick: handleTriggerClick,
          handleDrop: handleTriggerDrop,
          handleDragOver: handleTriggerDragOver,
          handleDragEnter: handleTriggerDragEnter,
          handleDragLeave: handleTriggerDragLeave
        })
      ) : (
        <div
          class={[
            `${mergedClsPrefixRef.value}-upload__trigger`,
            isImageCardTypeRef.value &&
              `${mergedClsPrefixRef.value}-upload__trigger--image-card`
          ]}
          onClick={handleTriggerClick}
          onDrop={handleTriggerDrop}
          onDragover={handleTriggerDragOver}
          onDragenter={handleTriggerDragEnter}
          onDragleave={handleTriggerDragLeave}
        >
          {isImageCardTypeRef.value ? (
            <NUploadDragger>{slots}</NUploadDragger>
          ) : (
            slots
          )}
        </div>
      )
  }
})
