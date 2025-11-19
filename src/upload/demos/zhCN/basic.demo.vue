<markdown>
# 基础用法
</markdown>

<template>
  <n-upload
    action="https://m1.apifoxmock.com/m1/7208154-6934252-default/api/upload"
    :headers="{
      'naive-info': 'hello!',
    }"
    :data="{
      'naive-data': 'cool! naive!',
    }"
  >
    <n-button>上传文件</n-button>
  </n-upload>
</template>
