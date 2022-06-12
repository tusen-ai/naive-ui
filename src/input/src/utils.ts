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

export function isEmptyValue (value: any): boolean {
  return ['', undefined, null].includes(value)
}

export interface UseCursorControl {
  recordCursor: () => void
  restoreCursor: () => void
  clearRecord: () => void
}

export function useCursor (
  inputRef: Ref<HTMLInputElement | HTMLTextAreaElement | null>
): UseCursorControl {
  const selectionRef = ref<{
    start: number
    end: number
    beforeText: string
    afterText: string
  } | null>(null)

  function recordCursor (): void {
    const { value: input } = inputRef
    if (!input || !input.focus) {
      clearRecord()
      return
    }
    const { selectionStart, selectionEnd, value } = input
    // eslint-disable-next-line eqeqeq
    if (selectionStart == void 0 || selectionEnd == void 0) {
      clearRecord()
      return
    }
    selectionRef.value = {
      start: selectionStart,
      end: selectionEnd,
      beforeText: value.substring(0, selectionStart),
      afterText: value.substring(selectionEnd)
    }
  }

  function restoreCursor (): void {
    const { value: selection } = selectionRef
    const { value: input } = inputRef
    if (!selection || !input || !input.focus) {
      return
    }

    const { value } = input
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

    input.setSelectionRange?.(startPos, startPos)
  }

  function clearRecord (): void {
    selectionRef.value = null
  }
  watch(inputRef, clearRecord)

  return {
    recordCursor,
    restoreCursor,
    clearRecord
  }
}
