// Because of the nature of the loop slide work,
// we need to add duplicates to the left and right of the carousel
// slot    [ 0 1 2 ]
// display 2 0 1 2 0
// real    0 1 2 3 4

import { cloneVNode } from 'vue'
import type { VNode } from 'vue'

export function addDuplicateSlides (slides: VNode[]): VNode[] {
  const { length } = slides
  if (length > 1) {
    slides.push(duplicateSlide(slides[0], 0, 'append'))
    slides.unshift(duplicateSlide(slides[length - 1], length - 1, 'prepend'))
    return slides
  }
  return slides
}

function duplicateSlide (
  child: VNode,
  index: number,
  position: 'prepend' | 'append'
): VNode {
  return cloneVNode(child, {
    // for patch
    key: `carousel-item-duplicate-${index}-${position}`
  })
}

export function getDisplayIndex (
  current: number,
  length: number,
  duplicatedable: boolean
): number {
  if (length === 1) return 0
  return !duplicatedable
    ? current
    : current === 0
      ? length - 3
      : current === length - 1
        ? 0
        : current - 1
}

export function getRealIndex (
  current: number,
  duplicatedable?: boolean
): number {
  return !duplicatedable ? current : current + 1
}

export function getPrevIndex (
  current: number,
  length: number,
  duplicatedable?: boolean
): number | null {
  if (current < 0) return null
  return current === 0 ? (duplicatedable ? length - 1 : null) : current - 1
}

export function getNextIndex (
  current: number,
  length: number,
  duplicatedable?: boolean
): number | null {
  if (current > length - 1) return null
  return current === length - 1 ? (duplicatedable ? 0 : null) : current + 1
}

export function getDisplayTotalView (
  total: number,
  duplicatedable?: boolean
): number {
  return duplicatedable && total > 3 ? total - 2 : total
}
