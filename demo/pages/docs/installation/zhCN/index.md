<!--anchor:on-->

# 安装

> 注意，naive-ui 仅支持 Vue3。如果你在使用 Vue2，可以去看看别的库。

## npm

使用 npm 安装。

```bash
npm i -D naive-ui
```

## 字体

```bash
npm i -D vfonts
```

## 图标

naive-ui 建议使用 [xicons](https://www.xicons.org) 作为图标库。

## 设计资源

<n-card :content-style="{padding: 0}" style="width: 420px; max-width: 100%;">
  <template #cover>
    <img src="https://naive-ui.oss-accelerate.aliyuncs.com/naive-design.png">
  </template>
  <n-text
    tag="a"
    href="https://naive-ui.oss-accelerate.aliyuncs.com/NaiveUI-Design-Library%28Square-Corner%29.sketch" 
    download
    strong
    style="display: flex; align-items: center; justify-content: center; width: 100%; height: 64px; text-decoration: none;"
  >
    Naive UI 设计
    <n-icon :size="20" style="margin-left: 8px;">
      <MdDownload />
    </n-icon>
  </n-text>
</n-card>


```component
MdDownload: import { MdDownload } from '@vicons/ionicons4'
```
