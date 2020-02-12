const oppositeDirection = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left'
}

// const adjacentDirections = {
//   top: ['left', 'right'],
//   right: ['top', 'bottom'],
//   bottom: ['left', 'right'],
//   left: ['top', 'bottom']
// }

const lengthToCompare = {
  top: 'height',
  bottom: 'height',
  left: 'width',
  right: 'width'
}

const placementToTransformOrigin = {
  'bottom-start': 'top left',
  'bottom': 'top center',
  'bottom-end': 'top right',
  'top-start': 'bottom left',
  'top': 'bottom',
  'top-end': 'bottom right',
  'right-start': 'top left',
  'right': 'center left',
  'right-end': 'bottom left',
  'left-start': 'top right',
  'left': 'center right',
  'left-end': 'bottom right'
}

const positionDirections = {
  'bottom-start': 'right',
  'bottom-end': 'left',
  'top-start': 'right',
  'top-end': 'left',
  'right-start': 'bottom',
  'right-end': 'top',
  'left-start': 'bottom',
  'left-end': 'top'
}
const oppositePosition = {
  'start': 'end',
  'end': 'start'
}

export function getAdjustedPlacementOfTrackingElement (placement, trackedRect, trackingRect, flip) {
  if (!flip) {
    return placement
  }
  const [direction, position] = placement.split('-')
  let adjustedPosition = position
  if (position) {
    const adjacentPositionDirection = positionDirections[placement]
    if (trackingRect[lengthToCompare[adjacentPositionDirection]] > trackedRect[lengthToCompare[adjacentPositionDirection]]) {
      if (trackedRect[adjacentPositionDirection] + trackedRect[lengthToCompare[adjacentPositionDirection]] <= trackingRect[lengthToCompare[adjacentPositionDirection]]) {
        adjustedPosition = oppositePosition[position]
      }
    } else if (trackingRect[lengthToCompare[adjacentPositionDirection]] < trackedRect[lengthToCompare[adjacentPositionDirection]]) {
      if (trackedRect[oppositeDirection[adjacentPositionDirection]] < 0 && trackedRect[adjacentPositionDirection] > 0) {
        adjustedPosition = oppositePosition[position]
      }
    }
  }
  if (trackedRect[direction] >= trackingRect[lengthToCompare[direction]]) {
    return adjustedPosition ? (direction + '-' + adjustedPosition) : direction
  } else if (trackedRect[oppositeDirection[direction]] >= trackingRect[lengthToCompare[direction]]) {
    return adjustedPosition ? `${oppositeDirection[direction]}-${adjustedPosition}` : oppositeDirection[direction]
  } else {
    return adjustedPosition ? (direction + '-' + adjustedPosition) : direction
  }
  // else {
  //   const [direction1, direction2] = adjacentDirections[direction]
  //   let adjacentDirectionWithMoreSpace = direction1
  //   if (trackedRect[direction1] < trackedRect[direction2]) {
  //     adjacentDirectionWithMoreSpace = direction2
  //   }
  //   if (trackedRect[adjacentDirectionWithMoreSpace] < trackingRect[lengthToCompare[adjacentDirections]]) {
  //     /**
  //      * If no direction has required space, simply not flip tracking element to any side.
  //      */
  //     return placement
  //   }
  //   return adjacentDirectionWithMoreSpace
  // }
}

export function getTransformOriginByPlacement (placement) {
  return placementToTransformOrigin[placement] || null
}

export function getPosition (placement, trackedRect, trackingRect) {
  const position = {
    left: null,
    right: null,
    top: null,
    bottom: null
  }
  switch (placement) {
    case 'bottom-start':
      position.top = trackedRect.top + trackedRect.height
      position.left = trackedRect.left
      break
    case 'bottom':
      position.top = trackedRect.top + trackedRect.height
      position.left = trackedRect.left + trackedRect.width / 2 - trackingRect.width / 2
      break
    case 'bottom-end':
      position.top = trackedRect.top + trackedRect.height
      position.left = trackedRect.left + trackedRect.width - trackingRect.width
      break
    case 'top-start':
      position.top = trackedRect.top - trackingRect.height
      position.left = trackedRect.left
      break
    case 'top':
      position.top = trackedRect.top - trackingRect.height
      position.left = trackedRect.left + trackedRect.width / 2 - trackingRect.width / 2
      break
    case 'top-end':
      position.top = trackedRect.top - trackingRect.height
      position.left = trackedRect.left + trackedRect.width - trackingRect.width
      break
    case 'left-start':
      position.top = trackedRect.top
      position.left = trackedRect.left - trackingRect.width
      break
    case 'left':
      position.top = trackedRect.top + trackedRect.height / 2 - trackingRect.height / 2
      position.left = trackedRect.left - trackingRect.width
      break
    case 'left-end':
      position.top = trackedRect.top + trackedRect.height - trackingRect.height
      position.left = trackedRect.left - trackingRect.width
      break
    case 'right-start':
      position.top = trackedRect.top
      position.left = trackedRect.left + trackedRect.width
      break
    case 'right':
      position.top = trackedRect.top + trackedRect.height / 2 - trackingRect.height / 2
      position.left = trackedRect.left + trackedRect.width
      break
    case 'right-end':
      position.top = trackedRect.top + trackedRect.height - trackingRect.height
      position.left = trackedRect.left + trackedRect.width
      break
  }
  if (position.left !== null) position.left = position.left + 'px'
  if (position.right !== null) position.right = position.right + 'px'
  if (position.top !== null) position.top = position.top + 'px'
  if (position.bottom !== null) position.bottom = position.bottom + 'px'
  return position
}
