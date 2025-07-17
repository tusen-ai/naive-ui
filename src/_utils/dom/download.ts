export function download(url: string | null, name: string | undefined): void {
  if (!url)
    return
  const a = document.createElement('a')
  a.href = url
  if (name !== undefined) {
    a.download = name
  }
  else {
    const urlWithoutQuery = url.split('?')[0]
    const parts = urlWithoutQuery.split('/')
    const filename = parts[parts.length - 1]
    a.download = filename
  }
  if (url.startsWith('http') || url.startsWith('blob')) {
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
  else {
    fetch(url)
      .then(res => res.blob())
      .then((blob) => {
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(objectUrl)
      })
      .catch((err) => {
        console.error('Error fetching file:', err)
      })
  }
}

export function publicDownload(url: string, name: string | undefined): void {
  download(url, name)
}
