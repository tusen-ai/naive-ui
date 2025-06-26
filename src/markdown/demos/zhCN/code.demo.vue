<markdown>
# Code

<p>导入 Prism 语法高亮的不同主题样式</p>
<p>每个文件对应一种独立的代码高亮主题风格，可根据项目需求选择启用</p>
<strong>1. Coy 主题（具有柔和的颜色方案，适合阅读和展示代码，背景色通常为浅灰色，代码颜色对比度适中）</strong>
<p>import 'vue-markdown-unified/dist/themes/prism-coy.min.css'</p>
<strong>2. Dark 主题（采用深色背景，代码颜色以明亮的色调为主，适合在夜间或低光环境下使用，减少眼睛疲劳）</strong>
<p>import 'vue-markdown-unified/dist/themes/prism-dark.min.css'</p>
<strong>3. Funky 主题（具有独特的颜色组合和风格，包含一些鲜艳的颜色，使代码看起来更加生动和有趣）</strong>
<p>import 'vue-markdown-unified/dist/themes/prism-funky.min.css'</p>
<strong>4. Okaidia 主题（深色主题，代码颜色的选择旨在提供良好的可读性，对于不同的代码元素有清晰的颜色区分）</strong>
<p>import 'vue-markdown-unified/dist/themes/prism-okaidia.min.css'</p>
<strong>5. Solarized Light 主题（基于 Solarized 颜色方案的亮色调版本，强调颜色的柔和和可读性，背景色为浅黄色，代码颜色搭配和谐）</strong>
<p>import 'vue-markdown-unified/dist/themes/prism-solarizedlight.min.css'</p>
<strong>6. Tomorrow 主题（提供了一种简洁、现代的外观，颜色较为清新，背景色通常为淡蓝色或浅灰色，代码颜色易于区分）</strong>
<p>import 'vue-markdown-unified/dist/themes/prism-tomorrow.min.css'</p>
<strong>7. Twilight 主题（有类似黄昏的色调，背景色为深灰色，代码颜色在这种背景下显得突出，同时给人一种舒适的视觉感受）</strong>
<p>import 'vue-markdown-unified/dist/themes/prism-twilight.min.css'</p>
<strong>8. Prism 核心基础样式（必须导入，包含语法高亮的基础样式和结构）</strong>
<p>import 'vue-markdown-unified/dist/themes/prism.min.css'</p>
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'
import 'vue-markdown-unified/dist/themes/prism.min.css'

const options = {
  allowHtml: true,
  animated: true
}

const markdownText = ref(`
\`\`\`javascript
$ pnpm install
\`\`\`


\`\`\`javascript
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { useDropNodeOnCanvas } from './useDropNodeOnCanvas';
\`\`\`
`)

</script>

<template>
  <n-markdown :content="markdownText" v-bind="options" />
</template>