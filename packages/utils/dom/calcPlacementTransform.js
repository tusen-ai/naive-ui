export default function calcPlacementTransform (placement, activatorRect, contentRect) {
  let contentLeft, contentTop
  let suggesetedTransfromOrigin = 'none'
  if (placement === 'top-start') {
    contentTop = activatorRect.top - contentRect.height
    contentLeft = activatorRect.left
  } else if (placement === 'top') {
    contentTop = activatorRect.top - contentRect.height
    contentLeft = activatorRect.left + activatorRect.width / 2 - contentRect.width / 2
  } else if (placement === 'top-end') {
    contentTop = activatorRect.top - contentRect.height
    contentLeft = activatorRect.left + activatorRect.width - contentRect.width
  } else if (placement === 'left-start') {
    contentTop = activatorRect.top
    contentLeft = activatorRect.left - contentRect.width
  } else if (placement === 'left') {
    contentTop = activatorRect.top + activatorRect.height / 2 - contentRect.height / 2
    contentLeft = activatorRect.left - contentRect.width
  } else if (placement === 'left-end') {
    contentTop = activatorRect.top + activatorRect.height - contentRect.height
    contentLeft = activatorRect.left - contentRect.width
  } else if (placement === 'right-start') {
    contentTop = activatorRect.top
    contentLeft = activatorRect.left + activatorRect.width
    suggesetedTransfromOrigin = 'top left'
  } else if (placement === 'right') {
    contentTop = activatorRect.top + activatorRect.height / 2 - contentRect.height / 2
    contentLeft = activatorRect.left + activatorRect.width
  } else if (placement === 'right-end') {
    contentTop = activatorRect.top + activatorRect.height - contentRect.height
    contentLeft = activatorRect.left + activatorRect.width
  } else if (placement === 'bottom-start') {
    const toWindowBottom = window.innerHeight - activatorRect.bottom
    if (contentRect.height > toWindowBottom) {
      contentTop = activatorRect.top - contentRect.height
      suggesetedTransfromOrigin = 'bottom left'
    } else {
      contentTop = activatorRect.top + activatorRect.height
      suggesetedTransfromOrigin = 'top left'
    }
    contentLeft = activatorRect.left
  } else if (placement === 'bottom-end') {
    contentTop = activatorRect.top + activatorRect.height
    contentLeft = activatorRect.left + activatorRect.width - contentRect.width
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
  return [{ left: `${contentLeft}px`, top: `${contentTop}px` }, suggesetedTransfromOrigin]
}
