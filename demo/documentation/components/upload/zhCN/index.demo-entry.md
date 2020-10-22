# 上传 Upload
如果不在意延迟，我更想用卡车和硬盘。
## 演示
```demo
basic
drag
submit-manually
controlled
on-finish
default-files
```
## Props
### Upload Props
|名称|类型|默认值|说明|
|-|-|-|-|
|accept|`string`|`null`|接受的文件类型，参考 <n-a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept">accept</n-a>|
|action|`string`|`null`|请求提交的地址|
|data|`Object \| ({ file: UploadFile }) => Object`|`null`|提交表单需要附加的数据|
|default-file-list|`Array<UploadFile>`|`[]`|非受控状态下默认的文件列表|
|default-upload|`boolean`|`false`|选择文件时候是否默认上传|
|directory|`boolean`|`false`|是否支持目录上传，需要浏览器支持，参考 <n-a href="https://caniuse.com/#feat=input-file-directory">input-file-directory</n-a>|
|disabled|`boolean`|`false`||
|file-list-style|`Object`|`null`|文件列表区域的样式|
|file-list|`Array<UploadFile>`|`undefined`|文件列表，如果传入组件会处于受控状态|
|headers|`Object \| ({ file: UploadFile }) => Object`|`null`|HTTP 请求需要附加的 Headers|
|method|`string`|`'POST'`|HTTP 请求的方法|
|multiple|`boolean`|`false`|是否支持多个文件|
|name|`string`|`'file'`|文件在提交表单中的字段名|
|show-cancel-button|`boolean`|`true`|是否显示取消按钮（在 pending、uploading、error 的时候展示），点击取消按钮会触发 `on-remove` 回调|
|show-remove-button|`boolean`|`true`|是否显示删除按钮（在 finished 的时候展示），点击删除按钮会触发 `on-remove` 回调|
|theme|`'light' \| 'dark' \| null \| string`|`null`||
|with-credentials|`boolean`|`false`|是否携带 Cookie|
|on-change|`(options: { file: UploadFile, fileList: Array<UploadFile>, event?: Event }) => any`|`() => {}`|组件状态变化的回调，组件的任何文件状态变化都会触发回调|
|on-finish|`(options: { file: UploadFile }) => UploadFile \| void`|`({ file }) => file`|文件上传结束的回调，可以修改传入的 UploadFile 或者返回一个新的 UploadFile|
|on-remove|`(options: { file: UploadFile, fileList: Array<UploadFile> }) => boolean \| Promise<boolean> \| any`|`() => true`|文件移除的回调，返回 false 或者 promise resolve false 或者 promise reject 会不执行这次删除|


### UploadFile Type
|属性|类型|说明|
|-|-|-|
|id|`string \| number`|文件 id，需要唯一，受控状态下**必需**|
|name|`string`|文件名，受控状态下**必需**|
|status|`'pending' \| 'uploading' \| 'error' \| 'finished' \| 'removed'`|上传的状态，受控状态下**必需**|
|percentage|`number`|文件上传进度百分比，在 uploading 状态下生效，受控状态下可不填|
|file|`File`|文件对应的浏览器 File 对象，受控状态下可不填|

## Methods
### Upload Methods
|名称|类型|说明|
|-|-|-|
|submit|`(fileId?: string \| number)`|提交当前所有处于 pending 状态的文件|
|openFileDialog|`() => void`|打开文件选择对话框|

## Slots
### Upload Slots
|名称|参数|说明|
|-|-|-|
|default|`()`||

### Upload Dragger Slots
|名称|参数|说明|
|-|-|-|
|default|`()`||
