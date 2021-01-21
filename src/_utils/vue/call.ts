function call (funcs: MaybeArray<() => void>): void
function call<A1> (funcs: MaybeArray<(a1: A1) => void>, a1: A1): void
function call<A1, A2> (
  funcs: MaybeArray<(a1: A1, a2: A2) => void>,
  a1: A1,
  a2: A2
): void
function call<A1, A2, A3> (
  funcs: MaybeArray<(a1: A1, a2: A2, a3: A3) => void>,
  a1: A1,
  a2: A2,
  a3: A3
): void
function call<A extends any[]> (funcs: Function[] | Function, ...args: A): void {
  if (Array.isArray(funcs)) {
    funcs.forEach((func) => (call as any)(func, ...args))
  } else return funcs(...args)
}

export { call }

export type MaybeArray<T> = T | T[]
