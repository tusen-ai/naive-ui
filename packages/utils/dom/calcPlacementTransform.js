export default function calcPlacementTransform (placement, activatorRect, popoverRect) {
  let contentLeft, contentTop
  let suggesetedTransfromOrigin = 'none'
  if (placement === 'top-start') {
    contentTop = activatorRect.top - popoverRect.height
    contentLeft = activatorRect.left
  } else if (placement === 'top') {
    contentTop = activatorRect.top - popoverRect.height
    contentLeft = activatorRect.left + activatorRect.width / 2 - popoverRect.width / 2
  } else if (placement === 'top-end') {
    contentTop = activatorRect.top - popoverRect.height
    contentLeft = activatorRect.left + activatorRect.width - popoverRect.width
  } else if (placement === 'left-start') {
    contentTop = activatorRect.top
    contentLeft = activatorRect.left - popoverRect.width
  } else if (placement === 'left') {
    contentTop = activatorRect.top + activatorRect.height / 2 - popoverRect.height / 2
    contentLeft = activatorRect.left - popoverRect.width
  } else if (placement === 'left-end') {
    contentTop = activatorRect.top + activatorRect.height - popoverRect.height
    contentLeft = activatorRect.left - popoverRect.width
  } else if (placement === 'right-start') {
    contentTop = activatorRect.top
    contentLeft = activatorRect.left + activatorRect.width
  } else if (placement === 'right') {
    contentTop = activatorRect.top + activatorRect.height / 2 - popoverRect.height / 2
    contentLeft = activatorRect.left + activatorRect.width
  } else if (placement === 'right-end') {
    contentTop = activatorRect.top + activatorRect.height - popoverRect.height
    contentLeft = activatorRect.left + activatorRect.width
  } else if (placement === 'bottom-start') {
    const toWindowBottom = window.innerHeight - activatorRect.bottom
    if (popoverRect.height > toWindowBottom) {
      contentTop = activatorRect.top - popoverRect.height
      suggesetedTransfromOrigin = 'bottom left'
    } else {
      contentTop = activatorRect.top + activatorRect.height
      suggesetedTransfromOrigin = 'top left'
    }
    contentLeft = activatorRect.left
  } else if (placement === 'bottom-end') {
    contentTop = activatorRect.top + activatorRect.height
    contentLeft = activatorRect.left + activatorRect.width - popoverRect.width
  } else {
    contentTop = activatorRect.top + activatorRect.height
    contentLeft = activatorRect.left + activatorRect.width / 2 - popoverRect.width / 2
  }
  /**
   * We could also change the position using transform.
   * Such as return `transform: translateX(${contentLeft}px) translateY(${contentTop}px);`
   * However, I found that the dom delay is very serious.
   * So I decide to use left and top for now.
   */
  return [{ left: `${contentLeft}px`, top: `${contentTop}px` }, suggesetedTransfromOrigin]
}
