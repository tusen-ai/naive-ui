# 基础用法
```html
<div>
  <n-upload
    action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :headers="{
      'naive-info': 'hello!'
    }"
    :data="{
      'naive-data': 'cool! naive!'
    }"
  >
    <n-button>上传文件</n-button>
  </n-upload>
</div>
```