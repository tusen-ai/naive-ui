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

export function smallerSize (
  size: 'small' | 'medium' | 'large' | 'huge'
): 'tiny' | 'small' | 'medium' | 'large' {
  switch (size) {
    case 'small':
      return 'tiny'
    case 'medium':
      return 'small'
    case 'large':
      return 'medium'
    case 'huge':
      return 'large'
  }
}
