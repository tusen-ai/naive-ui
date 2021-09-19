# Upload

If latency doesn't matters, I'd like to use trucks with many hard disks.

## Demos

```demo
basic
drag
submit-manually
controlled
on-finish
default-files
before-upload
image-style
image-card-style
abstract
```

## API

### Upload Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| abstract | `boolean` | `false` | Whether or not DOM wrapping does not exist. Not supported for `image-card` type. |
| accept | `string` | `undefined` | The accept type of upload. See <n-a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept">accept</n-a>. |
| action | `string` | `undefined` | The URL to submit data to. |
| create-thumbnail-url | `(file: File) => Promise<string>` | `undefined` | Customize file thumbnails. |
| data | `Object \| ({ file: UploadFileInfo }) => Object` | `undefined` | The additional fileds data of HTTP request's form data. |
| default-file-list | `Array<UploadFileInfo>` | `[]` | The default file list in uncontrolled manner. |
| default-upload | `boolean` | `false` | If file uploaded immediatelly after file is selected. |
| disabled | `boolean` | `false` | Whether to disable the upload. |
| file-list-style | `Object` | `undefined` | The style of file list area |
| file-list | `Array<UploadFileInfo>` | `undefined` | The file list of component. If set, the component will work in controlled manner. |
| headers | `Object \| ({ file: UploadFileInfo }) => Object` | `undefined` | The additional HTTP Headers of request. |
| list-type | `string` | `'text'` | Built-in styles for file lists, `text`, `image` and `image-card`. |
| method | `string` | `'POST'` | The method of HTTP request. |
| multiple | `boolean` | `false` | If multiple files selection supported. |
| name | `string` | `'file'` | The field name of file in form data. |
| show-cancel-button | `boolean` | `true` | Whether to show remove button (at file pending, uploadin, error status). Click on cancel button will fire `on-remove` callback. |
| show-remove-button | `boolean` | `true` | Whether to show remove button (at file finished status). Click on remove button will fire `on-remove` callback. |
| show-retry-button | `boolean` | `true` | Whether to show retry button (at file error status). |
| show-file-list | `boolean` | `true` | Whether to show file list. |
| show-preview-button | `boolean` | `true` | Whether it is available to show the preview button (when `list-type` is `image-card`). |
| with-credentials | `boolean` | `false` | If cookie attached. |
| on-change | `(options: { file: UploadFileInfo, fileList: Array<UploadFileInfo>, event?: Event }) => void` | `() => {}` | The callback of status change of the component. Any file status change would fire the callback. |
| on-update:file-list | `(fileList: UploadFileInfo[]) => void` | `undefined` | Callback function triggered on fileList changes. |
| on-finish | `(options: { file: UploadFileInfo, event: Event }) => UploadFileInfo \| void` | `({ file }) => file` | The callback of file upload finish. You can modify the UploadFileInfo or retun a new UploadFileInfo. |
| on-remove | `(options: { file: UploadFileInfo, fileList: Array<UploadFileInfo> }) => boolean \| Promise<boolean> \| any` | `() => true` | The callback of file removal. Return false, promise resolve false or promise reject will cancel this removal. |
| on-before-upload | `(options: { file: UploadFileInfo, fileList: Array<UploadFileInfo> }) => (Promise<boolean \| void> \| boolean \| void)` | `true` | Callback before file is uploaded, return false or a Promise that resolve false or reject will cancel this upload. |
| on-preview | `(file: FileInfo) => void` | `undefined` | Callback functions for clicking on file links or preview buttons. |

#### UploadFileInfo Type

| Property | Type | Description |
| --- | --- | --- |
| id | `string \| number` | The id of the file. Need to be unique. |
| name | `string` | File name. |
| status | `'pending' \| 'uploading' \| 'error' \| 'finished' \| 'removed'` | The status of file. |
| percentage | `number` | The progress percentage of file upload. It works when file is uploading. |
| file? | `File \| null` | The File object of the file in brower. |
| thumbnailUrl? | `string \| null` | Thumbnail URL. |
| type? | `string \| null` | MIME type. |
| url? | `string \| null` | File URL. |

### UploadTrigger Props

| Name     | Type      | Default | Description                                 |
| -------- | --------- | ------- | ------------------------------------------- |
| abstract | `boolean` | `false` | Whether or not DOM wrapping does not exist. |

### Upload Methods

| Name | Type | Description |
| --- | --- | --- |
| submit | `(fileId?: string \| number)` | Submit all files in pending statis. |
| openFileDialog | `() => void` | Open file dialog. |

### Upload Slots

| Name    | Parameters | Description                |
| ------- | ---------- | -------------------------- |
| default | `()`       | The content of the upload. |

### UploadDragger Slots

| Name | Parameters | Description |
| --- | --- | --- |
| default | `()` | The content of the upload dragger, use can refer to [Drag to Upload](#drag). |

### UploadTrigger Slots

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| default | `(options: { handleClick: () => void, handleDragOver: (e: DragEvent) => void, handleDragEnter: (e: DragEvent) => void, handleDragLeave: (e: DragEvent) => void, handleDrop: (e: DragEvent) => void})` | `handleClick` is the click upload function, `handleDrop` is the drag and drop upload function, `handleDragEnter`, `handleDragOver` and `handleDragLeave` are the drag and drop event functions. |
