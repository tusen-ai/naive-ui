function getTheme (cursor) {
  while (cursor) {
    if (cursor.syntheticTheme) return cursor.syntheticTheme
    cursor = cursor.$parent
  }
  return null
}

export default getTheme
