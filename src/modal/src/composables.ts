import type { Ref } from 'vue'
import type { ModalDraggableOptions } from './interface'
import type { ModalApiInjection, ModalReactive } from './ModalProvider'
import { off, on } from 'evtd'
import { isBoolean } from 'lodash-es'
import { useClickPosition } from 'vooks'
import { computed, inject, onUnmounted, ref, watch } from 'vue'
import { throwError } from '../../_utils'
import { modalApiInjectionKey, modalReactiveListInjectionKey } from './context'

export function useModal(): ModalApiInjection {
  const modal = inject(modalApiInjectionKey, null)
  if (modal === null) {
    throwError('use-modal', 'No outer <n-modal-provider /> founded.')
  }
  return modal
}

export function useModalReactiveList(): Ref<readonly ModalReactive[]> {
  const modalReactiveList = inject(modalReactiveListInjectionKey, null)
  if (modalReactiveList === null) {
    throwError(
      'use-modal-reactive-list',
      'No outer <n-modal-provider /> founded.'
    )
  }
  return modalReactiveList
}

export const DRAGGABLE_CLASS = 'modal-body--draggable'

interface UseDragModalOptions {
  onEnd?: (el: HTMLElement, event: MouseEvent) => void
}
export function useDragModal(
  draggableProps: Ref<boolean | ModalDraggableOptions>,
  options: UseDragModalOptions = {}
) {
  let cleanup: undefined | (() => void)

  const canDraggable = computed(() => {
    return draggableProps.value !== false
  })

  const draggableClass = computed(() => {
    return canDraggable.value ? DRAGGABLE_CLASS : ''
  })

  const sticky = computed(() => {
    if (isBoolean(draggableProps.value)) {
      return true
    }
    return draggableProps.value.sticky !== false
  })

  function startDrag(modal: HTMLElement) {
    const header = modal.querySelector(`.${DRAGGABLE_CLASS}`) as HTMLElement
    if (!header || !canDraggable.value) {
      return
    }

    let maxMoveX = 0
    let minMoveX = 0
    let maxMoveY = 0
    let minMoveY = 0
    let prevMoveY = 0
    let prevMoveX = 0
    let mousedownEvent: MouseEvent | undefined

    function handleMouseDown(event: MouseEvent) {
      mousedownEvent = event
      const { x, y, right, bottom } = modal.getBoundingClientRect()

      minMoveX = x
      minMoveY = y
      maxMoveX = window.innerWidth - right
      maxMoveY = window.innerHeight - bottom

      const { left, top } = modal.style
      prevMoveY = +top.slice(0, -2)
      prevMoveX = +left.slice(0, -2)
    }

    function handleMouseMove(event: MouseEvent) {
      if (!mousedownEvent)
        return

      const { clientX: downX, clientY: downY } = mousedownEvent

      let moveX = event.clientX - downX
      let moveY = event.clientY - downY
      if (sticky.value) {
        if (moveX > maxMoveX) {
          moveX = maxMoveX
        }
        else if (-moveX > minMoveX) {
          moveX = -minMoveX
        }

        if (moveY > maxMoveY) {
          moveY = maxMoveY
        }
        else if (-moveY > minMoveY) {
          moveY = -minMoveY
        }
      }
      const x = moveX + prevMoveX
      const y = moveY + prevMoveY
      modal.style.top = `${y}px`
      modal.style.left = `${x}px`
    }

    function handleMouseUp(event: MouseEvent) {
      mousedownEvent = undefined
      options.onEnd && options.onEnd(modal, event)
    }

    on('mousedown', header, handleMouseDown)
    on('mousemove', window, handleMouseMove)
    on('mouseup', window, handleMouseUp)

    cleanup = () => {
      off('mousedown', header, handleMouseDown)
      on('mousemove', window, handleMouseMove)
      on('mouseup', window, handleMouseUp)
    }
  }

  function stopDrag() {
    if (cleanup) {
      cleanup()
      cleanup = undefined
    }
  }

  onUnmounted(stopDrag)
  return {
    stopDrag,
    startDrag,
    canDraggable,
    draggableClass
  }
}

export function useCaptureOpenModalElementPosition(show: Ref<boolean>) {
  const positionRef = useClickPosition()
  const elementPositionRef = ref<{ x: number, y: number } | null>(null)

  watch(
    show,
    (value) => {
      if (value && positionRef.value) {
        const { x, y } = positionRef.value
        elementPositionRef.value = {
          x,
          y
        }
      }
    },
    { immediate: true }
  )

  return elementPositionRef
}
