const smallerSizeMap = {
  tiny: 'mini',
  small: 'tiny',
  medium: 'small',
  large: 'medium',
  huge: 'large'
} as const

const largerSizeMap = {
  tiny: 'small',
  small: 'medium',
  medium: 'large',
  large: 'huge'
} as const

type SmallerSizeMap = typeof smallerSizeMap
type SmallerSize = keyof SmallerSizeMap

type LargerSizeMap = typeof largerSizeMap
type LargerSize = keyof LargerSizeMap

export function largerSize<T extends LargerSize>(size: T): LargerSizeMap[T] {
  const result = largerSizeMap[size]

  if (result === undefined) {
    throw new Error(`${size} has no larger size.`)
  }

  return result
}

export function smallerSize<T extends SmallerSize>(size: T): SmallerSizeMap[T] {
  const result = smallerSizeMap[size]

  if (result === undefined) {
    throw new Error(`${size} has no smaller size.`)
  }

  return result
}
