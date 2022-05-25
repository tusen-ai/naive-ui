export function largerSize (
  size: 'tiny' | 'small' | 'medium' | 'large'
): 'small' | 'medium' | 'large' | 'huge' {
  switch (size) {
    case 'tiny':
      return 'small'
    case 'small':
      return 'medium'
    case 'medium':
      return 'large'
    case 'large':
      return 'huge'
  }
}

interface SmallerSizeMap {
  tiny: 'mini'
  small: 'tiny'
  medium: 'small'
  large: 'medium'
  huge: 'large'
}

type SmallerSize<T extends keyof SmallerSizeMap> = SmallerSizeMap[T]

export function smallerSize<T extends keyof SmallerSizeMap> (
  size: T
): SmallerSize<T> {
  switch (size) {
    case 'tiny':
      return 'mini' as any
    case 'small':
      return 'tiny' as any
    case 'medium':
      return 'small' as any
    case 'large':
      return 'medium' as any
    case 'huge':
      return 'large' as any
  }
  throw Error(`${size} has no smaller size.`)
}
