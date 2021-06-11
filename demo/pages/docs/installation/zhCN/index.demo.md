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


```html
  <div class="design">
    <img src="https://naive-ui.oss-accelerate.aliyuncs.com/naive-design.png">
    <a
      class="design-content"
      href="https://naive-ui.oss-accelerate.aliyuncs.com/NaiveUI-Design-Library%28Square-Corner%29.sketch" 
      download>
      Naive UI 设计
      <n-icon :size="20">
        <MdDownload />
      </n-icon>
    </a>
  </div>
```

```js
  import { MdDownload } from '@vicons/ionicons4'
  export default {
    components: {
      MdDownload
    },
    
  }
```
```css
  .design {
    width: 459px;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgb(239, 239, 245);
  }
  .design img {
    width: 100%;
    height: 100%;
  }
  .design-content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 64px;
    font-size: 16px;
    color: #333333;
    font-weight: 600;
    text-decoration: none;
  }
  .design-content .n-icon{
    margin-left: 8px;
  }
```