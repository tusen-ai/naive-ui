import { ref, watch } from 'vue'
import type { Ref } from 'vue'

export function len (s: string): number {
  let count = 0
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const _ of s) {
    count++
  }
  return count
}

export function isEmptyInputValue (value: unknown): boolean {
  return value === '' || value == null
}

export interface UseCursorControl {
  recordCursor: () => void
  restoreCursor: () => void
}

export function useCursor (
  inputElRef: Ref<HTMLInputElement | HTMLTextAreaElement | null>
): UseCursorControl {
  const selectionRef = ref<{
    start: number
    end: number
    beforeText: string
    afterText: string
  } | null>(null)

  function recordCursor (): void {
    const { value: input } = inputElRef
    if (!input?.focus) {
      reset()
      return
    }
    const { selectionStart, selectionEnd, value } = input
    if (selectionStart == null || selectionEnd == null) {
      reset()
      return
    }
    selectionRef.value = {
      start: selectionStart,
      end: selectionEnd,
      beforeText: value.slice(0, selectionStart),
      afterText: value.slice(selectionEnd)
    }
  }

  function restoreCursor (): void {
    const { value: selection } = selectionRef
    const { value: inputEl } = inputElRef
    if (!selection || !inputEl) {
      return
    }
    const { value } = inputEl
    const { start, beforeText, afterText } = selection
    let startPos = value.length
    if (value.endsWith(afterText)) {
      startPos = value.length - afterText.length
    } else if (value.startsWith(beforeText)) {
      startPos = beforeText.length
    } else {
      const beforeLastChar = beforeText[start - 1]
      const newIndex = value.indexOf(beforeLastChar, start - 1)
      if (newIndex !== -1) {
        startPos = newIndex + 1
      }
    }
    inputEl.setSelectionRange?.(startPos, startPos)
  }

  function reset (): void {
    selectionRef.value = null
  }
  watch(inputElRef, reset)

  return {
    recordCursor,
    restoreCursor
  }
}
