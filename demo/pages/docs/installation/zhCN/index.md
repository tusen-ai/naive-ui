<!--anchor:on-->

# 安装

> 注意，naive-ui 仅支持 Vue3。如果你在使用 Vue2，可以去看看别的库。

## npm

使用 npm 安装。

```bash
npm i -D naive-ui
```

## UMD

参考 [使用 UMD](umd)。

## 字体

```bash
npm i -D vfonts
```

## 图标

naive-ui 建议使用 [xicons](https://www.xicons.org) 作为图标库。

## 设计资源

<n-card size="small"  footer-style="text-align: center;" style="width: 420px; max-width: 100%;">
  <template #cover>
    <img src="https://naive-ui.oss-accelerate.aliyuncs.com/naive-design.png">
  </template>
  <template #footer>
    <n-button
      tag="a"
      href="https://naive-ui.oss-accelerate.aliyuncs.com/NaiveUI-Design-Library-zh-CN.sketch"
      text
      target="_blank"
      icon-placement="right"
    >
      Naive UI (Sketch)
      <template #icon>
        <n-icon >
          <ArrowDownload16Regular />
        </n-icon>
      </template>
    </n-button>
  </template>
</n-card>

```component
ArrowDownload16Regular: import ArrowDownload16Regular from '@vicons/fluent/ArrowDownload16Regular'
```
