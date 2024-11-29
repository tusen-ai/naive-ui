import { isArray, isString } from 'lodash-es'

export function mergeClass(
  ...args: Array<string | undefined | boolean | (string | undefined)[]>
) {
  return args
    .reduce<Array<string | undefined>>((p, c) => {
      if (isString(c)) {
        p.push(c)
      }
      if (isArray(c)) {
        p.push(...c)
      }
      return p
    }, [])
    .filter(Boolean)
    .join(' ')
}
