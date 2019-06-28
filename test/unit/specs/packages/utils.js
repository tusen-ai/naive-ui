function existsInClassList (el, string) {
  return Array.from(el.classList).some(className => 1 + className.search(string))
}

export { existsInClassList }
