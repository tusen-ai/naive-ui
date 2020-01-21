function getTranslateYOfItem (el) {
  const styleTransform = el.parentElement.style.transform
  const translateY = /translateY\((\d+)/.exec(styleTransform)[1]
  return Number(translateY)
}

export {
  getTranslateYOfItem
}
