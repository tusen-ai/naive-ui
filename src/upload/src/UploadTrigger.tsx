import { h, defineComponent, inject, computed } from 'vue'
import { AddIcon } from '../../_internal/icons'
import { NBaseIcon } from '../../_internal'
import { throwError } from '../../_utils'
import { uploadInjectionKey } from './interface'
import NUploadDragger from './UploadDragger'

export default defineComponent({
  name: 'UploadTrigger',
  props: {
    abstract: Boolean
  },
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
      mergedDisabledRef,
      maxReachedRef,
      listTypeRef,
      dragOverRef,
      openOpenFileDialog,
      draggerInsideRef,
      handleFileAddition
    } = NUpload

    const isImageCardTypeRef = computed(
      () => listTypeRef.value === 'image-card'
    )

    function handleTriggerClick (): void {
      if (mergedDisabledRef.value || maxReachedRef.value) return
      openOpenFileDialog()
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
      if (
        !draggerInsideRef.value ||
        mergedDisabledRef.value ||
        maxReachedRef.value
      ) {
        return
      }
      const dataTransfer = e.dataTransfer
      const files = dataTransfer?.files
      if (files) {
        handleFileAddition(files)
      }
      dragOverRef.value = false
    }

    return () => {
      const { value: mergedClsPrefix } = mergedClsPrefixRef
      return props.abstract ? (
        slots.default?.({
          handleClick: handleTriggerClick,
          handleDrop: handleTriggerDrop,
          handleDragOver: handleTriggerDragOver,
          handleDragEnter: handleTriggerDragEnter,
          handleDragLeave: handleTriggerDragLeave
        })
      ) : (
        <div
          class={[
            `${mergedClsPrefix}-upload-trigger`,
            (mergedDisabledRef.value || maxReachedRef.value) &&
              `${mergedClsPrefix}-upload-trigger--disabled`,
            isImageCardTypeRef.value &&
              `${mergedClsPrefix}-upload-trigger--image-card`
          ]}
          onClick={handleTriggerClick}
          onDrop={handleTriggerDrop}
          onDragover={handleTriggerDragOver}
          onDragenter={handleTriggerDragEnter}
          onDragleave={handleTriggerDragLeave}
        >
          {isImageCardTypeRef.value ? (
            <NUploadDragger>
              {{
                default:
                  slots.default ||
                  (() => (
                    <NBaseIcon clsPrefix={mergedClsPrefix}>
                      {{ default: () => <AddIcon /> }}
                    </NBaseIcon>
                  ))
              }}
            </NUploadDragger>
          ) : (
            slots
          )}
        </div>
      )
    }
  }
})
