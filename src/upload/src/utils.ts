import { FileInfo } from './interface'

export const isImageFileType = (type: string): boolean =>
  type.includes('image/')

const getExtname = (url: string = ''): string => {
  const temp = url.split('/')
  const filename = temp[temp.length - 1]
  const filenameWithoutSuffix = filename.split(/#|\?/)[0]
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0]
}

export const isImageFile = (file: FileInfo): boolean => {
  if (file.type) {
    return isImageFileType(file.type)
  }
  const url: string = file.thumbnailUrl || file.url || ''
  const extension = getExtname(url)
  if (
    /^data:image\//.test(url) ||
    /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico)$/i.test(extension)
  ) {
    return true
  }
  if (/^data:/.test(url)) {
    return false
  }
  if (extension) {
    return false
  }

  return true
}

export async function createImageDataUrl (file: File): Promise<string> {
  return await new Promise((resolve) => {
    if (!file.type || !isImageFileType(file.type)) {
      resolve('')
      return
    }

    const img = new Image()
    img.src = window.URL.createObjectURL(file)
    img.onload = () => {
      const { width, height } = img
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = width
      canvas.height = height
      canvas.style.cssText = `position: fixed; left: 0; top: 0; width: ${width}px; height: ${height}px; z-index: 9999; display: none;`
      document.body.appendChild(canvas)

      ctx?.drawImage(img, 0, 0, width, height)
      const dataURL = canvas.toDataURL()
      document.body.removeChild(canvas)

      resolve(dataURL)
    }
  })
}

export const environmentSupportFile =
  typeof document !== 'undefined' &&
  typeof window !== 'undefined' &&
  window.FileReader &&
  window.File
