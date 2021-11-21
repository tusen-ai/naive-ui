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
abstract
```

## API

### Upload Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| abstract | `boolean` | `false` | Split the upload button (trigger) and file list as child components (`<n-upload-trigger />` and `<n-upload-file-list />`). Not supported for a `list-type` property of `image-card`. |
| accept | `string` | `undefined` | The upload accept attribute. See <n-a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept" target="_blank">accept</n-a>. |
| action | `string` | `undefined` | The URL to upload to. |
| create-thumbnail-url | `(file: File) => Promise<string>` | `undefined` | Thumbnail generation function. |
| data | `Object \| ({ file: UploadFileInfo }) => Object` | `undefined` | `data` field of the HTTP request's form data. |
| default-file-list | `Array<UploadFileInfo>` | `[]` | The default file list. |
| default-upload | `boolean` | `true` | Whether the file is uploaded immediately after it is selected. |
| disabled | `boolean` | `false` | Disabled state. |
| file-list-style | `Object` | `undefined` | File list area style. |
| file-list | `Array<UploadFileInfo>` | `undefined` | The uploaded file list. |
| headers | `Object \| ({ file: UploadFileInfo }) => Object` | `undefined` | The additional HTTP Headers for the request. |
| list-type | `string` | `'text'` | Built-in styles for file lists, `text`, `image` and `image-card`. |
| max | `number` | `undefined` | Uploaded files limit. |
| method | `string` | `'POST'` | The HTTP request method. |
| multiple | `boolean` | `false` | Allow multiple files to be selected. |
| name | `string` | `'file'` | The field name for the file(s) in the HTTP request's form data. |
| show-cancel-button | `boolean` | `true` | Show a cancel button (while uploading). Use the `on-remove` callback for this event. |
| show-remove-button | `boolean` | `true` | Show a remove button (after upload completed). Use the `on-remove` callback for this event. |
| show-retry-button | `boolean` | `true` | Show a retry button (for a failed upload). |
| show-file-list | `boolean` | `true` | Show a file list. |
| show-preview-button | `boolean` | `true` | Show a preview button (when `list-type` is `image-card`). Use the `on-preview` callback for this event. |
| with-credentials | `boolean` | `false` | Any credentials to be sent with the request (e.g. cookie). |
| on-change | `(options: { file: UploadFileInfo, fileList: Array<UploadFileInfo>, event?: Event }) => void` | `() => {}` | Uploaded file(s) status change callback. |
| on-update:file-list | `(fileList: UploadFileInfo[]) => void` | `undefined` | Callback function triggered on file-list changes. |
| on-finish | `(options: { file: UploadFileInfo, event: Event }) => UploadFileInfo \| void` | `({ file }) => file` | Upload finished callback. You can intercept and even modify the uploaded `UploadFileInfo`. |
| on-remove | `(options: { file: UploadFileInfo, fileList: Array<UploadFileInfo> }) => boolean \| Promise<boolean> \| any` | `() => true` | File removed callback. Returning `false`, a promise resolved with `false`, or a rejected promise will cancel this removal. |
| on-before-upload | `(options: { file: UploadFileInfo, fileList: Array<UploadFileInfo> }) => (Promise<boolean \| void> \| boolean \| void)` | `true` | Upload ready to start callback. Returning `false`, a promise resolved with `false`, or a rejected promise will cancel the upload. |
| on-preview | `(file: FileInfo) => void` | `undefined` | Callback for clicking file links or preview buttons. |

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
