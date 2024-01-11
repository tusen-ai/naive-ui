export const download = (
  url: string | null,
  name: string | undefined
): void => {
  if (!url) return
  const a = document.createElement('a')
  a.href = url
  if (name !== undefined) {
    a.download = name
  }
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
