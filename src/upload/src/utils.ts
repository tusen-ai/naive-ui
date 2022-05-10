import type { FileAndEntry, FileInfo, SettledFileInfo } from './interface'

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

export function isFileSystemDirectoryEntry (
  item: FileSystemEntry | FileSystemFileEntry | FileSystemDirectoryEntry
): item is FileSystemDirectoryEntry {
  return item.isDirectory
}

export function isFileSystemFileEntry (
  item: FileSystemEntry | FileSystemFileEntry | FileSystemDirectoryEntry
): item is FileSystemFileEntry {
  return item.isFile
}

export async function getFilesFromEntries (
  entries: readonly FileSystemEntry[] | Array<FileSystemEntry | null>,
  directory: boolean
): Promise<FileAndEntry[]> {
  const fileAndEntries: FileAndEntry[] = []
  let _resolve: (fileAndEntries: FileAndEntry[]) => void
  let requestCallbackCount = 0
  function lock (): void {
    requestCallbackCount++
  }
  function unlock (): void {
    requestCallbackCount--
    if (!requestCallbackCount) {
      _resolve(fileAndEntries)
    }
  }
  function _getFilesFromEntries (
    entries: readonly FileSystemEntry[] | Array<FileSystemEntry | null>
  ): void {
    entries.forEach((entry) => {
      if (!entry) return
      lock()
      if (directory && isFileSystemDirectoryEntry(entry)) {
        const directoryReader = entry.createReader()
        lock()
        directoryReader.readEntries(
          (entries) => {
            _getFilesFromEntries(entries)
            unlock()
          },
          () => {
            unlock()
          }
        )
      } else if (isFileSystemFileEntry(entry)) {
        lock()
        entry.file(
          (file) => {
            fileAndEntries.push({ file, entry })
            unlock()
          },
          () => {
            unlock()
          }
        )
      }
      unlock()
    })
  }
  await new Promise<FileAndEntry[]>((resolve) => {
    _resolve = resolve
    _getFilesFromEntries(entries)
  })
  return fileAndEntries
}

export function createSettledFileInfo (fileInfo: FileInfo): SettledFileInfo {
  const {
    id,
    name,
    percentage,
    status,
    url,
    file,
    thumbnailUrl,
    type,
    fullPath,
    batchId
  } = fileInfo
  return {
    id,
    name,
    percentage: percentage ?? null,
    status,
    url: url ?? null,
    file: file ?? null,
    thumbnailUrl: thumbnailUrl ?? null,
    type: type ?? null,
    fullPath: fullPath ?? null,
    batchId: batchId ?? null
  }
}
