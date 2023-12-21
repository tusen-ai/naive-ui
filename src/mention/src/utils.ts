/**
 * The original package is https://www.npmjs.com/package/textarea-caret-ts
 * The original file is https://github.com/TheRealSyler/textarea-caret-position/blob/master/index.ts
 *
 * Here I modified it to make it works when input is scrolled.
 */

import { isBrowser } from '../../_utils'

export interface Position {
  /**
   * position in pixel.
   */
  top: number
  /**
   * position in pixel.
   */
  left: number
  /**
   * if true the position is relative to the inner window size, if false the position is relative to itself.
   */
  absolute: boolean
  /**
   * height in pixel.
   */
  height: number
}
export interface Point {
  /**
   * left position.
   */
  left: number
  /**
   * top position.
   */
  top: number
}
export interface Options {
  /**
   * Enables debug Mode.
   */
  debug?: boolean
  /**
   * usesSelection End Instead of selection Start.
   */
  useSelectionEnd?: boolean
  /**
   * if true the left position gets caped if left >= element Width.
   */
  checkWidthOverflow?: boolean
}

/**
 * Returns the Absolute (relative to the inner window size) position of the caret in the given element.
 * @param element Input (has to be type='text') or Text Area.
 */
export function getAbsolutePosition (
  element: HTMLInputElement | HTMLTextAreaElement
): Position {
  const caretRelPost = getRelativePosition(element)
  return {
    left:
      window.scrollX + element.getBoundingClientRect().left + caretRelPost.left,
    top:
      window.scrollY + element.getBoundingClientRect().top + caretRelPost.top,
    absolute: true,
    height: caretRelPost.height
  }
}
/**
 * Returns the relative position of the caret in the given element.
 * @param element Input (has to be type='text') or Text Area.
 */
export function getRelativePosition (
  element: HTMLInputElement | HTMLTextAreaElement,
  options: Options = {
    debug: false,
    useSelectionEnd: false,
    checkWidthOverflow: true
  }
): Position {
  const selectionStart =
    element.selectionStart !== null ? element.selectionStart : 0
  const selectionEnd = element.selectionEnd !== null ? element.selectionEnd : 0
  const position = options.useSelectionEnd ? selectionEnd : selectionStart
  // We'll copy the properties below into the mirror div.
  // Note that some browsers, such as Firefox, do not concatenate properties
  // into their shorthand (e.g. padding-top, padding-bottom etc. -> padding),
  // so we have to list every single property explicitly.
  const properties: string[] = [
    'direction', // RTL support
    'boxSizing',
    'width', // on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
    'height',
    'overflowX',
    'overflowY', // copy the scrollbar for IE
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth',
    'borderStyle',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    // https://developer.mozilla.org/en-US/docs/Web/CSS/font
    'fontStyle',
    'fontVariant',
    'fontWeight',
    'fontStretch',
    'fontSize',
    'fontSizeAdjust',
    'lineHeight',
    'fontFamily',
    'textAlign',
    'textTransform',
    'textIndent',
    'textDecoration', // might not make a difference, but better be safe
    'letterSpacing',
    'wordSpacing',
    'tabSize',
    'MozTabSize'
  ]
  // Firefox 1.0+
  const isFirefox = navigator.userAgent.toLowerCase().includes('firefox')
  if (!isBrowser) {
    throw new Error(
      'textarea-caret-position#getCaretPosition should only be called in a browser'
    )
  }

  const debug = options?.debug
  if (debug) {
    const el = document.querySelector(
      '#input-textarea-caret-position-mirror-div'
    )
    if (el?.parentNode) el.parentNode.removeChild(el)
  }

  // The mirror div will replicate the textareas style
  const div = document.createElement('div')
  div.id = 'input-textarea-caret-position-mirror-div'
  document.body.appendChild(div)

  const style = div.style
  const computed = window.getComputedStyle
    ? window.getComputedStyle(element)
    : (element as any).currentStyle // currentStyle for IE < 9

  const isInput = element.nodeName === 'INPUT'

  // Default textarea styles
  style.whiteSpace = isInput ? 'nowrap' : 'pre-wrap'
  if (!isInput) style.wordWrap = 'break-word' // only for textarea-s

  // Position off-screen
  style.position = 'absolute' // required to return coordinates properly
  if (!debug) style.visibility = 'hidden' // not 'display: none' because we want rendering

  // Transfer the element's properties to the div
  properties.forEach((prop) => {
    if (isInput && prop === 'lineHeight') {
      // Special case for <input>s because text is rendered centered and line height may be != height
      if (computed.boxSizing === 'border-box') {
        const height = parseInt(computed.height as string)
        const outerHeight =
          parseInt(computed.paddingTop as string) +
          parseInt(computed.paddingBottom as string) +
          parseInt(computed.borderTopWidth as string) +
          parseInt(computed.borderBottomWidth as string)
        const targetHeight =
          outerHeight + parseInt(computed.lineHeight as string)
        if (height > targetHeight) {
          style.lineHeight = `${height - outerHeight}px`
        } else if (height === targetHeight) {
          style.lineHeight = computed.lineHeight
        } else {
          style.lineHeight = '0'
        }
      } else {
        style.lineHeight = computed.height
      }
    } else {
      style[prop as any] = computed[prop]
    }
  })

  if (isFirefox) {
    // Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
    if (element.scrollHeight > parseInt(computed.height as string)) {
      style.overflowY = 'scroll'
    }
  } else {
    style.overflow = 'hidden' // for Chrome to not render a scrollbar; IE keeps overflowY = 'scroll'
  }

  div.textContent = element.value.substring(0, position)
  // The second special handling for input type="text" vs textarea:
  // spaces need to be replaced with non-breaking spaces - http://stackoverflow.com/a/13402035/1269037
  if (isInput && div.textContent) {
    div.textContent = div.textContent.replace(/\s/g, '\u00a0')
  }

  const span = document.createElement('span')
  // Wrapping must be replicated *exactly*, including when a long word gets
  // onto the next line, with whitespace at the end of the line before (#7).
  // The  *only* reliable way to do that is to copy the *entire* rest of the
  // textareas content into the <span> created at the caret position.
  // For inputs, just '.' would be enough, but no need to bother.
  span.textContent = element.value.substring(position) || '.' // || because a completely empty faux span doesn't render at all
  span.style.position = 'relative'
  span.style.left = `${-element.scrollLeft}px`
  span.style.top = `${-element.scrollTop}px`
  div.appendChild(span)

  const relativePosition = {
    top: span.offsetTop + parseInt(computed.borderTopWidth as string),
    left: span.offsetLeft + parseInt(computed.borderLeftWidth as string),
    absolute: false,
    // We don't use line-height since it may be too large for position. Eg. 34px
    // for input
    height: parseInt(computed.fontSize as string) * 1.5
  }

  if (debug) {
    span.style.backgroundColor = '#aaa'
  } else {
    document.body.removeChild(div)
  }

  if (
    relativePosition.left >= element.clientWidth &&
    options.checkWidthOverflow
  ) {
    relativePosition.left = element.clientWidth
  }
  return relativePosition
}
/**
 * sets the top and left css style of the element based on the absolute position of the caretElements caret,
 * @param offset offsets the position.
 * @param detectBoundary offsets the position if the position would be outside the window.
 * @param returnOnly if true the element position wont be set.
 */
export function setElementPositionBasedOnCaret (
  element: HTMLElement,
  caretElement: HTMLInputElement | HTMLTextAreaElement,
  offset: Point = { top: 0, left: 0 },
  margin: number = 2,
  detectBoundary = true,
  returnOnly = false
): Point {
  const pos = getAbsolutePosition(caretElement)
  if (detectBoundary) {
    pos.left =
      pos.left + (element.clientWidth + margin) + offset.left >
      window.scrollX + window.innerWidth
        ? (pos.left =
            window.scrollX + window.innerWidth - (element.clientWidth + margin))
        : (pos.left += offset.left)
    pos.top =
      pos.top + (element.clientWidth + margin) + offset.top >
      window.scrollY + window.innerHeight
        ? (pos.top -= element.clientWidth + margin)
        : (pos.top += offset.top)
  } else {
    pos.top += offset.top
    pos.left += offset.left
  }
  if (!returnOnly) {
    element.style.top = `${pos.top}px`
    element.style.left = `${pos.left}px`
  }
  return pos
}
