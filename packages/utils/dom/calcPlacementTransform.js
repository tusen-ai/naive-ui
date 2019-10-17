export default function calcPlacementTransform (placement, activatorRect, contentRect) {
  let contentLeft = null
  let contentTop = null
  let contentRight = null
  let contentBottom = null
  let suggesetedTransfromOrigin = 'none'
  if (placement === 'top-start') {
    contentTop = activatorRect.top - contentRect.height
    contentLeft = activatorRect.left
    suggesetedTransfromOrigin = 'bottom left'
  } else if (placement === 'top') {
    contentTop = activatorRect.top - contentRect.height
    contentLeft = activatorRect.left + activatorRect.width / 2 - contentRect.width / 2
    suggesetedTransfromOrigin = 'bottom'
  } else if (placement === 'top-end') {
    contentTop = activatorRect.top - contentRect.height
    contentLeft = activatorRect.left + activatorRect.width - contentRect.width
    suggesetedTransfromOrigin = 'bottom end'
  } else if (placement === 'left-start') {
    contentTop = activatorRect.top
    contentLeft = activatorRect.left - contentRect.width
    suggesetedTransfromOrigin = 'top right'
  } else if (placement === 'left') {
    contentTop = activatorRect.top + activatorRect.height / 2 - contentRect.height / 2
    contentLeft = activatorRect.left - contentRect.width
    suggesetedTransfromOrigin = 'center right'
  } else if (placement === 'left-end') {
    contentTop = activatorRect.top + activatorRect.height - contentRect.height
    contentLeft = activatorRect.left - contentRect.width
    suggesetedTransfromOrigin = 'bottom right'
  } else if (placement === 'right-start') {
    contentTop = activatorRect.top
    contentLeft = activatorRect.left + activatorRect.width
    suggesetedTransfromOrigin = 'top left'
  } else if (placement === 'right') {
    contentTop = activatorRect.top + activatorRect.height / 2 - contentRect.height / 2
    contentLeft = activatorRect.left + activatorRect.width
    suggesetedTransfromOrigin = 'center left'
  } else if (placement === 'right-end') {
    contentTop = activatorRect.top + activatorRect.height - contentRect.height
    contentLeft = activatorRect.left + activatorRect.width
    suggesetedTransfromOrigin = 'bottom left'
  } else if (placement === 'bottom-start') {
    const toWindowBottom = window.innerHeight - activatorRect.bottom
    const toWindowRight = window.innerWidth - activatorRect.left - contentRect.width
    if (contentRect.height > toWindowBottom && activatorRect.top > toWindowBottom) {
      contentBottom = toWindowBottom + activatorRect.height
      contentTop = null
      suggesetedTransfromOrigin = 'bottom'
    } else {
      contentTop = activatorRect.top + activatorRect.height
      contentBottom = null
      suggesetedTransfromOrigin = 'top'
    }
    if (toWindowRight < 0) {
      contentLeft = activatorRect.right - contentRect.width
      suggesetedTransfromOrigin += ' right'
    } else {
      contentLeft = activatorRect.left
      suggesetedTransfromOrigin += ' left'
    }
  } else if (placement === 'bottom-end') {
    contentTop = activatorRect.top + activatorRect.height
    contentLeft = activatorRect.left + activatorRect.width - contentRect.width
    suggesetedTransfromOrigin = 'top right'
  } else {
    contentTop = activatorRect.top + activatorRect.height
    contentLeft = activatorRect.left + activatorRect.width / 2 - contentRect.width / 2
    suggesetedTransfromOrigin = 'top center'
  }
  /**
   * We could also change the position using transform.
   * Such as return `transform: translateX(${contentLeft}px) translateY(${contentTop}px);`
   * However, I found that the dom delay is very serious.
   * So I decide to use left and top for now.
   */
  return [{
    left: contentLeft && `${contentLeft}px`,
    top: contentTop && `${contentTop}px`,
    right: contentRight && `${contentRight}px`,
    bottom: contentBottom && `${contentBottom}px`
  }, suggesetedTransfromOrigin]
}
