let _isJsdom: boolean | undefined

export function isJsdom (): boolean {
  if (_isJsdom === undefined) {
    _isJsdom =
      navigator.userAgent.includes('Node.js') ||
      navigator.userAgent.includes('jsdom')
  }
  return _isJsdom
}
