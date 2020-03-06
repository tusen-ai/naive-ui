const oppositeDirection = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left'
}

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
}

export function getTransformOriginByPlacement (placement) {
  return placementToTransformOrigin[placement] || null
}

export function getPosition (placement, offsetContainerRect, trackedRect) {
  const offset = {
    top: null,
    bottom: null,
    left: null,
    right: null,
    transform: null
  }
  if (placement === 'bottom-start') {
    offset.top = (trackedRect.top - offsetContainerRect.top + trackedRect.height) + 'px'
    offset.left = (trackedRect.left - offsetContainerRect.left) + 'px'
  } else if (placement === 'bottom-end') {
    offset.top = (trackedRect.top - offsetContainerRect.top + trackedRect.height) + 'px'
    offset.left = (trackedRect.left - offsetContainerRect.left + trackedRect.width) + 'px'
    offset.transform = 'translateX(-100%)'
  } else if (placement === 'top-start') {
    offset.top = (trackedRect.top - offsetContainerRect.top) + 'px'
    offset.left = (trackedRect.left - offsetContainerRect.left) + 'px'
    offset.transform = 'translateY(-100%)'
  } else if (placement === 'top-end') {
    offset.top = (trackedRect.top - offsetContainerRect.top) + 'px'
    offset.left = (trackedRect.left - offsetContainerRect.left + trackedRect.width) + 'px'
    offset.transform = 'translateY(-100%) translateX(-100%)'
  } else if (placement === 'right-start') {
    offset.top = (trackedRect.top - offsetContainerRect.top) + 'px'
    offset.left = (trackedRect.left - offsetContainerRect.left + trackedRect.width) + 'px'
  } else if (placement === 'right-end') {
    offset.top = (trackedRect.top - offsetContainerRect.top + trackedRect.height) + 'px'
    offset.left = (trackedRect.left - offsetContainerRect.left + trackedRect.width) + 'px'
    offset.transform = 'translateY(-100%)'
  } else if (placement === 'left-start') {
    offset.top = (trackedRect.top - offsetContainerRect.top) + 'px'
    offset.left = (trackedRect.left - offsetContainerRect.left) + 'px'
    offset.transform = 'translateX(-100%)'
  } else if (placement === 'left-end') {
    offset.top = (trackedRect.top - offsetContainerRect.top + trackedRect.height) + 'px'
    offset.left = (trackedRect.left - offsetContainerRect.left) + 'px'
    offset.transform = 'translateX(-100%) translateY(-100%)'
  } else if (placement === 'top') {
    offset.top = (trackedRect.top - offsetContainerRect.top) + 'px'
    offset.left = (trackedRect.left - offsetContainerRect.left + trackedRect.width / 2) + 'px'
    offset.transform = 'translateX(-50%) translateY(-100%)'
  } else if (placement === 'right') {
    offset.top = (trackedRect.top - offsetContainerRect.top + trackedRect.height / 2) + 'px'
    offset.left = (trackedRect.left - offsetContainerRect.left + trackedRect.width) + 'px'
    offset.transform = 'translateY(-50%)'
  } else if (placement === 'bottom') {
    offset.top = (trackedRect.top - offsetContainerRect.top + trackedRect.height) + 'px'
    offset.left = (trackedRect.left - offsetContainerRect.left + trackedRect.width / 2) + 'px'
    offset.transform = 'translateX(-50%)'
  } else if (placement === 'left') {
    offset.top = (trackedRect.top - offsetContainerRect.top + trackedRect.height / 2) + 'px'
    offset.left = (trackedRect.left - offsetContainerRect.left) + 'px'
    offset.transform = 'translateX(-100%) translateY(-50%)'
  } else {
    console.error(
      '[naive-ui/mixins/placeable]: Placement %s is not supported.',
      placement
    )
  }
  return offset
}
