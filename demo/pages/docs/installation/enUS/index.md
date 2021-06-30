<!--anchor:on-->

# Installation

> Please note that naive-ui only support Vue3. If you are using Vue2, you may look at other libraries.

Use npm to install.

```bash
npm i -D naive-ui
```

## Fonts

```bash
npm i -D vfonts
```

## Icons

naive-ui recommends using [xicons](https://www.xicons.org) as icon library.

## Design Resources


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
    Naive UI Design
    <n-icon :size="20" style="margin-left: 8px;">
      <MdDownload />
    </n-icon>
  </n-text>
</n-card>


```component
MdDownload: import { MdDownload } from '@vicons/ionicons4'
```