function getTheme (cursor) {
  while (cursor) {
    if (cursor.synthesizedTheme) return cursor.synthesizedTheme
    cursor = cursor.$parent
  }
  return null
}

export default getTheme
