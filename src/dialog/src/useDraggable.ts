import { onBeforeUnmount, onMounted, watchEffect } from 'vue'
import type { ComputedRef, Ref } from 'vue'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function addUnit (value?: string | number, defaultUnit = 'px'): string {
  if (!value) {
    return ''
  }
  if (typeof value === 'string') {
    return value
  } else if (typeof value === 'number') {
    return `${value}${defaultUnit}`
  } else {
    return ''
  }
}

export const useDraggable = (
  targetRef: Ref<HTMLElement | undefined>,
  dragRef: Ref<HTMLElement | undefined>,
  draggable: ComputedRef<boolean>
): void => {
  let transform = {
    offsetX: 0,
    offsetY: 0
  }

  const onMousedown = (e: MouseEvent): void => {
    const downX = e.clientX
    const downY = e.clientY
    const { offsetX, offsetY } = transform
    const targetRect = (targetRef.value as HTMLElement).getBoundingClientRect()
    const targetLeft = targetRect.left
    const targetTop = targetRect.top
    const targetWidth = targetRect.width
    const targetHeight = targetRect.height

    const clientWidth = document.documentElement.clientWidth
    const clientHeight = document.documentElement.clientHeight

    const minLeft = -targetLeft + offsetX
    const minTop = -targetTop + offsetY
    const maxLeft = clientWidth - targetLeft - targetWidth + offsetX
    const maxTop = clientHeight - targetTop - targetHeight + offsetY

    const onMousemove = (ev: MouseEvent): void => {
      const moveX = Math.min(
        Math.max(offsetX + ev.clientX - downX, minLeft),
        maxLeft
      )
      const moveY = Math.min(
        Math.max(offsetY + ev.clientY - downY, minTop),
        maxTop
      )
      transform = {
        offsetX: moveX,
        offsetY: moveY
      }
      ;(targetRef.value as HTMLElement).style.left = `${addUnit(moveX)}`
      ;(targetRef.value as HTMLElement).style.top = `${addUnit(moveY)}`
    }

    const onMouseup = (): void => {
      document.removeEventListener('mousemove', onMousemove)
      document.removeEventListener('mouseup', onMouseup)
    }

    document.addEventListener('mousemove', onMousemove)
    document.addEventListener('mouseup', onMouseup)
  }

  const onDraggable = (): void => {
    if (dragRef.value && targetRef.value) {
      dragRef.value.addEventListener('mousedown', onMousedown)
    }
  }

  const offDraggable = (): void => {
    if (dragRef.value && targetRef.value) {
      dragRef.value.removeEventListener('mousedown', onMousedown)
    }
  }

  onMounted(() => {
    watchEffect(() => {
      if (draggable.value) {
        onDraggable()
      } else {
        offDraggable()
      }
    })
  })

  onBeforeUnmount(() => {
    offDraggable()
  })
}
