# Upload

If latency didn't matter, I'd just fill trucks with hard disks.

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
custom-request
abstract
download
```

## API

### Upload Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| abstract | `boolean` | `false` | Whether or not DOM wrapping does not exist. Not supported for `image-card` type. |  |
| accept | `string` | `undefined` | The accept type of upload. See <n-a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept" target="_blank">accept</n-a>. |  |
| action | `string` | `undefined` | The URL to submit data to. |  |
| create-thumbnail-url | `(file: File) => Promise<string>` | `undefined` | Customize file thumbnails. |  |
| custom-request | `(options: UploadCustomRequestOptions) => void` | `undefined` | Customize upload request. For types, see <n-a href="#UploadCustomRequestOptions-Type">UploadCustomRequestOptions</n-a> |  |
| data | `Object \| ({ file: UploadFileInfo }) => Object` | `undefined` | The additional fileds data of HTTP request's form data. |  |
| default-file-list | `Array<UploadFileInfo>` | `[]` | The default file list in uncontrolled manner. |  |
| default-upload | `boolean` | `false` | If file uploaded immediatelly after file is selected. |  |
| disabled | `boolean` | `false` | Whether to disable the upload. |  |
| file-list-style | `Object` | `undefined` | The style of file list area |  |
| file-list | `Array<UploadFileInfo>` | `undefined` | The file list of component. If set, the component will work in controlled manner. |  |
| headers | `Object \| ({ file: UploadFileInfo }) => Object` | `undefined` | The additional HTTP Headers of request. |  |
| list-type | `string` | `'text'` | Built-in styles for file lists, `text`, `image` and `image-card`. |  |
| max | `number` | `undefined` | Uploaded files limit. |  |
| method | `string` | `'POST'` | The HTTP request method. |  |
| multiple | `boolean` | `false` | Allow multiple files to be selected. |  |
| name | `string` | `'file'` | The field name for the file(s) in the HTTP request's form data. |  |
| show-cancel-button | `boolean` | `true` | Show a cancel button (while uploading). Use the `on-remove` callback for this event. |  |
| show-download-button | `boolean` | `false` | Show a download button (after upload is finished). |  |
| show-file-list | `boolean` | `true` | Show a file list. |  |
| show-preview-button | `boolean` | `true` | Show a preview button (when `list-type` is `image-card`). Use the `on-preview` callback for this event. |  |
| show-remove-button | `boolean` | `true` | Show a remove button (after upload completed). Use the `on-remove` callback for this event. |  |
| show-retry-button | `boolean` | `true` | Show a retry button (for a failed upload). |  |
| show-trigger | `boolean` | `true` | Show upload trigger. | 2.21.5 |
| with-credentials | `boolean` | `false` | Any credentials to be sent with the request (e.g. cookie). |  |
| on-change | `(options: { file: UploadFileInfo, fileList: Array<UploadFileInfo>, event?: Event }) => void` | `() => {}` | Uploaded file(s) status change callback. |  |
| on-update:file-list | `(fileList: UploadFileInfo[]) => void` | `undefined` | Callback function triggered on file-list changes. |  |
| on-finish | `(options: { file: UploadFileInfo, event?: Event }) => UploadFileInfo \| void` | `({ file }) => file` | Upload finished callback. You can intercept and even modify the uploaded `UploadFileInfo`. Note: file will be null in next event-loop |  |
| on-before-upload | `(options: { file: UploadFileInfo, fileList: Array<UploadFileInfo> }) => (Promise<boolean \| void> \| boolean \| void)` | `true` | Upload ready to start callback. Returning `false`, a promise resolved with `false`, or a rejected promise will cancel the upload. |  |
| on-download | `(file: FileInfo) => void` | `undefined` | Callback for clicking download buttons. |  |
| on-preview | `(file: FileInfo) => void` | `undefined` | Callback for clicking file links or preview buttons. |  |
| on-remove | `(options: { file: UploadFileInfo, fileList: Array<UploadFileInfo> }) => Promise<boolean> \| boolean \| any` | `() => true` | File removed callback. Returning `false`, a promise resolved with `false`, or a rejected promise will cancel this removal. |  |

#### UploadFileInfo Type

| Property | Type | Description |
| --- | --- | --- |
| id | `string \| number` | Unique file ID. |
| name | `string` | Filename. |
| status | `'pending' \| 'uploading' \| 'error' \| 'finished' \| 'removed'` | The status of file. |
| percentage | `number` | The progress percentage of the file being uploaded. |
| file? | `File \| null` | The object of the file stored in the browser. |
| thumbnailUrl? | `string \| null` | Thumbnail URL. |
| type? | `string \| null` | MIME type. |
| url? | `string \| null` | File URL. |

### UploadTrigger Props

| Name     | Type      | Default | Description                                |
| -------- | --------- | ------- | ------------------------------------------ |
| abstract | `boolean` | `false` | Whether or not to use the `abstract` mode. |

#### UploadCustomRequestOptions Type

```__ts
interface UploadCustomRequestOptions {
  file: FileInfo
  action?: string
  data?:
    | Record<string, string>
    | (({ file }: { file: FileInfo }) => Record<string, string>)
  withCredentials?: boolean
  headers?:
    | Record<string, string>
    | (({ file }: { file: FileInfo }) => Record<string, string>)
  onProgress: (e: { percent: number }) => void
  onFinish: () => void
  onError: () => void
}
```

### Upload Methods

| Name | Type | Description |
| --- | --- | --- |
| submit | `(fileId?: string \| number)` | Submit all files with pending status. |
| openOpenFileDialog | `() => void` | Open the file dialog window. |

### Upload Slots

| Name    | Parameters | Description                |
| ------- | ---------- | -------------------------- |
| default | `()`       | The content of the upload. |

### UploadDragger Slots

| Name | Parameters | Description |
| --- | --- | --- |
| default | `()` | The placeholder of the upload dragger; For an example see <n-a href="#drag">Drag to Upload Demo</n-a>. |

### UploadTrigger Slots

| Name | Parameters | Description |
| --- | --- | --- |
| default | `(options: { handleClick: () => void, handleDragOver: (e: DragEvent) => void, handleDragEnter: (e: DragEvent) => void, handleDragLeave: (e: DragEvent) => void, handleDrop: (e: DragEvent) => void})` | `handleClick` is the click upload function, `handleDrop` is the drag and drop upload function, `handleDragEnter`, `handleDragOver` and `handleDragLeave` are the drag and drop event functions. |
