import getScrollParent from './dom/getScrollParent'

const isObject = (o) => {
  let type = Object.prototype.toString.call(o)
  return type === '[object Array]' || type === '[object Object]'
}

const _isObject = (o) => {
  return (typeof o === 'object' || typeof o === 'function') && o !== null
}

const deepClone = (obj) => {
  if (!isObject(obj)) {
    return obj
  }

  let isArray = Array.isArray(obj)
  let cloneObj = isArray ? [] : {}
  for (let key in obj) {
    cloneObj[key] = _isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
  }

  return cloneObj
}

const getObjValue = (obj, keys) => {
  return keys.reduce((res, n) => (res !== undefined && res[n] !== undefined ? res[n] : null), obj)
}

export {
  getScrollParent,
  deepClone,
  getObjValue
}
