import type { Ref } from 'vue'
import type { ModalDraggableOptions } from './interface'
import type { ModalApiInjection, ModalReactive } from './ModalProvider'
import { off, on } from 'evtd'
import { computed, inject, nextTick, onUnmounted, ref } from 'vue'
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

  const dragXRef = ref<number | null>(null)
  const dragYRef = ref<number | null>(null)

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
    let rafId: number | null = null
    let pendingPosition: { x: number, y: number } | null = null

    function handleMouseDown(event: MouseEvent) {
      event.preventDefault()
      mousedownEvent = event
      const { x, y, right, bottom } = modal.getBoundingClientRect()

      minMoveX = x
      minMoveY = y
      maxMoveX = window.innerWidth - right
      maxMoveY = window.innerHeight - bottom

      if (dragXRef.value !== null && dragYRef.value !== null) {
        prevMoveX = dragXRef.value
        prevMoveY = dragYRef.value
      }
      else {
        const { left, top } = modal.style
        prevMoveY = +top.slice(0, -2)
        prevMoveX = +left.slice(0, -2)
      }
    }

    function updatePosition() {
      if (pendingPosition) {
        dragXRef.value = pendingPosition.x
        dragYRef.value = pendingPosition.y
        pendingPosition = null
      }
      rafId = null
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

      pendingPosition = { x, y }

      if (!rafId) {
        rafId = requestAnimationFrame(updatePosition)
      }
    }

    function handleMouseUp() {
      mousedownEvent = undefined
      if (rafId) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
      if (pendingPosition) {
        dragXRef.value = pendingPosition.x
        dragYRef.value = pendingPosition.y
        pendingPosition = null
      }
      void nextTick(() => {
        options.onEnd(modal)
      })
    }

    on('mousedown', header, handleMouseDown)
    on('mousemove', window, handleMouseMove)
    on('mouseup', window, handleMouseUp)

    cleanup = () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      off('mousedown', header, handleMouseDown)
      off('mousemove', window, handleMouseMove)
      off('mouseup', window, handleMouseUp)
    }
  }

  function stopDrag() {
    if (cleanup) {
      cleanup()
      cleanup = undefined
    }
    dragXRef.value = null
    dragYRef.value = null
  }

  onUnmounted(stopDrag)
  return {
    stopDrag,
    startDrag,
    draggableRef,
    draggableClassRef,
    dragX: dragXRef,
    dragY: dragYRef
  }
}
