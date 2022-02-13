<markdown>
# 基本用法
</markdown>

<template>
  <n-watermark content="水印" :gap-x="10" :gap-y="50">
    <n-table :bordered="false" :single-line="false">
      <thead>
        <tr>
          <th>不问</th>
          <th>不能</th>
          <th>不明白</th>
          <th>...</th>
          <th>不！不！不！</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>机密</td>
          <td>禁止</td>
          <td>外传</td>
          <td>...</td>
          <td>给司外势力递刀子</td>
        </tr>
        <tr>
          <td>...</td>
          <td>...</td>
          <td>...</td>
          <td>...</td>
          <td>...</td>
        </tr>
      </tbody>
    </n-table>
  </n-watermark>
</template>
