export function call (funcs, ...args) {
  if (Array.isArray(funcs)) funcs.forEach((func) => call(func, ...args))
  else return funcs(...args)
}
