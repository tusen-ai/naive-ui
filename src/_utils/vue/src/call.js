export function call (funcs, ...args) {
  if (Array.isArray(funcs)) funcs.forEach(func => func(...args))
  funcs(...args)
}
