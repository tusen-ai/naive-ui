import type { Ref } from 'vue'
import type { ModalDraggableOptions } from './interface'
import type { ModalApiInjection, ModalReactive } from './ModalProvider'
import { off, on } from 'evtd'
import { computed, inject, onUnmounted } from 'vue'
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

export const DRAGGABLE_CLASS = 'n-draggable'

interface UseDragModalOptions {
  onEnd: (el: HTMLElement) => void
}
export function useDragModal(
  draggablePropsRef: Ref<boolean | ModalDraggableOptions>,
  options: UseDragModalOptions
) {
  let cleanup: undefined | (() => void)

  const draggableRef = computed(() => {
    return draggablePropsRef.value !== false
  })

  const draggableClassRef = computed(() => {
    return draggableRef.value ? DRAGGABLE_CLASS : ''
  })

  const boundsToWindowRef = computed(() => {
    const draggableProps = draggablePropsRef.value
    if (draggableProps === true || draggableProps === false) {
      return true
    }
    else if (draggableProps) {
      return draggableProps.bounds !== 'none'
    }
    else {
      return true
    }
  })

  function startDrag(modal: HTMLElement) {
    const header = modal.querySelector(`.${DRAGGABLE_CLASS}`) as HTMLElement
    if (!header || !draggableClassRef.value) {
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
      event.preventDefault()
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
      if (boundsToWindowRef.value) {
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

    function handleMouseUp() {
      mousedownEvent = undefined
      options.onEnd(modal)
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
    draggableRef,
    draggableClassRef
  }
}
