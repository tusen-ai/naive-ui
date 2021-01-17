export function call<A extends any[]> (
  funcs: Function[] | Function,
  ...args: A
): void {
  if (Array.isArray(funcs)) funcs.forEach((func) => call(func, ...args))
  else return funcs(...args)
}

export type MaybeArray<T> = T | T[]
