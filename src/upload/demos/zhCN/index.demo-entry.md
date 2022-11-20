# 上传 Upload

如果不在意延迟，我更想用卡车和硬盘。

## 演示

```demo
basic.vue
drag.vue
submit-manually.vue
controlled.vue
on-finish.vue
download.vue
default-files.vue
before-upload.vue
image-style.vue
image-card-style.vue
custom-request.vue
abstract.vue
debug.vue
```

## API

### Upload Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| abstract | `boolean` | `false` | 是否不存在 DOM 包裹，不支持 `image-card` 类型的 Upload |  |
| accept | `string` | `undefined` | 接受的文件类型，参考 <n-a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept" target="_blank">accept</n-a> |  |
| action | `string` | `undefined` | 请求提交的地址 |  |
| create-thumbnail-url | `(file: File \| null, fileInfo: UploadSettledFileInfo) => (Promise<string> \| string \| undefined)` | `undefined` | 自定义文件缩略图，如果返回了 `undefined`，会使用默认的缩略图展示逻辑 | `fileInfo` 2.34.0 |
| custom-request | `(options: UploadCustomRequestOptions) => void` | `undefined` | 自定义上传方法，类型参考 <n-a href="#UploadCustomRequestOptions-Type">UploadCustomRequestOptions</n-a> |  |
| data | `Object \| ({ file: UploadFileInfo }) => Object` | `undefined` | 提交表单需要附加的数据 |  |
| default-file-list | `Array<UploadFileInfo>` | `[]` | 非受控状态下默认的文件列表 |  |
| default-upload | `boolean` | `true` | 选择文件时候是否默认上传 |  |
| disabled | `boolean` | `false` | 是否禁用 |  |
| directory | `boolean` | `false` | 是否支持目录上传（在文件选框中只能选择目录） | 2.28.3 |
| directory-dnd | `boolean` | `false` | 是否支持目录拖拽上传（如果不设定会默认跟随 `directory`） | 2.28.3 |
| file-list-style | `Object` | `undefined` | 文件列表区域的样式 |  |
| file-list | `Array<UploadFileInfo>` | `undefined` | 文件列表，如果传入组件会处于受控状态 |  |
| headers | `Object \| ({ file: UploadFileInfo }) => Object` | `undefined` | HTTP 请求需要附加的 Headers |  |
| image-group-props | `ImageGroupProps` | `undefined` | Upload 中预览图片组件的属性，参考 [ImageGroup Props](image#ImageGroup-Props) | 2.24.0 |
| input-props | `Object` | `undefined` | file input 元素的属性 | 2.24.2 |
| is-error-state | `(xhr: XMLHttpRequest) => boolean` | `undefined` | 判断请求是否为异常状态 | 2.29.1 |
| list-type | `string` | `'text'` | 文件列表的内建样式，`text`、`image` 和 `image-card` |  |
| max | `number` | `undefined` | 限制上传文件数量 |  |
| method | `string` | `'POST'` | HTTP 请求的方法 |  |
| multiple | `boolean` | `false` | 是否支持多个文件 |  |
| name | `string` | `'file'` | 文件在提交表单中的字段名 |  |
| render-icon | `(file: UploadSettledFileInfo) => VNodeChild` | `undefined` | 文件图标的渲染函数，在 `list-type="image"` 时生效 | 2.34.0 |
| response-type | `'' \| 'arraybuffer' \| 'blob' \| 'document' \| 'json' \| 'text'` | `''` | `n-upload` 使用的 `XMLHttpRequest` 的 `responseType` | 2.33.3 |
| should-use-thumbnail-url | `(file: UploadSettledFileInfo) => boolean` | 只对图片类文件返回 `true` 的函数 | 是否要对文件使用预览图的判定函数，只在 `list-type="image"` 或 `list-type="image-card"` 时生效 | 2.34.0 |
| show-cancel-button | `boolean` | `true` | 是否显示取消按钮（在 pending、uploading、error 的时候展示），点击取消按钮会触发 `on-remove` 回调 |  |
| show-download-button | `boolean` | `false` | 是否显示下载按钮（在 finished 后展示） |  |
| show-remove-button | `boolean` | `true` | 是否显示删除按钮（在 finished 后时候展示），点击删除按钮会触发 `on-remove` 回调 |  |
| show-retry-button | `boolean` | `true` | 是否显示重新上传按钮（在 error 时展示） |  |
| show-file-list | `boolean` | `true` | 是否显示文件列表 |  |
| show-preview-button | `boolean` | `true` | 是否允许显示预览按钮（在 `list-type` 为 `image-card` 时生效） |  |
| show-trigger | `boolean` | `true` | 是否显示触发元素 | 2.21.5 |
| trigger-style | `Object \| string` | `undefined` | 触发器区域的样式 | 2.29.1 |
| with-credentials | `boolean` | `false` | 是否携带 Cookie |  |
| on-change | `(options: { file: UploadFileInfo, fileList: Array<UploadFileInfo>, event?: Event }) => void` | `() => {}` | 组件状态变化的回调，组件的任何文件状态变化都会触发回调 |  |
| on-error | `(options: { file: UploadFileInfo, event?: ProgressEvent }) => UploadFileInfo \| void` | `undefined` | 文件上传失败的回调 | 2.24.0 |
| on-finish | `(options: { file: UploadFileInfo, event?: ProgressEvent }) => UploadFileInfo \| undefined` | `({ file }) => file` | 文件上传结束的回调，可以修改传入的 UploadFileInfo 或者返回一个新的 UploadFileInfo。注意：file 将会下一次事件循环中被置为 null |  |
| on-before-upload | `(options: { file: UploadFileInfo, fileList: UploadFileInfo[] }) => (Promise<boolean \| void> \| boolean \| void)` | `undefined` | 文件上传之前的回调，返回 `false`、`Promise resolve false`、`Promise rejected` 时会取消本次上传 |  |
| on-download | `(file: FileInfo) => void` | `undefined` | 点击文件下载按钮的回调函数 |  |
| on-preview | `(file: FileInfo) => void` | `undefined` | 点击文件链接或预览按钮的回调函数 |  |
| on-remove | `(options: { file: UploadFileInfo, fileList: Array<UploadFileInfo> }) => Promise<boolean> \| boolean \| any` | `() => true` | 文件删除回调，返回 `false`、`Promise resolve false`、`Promise rejected` 时会取消本次删除 |  |
| on-update:file-list | `(fileList: UploadFileInfo[]) => void` | `undefined` | 当 file-list 改变时触发的回调函数 |  |

#### UploadFileInfo Type

| 属性 | 类型 | 说明 | 版本 |
| --- | --- | --- | --- |
| id | `string` | 文件 id，需要唯一。请注意不要修改它，如果你需要保存一些对应的数据，可以建立一个 Map 对象来保存 |  |
| name | `string` | 文件名 |  |
| status | `'pending' \| 'uploading' \| 'error' \| 'finished' \| 'removed'` | 上传的状态 |  |
| batchId? | `string \| null` | 上传批次的 id，在同一次上传被选择的文件会拥有一样的 `batchId` | 2.28.3 |
| file? | `File \| null` | 文件对应的浏览器 File 对象 |  |
| fullPath? | `string \| null` | 上传文件的相对路径 | 2.28.3 |
| percentage? | `number \| null` | 文件上传进度百分比，在 uploading 状态下生效 |  |
| thumbnailUrl? | `string \| null` | 缩略图 URL |  |
| type? | `string \| null` | MIME 类型 |  |
| url? | `string \| null` | 文件下载 URL |  |

### UploadTrigger Props

| 名称     | 类型      | 默认值  | 说明                |
| -------- | --------- | ------- | ------------------- |
| abstract | `boolean` | `false` | 是否不存在 DOM 包裹 |

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

| 名称 | 类型 | 说明 | 版本 |
| --- | --- | --- | --- |
| clear | `() => void` | 清空上传列表 | 2.24.2 |
| openOpenFileDialog | `() => void` | 打开文件选择对话框 |  |
| submit | `(fileId?: string \| number)` | 提交当前所有处于 pending 状态的文件 |  |

### Upload Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | `()` | 上传的内容 |

### UploadDragger Slots

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| default | `()` | 上传拖动器的内容，使用可参考<n-a href="#drag">拖拽上传</n-a> |

### UploadTrigger Slots

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| default | `(options: { handleClick: () => void, handleDragOver: (e: DragEvent) => void, handleDragEnter: (e: DragEvent) => void, handleDragLeave: (e: DragEvent) => void, handleDrop: (e: DragEvent) => void})` | `handleClick` 为点击上传函数，`handleDrop` 为拖拽上传函数，`handleDragEnter`、`handleDragOver` 和 `handleDragLeave` 为拖拽事件函数 |
