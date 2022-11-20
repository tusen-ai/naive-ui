import { isBrowser } from '../../_utils'
import type {
  FileAndEntry,
  FileInfo,
  SettledFileInfo,
  ShouldUseThumbnailUrl
} from './interface'

export const isImageFileType = (type: string): boolean =>
  type.includes('image/')

const getExtname = (url: string = ''): string => {
  const temp = url.split('/')
  const filename = temp[temp.length - 1]
  const filenameWithoutSuffix = filename.split(/#|\?/)[0]
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0]
}

// Do not need File object
export const isImageFile: ShouldUseThumbnailUrl = (file) => {
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
  return false
}

export async function createImageDataUrl (file: File): Promise<string> {
  return await new Promise((resolve) => {
    if (!file.type || !isImageFileType(file.type)) {
      resolve('')
      return
    }
    resolve(window.URL.createObjectURL(file))
  })
}

export const environmentSupportFile =
  isBrowser && window.FileReader && window.File

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
            fileAndEntries.push({ file, entry, source: 'dnd' })
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

/**
 * This is a rather simple version. I may fix it later to make it more accurate.
 * I've looked at https://github.com/broofa/mime, however it doesn't has a esm
 * version, so I can't simply use it.
 */
export function matchType (
  name: string,
  mimeType: string,
  accept: string
): boolean {
  name = name.toLowerCase()
  mimeType = mimeType.toLocaleLowerCase()
  accept = accept.toLocaleLowerCase()
  const acceptAtoms = accept
    .split(',')
    .map((acceptAtom) => acceptAtom.trim())
    .filter(Boolean)
  return acceptAtoms.some((acceptAtom) => {
    if (acceptAtom.startsWith('.')) {
      // suffix
      if (name.endsWith(acceptAtom)) return true
    } else if (acceptAtom.includes('/')) {
      // mime type
      const [type, subtype] = mimeType.split('/')
      const [acceptType, acceptSubtype] = acceptAtom.split('/')
      if (acceptType === '*' || (type && acceptType && acceptType === type)) {
        if (
          acceptSubtype === '*' ||
          (subtype && acceptSubtype && acceptSubtype === subtype)
        ) {
          return true
        }
      }
    } else {
      // invalid type
      return true
    }
    return false
  })
}

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
